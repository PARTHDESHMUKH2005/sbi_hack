import uuid
from sqlalchemy import Column, String, Enum, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from database import Base
import enum


class AccountType(str, enum.Enum):
    SAVINGS = "savings"
    FD = "fd"
    MF = "mf"


class Account(Base):
    __tablename__ = "accounts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    account_number = Column(String(16), nullable=False)
    account_type = Column(Enum(AccountType), nullable=False)
    balance = Column(Float, default=0.0)
    label = Column(String(100))
