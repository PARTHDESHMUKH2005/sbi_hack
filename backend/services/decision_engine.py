def recommend_investment(user_id: str, balance: float) -> dict:
    plan = [
        {"fund": "SBI Bluechip Fund", "amount": 20000, "risk": "moderate"},
        {"fund": "SBI Nifty Index Fund", "amount": 10000, "risk": "low"},
        {"fund": "SBI Fixed Deposit", "amount": 5000, "risk": "low"},
    ]
    total = sum(item["amount"] for item in plan)
    return {"plan": plan, "total": total}
