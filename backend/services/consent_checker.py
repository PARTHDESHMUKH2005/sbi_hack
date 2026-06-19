import uuid
from sqlalchemy.orm import Session
from models.consent import ConsentSettings


def get_consent(user_id: str, db: Session) -> dict:
    uid = uuid.UUID(user_id)
    consent = db.query(ConsentSettings).filter(ConsentSettings.user_id == uid).first()
    if not consent:
        return {"qa": False, "alerts": False, "fd": False, "investments": False}
    return {
        "qa": consent.can_answer_questions,
        "alerts": consent.can_idle_alerts,
        "fd": consent.can_fd_reminders,
        "investments": consent.can_investment_suggestions,
    }


def can_perform_action(user_id: str, action: str, db: Session) -> bool:
    consent = get_consent(user_id, db)
    action_map = {
        "ask_questions": "qa",
        "idle_alerts": "alerts",
        "fd_reminders": "fd",
        "investment_suggestions": "investments",
    }
    key = action_map.get(action)
    if not key:
        return False
    return consent.get(key, False)
