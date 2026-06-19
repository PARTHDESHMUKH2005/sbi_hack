# Money Co-Pilot
### An Agentic AI Assistant for Customer Acquisition, Digital Adoption & Engagement
**Built for: SBI Hackathon @ GFF 2026**

---

## 1. The Problem (In Simple Words)

Banks like SBI have millions of customers, but most of them just sit there — not using digital products, not investing idle money, not getting the right financial advice at the right time. Banks try to fix this by sending generic SMS, emails, and push notifications, but people ignore them because they feel robotic, irrelevant, and pushy.

At the same time, banks want to:
- Get new customers easily (**Acquisition**)
- Get existing customers to actually use digital services like UPI, FDs, insurance, mutual funds (**Adoption**)
- Keep customers engaged long-term instead of going dormant (**Engagement**)

The challenge SBI has put forward is simple to state but hard to solve well:

> **"Can we build an AI agent that does all of this — acquisition, adoption, and engagement — automatically, intelligently, and at scale?"**

The tricky part: any solution that "watches" a customer's financial behavior to be smart about this can easily feel invasive. **Most teams will solve this by building a surveillance bot. We didn't.**

---

## 2. The Solution (In Simple Words)

**Money Co-Pilot** is an AI agent that lives inside the YONO app and WhatsApp. Instead of secretly tracking customers in the background, it works like a financial assistant the customer *chooses* to bring into their life — like hiring a personal financial advisor who only acts with permission.

**The core idea:** *An AI that works FOR the customer, not ON the customer.*

In short:
1. The customer opts in and picks exactly what the AI is allowed to do.
2. The AI proactively flags useful things (like idle money sitting in a savings account) — but only because the customer said it's okay.
3. The customer decides what happens next — invest it, save it, ask a question, or ignore it.
4. The AI handles everything end-to-end conversationally — no long forms, no branch visits.
5. Every suggestion comes with a plain-English reason, so nothing feels like a black box.

This single design covers all three pillars of the problem statement:

| Pillar | How Money Co-Pilot Solves It |
|---|---|
| **Customer Acquisition** | Conversational onboarding — sign-up, KYC, and first product activation happen through chat, not forms |
| **Digital Adoption** | The agent actively guides customers toward FDs, mutual funds, insurance, UPI, and YONO features |
| **Digital Engagement** | Proactive, opt-in nudges based on real financial patterns (salary credit, idle balance, upcoming maturity) |

---

## 3. Why This Approach Wins (Design Philosophy)

| Typical Approach (what most teams will build) | Money Co-Pilot (our approach) |
|---|---|
| AI silently tracks transactions in the background | AI only acts on data the customer explicitly allows |
| Bank decides when to message the customer | Customer decides what triggers a message |
| AI auto-invests money without confirmation | AI prepares the decision, customer gives one-tap approval |
| No explanation for why a suggestion was made | Every suggestion includes a clear "why" |
| Privacy is an afterthought / disclaimer | Privacy is the first screen the user sees |

This directly targets the **Regulatory Readiness** and **User Experience** criteria in SBI's judging rubric — criteria most hackathon teams under-invest in because they're focused only on flashy features.

---

## 4. Key Features (Detailed)

### 4.1 Consent-First Onboarding
When a customer opens the "Try your AI Money Assistant" card in YONO, they see a simple checklist before anything else happens:
- ☐ Let it answer my questions using my account data
- ☐ Let it proactively message me about idle balance
- ☐ Let it remind me before FD maturity
- ☐ Let it suggest investment options

Nothing is turned on by default. The customer builds their own version of the assistant.

### 4.2 Pull-Based Assistant (Ask Anything)
Customers can message the agent anytime with questions like:
- *"I just got a ₹50,000 bonus, what should I do with it?"*
- *"How much loan can I afford right now?"*
- *"How do I plan so my son has enough for college fees at 18?"*

The agent answers using only the data needed for that specific question — it doesn't need to "watch" the customer to be useful here.

### 4.3 Opt-In Proactive Nudges
If (and only if) the customer turned this on, the agent can reach out like:
> *"Hey, noticed ₹35,000 has been sitting idle in your savings account for 3 weeks. Want me to suggest something, or should I leave it alone?"*

The customer can say "leave it alone" — and the agent respects that and stops asking about that balance.

### 4.4 Explainable Recommendations
Every suggestion comes with a short, plain-language reason, e.g.:
> *"Suggesting this because: (1) you turned on idle-balance alerts, (2) no FD is currently active, (3) balance has stayed flat for 21 days."*

This is what makes the system audit-friendly and regulator-friendly — a human can always see why the AI did what it did.

### 4.5 Conversational, Guided Execution (Not Silent Auto-Pilot)
For anything involving real money movement (investing, opening an FD, buying insurance), the agent:
1. Analyzes the situation and prepares a specific, ready-to-go action (e.g., "Invest ₹35k: ₹20k in Fund A, ₹15k in Fund B")
2. Shows the customer the full plan and reasoning
3. Waits for **one tap of confirmation** before executing anything

Full silent auto-investing is intentionally avoided — this keeps the system aligned with how regulated financial advice/execution needs human-in-the-loop checkpoints, while still being almost entirely automated from the customer's point of view (one tap vs. ten screens).

### 4.6 Multi-Channel Delivery
Available both:
- **Inside the YONO app**, as a dedicated assistant tab
- **On WhatsApp**, for customers who prefer a familiar, lightweight interface (especially useful for first-time digital banking users — directly supporting financial inclusion goals)

