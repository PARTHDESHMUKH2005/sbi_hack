from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.consent import ConsentSettings
from schemas.auth import SignUpRequest, SignInRequest, AuthResponse, MeResponse
from utils.auth import create_access_token, get_current_user_id
from utils.hashing import hash_password, verify_password
from utils.seed import seed_user_accounts
from services.audit_service import log_event
from models.audit_log import AuditEventType
from services.consent_checker import get_consent
import uuid

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup", response_model=AuthResponse)
def signup(req: SignUpRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == req.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        id=uuid.uuid4(),
        name=req.name,
        email=req.email,
        password_hash=hash_password(req.password),
    )
    db.add(user)
    db.flush()

    consent = ConsentSettings(
        user_id=user.id,
        can_answer_questions=True,
        can_idle_alerts=False,
        can_fd_reminders=True,
        can_investment_suggestions=True,
    )
    db.add(consent)
    db.flush()

    seed_user_accounts(str(user.id), db)
    db.commit()

    log_event(str(user.id), AuditEventType.USER_SIGNED_UP, {"email": req.email, "name": req.name}, db)

    token = create_access_token({"sub": str(user.id), "email": user.email})
    return AuthResponse(
        token=token,
        user={"id": str(user.id), "name": user.name, "email": user.email, "is_active": user.is_active},
    )


@router.post("/signin", response_model=AuthResponse)
def signin(req: SignInRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account deactivated")

    log_event(str(user.id), AuditEventType.USER_SIGNED_IN, {"email": req.email}, db)

    token = create_access_token({"sub": str(user.id), "email": user.email})
    return AuthResponse(
        token=token,
        user={"id": str(user.id), "name": user.name, "email": user.email, "is_active": user.is_active},
    )


@router.get("/me", response_model=MeResponse)
def me(user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == uuid.UUID(user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    consent = get_consent(user_id, db)
    return MeResponse(
        user={
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "is_active": user.is_active,
            "created_at": user.created_at.isoformat() if user.created_at else "",
        },
        consent=consent,
    )
