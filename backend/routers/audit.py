from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from utils.auth import get_current_user_id
from services.audit_service import get_user_audit_logs

router = APIRouter(prefix="/api/audit", tags=["audit"])


@router.get("/logs")
def audit_logs(user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    logs = get_user_audit_logs(user_id, db)
    return {"logs": logs}
