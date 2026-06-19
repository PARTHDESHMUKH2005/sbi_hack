'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, MessageCircle, BarChart3, MousePointerClick, ScrollText, LogOut } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: ShieldCheck,
    title: "Opt-In & Set Permissions",
    desc: "You choose exactly what Money Co-Pilot can access — balance check, transaction history, FD schedules. Nothing happens without your explicit consent.",
    details: "Set it once in the SBI YONO app under Settings > Co-Pilot Permissions.",
    align: 'left' as const,
  },
  {
    number: 2,
    icon: MessageCircle,
    title: "Ask Anything",
    desc: "Chat naturally on WhatsApp or YONO. 'What's my balance?' 'When's my FD maturing?' 'Any overspend this month?' No app switching, no forms.",
    details: "Powered by fine-tuned LLM + RAG over your banking data.",
    align: 'right' as const,
  },
  {
    number: 3,
    icon: BarChart3,
    title: "Get Explained Recommendations",
    desc: "The AI suggests actions — but every recommendation comes with a clear why. Risk level, expected return, FD vs MF comparison, all in plain English.",
    details: "Decision Engine evaluates 15+ parameters before any suggestion.",
    align: 'left' as const,
  },
  {
    number: 4,
    icon: MousePointerClick,
    title: "One-Tap Confirm",
    desc: "Happy with the recommendation? One tap executes the entire flow — investment, transfer, FD renewal. No forms, no OTP fatigue, no friction.",
    details: "Secure execution via SBI's tokenized API gateway.",
    align: 'right' as const,
  },
  {
    number: 5,
    icon: ScrollText,
    title: "Executed & Logged",
    desc: "Every action is recorded in your personal Audit Log. See exactly what happened, when, and why — with transaction IDs for every action taken.",
    details: "Immutable audit trail stored on consent-managed ledger.",
    align: 'left' as const,
  },
  {
    number: 6,
    icon: LogOut,
    title: "Opt Out Anytime",
    desc: "Revoke access, delete history, or pause the agent — all from the same settings panel. No lock-in. No data retention without your nod.",
    details: "Full GDPR-style data portability and deletion support.",
    align: 'right' as const,
  },
];

const comparisonRows = [
  { trait: "Permission Model", typical: "Implicit, buried in T&C", ours: "Explicit, opt-in per feature", oursGood: true },
  { trait: "Interaction", typical: "Form-heavy, app-only", ours: "Conversational, WhatsApp + YONO", oursGood: true },
  { trait: "Recommendations", typical: "Black-box algorithms", ours: "Explained with risk/reward breakdown", oursGood: true },
  { trait: "Execution", typical: "Multiple OTPs, 5+ clicks", ours: "One-tap, tokenized, instant", oursGood: true },
  { trait: "Data Control", typical: "Always-on, no audit trail", ours: "Full consent toggle + immutable audit log", oursGood: true },
];

