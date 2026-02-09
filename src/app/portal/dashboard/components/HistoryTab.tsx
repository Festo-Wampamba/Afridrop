'use client';

import { useState } from 'react';
import { Package, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle, Clock, XCircle } from 'lucide-react';

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  status: string;
  total: string;
  createdAt: string;
  items: OrderItem[];
  shippingCity?: string;
}

const statusIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  completed: { icon: <CheckCircle size={16} />, color: 'text-emerald-600 bg-emerald-50' },
  delivered: { icon: <CheckCircle size={16} />, color: 'text-emerald-600 bg-emerald-50' },
  processing: { icon: <Clock size={16} />, color: 'text-amber-600 bg-amber-50' },
  pending: { icon: <Clock size={16} />, color: 'text-slate-600 bg-slate-100' },
  cancelled: { icon: <XCircle size={16} />, color: 'text-red-600 bg-red-50' },
};

export default function HistoryTab({ data }: { data: Order[] }) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center animate-in fade-in duration-500">
        <Package className="mx-auto text-slate-300 mb-4" size={48} />
        <h3 className="text-xl font-bold text-slate-700 mb-2">No Service History</h3>
        <p className="text-slate-500">Your completed services will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Service History</h2>
        <span className="text-sm text-slate-500">{data.length} orders</span>
      </div>

      <div className="space-y-3">
        {data.map((order) => {
          const statusInfo = statusIcons[order.status] || statusIcons.pending;
          const isExpanded = expandedOrder === order.id;

          return (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <button
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#009FCE]/10 p-3 rounded-lg">
                    <Package className="text-[#009FCE]" size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-slate-800">{order.orderNumber}</p>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(order.createdAt).toLocaleDateString('en-UG', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      {order.shippingCity && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {order.shippingCity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-slate-800">
                      UGX {parseFloat(order.total).toLocaleString()}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
                    >
                      {statusInfo.icon}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                </div>
              </button>

              {isExpanded && order.items && order.items.length > 0 && (
                <div className="border-t border-slate-100 p-5 bg-slate-50">
                  <h4 className="text-sm font-semibold text-slate-600 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-slate-700">
                          {item.productName} <span className="text-slate-400">x{item.quantity}</span>
                        </span>
                        <span className="font-medium text-slate-800">
                          UGX {parseFloat(item.subtotal).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
