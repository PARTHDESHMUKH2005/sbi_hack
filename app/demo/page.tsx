'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';

type ToggleKey = 'qa' | 'alerts' | 'fd' | 'investments';

interface ToggleDef {
  key: ToggleKey;
  label: string;
  desc: string;
}

const toggles: ToggleDef[] = [
  { key: 'qa', label: 'Answer my questions', desc: 'Balance, transactions, spending' },
  { key: 'alerts', label: 'Idle balance alerts', desc: 'Notify when balance is high' },
  { key: 'fd', label: 'FD maturity reminders', desc: 'Get notified 7 days before' },
  { key: 'investments', label: 'Investment suggestions', desc: 'AI-powered recommendations' },
];

interface Message {
  role: 'user' | 'agent' | 'confirm' | 'success';
  content: string;
}

const fullMessages: { role: Message['role']; content: string }[] = [
  { role: 'user', content: 'Hey Money Co-Pilot, can you check my savings account?' },
  { role: 'agent', content: "Hi Parth! I'd be happy to help. Your savings account (****7890) has a balance of ₹4,25,000. Would you like me to suggest investment options?" },
  { role: 'user', content: 'Yes, what do you recommend?' },
  { role: 'agent', content: 'Based on your risk profile and goals, I recommend:\n\n• SBI Bluechip Fund — ₹20,000\n• SBI Nifty Index Fund — ₹10,000\n• SBI Fixed Deposit — ₹5,000\n\n**Total: ₹35,000**\n\nShall I proceed with this investment plan?' },
  { role: 'confirm', content: '' },
  { role: 'success', content: '' },
];

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="self-start max-w-[80%] bg-[#202c33] rounded-lg rounded-tl-none px-4 py-3"
    >
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#8892A4] typing-dot" />
        <span className="w-2 h-2 rounded-full bg-[#8892A4] typing-dot" />
        <span className="w-2 h-2 rounded-full bg-[#8892A4] typing-dot" />
      </div>
    </motion.div>
  );
}

