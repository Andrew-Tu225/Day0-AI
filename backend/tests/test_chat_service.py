import pytest
from unittest.mock import MagicMock, patch
from uuid import uuid4
from datetime import datetime, timezone
import sys
import os

# Add backend directory to sys.path to allow imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import chat_service

@pytest.fixture
def mock_db_connection():
    with patch('chat_service.conn') as mock_conn:
        mock_cursor = MagicMock()
        mock_conn.cursor.return_value.__enter__.return_value = mock_cursor
        yield mock_conn, mock_cursor

@pytest.fixture
def mock_chat_history():
    with patch('chat_service.PostgresChatMessageHistory') as mock_history:
        yield mock_history

@pytest.fixture
def mock_chain():
    with patch('chat_service.chain_with_history') as mock_chain:
        yield mock_chain

def test_create_chat_session(mock_db_connection):
    mock_conn, mock_cursor = mock_db_connection
    
    session_id = chat_service.create_chat_session()
    
    assert session_id is not None
    # Verify DB interaction
    mock_cursor.execute.assert_called_once()
    args, _ = mock_cursor.execute.call_args
    assert "INSERT INTO chat_sessions" in args[0]
    mock_conn.commit.assert_called_once()

def test_get_chat_history(mock_chat_history):
    session_id = uuid4()
    
    # Mock return values for history messages
    mock_msg_human = MagicMock()
    mock_msg_human.type = 'human'
    mock_msg_human.content = 'Hello'
    
    mock_msg_ai = MagicMock()
    mock_msg_ai.type = 'ai'
    mock_msg_ai.content = 'Hi there'
    
    mock_instance = mock_chat_history.return_value
    mock_instance.messages = [mock_msg_human, mock_msg_ai]
    
    history = chat_service.get_chat_history(session_id)
    
    assert len(history) == 2
    assert history[0]['role'] == 'user'
    assert history[0]['content'] == 'Hello'
    assert history[1]['role'] == 'assistant'
    assert history[1]['content'] == 'Hi there'

def test_chat_with_coach(mock_chain):
    session_id = uuid4()
    message = "Hello coach"
    
    # Mock the response from the chain
    mock_response = MagicMock()
    mock_response.content = "Hello! I am your coach."
    mock_chain.invoke.return_value = mock_response
    
    response = chat_service.chat_with_coach(session_id, message)
    
    assert response == "Hello! I am your coach."
    
    # Verify chain was called with correct arguments
    mock_chain.invoke.assert_called_once()
    call_args = mock_chain.invoke.call_args
    assert call_args[0][0] == {"input": message}
    assert call_args[1]['config']['configurable']['session_id'] == session_id
