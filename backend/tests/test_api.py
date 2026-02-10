import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import sys
import os
from uuid import uuid4

# Add backend directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main import app
from google.api_core.exceptions import ResourceExhausted

client = TestClient(app)

@pytest.fixture
def mock_chat_service():
    with patch('api.chat_service') as mock:
        yield mock

def test_create_session_endpoint(mock_chat_service):
    mock_uuid = str(uuid4())
    mock_chat_service.create_chat_session.return_value = mock_uuid
    
    response = client.post("/create-session")
    
    assert response.status_code == 200
    assert response.json() == {"session_id": mock_uuid}
    mock_chat_service.create_chat_session.assert_called_once()

def test_get_history_endpoint(mock_chat_service):
    session_id = str(uuid4())
    mock_history = [
        {"role": "user", "content": "Hi"},
        {"role": "assistant", "content": "Hello"}
    ]
    mock_chat_service.get_chat_history.return_value = mock_history
    
    response = client.get(f"/chat/{session_id}/history")
    
    assert response.status_code == 200
    assert response.json() == {"history": mock_history}
    mock_chat_service.get_chat_history.assert_called_once()

def test_chat_endpoint_success(mock_chat_service):
    session_id = str(uuid4())
    message = "Hello"
    mock_reply = "I am ready to coach you!"
    
    mock_chat_service.chat_with_coach.return_value = mock_reply
    
    response = client.post("/chat", json={"session_id": session_id, "message": message})
    
    assert response.status_code == 200
    assert response.json() == {"reply": mock_reply}
    
    # Verify the service was called with UUID object, not string
    mock_chat_service.chat_with_coach.assert_called_once()

def test_chat_endpoint_resource_exhausted(mock_chat_service):
    session_id = str(uuid4())
    message = "Hello"
    
    # Simulate ResourceExhausted error
    mock_chat_service.chat_with_coach.side_effect = ResourceExhausted("Quota exceeded")
    
    response = client.post("/chat", json={"session_id": session_id, "message": message})
    
    assert response.status_code == 200
    assert response.json() == {"reply": "The Coach is a bit overwhelmed right now. Give me 30 seconds!"}
