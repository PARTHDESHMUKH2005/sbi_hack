'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, User, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/app/lib/auth-context';
import { api } from '@/app/lib/api-client';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setError('');
    setLoading(true);
    try {
      const data = await api.signup({ name, email, password });
      login(data.token, data.user as { id: string; name: string; email: string });
      router.push('/demo');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-24 px-6">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 md:p-12 w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🚀</div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#F0F4FF]">Get started</h1>
          <p className="text-[#8892A4] text-sm mt-2">
            Create your Money Co-Pilot account — it&apos;s free
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#8892A4] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8892A4]" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Parth Deshmukh"
                required
                className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl pl-10 pr-4 py-3 text-sm text-[#F0F4FF] placeholder:text-[#8892A4]/60 focus:outline-none focus:border-[#00C896]/50 focus:ring-1 focus:ring-[#00C896]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#8892A4] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8892A4]" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@sbi.co.in"
                required
                className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl pl-10 pr-4 py-3 text-sm text-[#F0F4FF] placeholder:text-[#8892A4]/60 focus:outline-none focus:border-[#00C896]/50 focus:ring-1 focus:ring-[#00C896]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#8892A4] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8892A4]" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                minLength={6}
                className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl pl-10 pr-10 py-3 text-sm text-[#F0F4FF] placeholder:text-[#8892A4]/60 focus:outline-none focus:border-[#00C896]/50 focus:ring-1 focus:ring-[#00C896]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8892A4] hover:text-[#F0F4FF] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-400/10 rounded-xl py-2">
              {error}
            </div>
          )}

          <div className="glass rounded-xl p-4 text-xs text-[#8892A4] space-y-2">
            <p className="font-medium text-[#F0F4FF]">Consent-First — by default</p>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[rgba(255,255,255,0.15)] bg-transparent accent-[#00C896]"
              />
              <span>
                I agree to the{' '}
                <button type="button" className="text-[#4F8EF7] hover:underline">Terms of Service</button>
                {' '}and{' '}
                <button type="button" className="text-[#4F8EF7] hover:underline">Privacy Policy</button>.
                I understand I can revoke any permission at any time.
              </span>
            </label>
          </div>

          <motion.button
            whileHover={agreed && !loading ? { scale: 1.01 } : {}}
            whileTap={agreed && !loading ? { scale: 0.99 } : {}}
            type="submit"
            disabled={!agreed || loading}
            className={`w-full font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              agreed
                ? 'bg-[#00C896] text-[#0A0F1E] hover:bg-[#00b086] shadow-lg shadow-[#00C896]/20 cursor-pointer disabled:opacity-60'
                : 'bg-[rgba(255,255,255,0.06)] text-[#8892A4] cursor-not-allowed'
            }`}
          >
            {loading ? 'Creating account...' : agreed ? (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            ) : (
              <>
                <Lock size={16} />
                Accept terms to continue
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] text-center">
          <p className="text-sm text-[#8892A4]">
            Already have an account?{' '}
            <Link href="/signin" className="text-[#00C896] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[#8892A4]">
          <div className="flex items-center gap-1">
            <CheckCircle size={12} className="text-[#00C896]" />
            <span>Consent-first</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle size={12} className="text-[#00C896]" />
            <span>Zero spam</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle size={12} className="text-[#00C896]" />
            <span>Opt out anytime</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
