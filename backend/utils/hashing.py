import bcrypt
import hashlib
import json


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())


def compute_audit_hash(previous_hash: str, event_type: str, details: dict) -> str:
    raw = f"{previous_hash}|{event_type}|{json.dumps(details, sort_keys=True)}"
    return hashlib.sha256(raw.encode()).hexdigest()
