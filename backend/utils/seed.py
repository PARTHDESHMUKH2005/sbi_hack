from database import SessionLocal
from models.account import Account, AccountType
import uuid


def seed_user_accounts(user_id: str, db=None):
    if db:
        _do_seed(user_id, db)
        return

    db_session = SessionLocal()
    try:
        _do_seed(user_id, db_session)
        db_session.commit()
    finally:
        db_session.close()


def _do_seed(user_id: str, db):
    uid = uuid.UUID(user_id)
    existing = db.query(Account).filter(Account.user_id == uid).first()
    if existing:
        return

    savings = Account(
        id=uuid.uuid4(),
        user_id=uid,
        account_number="****7890",
        account_type=AccountType.SAVINGS,
        balance=425000.0,
        label="Savings Account",
    )
    db.add(savings)

    fd = Account(
        id=uuid.uuid4(),
        user_id=uid,
        account_number="****2345",
        account_type=AccountType.FD,
        balance=100000.0,
        label="1-Year FD @ 7.1%",
    )
    db.add(fd)

    db.flush()
