'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from 'recharts';
import { BarChart3, TrendingUp, Calendar, Droplets, DollarSign, ArrowRight } from 'lucide-react';

// Mock data for analytics
const monthlyServices = [
  { month: 'Aug', services: 4, spending: 2000000 },
  { month: 'Sep', services: 4, spending: 2000000 },
  { month: 'Oct', services: 5, spending: 2500000 },
  { month: 'Nov', services: 4, spending: 2100000 },
  { month: 'Dec', services: 3, spending: 1500000 },
  { month: 'Jan', services: 4, spending: 2200000 },
];

const serviceBreakdown = [
  { name: 'Weekly Maintenance', value: 18, color: '#009FCE' },
  { name: 'Chemical Treatment', value: 6, color: '#10b981' },
  { name: 'Deep Cleaning', value: 4, color: '#f59e0b' },
  { name: 'Equipment Check', value: 2, color: '#8b5cf6' },
];

const poolHealthTrend = [
  { metric: 'pH Level', current: 7.4, optimal: '7.2-7.8', status: 'good' },
  { metric: 'Chlorine', current: 2.1, optimal: '1-3 ppm', status: 'good' },
  { metric: 'Alkalinity', current: 95, optimal: '80-120 ppm', status: 'good' },
  { metric: 'Calcium', current: 250, optimal: '200-400 ppm', status: 'good' },
];

// Format spending for chart tooltip
const formatSpending = (value: number) => `UGX ${(value / 1000000).toFixed(1)}M`;

type ActiveMetric = 'services' | 'spending' | 'avg';

export default function AnalyticsTab() {
  const [activeMetric, setActiveMetric] = useState<ActiveMetric>('spending');
  
  const totalSpending = monthlyServices.reduce((sum, m) => sum + m.spending, 0);
  const totalServices = monthlyServices.reduce((sum, m) => sum + m.services, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Summary Stats - Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => setActiveMetric('services')}
          className={`text-left p-5 rounded-xl shadow-sm border transition-all ${
            activeMetric === 'services' 
              ? 'bg-blue-50 border-[#009FCE] ring-1 ring-[#009FCE]' 
              : 'bg-white border-slate-100 hover:border-[#009FCE]/50'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-lg ${activeMetric === 'services' ? 'bg-[#009FCE] text-white' : 'bg-[#009FCE]/10 text-[#009FCE]'}`}>
              <Calendar size={20} />
            </div>
            <span className="text-sm text-slate-500">Total Services (6 mo)</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{totalServices}</p>
          {activeMetric === 'services' && <div className="mt-2 text-xs text-[#009FCE] font-medium flex items-center gap-1">Viewing details <ArrowRight size={12}/></div>}
        </button>

        <button 
          onClick={() => setActiveMetric('spending')}
          className={`text-left p-5 rounded-xl shadow-sm border transition-all ${
            activeMetric === 'spending' 
              ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500' 
              : 'bg-white border-slate-100 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-lg ${activeMetric === 'spending' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
              <DollarSign size={20} />
            </div>
            <span className="text-sm text-slate-500">Total Spent (6 mo)</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">UGX {(totalSpending / 1000000).toFixed(1)}M</p>
          {activeMetric === 'spending' && <div className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">Viewing details <ArrowRight size={12}/></div>}
        </button>

        <button 
          onClick={() => setActiveMetric('avg')}
          className={`text-left p-5 rounded-xl shadow-sm border transition-all ${
            activeMetric === 'avg' 
              ? 'bg-purple-50 border-purple-500 ring-1 ring-purple-500' 
              : 'bg-white border-slate-100 hover:border-purple-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-lg ${activeMetric === 'avg' ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-600'}`}>
              <TrendingUp size={20} />
            </div>
            <span className="text-sm text-slate-500">Avg per Month</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">UGX {((totalSpending / 6) / 1000000).toFixed(2)}M</p>
          {activeMetric === 'avg' && <div className="mt-2 text-xs text-purple-600 font-medium flex items-center gap-1">Viewing details <ArrowRight size={12}/></div>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart - Dynamic based on selection */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              {activeMetric === 'services' && <><Calendar size={20} className="text-[#009FCE]" /> Service Frequency</>}
              {activeMetric === 'spending' && <><BarChart3 size={20} className="text-emerald-500" /> Monthly Spending Trends</>}
              {activeMetric === 'avg' && <><TrendingUp size={20} className="text-purple-500" /> Average Cost Analysis</>}
            </h3>
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Last 6 Months</span>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {activeMetric === 'services' ? (
                 <BarChart data={monthlyServices} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="services" fill="#009FCE" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              ) : activeMetric === 'spending' ? (
                <AreaChart data={monthlyServices} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} 
                  />
                  <Tooltip 
                    formatter={(value) => [formatSpending(value as number), 'Spending']}
                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="spending" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSpending)" />
                </AreaChart>
              ) : (
                <BarChart data={monthlyServices} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} 
                  />
                  <Tooltip 
                    formatter={(value) => [formatSpending(value as number), 'Cost']}
                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="spending" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
                   {/* Add a reference line for average could be added here in future */}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Breakdown - Contextual */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <Droplets size={20} className="text-[#009FCE]" />
            {activeMetric === 'services' ? 'Service Type Distribution' : 'Cost Breakdown'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {serviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} ${activeMetric === 'services' ? 'visits' : 'orders'}`, name]}
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-sm text-slate-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparison / Insight */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Key Insights</h3>
          <div className="space-y-4">
             <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
               <p className="text-sm text-slate-600 mb-1">Highest Spending Month</p>
               <div className="flex justify-between items-end">
                 <span className="text-xl font-bold text-[#002B4A]">October</span>
                 <span className="text-emerald-600 font-medium">UGX 2.5M</span>
               </div>
             </div>
             <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
               <p className="text-sm text-slate-600 mb-1">Most Frequent Service</p>
               <div className="flex justify-between items-end">
                 <span className="text-xl font-bold text-[#002B4A]">Weekly Maintenance</span>
                 <span className="text-[#009FCE] font-medium">18 visits</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
