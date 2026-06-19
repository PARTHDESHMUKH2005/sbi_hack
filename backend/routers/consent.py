from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid
from database import get_db
from models.consent import ConsentSettings
from models.user import User
from schemas.consent import ConsentUpdateRequest, ConsentResponse, DataDeleteResponse
from utils.auth import get_current_user_id
from services.audit_service import log_event
from models.audit_log import AuditEventType
from services.consent_checker import get_consent
import uuid

router = APIRouter(prefix="/api/consent", tags=["consent"])


@router.get("/", response_model=ConsentResponse)
def read_consent(user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    c = get_consent(user_id, db)
    return ConsentResponse(qa=c["qa"], alerts=c["alerts"], fd=c["fd"], investments=c["investments"])


@router.put("/", response_model=ConsentResponse)
def update_consent(
    req: ConsentUpdateRequest,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    uid = uuid.UUID(user_id)
    consent = db.query(ConsentSettings).filter(ConsentSettings.user_id == uid).first()
    if not consent:
        raise HTTPException(status_code=404, detail="Consent settings not found")

    changes = {}
    if req.qa is not None:
        changes["can_answer_questions"] = req.qa
    if req.alerts is not None:
        changes["can_idle_alerts"] = req.alerts
    if req.fd is not None:
        changes["can_fd_reminders"] = req.fd
    if req.investments is not None:
        changes["can_investment_suggestions"] = req.investments

    for key, value in changes.items():
        setattr(consent, key, value)
    db.commit()

    for key, value in changes.items():
        event_type = AuditEventType.CONSENT_GRANTED if value else AuditEventType.CONSENT_REVOKED
        log_event(user_id, event_type, {"setting": key, "value": value}, db)

    return read_consent(user_id, db)


@router.delete("/user/data", response_model=DataDeleteResponse)
def delete_user_data(user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.is_active = False
    consent = db.query(ConsentSettings).filter(ConsentSettings.user_id == user_id).first()
    if consent:
        consent.can_answer_questions = False
        consent.can_idle_alerts = False
        consent.can_fd_reminders = False
        consent.can_investment_suggestions = False
    db.commit()

    log_event(user_id, AuditEventType.DATA_DELETED, {"user_id": user_id}, db)
    return DataDeleteResponse(message="All data deleted successfully. You can create a new account anytime.")