export default function HowItWorks() {
  return (
    <div className="py-24 px-6 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4"
      >
        Six steps. <span className="text-[#00C896]">Full control.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-[#8892A4] text-center max-w-xl mx-auto mb-20"
      >
        From opt-in to execution, you stay in the driver&apos;s seat. Money Co-Pilot navigates.
      </motion.p>

      <div className="relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.08)] md:-translate-x-px" />

        <div className="flex flex-col gap-16">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: step.align === 'left' ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${
                  step.align === 'right' ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="hidden md:flex flex-1 items-center">
                  <div
                    className={`w-full ${
                      step.align === 'right' ? 'text-right pl-12' : 'text-left pr-12'
                    }`}
                  >
                    <div className="glass rounded-2xl p-6 inline-block max-w-md">
                      <div className="flex items-center gap-3 mb-1">
                        <Icon className="text-[#00C896]" size={20} />
                        <h3 className="text-lg font-bold text-[#F0F4FF]">{step.title}</h3>
                      </div>
                      <p className="text-[#8892A4] text-sm leading-relaxed">{step.desc}</p>
                      <p className="text-[#4F8EF7] text-xs mt-3 font-medium">{step.details}</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-4 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="w-16 h-16 rounded-full bg-[#0A0F1E] border-2 border-[#00C896] flex items-center justify-center text-[#00C896] text-xl font-bold shrink-0">
                    {step.number}
                  </div>
                </div>

                <div className="md:hidden flex-1 glass rounded-2xl p-6 ml-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="text-[#00C896]" size={20} />
                    <h3 className="text-lg font-bold text-[#F0F4FF]">{step.title}</h3>
                  </div>
                  <p className="text-[#8892A4] text-sm leading-relaxed">{step.desc}</p>
                  <p className="text-[#4F8EF7] text-xs mt-2 font-medium">{step.details}</p>
                </div>

                <div className="hidden md:flex flex-1 items-center">
                  {step.align === 'right' ? (
                    <div className="w-full pr-12">
                      <div className="glass rounded-xl p-4 max-w-xs border-[rgba(255,255,255,0.05)]">
                        <div className="flex items-center gap-2 text-[#8892A4] text-xs mb-2">
                          <span className="w-2 h-2 rounded-full bg-[#00C896]"></span>
                          UI Preview
                        </div>
                        <div className="h-20 bg-[rgba(255,255,255,0.03)] rounded-lg flex items-center justify-center text-[#8892A4] text-xs">
                          {step.number === 1 && "🔒 Toggle: Enable Investment Suggestions"}
                          {step.number === 2 && "💬 'What's my balance?' → ₹4,25,000"}
                          {step.number === 3 && "📊 Risk: Moderate | Return: 12-15%"}
                          {step.number === 4 && "✅ Confirm ₹35,000 investment?"}
                          {step.number === 5 && "📋 TXN: SBIINV-2026-06-19-8421"}
                          {step.number === 6 && "🚫 Permissions revoked → Data deleted"}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full pl-12">
                      <div className="glass rounded-xl p-4 max-w-xs border-[rgba(255,255,255,0.05)]">
                        <div className="flex items-center gap-2 text-[#8892A4] text-xs mb-2">
                          <span className="w-2 h-2 rounded-full bg-[#00C896]"></span>
                          UI Preview
                        </div>
                        <div className="h-20 bg-[rgba(255,255,255,0.03)] rounded-lg flex items-center justify-center text-[#8892A4] text-xs">
                          {step.number === 1 && "🔒 Toggle: Enable Investment Suggestions"}
                          {step.number === 2 && "💬 'What's my balance?' → ₹4,25,000"}
                          {step.number === 3 && "📊 Risk: Moderate | Return: 12-15%"}
                          {step.number === 4 && "✅ Confirm ₹35,000 investment?"}
                          {step.number === 5 && "📋 TXN: SBIINV-2026-06-19-8421"}
                          {step.number === 6 && "🚫 Permissions revoked → Data deleted"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-8 md:p-12 mt-24 overflow-x-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Typical Bank AI{" "}
          <span className="text-[#8892A4] mx-2">vs</span>{" "}
          <span className="text-[#00C896]">Money Co-Pilot</span>
        </h2>
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.08)]">
              <th className="text-left py-4 px-4 text-[#8892A4] font-medium">Dimension</th>
              <th className="text-left py-4 px-4 text-[#8892A4] font-medium">Typical Bank AI</th>
              <th className="text-left py-4 px-4 text-[#00C896] font-medium">Money Co-Pilot</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.trait} className="border-b border-[rgba(255,255,255,0.04)]">
                <td className="py-4 px-4 text-[#F0F4FF] font-medium whitespace-nowrap">{row.trait}</td>
                <td className="py-4 px-4 text-[#8892A4]">
                  <span className="text-red-400 mr-2">✗</span>
                  {row.typical}
                </td>
                <td className="py-4 px-4 text-[#8892A4]">
                  <span className="text-[#00C896] mr-2">✓</span>
                  {row.ours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
