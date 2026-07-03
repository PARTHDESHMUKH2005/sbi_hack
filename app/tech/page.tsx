'use client';

import { motion } from 'framer-motion';
import { Bot, Brain, Code2, Database, MessageSquare, Shield } from 'lucide-react';

interface TechCard {
  layer: string;
  icon: React.ElementType;
  tech: string;
  purpose: string;
  color: string;
  bg: string;
}

const techCards: TechCard[] = [
  {
    layer: 'Conversational Layer',
    icon: MessageSquare,
    tech: 'Fine-tuned LLM + WhatsApp API + YONO SDK',
    purpose: 'Natural language interface on channels customers already use — WhatsApp Business API and SBI YONO in-app chat.',
    color: '#4F8EF7',
    bg: 'rgba(79, 142, 247, 0.1)',
  },
  {
    layer: 'Agent Layer',
    icon: Bot,
    tech: 'LangChain + Custom Agent Orchestrator',
    purpose: 'Orchestrates multi-step banking workflows — balance check → recommend → confirm → execute — with full session context.',
    color: '#00C896',
    bg: 'rgba(0, 200, 150, 0.1)',
  },
  {
    layer: 'Decision Engine',
    icon: Brain,
    tech: 'Rule Engine + ML Scoring Models',
    purpose: 'Evaluates 15+ parameters per recommendation: risk profile, spending patterns, FD ladder, market conditions, and consent scope.',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.1)',
  },
  {
    layer: 'Explainability Layer',
    icon: Shield,
    tech: 'Custom Explanation Generator',
    purpose: 'Translates black-box model outputs into plain-English reasons. Every recommendation includes risk level, expected return, and rationale.',
    color: '#a78bfa',
    bg: 'rgba(167, 139, 250, 0.1)',
  },
  {
    layer: 'Banking API Gateway',
    icon: Code2,
    tech: 'SBI API Gateway + Tokenized Auth',
    purpose: 'Secure, tokenized execution of banking operations — fund transfer, FD creation, mutual fund purchase. No credential sharing.',
    color: '#6b7280',
    bg: 'rgba(107, 114, 128, 0.1)',
  },
  {
    layer: 'Consent Audit Log',
    icon: Database,
    tech: 'Immutable Ledger + DPDP Act Compliant',
    purpose: 'Every permission grant, revoke, and action execution is logged to an immutable audit trail. Full GDPR/DPDP Act compliance.',
    color: '#f43f5e',
    bg: 'rgba(244, 63, 94, 0.1)',
  },
];

const flowSteps = [
  { label: 'Customer', sub: 'WhatsApp / YONO', color: '#4F8EF7' },
  { label: 'LLM Agent', sub: 'LangChain Orchestrator', color: '#00C896' },
  { label: 'Decision Engine', sub: 'Risk & Scoring Models', color: '#f59e0b' },
  { label: 'Banking APIs', sub: 'SBI Tokenized Gateway', color: '#6b7280' },
  { label: 'Consent Audit Log', sub: 'Immutable Ledger', color: '#f43f5e' },
];

export default function Tech() {
  return (
    <div className="py-24 px-6 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center mb-2"
      >
        Built to <span className="text-[#00C896]">ship</span>, not just demo.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-[#8892A4] text-center max-w-lg mx-auto mb-16"
      >
        Production-grade architecture designed for SBI&apos;s scale, security, and compliance requirements.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {techCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.layer}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-[rgba(255,255,255,0.15)] transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: card.bg, color: card.color }}
              >
                <Icon size={20} />
              </div>
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: card.color }}
              >
                {card.layer}
              </div>
              <div className="text-sm font-semibold text-[#F0F4FF] mb-2">{card.tech}</div>
              <div className="text-sm text-[#8892A4] leading-relaxed">{card.purpose}</div>
            </motion.div>
          );
        })}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-center mb-12"
      >
        Architecture <span className="text-[#00C896]">Flow</span>
      </motion.h2>

      <div className="glass rounded-2xl p-8 md:p-12 mb-24 overflow-x-auto">
        <div className="flex items-center gap-0 min-w-[700px] justify-center">
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xs font-bold mb-2 border-2"
                  style={{
                    borderColor: step.color,
                    background: `${step.color}15`,
                    color: step.color,
                  }}
                >
                  {i + 1}
                </div>
                <div className="text-sm font-semibold text-[#F0F4FF]">{step.label}</div>
                <div className="text-xs text-[#8892A4] mt-0.5">{step.sub}</div>
              </motion.div>
              {i < flowSteps.length - 1 && (
                <div className="flex items-center mx-4 mt-8">
                  <div
                    className="w-12 h-0.5"
                    style={{ background: `linear-gradient(to right, ${step.color}, ${flowSteps[i + 1].color})` }}
                  />
                  <div
                    className="w-2 h-2 rotate-45 border-t-2 border-r-2 -ml-1"
                    style={{ borderColor: flowSteps[i + 1].color }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center glass rounded-2xl p-12 max-w-3xl mx-auto"
      >
        <div className="text-4xl mb-4">🏦</div>
        <h3 className="text-2xl font-bold mb-2">Built for SBI Hackathon @ GFF 2026</h3>
        <p className="text-[#8892A4] mb-6 max-w-md mx-auto">
          A product of passion by a team that believes banking should ask permission before it acts.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4F8EF7]/20 border border-[#4F8EF7]/30 flex items-center justify-center text-sm font-bold text-[#4F8EF7]">
              PD
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-[#F0F4FF]">Team Money Co-Pilot</div>
              <div className="text-xs text-[#8892A4]">SBI Hackathon 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00C896]/20 border border-[#00C896]/30 flex items-center justify-center text-sm font-bold text-[#00C896]">
              M
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-[#F0F4FF]">Parth Mahesh Deshmukh</div>
              <div className="text-sm font-medium text-[#F0F4FF]">Abhishek Chopra</div>
              <div className="text-sm font-medium text-[#F0F4FF]">Sagarika Wankhede</div>
              <div className="text-sm font-medium text-[#F0F4FF]">Jaskaran Singh Bedi</div>
              
            </div>
          </div>
        </div>
        
      </motion.div>
    </div>
  );
}
