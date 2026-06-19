from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import uuid
from database import get_db
from models.user import User
from models.conversation import Conversation
from models.message import Message
from schemas.chat import ChatRequest, ChatResponse, ChatHistoryResponse, MessageResponse
from utils.auth import get_current_user_id
from services.agent import process_message

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
def chat(
    req: ChatRequest,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == uuid.UUID(user_id)).first()
    result = process_message(user_id, req.message, req.conversation_id, user.name if user else "User", db)
    return ChatResponse(
        reply=result["reply"],
        metadata=result.get("metadata"),
        conversation_id=result["conversation_id"],
    )


@router.get("/history", response_model=ChatHistoryResponse)
def chat_history(
    conversation_id: str = None,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    if conversation_id:
        conv = db.query(Conversation).filter(Conversation.id == conversation_id).first()
        if not conv or str(conv.user_id) != user_id:
            return ChatHistoryResponse(messages=[])
        messages = db.query(Message).filter(Message.conversation_id == conv.id).order_by(Message.created_at).all()
    else:
        conv = (
            db.query(Conversation)
            .filter(Conversation.user_id == user_id)
            .order_by(Conversation.created_at.desc())
            .first()
        )
        if not conv:
            return ChatHistoryResponse(messages=[])
        messages = db.query(Message).filter(Message.conversation_id == conv.id).order_by(Message.created_at).all()

    return ChatHistoryResponse(
        messages=[
            MessageResponse(
                role=msg.role.value,
                content=msg.content,
                created_at=msg.created_at.isoformat() if msg.created_at else "",
            )
            for msg in messages
        ]
    )
