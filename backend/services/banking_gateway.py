from sqlalchemy.orm import Session
from models.account import Account, AccountType
import uuid


def get_accounts(user_id: str, db: Session) -> list:
    uid = uuid.UUID(user_id)
    accounts = db.query(Account).filter(Account.user_id == uid).all()
    return [
        {
            "id": str(a.id),
            "number": a.account_number,
            "type": a.account_type.value,
            "balance": a.balance,
            "label": a.label,
        }
        for a in accounts
    ]


def get_primary_savings(user_id: str, db: Session) -> dict:
    uid = uuid.UUID(user_id)
    account = (
        db.query(Account)
        .filter(Account.user_id == uid, Account.account_type == AccountType.SAVINGS)
        .first()
    )
    if not account:
        return {"balance": 0, "number": "****0000"}
    return {
        "id": str(account.id),
        "balance": account.balance,
        "number": account.account_number,
    }


def execute_investment(user_id: str, plan: list, db: Session) -> dict:
    uid = uuid.UUID(user_id)
    savings = (
        db.query(Account)
        .filter(Account.user_id == uid, Account.account_type == AccountType.SAVINGS)
        .first()
    )
    total = sum(item["amount"] for item in plan)
    if savings:
        savings.balance -= total
    txn_id = f"SBIINV-2026-06-{uuid.uuid4().hex[:4].upper()}"
    return {"txn_id": txn_id, "total": total}
