'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, MailCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(
        '/api/auth/request-password-reset',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            redirectTo: `${window.location.origin}/auth/reset-password`,
          }),
        }
      );

      if (!res.ok) {
        throw new Error('Request failed');
      }

      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <Link
        href="/auth/login"
        className="absolute top-6 left-6 text-sm text-slate-500 hover:text-[#009FCE] transition-colors"
      >
        ← Back to Sign In
      </Link>

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/assets/Images/logo_Afridrop_Solutions.png"
            alt="Afridrop Logo"
            width={120}
            height={60}
            priority
            className="mb-4"
          />
          <h1 className="text-2xl font-bold text-[#00477A]">Forgot Password</h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#009FCE]/10">
              <MailCheck className="h-7 w-7 text-[#009FCE]" />
            </div>
            <p className="text-sm text-slate-700">
              If an account exists for <span className="font-medium">{email}</span>,
              you&apos;ll receive an email with a link to reset your password.
            </p>
            <Link
              href="/auth/login"
              className="mt-6 text-sm font-semibold text-[#009FCE] hover:text-[#00477A] transition-colors"
            >
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#009FCE] focus:ring-2 focus:ring-[#009FCE]/30 disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#009FCE] py-3 text-sm font-semibold text-white transition hover:bg-[#00477A] disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>

            <p className="text-center text-sm text-slate-500">
              Remember your password?{' '}
              <Link
                href="/auth/login"
                className="font-semibold text-[#009FCE] hover:text-[#00477A] transition-colors"
              >
                Sign In
              </Link>
            </p>
          </form>
        )}
      </div>

      <p className="mt-8 text-xs text-slate-400">© 2026 Afridrop Solutions Limited</p>
    </div>
  );
}
