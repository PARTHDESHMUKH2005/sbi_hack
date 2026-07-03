'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Building2, Globe, Quote } from 'lucide-react';
import { useAuth } from '@/app/lib/auth-context';
import { api } from '@/app/lib/api-client';

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  const display = count >= 10000000
    ? `${(count / 10000000).toFixed(1)}Cr+`
    : count >= 1000
      ? `${(count / 1000).toFixed(0)}K+`
      : `${count}+`;

  return <span ref={ref}>{isInView ? display : '0+'}</span>;
}

const columns = [
  {
    icon: Users,
    title: 'For Customers',
    color: '#00C896',
    points: [
      'Zero banking app fatigue \u2014 chat on WhatsApp or YONO',
      'Explained recommendations with risk/reward breakdown',
      'One-tap execution \u2014 no OTPs, no forms, no friction',
      'Full control: opt in, opt out, delete data anytime',
      'Personal Audit Log \u2014 every action tracked & transparent',
    ],
  },
  {
    icon: Building2,
    title: 'For SBI',
    color: '#4F8EF7',
    points: [
      '3x digital adoption through conversational interface',
      'Reduced branch footfall \u2014 80% queries resolved via chat',
      'Higher FD/investment conversion with frictionless execution',
      'Consent-first architecture \u2014 fully compliant with upcoming DPDP Act',
      'Reusable agent framework for any banking product line',
    ],
  },
  {
    icon: Globe,
    title: 'For India',
    color: '#F0F4FF',
    points: [
      'Financial inclusion for 500M+ smartphone users',
      'Local language support via LLM fine-tuning planned',
      'First consent-first banking AI at national scale',
      'Open API architecture \u2014 interoperable with Account Aggregator',
      'Sets a new standard for ethical AI in Indian banking',
    ],
  },
];

export default function Impact() {
  const { user } = useAuth();
  const [auditCount, setAuditCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    api.getAuditLogs().then((data) => {
      setAuditCount(data.logs.length);
    }).catch(() => {});
  }, [user]);

  return (
    <div className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Impact at <span className="text-[#00C896]">scale</span>
        </h1>
        <p className="text-[#8892A4] max-w-lg mx-auto">
          One architecture. Three beneficiaries. A blueprint for the future of banking.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-8 md:p-12 mb-16 text-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#00C896] mb-1">
              <AnimatedCounter value={10000000} />
            </div>
            <div className="text-[#8892A4] text-sm">Customers reachable</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#4F8EF7] mb-1">
              <AnimatedCounter value={3000} />
            </div>
            <div className="text-[#8892A4] text-sm">Digital adoption lift</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#F0F4FF] mb-1">
              {user ? `${auditCount}` : '\u20B90'}
            </div>
            <div className="text-[#8892A4] text-sm">
              {user ? 'Audit log entries' : 'Branch visits needed'}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {columns.map((col, i) => {
          const Icon = col.icon;
          return (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass rounded-2xl p-8"
            >
              <Icon className="mb-4" size={36} style={{ color: col.color }} />
              <h2 className="text-xl font-bold mb-6 text-[#F0F4FF]">{col.title}</h2>
              <ul className="space-y-4">
                {col.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-[#8892A4] leading-relaxed">
                    <span
                      className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: col.color }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-8 md:p-12 border-l-4 border-[#00C896] max-w-4xl mx-auto"
      >
        <Quote className="text-[#00C896] mb-4" size={32} />
        <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif italic text-[#F0F4FF] leading-relaxed mb-4">
          &ldquo;The first AI that asks permission before it helps.&rdquo;
        </blockquote>
        <div className="text-[#8892A4] text-sm">
          2014 Money Co-Pilot, SBI Hackathon @ GFF 2026
        </div>
      </motion.div>
    </div>
  );
}