function ChatMessage({ msg, index }: { msg: Message; index: number }) {
  if (msg.role === 'confirm') {
    return (
      <motion.div
        key="confirm"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="self-start max-w-[85%] glass border border-[#00C896]/30 rounded-xl rounded-tl-none px-4 py-3"
      >
        <div className="flex items-center gap-2 text-[#00C896] text-sm font-semibold mb-2">
          <CheckCircle size={16} />
          Confirm Investment
        </div>
        <div className="text-xs text-[#e9edef] space-y-1">
          <div className="flex justify-between">
            <span>SBI Bluechip Fund</span>
            <span>₹20,000</span>
          </div>
          <div className="flex justify-between">
            <span>SBI Nifty Index Fund</span>
            <span>₹10,000</span>
          </div>
          <div className="flex justify-between">
            <span>SBI Fixed Deposit</span>
            <span>₹5,000</span>
          </div>
          <div className="border-t border-[rgba(255,255,255,0.1)] pt-1 mt-1 flex justify-between font-bold">
            <span>Total</span>
            <span>₹35,000</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (msg.role === 'success') {
    return (
      <motion.div
        key="success"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="self-center glass rounded-xl px-5 py-3 border border-[#00C896]/40"
      >
        <div className="flex items-center gap-2 text-[#00C896] text-sm font-bold">
          <CheckCircle size={18} />
          ₹35,000 invested successfully!
        </div>
        <div className="text-[#8892A4] text-xs mt-1 text-center">
          TXN: SBIINV-2026-06-19-8421
        </div>
      </motion.div>
    );
  }

  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
        isUser
          ? 'self-end bg-[#005c4b] text-[#e9edef] rounded-tr-none'
          : 'self-start bg-[#202c33] text-[#e9edef] rounded-tl-none'
      }`}
    >
      {msg.content.split('\n').map((line, i) => (
        <span key={i}>
          {line.startsWith('**') && line.endsWith('**')
            ? <strong className="text-[#F0F4FF]">{line.slice(2, -2)}</strong>
            : line.includes('**')
              ? (() => {
                  const parts = line.split(/\*\*(.*?)\*\*/g);
                  return parts.map((p, j) =>
                    j % 2 === 1 ? <strong key={j} className="text-[#F0F4FF]">{p}</strong> : p
                  );
                })()
              : line
          }
          {i < msg.content.split('\n').length - 1 && <br />}
        </span>
      ))}
    </motion.div>
  );
}

function ToggleSwitch({ label, desc, checked, onChange }: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)] last:border-0">
      <div className="flex-1 min-w-0 mr-4">
        <div className="text-sm font-medium text-[#F0F4FF]">{label}</div>
        <div className="text-xs text-[#8892A4]">{desc}</div>
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`toggle-track shrink-0 ${checked ? 'active' : ''}`}
        aria-label={label}
      >
        <span className="toggle-thumb" />
      </button>
    </div>
  );
}

export default function DemoPage() {
  const [consent, setConsent] = useState<Record<ToggleKey, boolean>>({
    qa: true,
    alerts: false,
    fd: true,
    investments: true,
  });

  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const toggleConsent = useCallback((key: ToggleKey) => {
    setConsent((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const advance = useCallback(() => {
    if (step === 3) {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setStep(4);
      }, 1500);
    } else if (step >= 4) {
      return;
    } else {
      const nextStep = step + 1;
      if (nextStep === 1 || nextStep === 3) {
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          setStep(nextStep);
        }, 1500);
      } else {
        setStep(nextStep);
      }
    }
  }, [step]);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setStep(5);
    }, 500);
  };

  const reset = () => {
    setStep(0);
    setConfirmed(false);
    setShowTyping(false);
  };

  const visibleMessages: { role: Message['role']; content: string }[] = [];
  const maxMsgIndex = step === 5 ? 6 : step === 4 ? 5 : step === 3 ? 4 : step === 2 ? 3 : step === 1 ? 2 : 1;

  for (let i = 0; i < Math.min(maxMsgIndex, fullMessages.length); i++) {
    visibleMessages.push(fullMessages[i]);
  }

  const isUserAtConfirm = step === 4 && !confirmed;
  const nextLabel = step === 0 ? 'Start Demo' : step >= 4 ? 'Reset →' : 'Next →';

  return (
    <div className="py-24 px-6 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center mb-2"
      >
        See it in <span className="text-[#00C896]">action</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-[#8892A4] text-center mb-12 max-w-lg mx-auto"
      >
        Every action starts with your permission. Toggle features on/off and watch the agent adapt.
      </motion.p>

      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 lg:w-80 shrink-0"
        >
          <h2 className="text-sm font-semibold text-[#8892A4] uppercase tracking-wider mb-4">
            Consent Settings
          </h2>
          <div className="space-y-1">
            {toggles.map((t) => (
              <ToggleSwitch
                key={t.key}
                label={t.label}
                desc={t.desc}
                checked={consent[t.key]}
                onChange={() => toggleConsent(t.key)}
              />
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2 text-xs text-[#8892A4]">
              <span className="w-2 h-2 rounded-full bg-[#00C896]" />
              {Object.values(consent).filter(Boolean).length} of 4 features active
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]">
            <div className="bg-[#1f2c33] px-4 py-3 flex items-center gap-3 border-b border-[#313d45]">
              <div className="w-8 h-8 rounded-full bg-[#00C896] flex items-center justify-center text-xs font-bold text-white">
                MC
              </div>
              <div>
                <div className="text-sm font-semibold text-[#e9edef]">Money Co-Pilot</div>
                <div className="text-xs text-[#00C896]">
                  {consent.qa ? 'Permissions active' : 'Limited access'}
                </div>
              </div>
            </div>

            <div className="bg-[#0b141a] h-[500px] p-4 flex flex-col gap-3 overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {step > 0 && visibleMessages.slice(0, maxMsgIndex).map((msg, i) => (
                  <ChatMessage key={`msg-${i}`} msg={msg} index={i} />
                ))}
                {showTyping && <TypingIndicator />}
                {isUserAtConfirm && (
                  <motion.div
                    key="confirm-btn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="self-start"
                  >
                    <button
                      onClick={handleConfirm}
                      className="bg-[#00C896] hover:bg-[#00b086] text-[#0A0F1E] text-sm font-bold px-5 py-2 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-[#00C896]/20"
                    >
                      <CheckCircle size={16} />
                      Confirm ✓
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {step === 0 && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-4">💬</div>
                    <p className="text-[#8892A4] text-sm">
                      Press &quot;Start Demo&quot; to see the conversation
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#1f2c33] px-4 py-3 border-t border-[#313d45] flex items-center gap-3">
              <div className="flex-1 bg-[#2a3942] rounded-lg px-4 py-2 text-sm text-[#8892A4]">
                {step === 0
                  ? 'Type a message...'
                  : step >= 5
                    ? '✅ Investment completed'
                    : 'Tap Next to continue demo...'}
              </div>
              <button
                onClick={step >= 4 && confirmed ? reset : advance}
                disabled={isUserAtConfirm}
                className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                  step >= 5
                    ? 'bg-[rgba(255,255,255,0.1)] text-[#8892A4] hover:text-[#F0F4FF]'
                    : 'bg-[#00C896] text-[#0A0F1E] hover:bg-[#00b086] disabled:opacity-40'
                }`}
              >
                {step >= 5 ? <RotateCcw size={14} /> : <ArrowRight size={14} />}
                {nextLabel}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
