import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from google.api_core.exceptions import ResourceExhausted
from langchain_postgres import PostgresChatMessageHistory
from dotenv import load_dotenv
from prompt import COACH_SYSTEM_PROMPT
from uuid import UUID, uuid4
from datetime import datetime, timezone
import psycopg

# Load env vars if not already loaded (safe to call multiple times)
load_dotenv()

# --- Configuration & Setup ---
model = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite")
DB_URL = os.getenv("DB_URL")
conn = psycopg.connect(DB_URL)

prompt = ChatPromptTemplate.from_messages([
    ("system", COACH_SYSTEM_PROMPT),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])

def get_session_history(session_id: UUID):
    """
    Return the chat message history from database
    for a given session_id
    """
    session_id = str(session_id)

    return PostgresChatMessageHistory(
        "chat_messages",        # table_name (positional)
        session_id,            # session_id (positional)
        sync_connection=conn
    )

# Chain construction
chain = prompt | model

chain_with_history = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history",
)

# --- Service Helper Functions ---

@retry(
    retry=retry_if_exception_type(ResourceExhausted),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    stop=stop_after_attempt(5),
    reraise=True
)
def _generate_response_safe_internal(chain, input_data, config):
    """Internal helper to invoke chain with retry logic."""
    return chain.invoke(input_data, config=config)

def chat_with_coach(session_id: UUID, message: str) -> str:
    """
    Main entry point to chat with the coach.
    Handles the chain invocation configuration.
    Raises exceptions (including ResourceExhausted) to be handled by the caller.
    """
    response = _generate_response_safe_internal(
        chain_with_history, 
        {"input": message}, 
        config={"configurable": {"session_id": session_id}}
    )
    return response.content

def create_chat_session():
    session_id = uuid4()
    created_at = datetime.now(timezone.utc)
    
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO chat_sessions (session_id, created_at) VALUES (%s, %s)",
            (session_id, created_at)
        )
        conn.commit()
        
    return str(session_id)
