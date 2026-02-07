'use client';

import { Activity, Calendar, CreditCard, MessageSquare, Droplets, AlertTriangle, CloudSun, Wrench } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function DashboardTab({ data }: { data: any }) {
  if (!data) return <div className="p-8 text-center text-slate-500">Loading dashboard data...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Pool Status" 
          value="Excellent" 
          subtext="↑ Improved 12%" 
          icon={<Activity className="text-green-500" />} 
          status="success"
        />
        <KPICard 
          title="Next Service" 
          value={data.upcomingOrders[0] ? format(new Date(data.upcomingOrders[0].createdAt), 'MMM d, yyyy') : 'No scheduled service'} 
          subtext="Weekly Maintenance" 
          icon={<Calendar className="text-[#009FCE]" />} 
        />
        <KPICard 
          title="Account Balance" 
          value="UGX 0" 
          subtext="Paid in full" 
          icon={<CreditCard className="text-[#009FCE]" />} 
        />
        <KPICard 
          title="New Messages" 
          value={data.unreadMessages.toString()} 
          subtext="Service updates" 
          icon={<MessageSquare className="text-purple-500" />} 
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Monitor Panel - Static for now as no sensor data */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-[#002B4A] mb-6 flex items-center gap-2">
            <Droplets size={20} className="text-[#009FCE]" /> Real-time Pool Monitoring
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <MetricBar label="Water Temperature" value="28°C" max={40} current={28} color="bg-pink-500" />
            <MetricBar label="Filter Pressure" value="18 PSI" max={30} current={18} color="bg-amber-500" />
            
            <MetricBar label="pH Level" value="7.4" max={14} current={7.4} color="bg-green-500" optimal />
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-500">Water Level</span>
              <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">Optimal</span>
            </div>

            <MetricBar label="Chlorine Level" value="2.1 ppm" max={5} current={2.1} color="bg-green-500" />
            <MetricBar label="Chemical Dispenser" value="75%" max={100} current={75} color="bg-green-500" />
          </div>

          <div className="mt-8 bg-[#B6E9F4]/20 border border-[#B6E9F4] rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="text-[#00477A] shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-[#00477A] font-medium text-sm">Recommendation</p>
              <p className="text-[#00477A]/80 text-sm">Filter cleaning due within 2 days based on current pressure readings.</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-slate-700">Weather Impact</h3>
              <CloudSun className="text-amber-500" size={24} />
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-3xl font-bold text-[#002B4A]">32°C</span>
              <span className="text-sm text-slate-500 mb-1">Today</span>
            </div>
            <div className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium inline-block mb-3">
              UV Index: High (8)
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              High UV may increase chlorine consumption. Monitor levels closely.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-700 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <ActionButton icon={<Wrench size={18} />} label="Request Emergency Service" />
              <ActionButton icon={<Calendar size={18} />} label="Reschedule Service" />
              <ActionButton icon={<CreditCard size={18} />} label="Make Payment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, subtext, icon, status }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-[#002B4A] mb-1">{value}</h3>
        <p className={`text-xs font-medium ${status === 'success' ? 'text-green-600' : 'text-slate-500'}`}>
          {subtext}
        </p>
      </div>
      <div className="bg-slate-50 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
}

function MetricBar({ label, value, max, current, color, optimal }: any) {
  const percentage = (current / max) * 100;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className="font-bold text-[#002B4A] text-sm">{value}</span>
      </div>
      {!optimal && (
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${color} rounded-full transition-all duration-1000`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}

function ActionButton({ icon, label }: any) {
  return (
    <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-[#009FCE] hover:bg-[#F0FAFC] transition-all text-slate-600 hover:text-[#00477A] text-sm font-medium group text-left">
      <span className="text-slate-400 group-hover:text-[#009FCE] transition-colors">{icon}</span>
      {label}
    </button>
  );
}
