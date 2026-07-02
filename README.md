<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Money Co-Pilot — README</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');

  :root {
    --bg: #080c14;
    --surface: #0d1420;
    --surface2: #111827;
    --border: #1e2d40;
    --accent: #00c6ff;
    --accent2: #7c3aed;
    --accent3: #10b981;
    --gold: #f59e0b;
    --red: #ef4444;
    --text: #e2e8f0;
    --muted: #64748b;
    --white: #ffffff;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 24px;
    overflow: hidden;
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,198,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,198,255,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: gridPulse 8s ease-in-out infinite;
  }

  @keyframes gridPulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .hero-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,198,255,0.12) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(0,198,255,0.1);
    border: 1px solid rgba(0,198,255,0.3);
    color: var(--accent);
    padding: 6px 16px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 24px;
    animation: fadeInDown 0.6s ease both;
  }

  .hero h1 {
    font-size: clamp(48px, 8vw, 100px);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -3px;
    margin-bottom: 16px;
    animation: fadeInUp 0.8s ease 0.2s both;
  }

  .gradient-text {
    background: linear-gradient(135deg, #00c6ff 0%, #7c3aed 50%, #10b981 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 200%;
    animation: gradientShift 4s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .hero-sub {
    font-size: clamp(18px, 2.5vw, 24px);
    color: var(--muted);
    max-width: 600px;
    margin: 0 auto 40px;
    font-weight: 400;
    animation: fadeInUp 0.8s ease 0.4s both;
  }

  .hero-tagline {
    font-size: clamp(13px, 1.5vw, 16px);
    color: var(--white);
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 12px 28px;
    border-radius: 8px;
    font-weight: 500;
    letter-spacing: 0.5px;
    animation: fadeInUp 0.8s ease 0.6s both;
  }

  .hero-tagline span { color: var(--accent); font-weight: 700; }

  .hero-links {
    display: flex;
    gap: 16px;
    margin-top: 32px;
    flex-wrap: wrap;
    justify-content: center;
    animation: fadeInUp 0.8s ease 0.8s both;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.2s;
    cursor: pointer;
  }

  .btn-primary {
    background: linear-gradient(135deg, #00c6ff, #7c3aed);
    color: white;
    box-shadow: 0 0 30px rgba(0,198,255,0.3);
  }

  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(0,198,255,0.5); }

  .btn-outline {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
  }

  .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

  /* ── SECTIONS ── */
  .section {
    max-width: 1100px;
    margin: 0 auto;
    padding: 80px 24px;
  }

  .section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }

  .section-title {
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 800;
    letter-spacing: -1.5px;
    line-height: 1.1;
    margin-bottom: 16px;
  }

  .section-desc {
    color: var(--muted);
    max-width: 600px;
    font-size: 16px;
    margin-bottom: 48px;
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin: 0;
  }

  /* ── STAT CARDS ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 80px;
  }

  .stat-card {
    background: var(--surface);
    padding: 40px 32px;
    text-align: center;
    transition: background 0.2s;
  }

  .stat-card:hover { background: var(--surface2); }

  .stat-num {
    font-size: 52px;
    font-weight: 900;
    letter-spacing: -2px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 13px;
    color: var(--muted);
    font-weight: 500;
  }

  /* ── COMPARISON ── */
  .compare-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 80px;
  }

  .compare-card {
    border-radius: 16px;
    padding: 32px;
    border: 1px solid var(--border);
  }

  .compare-card.bad {
    background: rgba(239,68,68,0.05);
    border-color: rgba(239,68,68,0.2);
  }

  .compare-card.good {
    background: rgba(16,185,129,0.05);
    border-color: rgba(16,185,129,0.2);
  }

  .compare-title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .compare-title.bad { color: var(--red); }
  .compare-title.good { color: var(--accent3); }

  .compare-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 14px;
    color: var(--text);
  }

  .compare-item:last-child { border-bottom: none; }
  .compare-item .icon { flex-shrink: 0; margin-top: 2px; }

  /* ── FLOW ── */
  .flow {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    margin-bottom: 80px;
  }

  .flow-step {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 24px;
    align-items: flex-start;
    position: relative;
  }

  .flow-step:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 29px;
    top: 60px;
    width: 2px;
    height: calc(100% + 0px);
    background: linear-gradient(180deg, var(--accent), var(--accent2));
    opacity: 0.3;
  }

  .flow-num {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(0,198,255,0.15), rgba(124,58,237,0.15));
    border: 1px solid rgba(0,198,255,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 800;
    color: var(--accent);
    flex-shrink: 0;
    font-family: 'JetBrains Mono', monospace;
  }

  .flow-content {
    padding: 8px 0 40px;
  }

  .flow-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--white);
  }

  .flow-desc {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.7;
  }

  .flow-chip {
    display: inline-block;
    background: rgba(0,198,255,0.1);
    border: 1px solid rgba(0,198,255,0.2);
    color: var(--accent);
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 100px;
    margin-top: 10px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.5px;
  }

  /* ── TECH STACK ── */
  .tech-section {
    margin-bottom: 80px;
  }

  .tech-group {
    margin-bottom: 32px;
  }

  .tech-group-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
  }

  .tech-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .tech-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    border: 1px solid transparent;
    transition: all 0.2s;
    cursor: default;
    font-family: 'JetBrains Mono', monospace;
  }

  .tech-badge:hover {
    transform: translateY(-2px);
    filter: brightness(1.2);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }

  .tech-badge .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  /* Badge color variants */
  .tb-blue   { background: rgba(59,130,246,0.12); border-color: rgba(59,130,246,0.3); color: #60a5fa; }
  .tb-purple { background: rgba(124,58,237,0.12); border-color: rgba(124,58,237,0.3); color: #a78bfa; }
  .tb-green  { background: rgba(16,185,129,0.12); border-color: rgba(16,185,129,0.3); color: #34d399; }
  .tb-orange { background: rgba(249,115,22,0.12); border-color: rgba(249,115,22,0.3); color: #fb923c; }
  .tb-cyan   { background: rgba(6,182,212,0.12);  border-color: rgba(6,182,212,0.3);  color: #22d3ee; }
  .tb-yellow { background: rgba(234,179,8,0.12);  border-color: rgba(234,179,8,0.3);  color: #facc15; }
  .tb-pink   { background: rgba(236,72,153,0.12); border-color: rgba(236,72,153,0.3); color: #f472b6; }
  .tb-red    { background: rgba(239,68,68,0.12);  border-color: rgba(239,68,68,0.3);  color: #f87171; }
  .tb-teal   { background: rgba(20,184,166,0.12); border-color: rgba(20,184,166,0.3); color: #2dd4bf; }
  .tb-indigo { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.3); color: #818cf8; }

  /* ── PILLARS ── */
  .pillars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 80px;
  }

  .pillar-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px 24px;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }

  .pillar-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
  }

  .pillar-card.p1::before { background: linear-gradient(90deg, #00c6ff, #7c3aed); }
  .pillar-card.p2::before { background: linear-gradient(90deg, #7c3aed, #10b981); }
  .pillar-card.p3::before { background: linear-gradient(90deg, #10b981, #f59e0b); }

  .pillar-card:hover {
    transform: translateY(-4px);
    border-color: rgba(0,198,255,0.3);
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }

  .pillar-icon { font-size: 32px; margin-bottom: 16px; }
  .pillar-num { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .pillar-title { font-size: 20px; font-weight: 800; color: var(--white); margin-bottom: 12px; letter-spacing: -0.5px; }
  .pillar-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* ── DEMO CHAT ── */
  .demo-box {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 80px;
  }

  .demo-header {
    background: var(--surface2);
    padding: 16px 24px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    font-weight: 600;
  }

  .demo-dot { width: 10px; height: 10px; border-radius: 50%; }
  .demo-dot.green { background: #10b981; box-shadow: 0 0 8px #10b981; }

  .demo-body { padding: 32px; display: flex; flex-direction: column; gap: 16px; }

  .msg {
    max-width: 72%;
    padding: 14px 18px;
    border-radius: 14px;
    font-size: 14px;
    line-height: 1.6;
    animation: msgPop 0.3s ease both;
  }

  @keyframes msgPop {
    from { opacity: 0; transform: scale(0.95) translateY(4px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  .msg.user {
    align-self: flex-end;
    background: linear-gradient(135deg, rgba(0,198,255,0.2), rgba(124,58,237,0.2));
    border: 1px solid rgba(0,198,255,0.25);
    color: var(--white);
  }

  .msg.agent {
    align-self: flex-start;
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text);
  }

  .msg.agent .why {
    margin-top: 10px;
    padding: 10px 14px;
    background: rgba(16,185,129,0.08);
    border: 1px solid rgba(16,185,129,0.2);
    border-radius: 8px;
    font-size: 12px;
    color: var(--accent3);
    font-family: 'JetBrains Mono', monospace;
  }

  .approve-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    padding: 8px 20px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    margin-top: 12px;
    cursor: pointer;
    border: none;
    box-shadow: 0 0 20px rgba(16,185,129,0.3);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(16,185,129,0.3); }
    50% { box-shadow: 0 0 40px rgba(16,185,129,0.6); }
  }

  /* ── IMPACT ── */
  .impact-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 80px;
  }

  .impact-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    transition: all 0.2s;
  }

  .impact-card:hover { border-color: rgba(0,198,255,0.3); transform: translateY(-2px); }
  .impact-card h3 { font-size: 14px; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
  .impact-card ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .impact-card li { font-size: 13px; color: var(--muted); display: flex; gap: 10px; align-items: flex-start; }
  .impact-card li::before { content: '→'; color: var(--accent); flex-shrink: 0; font-weight: 700; }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid var(--border);
    padding: 48px 24px;
    text-align: center;
  }

  .footer-title {
    font-size: 32px;
    font-weight: 900;
    letter-spacing: -1px;
    margin-bottom: 8px;
  }

  .footer-sub {
    color: var(--muted);
    font-size: 14px;
    margin-bottom: 24px;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .stats-row { grid-template-columns: 1fr; }
    .compare-grid { grid-template-columns: 1fr; }
    .pillars { grid-template-columns: 1fr; }
    .impact-grid { grid-template-columns: 1fr; }
  }

  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    background: rgba(0,198,255,0.08);
    border: 1px solid rgba(0,198,255,0.15);
    padding: 2px 8px;
    border-radius: 4px;
    color: var(--accent);
  }
</style>
</head>
<body>

<!-- ── HERO ── -->
<div class="hero">
  <div class="hero-grid"></div>
  <div class="hero-glow"></div>

  <div class="badge">⚡ SBI Hackathon @ GFF 2026</div>

  <h1>
    <span class="gradient-text">Money<br>Co-Pilot</span>
  </h1>

  <p class="hero-sub">An Agentic AI Assistant for Customer Acquisition, Digital Adoption & Engagement</p>

  <div class="hero-tagline">
    <span>An AI that works FOR the customer</span> — not on them.
  </div>

  <div class="hero-links">
    <a href="https://sbi-hack.vercel.app" class="btn btn-primary" target="_blank">
      🌐 Live Demo
    </a>
    <a href="https://github.com/PARTHDESHMUKH2005/sbi_hack" class="btn btn-outline" target="_blank">
      ⚙ GitHub
    </a>
  </div>
</div>

<div class="divider"></div>

<!-- ── PROBLEM ── -->
<div class="section reveal">
  <div class="section-label">The Problem</div>
  <h2 class="section-title">SBI has 500M customers.<br>Most of them are invisible.</h2>
  <p class="section-desc">Generic nudges. Robotic emails. An inbox they've learned to ignore. Banks have data. They just don't use it in a way customers actually trust.</p>

  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-num">67%</div>
      <div class="stat-label">of SBI customers have never opened YONO</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">&lt;3%</div>
      <div class="stat-label">average SMS open rate on bank alerts</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">₹2.1L Cr</div>
      <div class="stat-label">sitting idle in savings accounts — untouched</div>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- ── INSIGHT ── -->
<div class="section reveal">
  <div class="section-label">Our Insight</div>
  <h2 class="section-title">Every other team will build<br>a surveillance bot.</h2>
  <p class="section-desc">We built the opposite — an agent that only acts when the customer says go.</p>

  <div class="compare-grid">
    <div class="compare-card bad">
      <div class="compare-title bad">❌ The Surveillance Bot</div>
      <div class="compare-item"><span class="icon">🔴</span> AI silently tracks transactions in background</div>
      <div class="compare-item"><span class="icon">🔴</span> Bank decides when to message the customer</div>
      <div class="compare-item"><span class="icon">🔴</span> Auto-invests money without confirmation</div>
      <div class="compare-item"><span class="icon">🔴</span> No explanation for why a suggestion was made</div>
      <div class="compare-item"><span class="icon">🔴</span> Privacy is a disclaimer at the bottom</div>
    </div>
    <div class="compare-card good">
      <div class="compare-title good">✅ Money Co-Pilot</div>
      <div class="compare-item"><span class="icon">🟢</span> AI only acts on data customer explicitly allows</div>
      <div class="compare-item"><span class="icon">🟢</span> Customer decides what triggers a message</div>
      <div class="compare-item"><span class="icon">🟢</span> One-tap confirm before any money moves</div>
      <div class="compare-item"><span class="icon">🟢</span> Every suggestion has a plain-English reason</div>
      <div class="compare-item"><span class="icon">🟢</span> Privacy is the very first screen the user sees</div>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- ── HOW IT WORKS ── -->
<div class="section reveal">
  <div class="section-label">Process Flow</div>
  <h2 class="section-title">Seven steps. Customer<br>in control at every one.</h2>
  <p class="section-desc" style="margin-bottom: 56px;">From discovery to execution — every handoff is explicit, auditable, and reversible.</p>

  <div class="flow">
    <div class="flow-step">
      <div class="flow-num">01</div>
      <div class="flow-content">
        <div class="flow-title">🔐 Opt-In & Consent</div>
        <div class="flow-desc">Customer sees a card in YONO or a WhatsApp message. Taps to enable. Sees a granular checklist — idle balance alerts, FD reminders, investment suggestions — all off by default. Picks exactly what the AI is allowed to see. Nothing runs without explicit permission.</div>
        <span class="flow-chip">Permission Ledger · DPDP Act Aligned</span>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-num">02</div>
      <div class="flow-content">
        <div class="flow-title">📡 Signal Detection</div>
        <div class="flow-desc">Agent monitors only permitted data categories. Detects financial signals: idle balance sitting flat for X days, salary credit received, FD approaching maturity, no active investment products despite healthy balance.</div>
        <span class="flow-chip">Rule Engine · Pattern Scanner</span>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-num">03</div>
      <div class="flow-content">
        <div class="flow-title">🧠 Decision Engine</div>
        <div class="flow-desc">ML + rules hybrid evaluates customer's risk profile, existing holdings, and financial patterns. Picks the single best next action. SHAP-style feature attribution generates a plain-language "why" — shown to the customer, not hidden in a log.</div>
        <span class="flow-chip">ML Classifier · SHAP Explainability</span>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-num">04</div>
      <div class="flow-content">
        <div class="flow-title">🤖 Agent Orchestration</div>
        <div class="flow-desc">LLM agent receives decision engine output and constructs a natural, conversational nudge. Handles multi-turn conversations — if the customer asks follow-ups, the agent answers intelligently before returning to the action.</div>
        <span class="flow-chip">Claude / GPT-4 · LangChain · Tool-Calling</span>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-num">05</div>
      <div class="flow-content">
        <div class="flow-title">📲 Delivery Layer</div>
        <div class="flow-desc">Message delivered via YONO in-app chat tab (rich UI with approve/ignore buttons) and WhatsApp Business API (same flow, plain text, numbered reply options). Customer's preferred channel remembered from opt-in.</div>
        <span class="flow-chip">YONO Chat UI · WhatsApp Business API</span>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-num">06</div>
      <div class="flow-content">
        <div class="flow-title">✅ One-Tap Execution</div>
        <div class="flow-desc">Customer taps Approve (or replies 1 on WhatsApp). Agent calls the relevant banking API — FD booking, MF order via BSE StAR MF, insurance quote, UPI setup. Confirmation sent immediately with transaction summary.</div>
        <span class="flow-chip">SBI Sandbox APIs · BSE StAR MF · UPI Rails</span>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-num">07</div>
      <div class="flow-content">
        <div class="flow-title">📋 Audit & Compliance</div>
        <div class="flow-desc">Every agent decision, consent state, and executed action logged immutably. Consent reversible anytime in one message. Full audit trail available for regulatory review. No data retained post-session.</div>
        <span class="flow-chip">Supabase · Immutable Audit Log · DPDP Compliant</span>
      </div>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- ── LIVE DEMO ── -->
<div class="section reveal">
  <div class="section-label">Live Example</div>
  <h2 class="section-title">Meet Priya. 27. SBI customer.<br>₹35,000 sitting idle.</h2>
  <p class="section-desc" style="margin-bottom: 40px;">Watch Money Co-Pilot turn an ignored savings account into an active investment — in one conversation.</p>

  <div class="demo-box">
    <div class="demo-header">
      <div class="demo-dot green"></div>
      <span>Money Co-Pilot</span>
      <span style="color: var(--muted); font-weight: 400; margin-left: auto;">WhatsApp · YONO</span>
    </div>
    <div class="demo-body">
      <div class="msg user">I just got a ₹50,000 bonus. What should I do with it?</div>
      <div class="msg agent">
        Based on your current FD holdings, you could split it — ₹30,000 in a 1-year FD at 7.1%, and ₹20,000 in an SBI Mutual Fund SIP. Want me to start either?
        <div class="why">💡 Why: No FD currently active · Bonus received today · Moderate risk profile detected</div>
        <br><button class="approve-btn">✔ Start the FD</button>
      </div>
      <div class="msg user">sure, start the FD</div>
      <div class="msg agent">
        Done. ₹30,000 FD booked at 7.1% for 1 year. Matures on July 2, 2027. Here's your updated portfolio summary.
        <div class="why">✅ Executed via SBI Core Banking API · Logged · Auditable</div>
      </div>
      <div class="msg user">stop messaging me about my balance</div>
      <div class="msg agent">
        Got it — I won't proactively message you again about your finances. You can still ask me anything anytime.
        <div class="why">🔒 Consent updated in real-time · Preference stored · DPDP compliant</div>
      </div>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- ── PILLARS ── -->
<div class="section reveal">
  <div class="section-label">Problem Statement Coverage</div>
  <h2 class="section-title">One agent.<br>All three SBI priorities.</h2>
  <p class="section-desc" style="margin-bottom: 40px;">Built to score on every pillar of the official problem statement — not just one.</p>

  <div class="pillars">
    <div class="pillar-card p1">
      <div class="pillar-icon">🎯</div>
      <div class="pillar-num">Pillar 01</div>
      <div class="pillar-title">Customer Acquisition</div>
      <div class="pillar-desc">New customers onboarded via conversational KYC. First product activated in under 90 seconds. Zero branch visits. Zero paperwork.</div>
    </div>
    <div class="pillar-card p2">
      <div class="pillar-icon">📲</div>
      <div class="pillar-num">Pillar 02</div>
      <div class="pillar-title">Digital Adoption</div>
      <div class="pillar-desc">Guided activation of FDs, Mutual Funds, UPI, and Insurance — all inside one conversational flow in YONO or WhatsApp.</div>
    </div>
    <div class="pillar-card p3">
      <div class="pillar-icon">🔔</div>
      <div class="pillar-num">Pillar 03</div>
      <div class="pillar-title">Digital Engagement</div>
      <div class="pillar-desc">Opt-in nudges triggered by real financial signals: salary credit, idle balance, FD maturity, life goals. Every nudge the customer asked for.</div>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- ── TECH STACK ── -->
<div class="section reveal">
  <div class="section-label">Tech Stack</div>
  <h2 class="section-title">Production-grade infrastructure.<br>Not a hackathon demo.</h2>
  <p class="section-desc" style="margin-bottom: 48px;">Every layer chosen for real-world deployability — not just demo day impressiveness.</p>

  <div class="tech-section">
    <div class="tech-group">
      <div class="tech-group-label">💬 Conversational Interface</div>
      <div class="tech-badges">
        <span class="tech-badge tb-green"><span class="dot" style="background:#25D366"></span>WhatsApp Business API</span>
        <span class="tech-badge tb-blue"><span class="dot" style="background:#0070f3"></span>YONO Chat UI (Next.js)</span>
        <span class="tech-badge tb-cyan"><span class="dot" style="background:#06b6d4"></span>React</span>
      </div>
    </div>
    <div class="tech-group">
      <div class="tech-group-label">🤖 AI & Agent Orchestration</div>
      <div class="tech-badges">
        <span class="tech-badge tb-orange"><span class="dot" style="background:#FF6B35"></span>Claude (Anthropic)</span>
        <span class="tech-badge tb-purple"><span class="dot" style="background:#412991"></span>GPT-4 (OpenAI)</span>
        <span class="tech-badge tb-yellow"><span class="dot" style="background:#facc15"></span>LangChain</span>
        <span class="tech-badge tb-indigo"><span class="dot" style="background:#6366f1"></span>Tool Calling</span>
        <span class="tech-badge tb-teal"><span class="dot" style="background:#14b8a6"></span>Multi-Model Routing</span>
      </div>
    </div>
    <div class="tech-group">
      <div class="tech-group-label">🧠 ML & Decision Engine</div>
      <div class="tech-badges">
        <span class="tech-badge tb-blue"><span class="dot" style="background:#3776ab"></span>Python</span>
        <span class="tech-badge tb-orange"><span class="dot" style="background:#F7931E"></span>scikit-learn</span>
        <span class="tech-badge tb-yellow"><span class="dot" style="background:#facc15"></span>SHAP Explainability</span>
        <span class="tech-badge tb-purple"><span class="dot" style="background:#a855f7"></span>NumPy · Pandas</span>
      </div>
    </div>
    <div class="tech-group">
      <div class="tech-group-label">⚙️ Backend & APIs</div>
      <div class="tech-badges">
        <span class="tech-badge tb-green"><span class="dot" style="background:#009485"></span>FastAPI</span>
        <span class="tech-badge tb-blue"><span class="dot" style="background:#3ECF8E"></span>Supabase</span>
        <span class="tech-badge tb-orange"><span class="dot" style="background:#F05032"></span>ChromaDB</span>
        <span class="tech-badge tb-cyan"><span class="dot" style="background:#00b4d8"></span>SBI Core Banking API</span>
        <span class="tech-badge tb-indigo"><span class="dot" style="background:#6366f1"></span>BSE StAR MF API</span>
        <span class="tech-badge tb-teal"><span class="dot" style="background:#14b8a6"></span>UPI Rails</span>
        <span class="tech-badge tb-pink"><span class="dot" style="background:#ec4899"></span>CKYC Registry</span>
      </div>
    </div>
    <div class="tech-group">
      <div class="tech-group-label">🔒 Compliance & Infra</div>
      <div class="tech-badges">
        <span class="tech-badge tb-yellow"><span class="dot" style="background:#facc15"></span>DPDP Act 2023</span>
        <span class="tech-badge tb-green"><span class="dot" style="background:#22c55e"></span>Consent Ledger</span>
        <span class="tech-badge tb-red"><span class="dot" style="background:#ef4444"></span>Immutable Audit Trail</span>
        <span class="tech-badge tb-blue"><span class="dot" style="background:#0070f3"></span>Vercel</span>
        <span class="tech-badge tb-orange"><span class="dot" style="background:#FF9900"></span>AWS</span>
      </div>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- ── IMPACT ── -->
<div class="section reveal">
  <div class="section-label">Impact</div>
  <h2 class="section-title">Built for customers.<br>Built for SBI. Built for India.</h2>
  <p class="section-desc" style="margin-bottom: 40px;">Three layers of impact — individual, institutional, and societal.</p>

  <div class="impact-grid">
    <div class="impact-card">
      <h3>👤 For Customers</h3>
      <ul>
        <li>Less idle, underutilized money sitting in savings</li>
        <li>Financial decisions explained simply, without jargon</li>
        <li>Full control — the AI sees only what you allow</li>
        <li>Accessible via WhatsApp — no new app needed</li>
      </ul>
    </div>
    <div class="impact-card">
      <h3>🏦 For SBI</h3>
      <ul>
        <li>Higher conversion on acquisition and onboarding</li>
        <li>Increased adoption of FDs, MFs, insurance, UPI</li>
        <li>Stronger long-term retention through trusted engagement</li>
        <li>Compliance-friendly — easier regulatory sign-off</li>
      </ul>
    </div>
    <div class="impact-card">
      <h3>🌍 For Financial Inclusion</h3>
      <ul>
        <li>Simplifies planning for first-time digital banking users</li>
        <li>Reaches Tier 2/3 India via familiar WhatsApp interface</li>
        <li>Helps families plan for real goals — education, retirement, home</li>
      </ul>
    </div>
    <div class="impact-card">
      <h3>⚖️ Regulatory Readiness</h3>
      <ul>
        <li>Designed around DPDP Act 2023 from day one</li>
        <li>Human-in-loop on all money movement decisions</li>
        <li>Full audit trail on every agent action</li>
        <li>Consent reversible in one message, permanently</li>
      </ul>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- ── FOOTER ── -->
<div class="footer">
  <div class="footer-title gradient-text">Money Co-Pilot</div>
  <div class="footer-sub">Consent-first AI banking · Built for 500M+ SBI customers · GFF 2026</div>
  <div class="hero-links" style="justify-content: center;">
    <a href="https://sbi-hack.vercel.app" class="btn btn-primary" target="_blank">🌐 sbi-hack.vercel.app</a>
    <a href="https://github.com/PARTHDESHMUKH2005/sbi_hack" class="btn btn-outline" target="_blank">⚙ github.com/PARTHDESHMUKH2005/sbi_hack</a>
  </div>
  <p style="margin-top: 32px; color: var(--muted); font-size: 12px;">Built by Team Parth Deshmukh · SBI Hackathon @ GFF 2026</p>
</div>

<script>
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // Approve button interaction
  document.querySelector('.approve-btn').addEventListener('click', function() {
    this.textContent = '✅ FD Booked!';
    this.style.background = 'linear-gradient(135deg, #059669, #047857)';
  });
</script>
</body>
</html>
