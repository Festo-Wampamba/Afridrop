'use client';

import { useState } from 'react';
import { X, Smartphone, CreditCard, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

type PaymentMethod = 'mobile_money' | 'card' | 'cheque';

export default function PaymentModal({ isOpen, onClose, amount }: PaymentModalProps) {
  const [method, setMethod] = useState<PaymentMethod>('mobile_money');
  const [step, setStep] = useState<'select' | 'details' | 'processing' | 'success'>('select');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const reset = () => {
    setStep('select');
    setMethod('mobile_money');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Make Payment</h3>
          <button onClick={reset} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {step === 'select' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500 mb-4">
                Paying <span className="font-bold text-slate-800">UGX {amount.toLocaleString()}</span>. Select your preferred payment method:
              </p>
              
              <button 
                onClick={() => { setMethod('mobile_money'); setStep('details'); }}
                className="w-full p-4 border border-slate-200 rounded-xl flex items-center gap-4 hover:border-[#009FCE] hover:bg-[#009FCE]/5 transition-all group text-left"
              >
                <div className="bg-yellow-100 p-3 rounded-lg text-yellow-700 group-hover:bg-yellow-200">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Mobile Money</h4>
                  <p className="text-sm text-slate-500">MTN MoMo or Airtel Money</p>
                </div>
              </button>

              <button 
                onClick={() => { setMethod('card'); setStep('details'); }}
                className="w-full p-4 border border-slate-200 rounded-xl flex items-center gap-4 hover:border-[#009FCE] hover:bg-[#009FCE]/5 transition-all group text-left"
              >
                <div className="bg-blue-100 p-3 rounded-lg text-blue-700 group-hover:bg-blue-200">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Credit / Debit Card</h4>
                  <p className="text-sm text-slate-500">Visa, Mastercard</p>
                </div>
              </button>

              <button 
                onClick={() => { setMethod('cheque'); setStep('details'); }}
                className="w-full p-4 border border-slate-200 rounded-xl flex items-center gap-4 hover:border-[#009FCE] hover:bg-[#009FCE]/5 transition-all group text-left"
              >
                <div className="bg-purple-100 p-3 rounded-lg text-purple-700 group-hover:bg-purple-200">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Bank Cheque</h4>
                  <p className="text-sm text-slate-500">Upload cheque image</p>
                </div>
              </button>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
                <button type="button" onClick={() => setStep('select')} className="hover:text-[#009FCE]">← Back</button>
                <span>|</span>
                <span className="font-medium text-slate-800 capitalize">{method.replace('_', ' ')}</span>
              </div>

              {method === 'mobile_money' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="tel" placeholder="07XX XXX XXX" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50" required />
                  <p className="text-xs text-slate-500 mt-2">You will receive a prompt to authorize the payment.</p>
                </div>
              )}

              {method === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                      <input type="text" placeholder="123" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50" required />
                    </div>
                  </div>
                </div>
              )}

              {method === 'cheque' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cheque Number</label>
                  <input type="text" placeholder="Check No." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50 mb-3" required />
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer">
                    <FileText className="mx-auto text-slate-400 mb-2" size={24} />
                    <span className="text-sm text-slate-600 block">Click to upload cheque image</span>
                    <span className="text-xs text-slate-400 block mt-1">(JPG, PNG, PDF)</span>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full bg-[#009FCE] hover:bg-[#007FA5] text-white py-3 rounded-lg font-bold mt-4 transition-colors">
                Pay UGX {amount.toLocaleString()}
              </button>
            </form>
          )}

          {step === 'processing' && (
            <div className="text-center py-8">
              <Loader2 className="mx-auto text-[#009FCE] animate-spin mb-4" size={48} />
              <h4 className="text-lg font-bold text-[#002B4A]">Processing Payment...</h4>
              <p className="text-slate-500 mt-2">Please wait while we secure your transaction.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h4 className="text-xl font-bold text-[#002B4A] mb-2">Payment Successful!</h4>
              <p className="text-slate-500 mb-6">Your payment has been processed successfully. A receipt has been sent to your email.</p>
              <button onClick={reset} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-bold transition-colors">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
