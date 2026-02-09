'use client';

import { useState } from 'react';
import { CreditCard, Wallet, AlertCircle, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import PaymentModal from './PaymentModal';

interface Payment {
  id: string;
  orderId: string | null;
  amount: string;
  currency: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

interface BillingData {
  payments: Payment[];
  totalBilled: number;
  totalPaid: number;
  accountBalance: number;
  pendingPayments: Payment[];
}

const statusStyles: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  completed: { icon: <CheckCircle size={14} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  pending: { icon: <Clock size={14} />, color: 'text-amber-600', bg: 'bg-amber-50' },
  failed: { icon: <AlertCircle size={14} />, color: 'text-red-600', bg: 'bg-red-50' },
};

export default function BillingTab({ data }: { data: BillingData | null }) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (!data) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center animate-in fade-in duration-500">
        <Wallet className="mx-auto text-slate-300 mb-4" size={48} />
        <h3 className="text-xl font-bold text-slate-700 mb-2">Billing Information</h3>
        <p className="text-slate-500">Unable to load billing data.</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => `UGX ${amount.toLocaleString()}`;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Billed</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{formatCurrency(data.totalBilled)}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Paid</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{formatCurrency(data.totalPaid)}</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <CheckCircle className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-5 ${data.accountBalance > 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-100'}`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-slate-500">Account Balance</p>
              <p className={`text-2xl font-bold mt-1 ${data.accountBalance > 0 ? 'text-amber-700' : 'text-slate-800'}`}>
                {formatCurrency(data.accountBalance)}
              </p>
              {data.accountBalance > 0 && (
                <p className="text-xs text-amber-600 mt-1">Outstanding balance</p>
              )}
            </div>
            <div className={`p-3 rounded-lg ${data.accountBalance > 0 ? 'bg-amber-100' : 'bg-slate-100'}`}>
              <Wallet className={data.accountBalance > 0 ? 'text-amber-600' : 'text-slate-600'} size={24} />
            </div>
          </div>
          {data.accountBalance > 0 && (
            <button 
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-medium text-sm transition-colors"
            >
              Pay Now
            </button>
          )}
        </div>
      </div>

      {/* Pending Payments Alert */}
      {data.pendingPayments.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
            <p className="text-amber-800 text-sm">
              You have <strong>{data.pendingPayments.length}</strong> pending payment(s) awaiting confirmation.
            </p>
          </div>
          <button 
            onClick={() => setIsPaymentModalOpen(true)}
            className="text-amber-700 hover:text-amber-800 text-sm font-medium hover:underline whitespace-nowrap"
          >
            Pay Now
          </button>
        </div>
      )}

      {/* Payment History */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Payment History</h3>
        </div>

        {data.payments.length === 0 ? (
          <div className="p-8 text-center">
            <CreditCard className="mx-auto text-slate-300 mb-3" size={40} />
            <p className="text-slate-500">No payment records found.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.payments.map((payment) => {
              const status = statusStyles[payment.status] || statusStyles.pending;
              return (
                <div key={payment.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 p-2.5 rounded-lg">
                      <CreditCard className="text-slate-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">
                        {payment.paymentMethod.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                      <p className="text-sm text-slate-500">
                        {new Date(payment.createdAt).toLocaleDateString('en-UG', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">
                      {payment.currency} {parseFloat(payment.amount).toLocaleString()}
                    </p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color} ${status.bg}`}>
                      {status.icon}
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        amount={data.accountBalance > 0 ? data.accountBalance : 50000} // Default or actual balance
      />
    </div>
  );
}
