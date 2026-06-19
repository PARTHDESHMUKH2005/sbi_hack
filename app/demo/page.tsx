'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, RotateCcw, Send, MessageSquare, Settings } from 'lucide-react';
import { useAuth } from '@/app/lib/auth-context';
import { api } from '@/app/lib/api-client';

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
  metadata?: Record<string, unknown>;
}

const fullMessages: { role: Message['role']; content: string }[] = [
  { role: 'user', content: 'Hey Money Co-Pilot, can you check my savings account?' },
  { role: 'agent', content: "Hi Parth! I'd be happy to help. Your savings account (****7890) has a balance of \u20b94,25,000. Would you like me to suggest investment options?" },
  { role: 'user', content: 'Yes, what do you recommend?' },
  { role: 'agent', content: 'Based on your risk profile and goals, I recommend:\n\n\u2022 SBI Bluechip Fund \u2014 \u20b920,000\n\u2022 SBI Nifty Index Fund \u2014 \u20b910,000\n\u2022 SBI Fixed Deposit \u2014 \u20b95,000\n\n**Total: \u20b935,000**\n\nShall I proceed with this investment plan?' },
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
            <span>\u20b920,000</span>
          </div>
          <div className="flex justify-between">
            <span>SBI Nifty Index Fund</span>
            <span>\u20b910,000</span>
          </div>
          <div className="flex justify-between">
            <span>SBI Fixed Deposit</span>
            <span>\u20b95,000</span>
          </div>
          <div className="border-t border-[rgba(255,255,255,0.1)] pt-1 mt-1 flex justify-between font-bold">
            <span>Total</span>
            <span>\u20b935,000</span>
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
          {msg.content}
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
  const { user } = useAuth();
  const [consent, setConsent] = useState<Record<ToggleKey, boolean>>({
    qa: true,
    alerts: false,
    fd: true,
    investments: true,
  });

  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [txnId, setTxnId] = useState('');
  const [liveMode, setLiveMode] = useState(false);
  const [liveInput, setLiveInput] = useState('');
  const [liveMessages, setLiveMessages] = useState<{ role: string; content: string }[]>([]);
  const [liveConvId, setLiveConvId] = useState<string | undefined>();
  const [liveLoading, setLiveLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [liveMessages, step]);

  useEffect(() => {
    if (!user) return;
    api.getConsent().then((c) => {
      setConsent({ qa: c.qa, alerts: c.alerts, fd: c.fd, investments: c.investments });
    }).catch(() => {});
  }, [user]);

  const toggleConsent = useCallback(async (key: ToggleKey) => {
    const updated = { ...consent, [key]: !consent[key] };
    setConsent(updated);
    setSyncing(true);
    try {
      const keyMap: Record<ToggleKey, string> = { qa: 'qa', alerts: 'alerts', fd: 'fd', investments: 'investments' };
      await api.updateConsent({ [keyMap[key]]: updated[key] } as Record<string, boolean>);
    } catch { /* ignore */ }
    setSyncing(false);
  }, [consent]);

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

  const handleConfirm = async () => {
    try {
      const data = await api.confirmInvestment('demo-plan-1');
      setTxnId(data.txn_id);
    } catch {
      setTxnId('SBIINV-2026-06-19-8421');
    }
    setConfirmed(true);
    setTimeout(() => {
      setStep(5);
    }, 500);
  };

  const reset = () => {
    setStep(0);
    setConfirmed(false);
    setShowTyping(false);
    setTxnId('');
  };

  const sendLiveMessage = async () => {
    if (!liveInput.trim() || liveLoading) return;
    const msg = liveInput.trim();
    setLiveInput('');
    setLiveMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setLiveLoading(true);
    try {
      const data = await api.chat({ message: msg, conversation_id: liveConvId });
      setLiveConvId(data.conversation_id);
      setTimeout(() => {
        setLiveMessages((prev) => [...prev, { role: 'agent', content: data.reply }]);
        setLiveLoading(false);
      }, 1000);
    } catch {
      setLiveMessages((prev) => [...prev, { role: 'agent', content: 'Sorry, something went wrong. Please try again.' }]);
      setLiveLoading(false);
    }
  };

  const visibleMessages: { role: Message['role']; content: string }[] = [];
  const maxMsgIndex = step === 5 ? 6 : step === 4 ? 5 : step === 3 ? 4 : step === 2 ? 3 : step === 1 ? 2 : 1;

  for (let i = 0; i < Math.min(maxMsgIndex, fullMessages.length); i++) {
    visibleMessages.push(fullMessages[i]);
  }

  const isUserAtConfirm = step === 4 && !confirmed;
  const nextLabel = step === 0 ? 'Start Demo' : step >= 5 ? 'Reset \u2192' : 'Next \u2192';

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
        className="text-[#8892A4] text-center mb-6 max-w-lg mx-auto"
      >
        Every action starts with your permission. Toggle features on/off and watch the agent adapt.
      </motion.p>

      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setLiveMode(false)}
          className={`text-sm px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
            !liveMode ? 'bg-[#00C896] text-[#0A0F1E] font-medium' : 'glass text-[#8892A4] hover:text-[#F0F4FF]'
          }`}
        >
          <MessageSquare size={14} />
          Scripted Demo
        </button>
        <button
          onClick={() => setLiveMode(true)}
          className={`text-sm px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
            liveMode ? 'bg-[#00C896] text-[#0A0F1E] font-medium' : 'glass text-[#8892A4] hover:text-[#F0F4FF]'
          }`}
        >
          <Settings size={14} />
          Live Chat
        </button>
      </div>

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
              <span className={`w-2 h-2 rounded-full ${syncing ? 'bg-yellow-400' : 'bg-[#00C896]'}`} />
              {syncing ? 'Syncing...' : `${Object.values(consent).filter(Boolean).length} of 4 features active`}
            </div>
            {user && (
              <div className="text-xs text-[#4F8EF7] mt-1">
                Signed in as {user.email}
              </div>
            )}
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
                  {liveMode ? 'Live mode' : 'Demo mode'}
                </div>
              </div>
            </div>

            {liveMode ? (
              <div className="bg-[#0b141a] h-[500px] p-4 flex flex-col gap-3 overflow-y-auto">
                {liveMessages.length === 0 && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-4">💬</div>
                      <p className="text-[#8892A4] text-sm">
                        Type a message to chat with the live agent
                      </p>
                    </div>
                  </div>
                )}
                <AnimatePresence mode="popLayout">
                  {liveMessages.map((msg, i) => (
                    <ChatMessage
                      key={`live-${i}`}
                      msg={{ role: msg.role as 'user' | 'agent', content: msg.content }}
                      index={i}
                    />
                  ))}
                  {liveLoading && <TypingIndicator />}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>
            ) : (
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
            )}

            {liveMode ? (
              <div className="bg-[#1f2c33] px-4 py-3 border-t border-[#313d45] flex items-center gap-3">
                <input
                  type="text"
                  value={liveInput}
                  onChange={(e) => setLiveInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendLiveMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#2a3942] rounded-lg px-4 py-2 text-sm text-[#e9edef] placeholder:text-[#8892A4] focus:outline-none focus:ring-1 focus:ring-[#00C896]/30"
                />
                <button
                  onClick={sendLiveMessage}
                  disabled={!liveInput.trim() || liveLoading}
                  className="bg-[#00C896] text-[#0A0F1E] p-2 rounded-lg hover:bg-[#00b086] transition-all disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </div>
            ) : (
              <div className="bg-[#1f2c33] px-4 py-3 border-t border-[#313d45] flex items-center gap-3">
                <div className="flex-1 bg-[#2a3942] rounded-lg px-4 py-2 text-sm text-[#8892A4]">
                  {step === 0
                    ? 'Type a message...'
                    : step >= 5
                      ? txnId ? `✅ ${txnId}` : '✅ Investment completed'
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
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
