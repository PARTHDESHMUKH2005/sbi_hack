import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./money_copilot.db")
SECRET_KEY = os.getenv("SECRET_KEY", "sbi-hackathon-2026-money-copilot-secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7
