<div align="center">

```
╔╦╗╔═╗╔╗╔╔═╗╦ ╦  ╔═╗╔═╗   ╔═╗╦╦  ╔═╗╔╦╗
║║║║ ║║║║║╣ ╚╦╝  ║  ║ ║───╠═╝║║  ║ ║ ║ 
╩ ╩╚═╝╝╚╝╚═╝ ╩   ╚═╝╚═╝   ╩  ╩╩═╝╚═╝ ╩ 
```

# 💰 Money Co-Pilot

### *An AI that works FOR the customer — not ON them.*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-sbi--hack.vercel.app-00c6ff?style=for-the-badge&labelColor=0d1420)](https://sbi-hack.vercel.app)
[![GitHub](https://img.shields.io/badge/⚙_GitHub-PARTHDESHMUKH2005-7c3aed?style=for-the-badge&labelColor=0d1420)](https://github.com/PARTHDESHMUKH2005/sbi_hack)
[![Hackathon](https://img.shields.io/badge/🏆_SBI_Hackathon-GFF_2026-10b981?style=for-the-badge&labelColor=0d1420)](https://globalfintechfest.com)
[![Theme](https://img.shields.io/badge/Theme-Agentic_AI_%26_Emerging_Tech-f59e0b?style=for-the-badge&labelColor=0d1420)]()

<br/>

> **Consent-first agentic AI embedded inside YONO & WhatsApp.**  
> Proactive. Explainable. Always optional.

</div>

---

## 📌 Table of Contents

- [The Problem](#-the-problem)
- [Our Insight](#-our-insight)
- [The Solution](#-the-solution)
- [How It Works](#-how-it-works--process-flow)
- [Live Example](#-live-example--meet-priya)
- [Three Pillars](#-three-sbi-pillars-covered)
- [Tech Stack](#-tech-stack)
- [Impact](#-impact)
- [Why This Wins](#-why-this-wins)

---

## 🚨 The Problem

> *SBI has 500 million customers. Most of them are invisible to the bank.*

Banks flood inboxes with generic SMS, OTPs, and promotional blasts. Customers have learned to ignore all of it.

| Metric | Reality |
|--------|---------|
| 📵 YONO Usage | **67%** of SBI customers have never opened YONO |
| 📩 SMS Open Rate | **< 3%** on bank alerts — industry average |
| 💸 Idle Money | **₹2.1L Crore** sitting untouched in savings accounts |

**The problem isn't the customer. It's the conversation.**  
Banks broadcast. They don't converse. Money Co-Pilot changes that.

---

## 💡 Our Insight

> *Every other team will build a surveillance bot. We didn't.*

| ❌ The Surveillance Bot | ✅ Money Co-Pilot |
|------------------------|------------------|
| AI silently tracks transactions in background | AI only acts on data customer explicitly allows |
| Bank decides when to message the customer | Customer decides what triggers a message |
| Auto-invests money without confirmation | One-tap confirm before any money moves |
| No explanation for why a suggestion was made | Every suggestion has a plain-English reason |
| Privacy is a disclaimer at the bottom | Privacy is the **first screen** the user sees |

This directly targets **Regulatory Readiness** and **User Experience** — the two judging criteria most hackathon teams completely ignore.

---

## 🚀 The Solution

**Money Co-Pilot** is a consent-first agentic AI assistant embedded inside SBI's YONO app and WhatsApp. It acts like a personal financial advisor the customer *chooses* to bring into their life — one that only acts with permission.

```
Customer opts in → picks what AI can see → AI flags opportunities
→ customer decides → AI executes → everything logged & auditable
```

**Core philosophy:** *An AI that works FOR the customer, not ON the customer.*

---

## ⚙️ How It Works — Process Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    MONEY CO-PILOT FLOW                      │
└─────────────────────────────────────────────────────────────┘

 [01] 🔐 OPT-IN & CONSENT
      Customer enables Money Co-Pilot in YONO or WhatsApp.
      Granular checklist — all off by default.
      Customer picks exactly what the AI can see.
      ↓ Permission Ledger · DPDP Act Aligned

 [02] 📡 SIGNAL DETECTION
      Agent monitors only permitted data categories.
      Detects: idle balance · salary credit · FD maturity · no active investments.
      ↓ Rule Engine · Pattern Scanner

 [03] 🧠 DECISION ENGINE
      ML + rules hybrid evaluates risk profile & existing holdings.
      Picks the single best next action.
      SHAP-style "why" generated — shown to customer, not hidden in logs.
      ↓ ML Classifier · SHAP Explainability

 [04] 🤖 AGENT ORCHESTRATION
      LLM agent constructs a natural, conversational nudge.
      Handles multi-turn conversations & follow-up questions.
      ↓ Claude / GPT-4 · LangChain · Tool-Calling

 [05] 📲 DELIVERY
      ├── YONO App → rich UI with approve/ignore buttons
      └── WhatsApp → same flow, plain text, numbered reply options
      ↓ WhatsApp Business API · Next.js

 [06] ✅ ONE-TAP EXECUTION
      Customer taps Approve (or replies 1 on WhatsApp).
      Agent calls banking API. Action executed instantly.
      ↓ SBI Core Banking API · BSE StAR MF · UPI Rails

 [07] 📋 AUDIT & COMPLIANCE
      Every action logged immutably with timestamp & reasoning trace.
      Consent reversible in one message, permanently.
      Full audit trail for regulatory review.
      ↓ Supabase · Immutable Audit Log · Zero Data Retention Post-Session
```

---

## 💬 Live Example — Meet Priya

> **Priya, 27, SBI savings account holder. ₹35,000 sitting idle for 3 weeks.**

```
┌──────────────────────────────────────────────────────┐
│  💬 Money Co-Pilot  ●  WhatsApp / YONO               │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Priya: "I just got a ₹50,000 bonus.                 │
│          What should I do with it?"                  │
│                                                      │
│  🤖 Agent: "You could split it —                     │
│     ₹30,000 in a 1-year FD at 7.1%,                  │
│     ₹20,000 in an SBI Mutual Fund SIP.               │
│                                                      │
│     💡 Why: No FD currently active ·                 │
│     Bonus received today · Moderate risk profile"    │
│                                                      │
│     [ ✔ Start the FD ]   [ ✕ Ignore ]                │
│                                                      │
│  Priya: taps ✔ Start the FD                          │
│                                                      │
│  🤖 Agent: "Done. ₹30,000 FD booked at 7.1%          │
│     for 1 year. Matures July 2, 2027.                │
│     ✅ Executed · Logged · Auditable"                │
│                                                      │
│  --- 2 weeks later ---                               │
│                                                      │
│  🤖 Agent: "Hey Priya, ₹35,000 has been              │
│     sitting idle for 3 weeks.                        │
│     Want me to suggest something,                    │
│     or should I leave it alone?"                     │
│                                                      │
│  Priya: "stop messaging me about my balance"         │
│                                                      │
│  🤖 Agent: "Got it — won't proactively message       │
│     you again. You can still ask me anything."       │
│     🔒 Consent updated · Preference stored           │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 🎯 Three SBI Pillars Covered

```
╔══════════════════╦══════════════════╦══════════════════╗
║   PILLAR 01      ║   PILLAR 02      ║   PILLAR 03      ║
║  Acquisition     ║  Digital Adop.   ║  Engagement      ║
╠══════════════════╬══════════════════╬══════════════════╣
║  New customers   ║  Guides existing ║  Opt-in nudges   ║
║  onboarded via   ║  customers to    ║  triggered by    ║
║  conversational  ║  activate FDs,   ║  real signals:   ║
║  KYC. First      ║  MFs, UPI,       ║  salary credit,  ║
║  product live    ║  Insurance —     ║  idle balance,   ║
║  in 90 seconds.  ║  all in one      ║  FD maturity,    ║
║  Zero paperwork. ║  chat flow.      ║  life goals.     ║
╚══════════════════╩══════════════════╩══════════════════╝
```

---

## 🛠 Tech Stack

### 💬 Conversational Interface
![WhatsApp](https://img.shields.io/badge/WhatsApp_Business_API-25D366?style=flat-square&logo=whatsapp&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)

### 🤖 AI & Agent Orchestration
![Claude](https://img.shields.io/badge/Claude_(Anthropic)-D97757?style=flat-square&logo=anthropic&logoColor=white)
![OpenAI](https://img.shields.io/badge/GPT--4_(OpenAI)-412991?style=flat-square&logo=openai&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white)

### 🧠 ML & Decision Engine
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikitlearn&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white)
![SHAP](https://img.shields.io/badge/SHAP_Explainability-FF6B35?style=flat-square)

### ⚙️ Backend & APIs
![FastAPI](https://img.shields.io/badge/FastAPI-009485?style=flat-square&logo=fastapi&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=black)
![ChromaDB](https://img.shields.io/badge/ChromaDB-FF6B35?style=flat-square)
![SBI API](https://img.shields.io/badge/SBI_Core_Banking_API-00529B?style=flat-square)
![UPI](https://img.shields.io/badge/UPI_Rails-8B44AC?style=flat-square)
![BSE](https://img.shields.io/badge/BSE_StAR_MF_API-003087?style=flat-square)

### 🔒 Compliance & Infra
![DPDP](https://img.shields.io/badge/DPDP_Act_2023-10b981?style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![Audit](https://img.shields.io/badge/Immutable_Audit_Trail-ef4444?style=flat-square)

---

## 📈 Impact

### 👤 For Customers
- Less idle money — every rupee working for you
- Financial decisions explained simply, without jargon
- Full control — the AI sees only what you allow
- Accessible via WhatsApp — no new app to download

### 🏦 For SBI
- Higher conversion on acquisition and onboarding
- Increased adoption of FDs, MFs, insurance, and UPI
- Stronger long-term retention through trusted engagement
- Compliance-friendly — faster regulatory sign-off

### 🌍 For Financial Inclusion
- Reaches Tier 2/3 India via familiar WhatsApp interface
- Simplifies planning for first-time digital banking users
- Helps everyday Indian families plan for real goals — education, retirement, home loans

---

## 🏆 Why This Wins

```
JUDGING CRITERION          OUR ANSWER
─────────────────────────────────────────────────────────────
💡 Innovation            → Consent-first agentic AI nudges.
                           Nothing like this exists in Indian
                           banking today.

📱 User Experience       → One-tap actions inside apps
                           customers already use. Zero new
                           app to download.

⚖️  Regulatory Readiness → Designed around RBI guidelines +
                           DPDP Act 2023 from day one.
                           Not retrofitted. Built in.

📈 Scalability           → Stateless microservices. Ready
                           for 500M users on day one.

🔐 Privacy               → Zero data stored without opt-in.
                           Consent reversible in one message.

🚀 Real-World Viability  → Live demo. SBI sandbox APIs
                           integrated. Production-ready in
                           90 days.
─────────────────────────────────────────────────────────────
```

> *Most teams build features. We built trust.*

---

## 👥 Team

| Name |
|------|
| Parth Deshmukh |
| Abhishek Chopra |
| Sagarika Wankhede | 
| Jaskaran Singh Bedi | 

---

<div align="center">

## 🌐 [sbi-hack.vercel.app](https://sbi-hack.vercel.app)

*Money Co-Pilot — Consent-first AI banking for 500M+ SBI customers.*  
*SBI Hackathon @ Global Fintech Fest 2026*

---

*An AI the customer actually wants to talk to.*

</div>
