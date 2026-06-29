'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Eye, EyeOff, ShieldAlert } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        '/api/auth/reset-password',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newPassword: password, token }),
        }
      );

      if (!res.ok) {
        throw new Error('Reset failed');
      }

      router.push('/auth/login?reset=success');
    } catch {
      setError('This reset link is invalid or has expired. Please request a new one.');
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <ShieldAlert className="h-7 w-7 text-red-600" />
        </div>
        <h1 className="text-xl font-bold text-[#00477A]">Invalid or expired reset link</h1>
        <p className="mt-2 text-sm text-slate-500">
          This password reset link is missing or no longer valid.
        </p>
        <Link
          href="/auth/forgot-password"
          className="mt-6 text-sm font-semibold text-[#009FCE] hover:text-[#00477A] transition-colors"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-col items-center text-center">
        <Image
          src="/assets/Images/logo_Afridrop_Solutions.png"
          alt="Afridrop Logo"
          width={120}
          height={60}
          priority
          className="mb-4"
        />
        <h1 className="text-2xl font-bold text-[#00477A]">Reset Password</h1>
        <p className="mt-1 text-sm text-slate-500">Choose a new password for your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={isLoading}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-11 text-sm text-slate-800 outline-none transition focus:border-[#009FCE] focus:ring-2 focus:ring-[#009FCE]/30 disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              disabled={isLoading}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600 disabled:opacity-50"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            disabled={isLoading}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#009FCE] focus:ring-2 focus:ring-[#009FCE]/30 disabled:opacity-60"
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
              Resetting…
            </>
          ) : (
            'Reset Password'
          )}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <Link
        href="/auth/login"
        className="absolute top-6 left-6 text-sm text-slate-500 hover:text-[#009FCE] transition-colors"
      >
        ← Back to Sign In
      </Link>

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">
        <Suspense
          fallback={
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-[#009FCE]" />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>

      <p className="mt-8 text-xs text-slate-400">© 2026 Afridrop Solutions Limited</p>
    </div>
  );
}
