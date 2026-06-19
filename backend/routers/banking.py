import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.banking import (
    AccountResponse,
    RecommendRequest,
    RecommendationResponse,
    InvestmentItem,
    ConfirmInvestmentRequest,
    ConfirmInvestmentResponse,
)
from utils.auth import get_current_user_id
from services.banking_gateway import get_accounts, get_primary_savings, execute_investment
from services.decision_engine import recommend_investment
from services.explainability import generate_explanation
from services.consent_checker import get_consent, can_perform_action
from services.audit_service import log_event
from models.audit_log import AuditEventType
from models.user import User

router = APIRouter(prefix="/api/banking", tags=["banking"])


@router.get("/accounts", response_model=list[AccountResponse])
def list_accounts(user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    return get_accounts(user_id, db)


@router.get("/accounts/primary")
def primary_account(user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    return get_primary_savings(user_id, db)


@router.post("/investments/recommend", response_model=RecommendationResponse)
def recommend(
    req: RecommendRequest,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    if not can_perform_action(user_id, "investment_suggestions", db):
        raise HTTPException(status_code=403, detail="Investment suggestions are disabled in your consent settings")

    account = get_primary_savings(user_id, db)
    rec = recommend_investment(user_id, account["balance"])
    consent = get_consent(user_id, db)
    user = db.query(User).filter(User.id == uuid.UUID(user_id)).first()
    explanation = generate_explanation(user.name if user else "User", account["balance"], consent)

    log_event(user_id, AuditEventType.INVESTMENT_RECOMMENDED, {"plan": rec["plan"], "total": rec["total"]}, db)

    return RecommendationResponse(
        plan=[InvestmentItem(**item) for item in rec["plan"]],
        total=rec["total"],
        explanation=explanation,
    )


@router.post("/investments/confirm", response_model=ConfirmInvestmentResponse)
def confirm_investment(
    req: ConfirmInvestmentRequest,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    if not can_perform_action(user_id, "investment_suggestions", db):
        raise HTTPException(status_code=403, detail="Investment suggestions are disabled")

    account = get_primary_savings(user_id, db)
    rec = recommend_investment(user_id, account["balance"])
    result = execute_investment(user_id, rec["plan"], db)

    log_event(
        user_id,
        AuditEventType.INVESTMENT_EXECUTED,
        {"plan": rec["plan"], "total": result["total"], "txn_id": result["txn_id"]},
        db,
    )

    return ConfirmInvestmentResponse(
        status="success",
        txn_id=result["txn_id"],
        message=f"\u2705 \u20b9{result['total']:,.0f} invested successfully!",
    )
