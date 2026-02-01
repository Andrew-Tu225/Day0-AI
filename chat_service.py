import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from google.api_core.exceptions import ResourceExhausted
from dotenv import load_dotenv
from prompt import COACH_SYSTEM_PROMPT

# Load env vars if not already loaded (safe to call multiple times)
load_dotenv()

# --- Configuration & Setup ---
model = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite")

prompt = ChatPromptTemplate.from_messages([
    ("system", COACH_SYSTEM_PROMPT),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])

# Global session store
session_store = {}

def get_session_history(session_id: str):
    """
    Check if the session_id exists in the dictionary.
    If yes: Return the existing history.
    If no: Create a new history, save it to dict, and return it.
    """
    if session_id not in session_store:
        session_store[session_id] = ChatMessageHistory()
    return session_store[session_id]

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

def chat_with_coach(session_id: str, message: str) -> str:
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
