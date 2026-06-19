import uuid
from sqlalchemy.orm import Session
from models.conversation import Conversation, ConversationStatus
from models.message import Message, MessageRole
from services.consent_checker import get_consent, can_perform_action
from services.banking_gateway import get_primary_savings, execute_investment
from services.decision_engine import recommend_investment
from services.explainability import generate_explanation
from services.audit_service import log_event
from models.audit_log import AuditEventType


def process_message(user_id: str, text: str, conversation_id: str | None, user_name: str, db: Session) -> dict:
    uid = uuid.UUID(user_id)

    if conversation_id:
        conv = db.query(Conversation).filter(Conversation.id == conversation_id).first()
        if not conv or str(conv.user_id) != user_id:
            conv = Conversation(id=uuid.uuid4(), user_id=uid, status=ConversationStatus.ACTIVE)
            db.add(conv)
            db.commit()
            conversation_id = str(conv.id)
    else:
        conv = Conversation(id=uuid.uuid4(), user_id=uid, status=ConversationStatus.ACTIVE)
        db.add(conv)
        db.commit()
        conversation_id = str(conv.id)

    user_msg = Message(
        id=uuid.uuid4(),
        conversation_id=conv.id,
        role=MessageRole.USER,
        content=text,
    )
    db.add(user_msg)
    db.commit()

    consent = get_consent(user_id, db)
    text_lower = text.lower()
    reply = ""
    metadata = {}

    if any(word in text_lower for word in ["balance", "check", "how much", "savings"]):
        if not can_perform_action(user_id, "ask_questions", db):
            reply = "I'd love to help, but answering questions about your account is turned off in your settings. You can enable it anytime in Consent Settings."
        else:
            account = get_primary_savings(user_id, db)
            log_event(user_id, AuditEventType.BALANCE_CHECKED, {"account": account["number"]}, db)
            if any(word in text_lower for word in ["invest", "suggest", "recommend", "option"]):
                if not can_perform_action(user_id, "investment_suggestions", db):
                    reply = f"Hi {user_name}! Your savings account ({account['number']}) has \u20b9{account['balance']:,.0f}. Investment suggestions are currently turned off in your settings. Enable them to get personalized recommendations."
                else:
                    rec = recommend_investment(user_id, account["balance"])
                    explanation = generate_explanation(user_name, account["balance"], consent)
                    plan_str = "\n".join(f"\u2022 {i['fund']} \u2014 \u20b9{i['amount']:,.0f}" for i in rec["plan"])
                    log_event(
                        user_id,
                        AuditEventType.INVESTMENT_RECOMMENDED,
                        {"plan": rec["plan"], "total": rec["total"], "explanation": explanation},
                        db,
                    )
                    reply = (
                        f"Hi {user_name}! Your savings account ({account['number']}) has \u20b9{account['balance']:,.0f}.\n\n"
                        f"Based on your risk profile and goals, I recommend:\n{plan_str}\n\n"
                        f"**Total: \u20b9{rec['total']:,.0f}**\n\n"
                        f"{explanation}\n\n"
                        f"Shall I proceed with this investment plan?"
                    )
                    metadata = {
                        "type": "recommendation",
                        "plan": rec["plan"],
                        "total": rec["total"],
                        "explanation": explanation,
                    }
            else:
                reply = (
                    f"Hi {user_name}! Your savings account ({account['number']}) has \u20b9{account['balance']:,.0f}. "
                    f"Would you like me to suggest investment options?"
                )

    elif any(word in text_lower for word in ["yes", "sure", "okay", "proceed", "recommend"]):
        account = get_primary_savings(user_id, db)
        if not can_perform_action(user_id, "investment_suggestions", db):
            reply = "Investment suggestions are currently disabled in your settings. Enable them to get personalized recommendations."
        else:
            rec = recommend_investment(user_id, account["balance"])
            explanation = generate_explanation(user_name, account["balance"], consent)
            plan_str = "\n".join(f"\u2022 {i['fund']} \u2014 \u20b9{i['amount']:,.0f}" for i in rec["plan"])
            reply = (
                f"Great choice! Based on your profile, I recommend:\n{plan_str}\n\n"
                f"**Total: \u20b9{rec['total']:,.0f}**\n\n"
                f"{explanation}\n\n"
                f"Shall I proceed with this investment plan?"
            )
            metadata = {
                "type": "recommendation",
                "plan": rec["plan"],
                "total": rec["total"],
                "explanation": explanation,
            }

    elif any(word in text_lower for word in ["confirm", "invest", "execute", "go ahead"]):
        account = get_primary_savings(user_id, db)
        rec = recommend_investment(user_id, account["balance"])
        result = execute_investment(user_id, rec["plan"], db)
        log_event(
            user_id,
            AuditEventType.INVESTMENT_EXECUTED,
            {"plan": rec["plan"], "total": result["total"], "txn_id": result["txn_id"]},
            db,
        )
        reply = (
            f"\u2705 \u20b9{result['total']:,.0f} invested successfully!\n"
            f"Transaction ID: {result['txn_id']}"
        )
        metadata = {"type": "success", "txn_id": result["txn_id"], "total": result["total"]}

    elif any(word in text_lower for word in ["hello", "hi", "hey", "start"]):
        reply = f"Hi {user_name}! I\u2019m your Money Co-Pilot. How can I help you today?"

    elif any(word in text_lower for word in ["stop", "opt", "revoke", "delete", "leave"]):
        reply = (
            "Got it, I won\u2019t proactively message you again about your finances. "
            "You can still ask me anything anytime. Your consent settings have been updated."
        )
        metadata = {"type": "opt_out"}

    else:
        reply = (
            f"I understand you\u2019re asking about \"{text}\". "
            f"I can help with balance checks, investment recommendations, FD details, and more. "
            f"What would you like to know?"
        )

    agent_msg = Message(
        id=uuid.uuid4(),
        conversation_id=conv.id,
        role=MessageRole.AGENT,
        content=reply,
        metadata_json=str(metadata or {}),
    )
    db.add(agent_msg)
    db.commit()

    return {"reply": reply, "metadata": metadata, "conversation_id": conversation_id}
