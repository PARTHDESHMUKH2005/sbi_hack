import json
import uuid
from datetime import datetime
from sqlalchemy.orm import Session
from models.audit_log import AuditLog, AuditEventType
from utils.hashing import compute_audit_hash


def get_last_hash(db: Session) -> str:
    last = db.query(AuditLog).order_by(AuditLog.created_at.desc()).first()
    return last.hash if last else "0" * 64


def log_event(user_id: str, event_type: AuditEventType, details: dict, db: Session):
    uid = uuid.UUID(user_id)
    previous_hash = get_last_hash(db)
    event_hash = compute_audit_hash(previous_hash, event_type.value, details)

    log = AuditLog(
        id=uuid.uuid4(),
        user_id=uid,
        event_type=event_type,
        details=json.dumps(details),
        previous_hash=previous_hash,
        hash=event_hash,
        created_at=datetime.utcnow(),
    )
    db.add(log)
    db.commit()
    return log


def get_user_audit_logs(user_id: str, db: Session) -> list:
    uid = uuid.UUID(user_id)
    logs = (
        db.query(AuditLog)
        .filter(AuditLog.user_id == uid)
        .order_by(AuditLog.created_at.desc())
        .all()
    )
    return [
        {
            "id": str(log.id),
            "event_type": log.event_type.value,
            "details": json.loads(log.details),
            "hash": log.hash,
            "previous_hash": log.previous_hash,
            "created_at": log.created_at.isoformat(),
        }
        for log in logs
    ]