### 4.7 Life-Goal Planning (Deeper Use Cases)
Beyond single transactions, the agent can have longer conversations around bigger goals:
- *"How should I plan for my child's education fund by age 18?"*
- *"Should I prioritize paying off my loan faster or investing more?"*
- *"What's a realistic monthly SIP for me to retire comfortably?"*

This moves the agent from a transaction nudger to an actual financial planning companion — which deepens engagement and long-term product adoption.

---

## 5. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Conversational Interface | WhatsApp Business API + YONO in-app chat UI | Where the customer talks to the agent |
| Agent Orchestration | LLM-based agent (e.g. Claude/GPT) with tool-calling | Understands intent, decides actions, manages multi-step conversations |
| Decision Engine | Rules + ML hybrid model (similar architecture to a credit-risk classifier) | Decides what to recommend based on financial signals |
| Explainability Layer | SHAP-style feature attribution | Generates the "why" behind every suggestion |
| Backend / API Layer | FastAPI | Connects agent to banking APIs (mocked/sandboxed for demo) |
| Data Layer | Simulated transaction dataset (since real SBI data isn't available during the hackathon) | Powers the demo scenarios |
| Execution Layer | Mutual Fund / FD / Insurance APIs (SBI sandbox, where available) | Executes confirmed actions |
| Consent & Audit Layer | Permission store + action logging | Tracks what the customer allowed and logs every agent decision for compliance |

---

## 6. Impact

**For Customers:**
- Less idle, underutilized money
- Financial decisions explained simply, without jargon
- No fear of being "watched" — full control over what the AI can see and do
- Easier access for first-time digital banking users (especially in Tier 2/3 cities) via WhatsApp

**For SBI:**
- Higher conversion on customer acquisition and onboarding
- Increased usage of digital products (FDs, mutual funds, insurance, UPI)
- Stronger long-term retention through genuine, trusted engagement
- A compliance-friendly AI system that's easier to get regulatory sign-off on, accelerating real deployment
- A reusable agent framework that can extend to other products and journeys over time

**For Financial Inclusion (Broader Impact):**
- Simplifies financial planning for people who've never had access to a personal advisor
- Helps everyday Indian families plan for real goals — children's education, retirement, home loans — not just transactional banking

---

## 7. Live Example Walkthrough

**Scenario: Priya, 27, SBI savings account holder**

**Step 1 — Discovery**
Priya opens YONO and sees a banner: *"Try your AI Money Assistant — ask it anything about your money. You control what it can see."*

**Step 2 — Consent**
She taps it, and sees a checklist. She enables:
- ☑ Let it answer my questions
- ☑ Let it proactively message me about idle balance
- ☐ Let it remind me before FD maturity *(left off)*

**Step 3 — First Use (Pull)**
She messages: *"I just got a ₹50,000 bonus, what should I do with it?"*

Agent replies:
> *"Based on your current FD holdings and that you don't have one maturing soon, you could split it: ₹30,000 in a 1-year FD at 7.1%, and ₹20,000 in an SBI mutual fund SIP. Want me to start either?"*

She taps **"Start the FD"** — the agent guides her through it conversationally instead of a long form, confirms the amount and tenure, and completes the booking after her final tap.

**Step 4 — Proactive Nudge (2 weeks later)**
Since she opted into idle-balance alerts, the agent messages:
> *"Hey Priya, noticed ₹35,000 has been sitting idle in your savings account for 3 weeks. Want me to suggest something, or should I leave it alone?"*

She replies *"sure, suggest something."*

**Step 5 — Recommendation with Explanation**
> *"I'd suggest: ₹20,000 in [Fund A] and ₹15,000 in [Fund B], based on your moderate risk profile. Suggesting this because: (1) you turned on idle-balance alerts, (2) no FD is currently active, (3) balance has stayed flat for 21 days. Want me to set this up?"*

**Step 6 — One-Tap Confirmation & Execution**
Priya taps **"Confirm."** The agent executes the investment via API and replies:
> *"Done. ₹35,000 invested as planned. Here's your updated portfolio summary."*

**Step 7 — Opt-Out Respected**
A month later, Priya messages *"stop messaging me about my balance."*
Agent replies:
> *"Got it, I won't proactively message you again about your finances. You can still ask me anything anytime."*
Her consent settings update immediately to reflect this.

---

## 8. Why This Wins

1. **Covers all 3 pillars** of the official problem statement (Acquisition, Adoption, Engagement) and 4 of the 5 listed focus points.
2. **Solves the privacy objection before judges raise it** — consent-first design, not a bolted-on disclaimer.
3. **Demoable end-to-end in a live presentation** — consent screen → pull query → proactive nudge → explained recommendation → one-tap execution → opt-out, all in under 3 minutes.
4. **Directly scores on every judging criterion**: Innovation (agentic, consent-based design), Technical Feasibility (real APIs, real LLM agent), Business Potential (higher conversion + retention), Scalability (same framework extends to loans, insurance, credit cards), User Experience (conversational, simple, in-control), and Regulatory Readiness (explainability, human-in-loop, audit trail, DPDP-aligned consent).
5. **A genuine, reusable product** — not just a hackathon demo, with a clear path to real SBI deployment.

---

*Team: [Add team name]*
*Team Members: [Add names]*
*Submission for: SBI Hackathon @ GFF 2026*
