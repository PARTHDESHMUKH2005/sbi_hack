import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from database import Base
import enum


class AuditEventType(str, enum.Enum):
    CONSENT_GRANTED = "consent_granted"
    CONSENT_REVOKED = "consent_revoked"
    BALANCE_CHECKED = "balance_checked"
    INVESTMENT_RECOMMENDED = "investment_recommended"
    INVESTMENT_EXECUTED = "investment_executed"
    FD_CREATED = "fd_created"
    DATA_DELETED = "data_deleted"
    USER_SIGNED_UP = "user_signed_up"
    USER_SIGNED_IN = "user_signed_in"


class AuditLog(Base):
    __tablename__ = "audit_log"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    event_type = Column(Enum(AuditEventType), nullable=False)
    details = Column(Text, default="{}")
    previous_hash = Column(String(64), nullable=False)
    hash = Column(String(64), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
