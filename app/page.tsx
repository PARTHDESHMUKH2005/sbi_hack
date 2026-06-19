'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Zap, CheckCircle } from 'lucide-react';

const headline = "Your Money. Your Rules. Your Co-Pilot.".split(" ");

const stats = [
  {
    icon: Shield,
    value: "3",
    suffix: "",
    label: "Pillars Covered",
    desc: "Spending, Savings & Investments",
  },
  {
    icon: Zap,
    value: "1",
    suffix: "-Tap",
    label: "Execution",
    desc: "From recommendation to action in one click",
  },
  {
    icon: CheckCircle,
    value: "100",
    suffix: "% Consent-First",
    label: "Privacy",
    desc: "You approve every action before it happens",
  },
];

function WhatsAppPreview() {
  return (
    <div className="phone-frame w-[300px] h-[620px] overflow-hidden flex flex-col shrink-0 mx-auto">
      <div className="bg-[#1f2c33] px-4 py-3 flex items-center gap-3 border-b border-[#313d45]">
        <div className="w-9 h-9 rounded-full bg-[#00C896] flex items-center justify-center text-sm font-bold text-white">
          MC
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-[#e9edef]">Money Co-Pilot</div>
          <div className="text-xs text-[#00C896]">online</div>
        </div>
      </div>
      <div className="flex-1 bg-[#0b141a] p-3 flex flex-col gap-2 overflow-y-auto">
        <div className="self-start max-w-[80%] bg-[#202c33] rounded-lg rounded-tl-none px-3 py-2 text-sm text-[#e9edef]">
          Hi! I&apos;m your Money Co-Pilot. How can I help you today?
        </div>
        <div className="self-end max-w-[80%] bg-[#005c4b] rounded-lg rounded-tr-none px-3 py-2 text-sm text-[#e9edef]">
          What&apos;s my savings balance?
        </div>
        <div className="self-start max-w-[80%] bg-[#202c33] rounded-lg rounded-tl-none px-3 py-2 text-sm text-[#e9edef]">
          Your savings account (****7890) has ₹4,25,000. Would you like to explore investment options?
        </div>
        <div className="self-end max-w-[80%] bg-[#005c4b] rounded-lg rounded-tr-none px-3 py-2 text-sm text-[#e9edef]">
          Yes, recommend something!
        </div>
        <div className="self-start max-w-[85%] bg-[#202c33] rounded-lg rounded-tl-none px-3 py-2 text-sm text-[#e9edef]">
          Great choice! Based on your profile, I recommend:
          <br />• SBI Bluechip Fund — ₹20,000
          <br />• SBI Nifty Index Fund — ₹10,000
          <br />• SBI Fixed Deposit — ₹5,000
          <br />
          <br />Total: <strong>₹35,000</strong>
        </div>
        <div className="self-start max-w-[80%] bg-[#00C896]/10 border border-[#00C896]/30 rounded-lg rounded-tl-none px-3 py-2 text-sm">
          <div className="flex items-center gap-2 text-[#00C896] font-semibold mb-1">
            <CheckCircle size={14} /> Confirm Investment
          </div>
          <div className="text-[#e9edef] text-xs">
            SBI Bluechip Fund — ₹20,000
            <br />
            SBI Nifty Index Fund — ₹10,000
            <br />
            SBI Fixed Deposit — ₹5,000
          </div>
          <div className="mt-2 bg-[#00C896] text-[#0A0F1E] text-xs font-bold px-3 py-1 rounded-full inline-block">
            Confirm ✓
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  desc,
  index,
}: {
  icon: React.ElementType;
  value: string;
  suffix: string;
  label: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="glass rounded-2xl p-8 text-center flex-1 min-w-[200px]"
    >
      <Icon className="text-[#00C896] mx-auto mb-4" size={32} />
      <div className="text-3xl font-bold text-[#F0F4FF] mb-1">
        {value}
        {suffix}
      </div>
      <div className="text-[#00C896] text-sm font-semibold mb-2">{label}</div>
      <div className="text-[#8892A4] text-xs">{desc}</div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <>
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-60" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {headline.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="inline-block mr-3"
                >
                  {word === "Co-Pilot" ? (
                    <span className="text-[#00C896]">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-lg md:text-xl text-[#8892A4] mb-10 max-w-lg mx-auto lg:mx-0"
            >
              The first AI financial assistant that works <span className="text-[#4F8EF7] font-semibold italic">FOR</span> you — not <span className="text-[#8892A4]">ON</span> you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/how-it-works"
                className="bg-[#00C896] text-[#0A0F1E] font-semibold px-8 py-3 rounded-full hover:bg-[#00b086] transition-all duration-200 shadow-lg shadow-[#00C896]/25"
              >
                See How It Works
              </Link>
              <Link
                href="/demo"
                className="border border-[#00C896]/50 text-[#00C896] font-semibold px-8 py-3 rounded-full hover:bg-[#00C896]/10 transition-all duration-200"
              >
                Try the Demo
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="shrink-0"
          >
            <WhatsAppPreview />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
