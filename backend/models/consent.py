import uuid
from datetime import datetime
from sqlalchemy import Column, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from database import Base


class ConsentSettings(Base):
    __tablename__ = "consent_settings"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    can_answer_questions = Column(Boolean, default=False)
    can_idle_alerts = Column(Boolean, default=False)
    can_fd_reminders = Column(Boolean, default=False)
    can_investment_suggestions = Column(Boolean, default=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
