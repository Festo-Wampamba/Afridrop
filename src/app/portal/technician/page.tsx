'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, Lock, User, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function TechnicianLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      // Redirect to dashboard
      router.push('/portal/technician/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-[#00477A] font-medium transition-colors">
        <ArrowLeft size={20} /> Back to Home
      </Link>
      
      <div className="mb-8 text-center">
         <Link href="/" className="inline-block mb-6">
            <Image 
                src="/assets/Images/logo_Afridrop_Solutions.png" 
                alt="Afridrop Logo" 
                width={180} 
                height={90} 
                className="h-16 w-auto"
            />
         </Link>
         <h1 className="text-3xl font-bold text-[#00477A]">Technician Portal</h1>
         <p className="text-slate-500 mt-2">Secure access for field operations</p>
      </div>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="flex justify-center mb-8">
            <div className="bg-[#009FCE]/10 p-4 rounded-full">
                <KeyRound size={32} className="text-[#009FCE]" />
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Technician ID / Username</label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#009FCE] focus:ring-2 focus:ring-[#009FCE]/20 outline-none transition-all"
                        placeholder="Enter your ID"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="password" 
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#009FCE] focus:ring-2 focus:ring-[#009FCE]/20 outline-none transition-all"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </div>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#00477A] hover:bg-[#003860] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#00477A]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={20} /></>}
            </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
                Having trouble accessing your account? <br/>
                <a href="mailto:support@afridropsolutions.com" className="text-[#009FCE] font-semibold hover:underline">Contact Administrator</a>
            </p>
        </div>
      </div>
      
      <div className="mt-8 text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} Afridrop Solutions Limited
      </div>

    </div>
  );
}
