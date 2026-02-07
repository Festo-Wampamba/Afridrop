'use client';

import { useState } from 'react';
import { Calendar, CheckCircle, Clock, FileText, AlertCircle, ChevronRight, Bell } from 'lucide-react';
import Link from 'next/link';

export default function TechnicianPortal() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'report' | 'notifications'>('tasks');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-30">
        <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium bg-black/10 hover:bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <ChevronRight className="rotate-180" size={18} />
            Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="bg-[#00477A] text-white pt-24 pb-12 px-4 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#009FCE]/20 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none"></div>
        
        <div className="container mx-auto relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Pool Technician Portal</h1>
                    <p className="text-[#E0F5FA] text-lg">Welcome back, Technician.</p>
                </div>
                <div className="bg-white/10 p-2 rounded-full relative cursor-pointer hover:bg-white/20 transition-colors" onClick={() => setActiveTab('notifications')}>
                    <Bell size={24} />
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#00477A]"></span>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <StatCard label="Pending Tasks" value="3" icon={Clock} />
                <StatCard label="Completed" value="12" icon={CheckCircle} />
                <StatCard label="Reports Sent" value="5" icon={FileText} />
                <StatCard label="Alerts" value="1" icon={AlertCircle} />
            </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg p-2 flex justify-between overflow-x-auto">
            <TabButton 
                active={activeTab === 'tasks'} 
                onClick={() => setActiveTab('tasks')} 
                icon={CheckCircle} 
                label="My Tasks" 
            />
            <TabButton 
                active={activeTab === 'report'} 
                onClick={() => setActiveTab('report')} 
                icon={FileText} 
                label="Daily Report" 
            />
             <TabButton 
                active={activeTab === 'notifications'} 
                onClick={() => setActiveTab('notifications')} 
                icon={Bell} 
                label="Notifications" 
            />
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 mt-8">
        {activeTab === 'tasks' && <TasksView />}
        {activeTab === 'report' && <DailyReportView />}
        {activeTab === 'notifications' && <NotificationsView />}
      </div>

    </div>
  );
}

function StatCard({ label, value, icon: Icon }: any) {
    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-colors">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-1.5 bg-[#009FCE] rounded-lg">
                    <Icon size={16} className="text-white" />
                </div>
                <span className="text-[#E0F5FA] text-xs font-medium uppercase tracking-wide">{label}</span>
            </div>
            <div className="text-2xl font-bold">{value}</div>
        </div>
    )
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                active 
                ? 'bg-[#009FCE] text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
        >
            <Icon size={18} />
            {label}
        </button>
    )
}

function TasksView() {
    const tasks = [
        { id: 1, title: 'Filter Cleaning - Project #A102', location: 'Bugolobi, Plot 12', time: '10:00 AM', status: 'pending', priority: 'high' },
        { id: 2, title: 'pH Balance Check - Project #B405', location: 'Kololo, Terrace Apts', time: '02:00 PM', status: 'pending', priority: 'medium' },
        { id: 3, title: 'Pump Maintenance', location: 'Muyenga, Hill Road', time: '04:30 PM', status: 'completed', priority: 'low' },
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#00477A] mb-4">Today's Schedule</h2>
            {tasks.map(task => (
                <div key={task.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full shrink-0 ${
                            task.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                            {task.status === 'completed' ? <CheckCircle size={20} /> : <Clock size={20} />}
                        </div>
                        <div>
                            <h3 className={`font-bold text-slate-800 ${task.status === 'completed' ? 'line-through text-slate-400' : ''}`}>
                                {task.title}
                            </h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><MapPinIcon size={14} /> {task.location}</span>
                                <span className="flex items-center gap-1"><Clock size={14} /> {task.time}</span>
                            </div>
                        </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        task.status === 'completed' 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-[#009FCE]/10 text-[#009FCE] hover:bg-[#009FCE] hover:text-white'
                    }`}>
                        {task.status === 'completed' ? 'Done' : 'Mark Done'}
                    </button>
                </div>
            ))}
        </div>
    )
}

function DailyReportView() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-[#00477A] mb-6">Submit Daily Activity Log</h2>
            <form className="space-y-6">
                <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-2">Project / Client</label> 
                   <select className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#009FCE]/20 outline-none">
                       <option>Select a project...</option>
                       <option>Project #A102 - Bugolobi</option>
                       <option>Project #B405 - Kololo</option>
                   </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Activities Performed</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['Water Testing', 'Filter Cleaning', 'Vacuuming', 'Chemical Dosing', 'Pump Check', 'Skimmer Cleaning'].map(activity => (
                             <label key={activity} className="flex items-center gap-2 p-3 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-50">
                                <input type="checkbox" className="w-4 h-4 text-[#009FCE] rounded focus:ring-[#009FCE]" />
                                <span className="text-slate-600 text-sm">{activity}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Chemicals Used (Optional)</label>
                    <textarea 
                        className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#009FCE]/20 outline-none resize-none"
                        rows={3}
                        placeholder="e.g., 2kg Installing Chlorine, 500ml Algaecide..."
                    ></textarea>
                </div>

                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Notes / Observations</label>
                    <textarea 
                        className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#009FCE]/20 outline-none resize-none"
                        rows={3}
                        placeholder="Any issues or maintenance requirements found?"
                    ></textarea>
                </div>

                <div className="pt-4">
                    <button type="button" className="w-full bg-[#009FCE] hover:bg-[#007FA5] text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all">
                        <SendIcon size={20} /> Submit Report
                    </button>
                </div>
            </form>
        </div>
    )
}

function NotificationsView() {
    return (
        <div className="space-y-4">
             <h2 className="text-xl font-bold text-[#00477A] mb-4">Notifications</h2>
             <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                 <div className="flex gap-3">
                     <AlertCircle className="text-blue-500 shrink-0" size={24} />
                     <div>
                         <h4 className="font-bold text-blue-800">New Task Assigned</h4>
                         <p className="text-blue-600 text-sm mt-1">You have been assigned to Project #C789 for a routine inspection on Friday.</p>
                         <span className="text-blue-400 text-xs mt-2 block">2 hours ago</span>
                     </div>
                 </div>
             </div>
             <div className="bg-white border border-slate-100 p-4 rounded-lg shadow-sm">
                  <div className="flex gap-3">
                     <div className="bg-green-100 p-2 rounded-full h-fit text-green-600"><CheckCircle size={20} /></div>
                     <div>
                         <h4 className="font-bold text-slate-800">Report Approved</h4>
                         <p className="text-slate-600 text-sm mt-1">Your daily report for Bugolobi site has been reviewed and approved by Admin.</p>
                         <span className="text-slate-400 text-xs mt-2 block">Yesterday</span>
                     </div>
                 </div>
             </div>
        </div>
    )
}

// Simple Icon Components to resolve usage
function MapPinIcon({size, className}: any) { return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>}
function SendIcon({size, className}: any) { return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>}
