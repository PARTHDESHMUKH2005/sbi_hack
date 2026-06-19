from pydantic import BaseModel
from typing import Optional, List


class AccountResponse(BaseModel):
    id: str
    number: str
    type: str
    balance: float
    label: str


class RecommendRequest(BaseModel):
    account_id: str
    amount: Optional[float] = None


class InvestmentItem(BaseModel):
    fund: str
    amount: float
    risk: str


class RecommendationResponse(BaseModel):
    plan: List[InvestmentItem]
    total: float
    explanation: str


class ConfirmInvestmentRequest(BaseModel):
    plan_id: str


class ConfirmInvestmentResponse(BaseModel):
    status: str
    txn_id: str
    message: str
