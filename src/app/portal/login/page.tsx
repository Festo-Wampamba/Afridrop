'use client';

import Link from 'next/link';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      router.push('/portal/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      {/* Back to Home */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 text-slate-500 hover:text-[#009FCE] flex items-center gap-2 font-medium transition-colors"
      >
        <ArrowLeft size={18} /> Back to Home
      </Link>

      <div className="w-full max-w-md">
        {/* Icon & Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#00477A] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <KeyRound className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-[#00477A] mb-2">Client Portal Access</h1>
          <p className="text-slate-500">Sign in to manage your pool services and account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#009FCE] focus:ring-2 focus:ring-[#009FCE]/20 outline-none transition-all bg-slate-50"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#009FCE] focus:ring-2 focus:ring-[#009FCE]/20 outline-none transition-all bg-slate-50"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" className="rounded border-slate-300 text-[#009FCE] focus:ring-[#009FCE]" />
                Remember me
              </label>
              <a href="#" className="text-[#009FCE] hover:text-[#007FA5] font-medium">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#00477A] hover:bg-[#002B4A] text-white py-4 rounded-lg font-bold shadow-md transition-all disabled:opacity-70 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In to Portal'
              )}
            </button>
          </form>
        </div>

        {/* Demo Credentials Hint */}
        <div className="mt-8 bg-[#B6E9F4]/20 border border-[#B6E9F4] rounded-lg p-4 text-sm text-[#00477A]">
          <p className="font-bold mb-2">Demo Credentials:</p>
          <div className="space-y-1 opacity-80">
            <p><span className="font-semibold">Email:</span> client@afridrop.com</p>
            <p><span className="font-semibold">Password:</span> any password works</p>
          </div>
        </div>
      </div>
    </div>
  );
}
