def generate_explanation(user_name: str, balance: float, consent: dict) -> str:
    reasons = []
    if consent.get("investments"):
        reasons.append("you turned on investment suggestions")
    if balance > 50000:
        reasons.append(f"you have \u20b9{balance:,.0f} in savings with no FD active")
    reasons.append("your risk profile is moderate")

    return f"Suggesting this because: ({') ('.join(str(i + 1) + ') ' + r for i, r in enumerate(reasons))})"
