'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { homeForRole } from '@/lib/roles';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { data, error } = await signIn.email({ email, password });

    if (error) {
      setError(error.message || 'Invalid email or password');
      setIsLoading(false);
      return;
    }

    const role = (data?.user as { role?: string } | undefined)?.role;
    router.push(homeForRole(role));
    router.refresh();
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-6 left-6 text-sm text-slate-500 hover:text-[#009FCE] transition-colors"
      >
        ← Back to Home
      </Link>

      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">
        {/* Logo + Titles */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/assets/Images/logo_Afridrop_Solutions.png"
            alt="Afridrop Logo"
            width={120}
            height={60}
            priority
            className="mb-4"
          />
          <h1 className="text-2xl font-bold text-[#00477A]">Afridrop Portal</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error message */}
          {error && (
            <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Email */}
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

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#009FCE] py-3 text-sm font-semibold text-white transition hover:bg-[#00477A] disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-slate-400">© 2026 Afridrop Solutions Limited</p>
    </div>
  );
}
