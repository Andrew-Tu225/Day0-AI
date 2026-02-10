from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google.api_core.exceptions import ResourceExhausted
import chat_service
from uuid import UUID

router = APIRouter()

class ChatRequest(BaseModel):
    session_id: UUID
    message: str

@router.post("/chat")
async def chat(req: ChatRequest):
    try:
        reply_content = chat_service.chat_with_coach(req.session_id, req.message)
        return {"reply": reply_content}
        
    except ResourceExhausted:
        return {"reply": "The Coach is a bit overwhelmed right now. Give me 30 seconds!"}
    except Exception as e:
        # Fallback check for wrapped exceptions
        if "RESOURCE_EXHAUSTED" in str(e) or "429" in str(e):
            return {"reply": "The Coach is a bit overwhelmed right now. Give me 30 seconds!"}
        
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/create-session")
async def create_chat_session():
    session_id = chat_service.create_chat_session()
    return {"session_id": session_id}

@router.get("/chat/{session_id}/history")
async def get_chat_history(session_id: UUID):
    try:
        history = chat_service.get_chat_history(session_id)
        return {"history": history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))