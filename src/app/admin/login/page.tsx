'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Lock, Mail, ArrowRight, Loader2, KeyRound, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@suntechsolar.in');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Welcome back, Admin!');
        router.push('/admin');
        router.refresh();
      } else {
        toast.error(data.error || 'Invalid credentials');
      }
    } catch {
      toast.error('Network error during login');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('admin@suntechsolar.in');
    setPassword('admin123');
    toast.success('Credentials filled!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100 text-slate-900">
      <div className="max-w-sm w-full">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 sm:p-9 border border-slate-200/80">
          {/* Logo Header */}
          <div className="text-center mb-7">
            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-primary/20">
              <Sun className="w-6 h-6 text-accent-orange" />
            </div>
            <h1 className="text-xl font-bold font-heading text-slate-900">Admin CMS Login</h1>
            <p className="text-xs text-slate-400 mt-1">SunTech Solar Store Management</p>
          </div>

          {/* Quick Demo Helper */}
          <div className="mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[11px] text-slate-600 font-medium">Demo login ready</span>
            </div>
            <button
              type="button"
              onClick={fillDemo}
              className="text-[11px] font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-accent-orange" /> Auto Fill
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@suntechsolar.in"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-2.5 px-4 bg-primary hover:bg-primary-dark text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-primary/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer return link */}
          <div className="text-center mt-6 pt-5 border-t border-slate-100">
            <a
              href="/"
              className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
            >
              &larr; Return to public site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
