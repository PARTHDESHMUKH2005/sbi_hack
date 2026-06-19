from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from models import *  # noqa: F401, F403 — ensures all models are registered
from routers import auth, consent, chat, banking, audit

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Money Co-Pilot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(consent.router)
app.include_router(chat.router)
app.include_router(banking.router)
app.include_router(audit.router)


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "Money Co-Pilot API"}
