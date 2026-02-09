'use client';

import { useState } from 'react';
import { Calendar, CheckCircle, Clock, FileText, AlertCircle, ChevronRight, Bell, MapPin, Send, X, Eye, RotateCcw } from 'lucide-react';
import Link from 'next/link';

// Types for better structure
interface Task {
  id: number;
  title: string;
  location: string;
  time: string;
  status: 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

// Initial data
const initialTasks: Task[] = [
  { id: 1, title: 'Filter Cleaning - Project #A102', location: 'Bugolobi, Plot 12', time: '10:00 AM', status: 'pending', priority: 'high' },
  { id: 2, title: 'pH Balance Check - Project #B405', location: 'Kololo, Terrace Apts', time: '02:00 PM', status: 'pending', priority: 'medium' },
  { id: 3, title: 'Pump Maintenance', location: 'Muyenga, Hill Road', time: '04:30 PM', status: 'completed', priority: 'low' },
  { id: 4, title: 'Chemical Treatment - Project #D201', location: 'Nakasero, Embassy Lane', time: '09:00 AM', status: 'completed', priority: 'high' },
];

const initialNotifications: Notification[] = [
  { id: 1, type: 'info', title: 'New Task Assigned', message: 'You have been assigned to Project #C789 for a routine inspection on Friday. Please confirm availability and review the project details before the scheduled visit.', time: '2 hours ago', isRead: false },
  { id: 2, type: 'success', title: 'Report Approved', message: 'Your daily report for Bugolobi site has been reviewed and approved by Admin. Great work maintaining the pool standards!', time: 'Yesterday', isRead: false },
  { id: 3, type: 'warning', title: 'Equipment Alert', message: 'Low chlorine stock detected. Please requisition more supplies from the main office before your next scheduled maintenance.', time: '2 days ago', isRead: true },
];

export default function TechnicianPortal() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'report' | 'notifications'>('tasks');
  const [filterType, setFilterType] = useState<'all' | 'pending' | 'completed' | 'alerts'>('all');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  // Computed stats
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const reportsCount = 5; // Mock
  const alertsCount = notifications.filter(n => !n.isRead).length;

  // Toggle task status
  const toggleTaskStatus = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  // Mark notification as read
  const markAsRead = (notificationId: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  // Handle stat card click
  const handleStatClick = (type: 'pending' | 'completed' | 'reports' | 'alerts') => {
    if (type === 'reports') {
      setActiveTab('report');
    } else if (type === 'alerts') {
      setActiveTab('notifications');
    } else {
      setActiveTab('tasks');
      setFilterType(type);
    }
  };

  // Filter tasks based on filterType
  const filteredTasks = filterType === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === filterType);

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
                <div 
                  className="bg-white/10 p-2 rounded-full relative cursor-pointer hover:bg-white/20 transition-colors" 
                  onClick={() => { setActiveTab('notifications'); setSelectedNotification(null); }}
                >
                    <Bell size={24} />
                    {alertsCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#00477A] text-xs flex items-center justify-center font-bold">
                        {alertsCount}
                      </span>
                    )}
                </div>
            </div>

            {/* Quick Stats - Now Clickable */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <StatCard 
                  label="Pending Tasks" 
                  value={pendingCount.toString()} 
                  icon={Clock} 
                  onClick={() => handleStatClick('pending')}
                  active={activeTab === 'tasks' && filterType === 'pending'}
                />
                <StatCard 
                  label="Completed" 
                  value={completedCount.toString()} 
                  icon={CheckCircle} 
                  onClick={() => handleStatClick('completed')}
                  active={activeTab === 'tasks' && filterType === 'completed'}
                />
                <StatCard 
                  label="Reports Sent" 
                  value={reportsCount.toString()} 
                  icon={FileText} 
                  onClick={() => handleStatClick('reports')}
                  active={activeTab === 'report'}
                />
                <StatCard 
                  label="Alerts" 
                  value={alertsCount.toString()} 
                  icon={AlertCircle} 
                  onClick={() => handleStatClick('alerts')}
                  active={activeTab === 'notifications'}
                  highlight={alertsCount > 0}
                />
            </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg p-2 flex justify-between overflow-x-auto">
            <TabButton 
                active={activeTab === 'tasks'} 
                onClick={() => { setActiveTab('tasks'); setFilterType('all'); }} 
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
                onClick={() => { setActiveTab('notifications'); setSelectedNotification(null); }} 
                icon={Bell} 
                label="Notifications" 
                badge={alertsCount > 0 ? alertsCount : undefined}
            />
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 mt-8">
        {activeTab === 'tasks' && (
          <TasksView 
            tasks={filteredTasks} 
            filterType={filterType} 
            setFilterType={setFilterType}
            onToggleStatus={toggleTaskStatus}
          />
        )}
        {activeTab === 'report' && <DailyReportView />}
        {activeTab === 'notifications' && (
          <NotificationsView 
            notifications={notifications}
            selectedNotification={selectedNotification}
            onSelect={(n) => { setSelectedNotification(n); markAsRead(n.id); }}
            onClose={() => setSelectedNotification(null)}
          />
        )}
      </div>

    </div>
  );
}

function StatCard({ label, value, icon: Icon, onClick, active, highlight }: { 
  label: string; 
  value: string; 
  icon: any; 
  onClick: () => void;
  active?: boolean;
  highlight?: boolean;
}) {
    return (
        <button 
          onClick={onClick}
          className={`text-left bg-white/10 backdrop-blur-sm rounded-xl p-4 border transition-all ${
            active 
              ? 'border-white/50 bg-white/20 ring-2 ring-white/30' 
              : 'border-white/10 hover:bg-white/20 hover:border-white/30'
          } ${highlight ? 'animate-pulse' : ''}`}
        >
            <div className="flex items-center gap-3 mb-2">
                <div className={`p-1.5 rounded-lg ${highlight ? 'bg-red-500' : 'bg-[#009FCE]'}`}>
                    <Icon size={16} className="text-white" />
                </div>
                <span className="text-[#E0F5FA] text-xs font-medium uppercase tracking-wide">{label}</span>
            </div>
            <div className="text-2xl font-bold">{value}</div>
        </button>
    )
}

function TabButton({ active, onClick, icon: Icon, label, badge }: { 
  active: boolean; 
  onClick: () => void; 
  icon: any; 
  label: string;
  badge?: number;
}) {
    return (
        <button 
            onClick={onClick}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                active 
                ? 'bg-[#009FCE] text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
        >
            <Icon size={18} />
            {label}
            {badge !== undefined && badge > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                {badge}
              </span>
            )}
        </button>
    )
}

function TasksView({ tasks, filterType, setFilterType, onToggleStatus }: { 
  tasks: Task[]; 
  filterType: string;
  setFilterType: (type: 'all' | 'pending' | 'completed' | 'alerts') => void;
  onToggleStatus: (id: number) => void;
}) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#00477A]">Today's Schedule</h2>
              <div className="flex gap-2">
                {(['all', 'pending', 'completed'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filterType === type 
                        ? 'bg-[#009FCE] text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {tasks.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-slate-100">
                <Clock className="mx-auto text-slate-300 mb-3" size={40} />
                <p className="text-slate-500">No {filterType} tasks found.</p>
              </div>
            ) : (
              tasks.map(task => (
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
                                <span className="flex items-center gap-1"><MapPin size={14} /> {task.location}</span>
                                <span className="flex items-center gap-1"><Clock size={14} /> {task.time}</span>
                            </div>
                        </div>
                    </div>
                    <button 
                      onClick={() => onToggleStatus(task.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        task.status === 'completed' 
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-[#009FCE]/10 text-[#009FCE] hover:bg-[#009FCE] hover:text-white'
                    }`}>
                        {task.status === 'completed' ? (
                          <><RotateCcw size={16} /> Undo</>
                        ) : (
                          <><CheckCircle size={16} /> Mark Done</>
                        )}
                    </button>
                </div>
              ))
            )}
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
                        placeholder="e.g., 2kg Chlorine, 500ml Algaecide..."
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
                        <Send size={20} /> Submit Report
                    </button>
                </div>
            </form>
        </div>
    )
}

function NotificationsView({ notifications, selectedNotification, onSelect, onClose }: { 
  notifications: Notification[];
  selectedNotification: Notification | null;
  onSelect: (n: Notification) => void;
  onClose: () => void;
}) {
    const typeStyles = {
      info: { bg: 'bg-blue-50', border: 'border-blue-500', icon: AlertCircle, iconColor: 'text-blue-500', titleColor: 'text-blue-800', textColor: 'text-blue-600' },
      success: { bg: 'bg-green-50', border: 'border-green-500', icon: CheckCircle, iconColor: 'text-green-500', titleColor: 'text-green-800', textColor: 'text-green-600' },
      warning: { bg: 'bg-amber-50', border: 'border-amber-500', icon: AlertCircle, iconColor: 'text-amber-500', titleColor: 'text-amber-800', textColor: 'text-amber-600' },
    };

    // Detail view
    if (selectedNotification) {
      const style = typeStyles[selectedNotification.type];
      const IconComponent = style.icon;
      return (
        <div className="space-y-4">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 font-medium"
          >
            <ChevronRight className="rotate-180" size={18} /> Back to Notifications
          </button>
          
          <div className={`${style.bg} border-l-4 ${style.border} p-6 rounded-r-xl`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${style.bg}`}>
                <IconComponent className={style.iconColor} size={28} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`text-xl font-bold ${style.titleColor}`}>{selectedNotification.title}</h3>
                  <span className="text-slate-400 text-sm">{selectedNotification.time}</span>
                </div>
                <p className={`${style.textColor} mt-3 leading-relaxed`}>{selectedNotification.message}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                  <Eye size={16} /> Marked as read
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // List view
    return (
        <div className="space-y-4">
             <h2 className="text-xl font-bold text-[#00477A] mb-4">Notifications</h2>
             
             {notifications.length === 0 ? (
               <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-slate-100">
                 <Bell className="mx-auto text-slate-300 mb-3" size={40} />
                 <p className="text-slate-500">No notifications.</p>
               </div>
             ) : (
               notifications.map(notification => {
                 const style = typeStyles[notification.type];
                 const IconComponent = style.icon;
                 return (
                   <button
                     key={notification.id}
                     onClick={() => onSelect(notification)}
                     className={`w-full text-left ${notification.isRead ? 'bg-white' : style.bg} border-l-4 ${style.border} p-4 rounded-r-lg shadow-sm hover:shadow-md transition-all ${!notification.isRead ? 'ring-2 ring-offset-2 ring-blue-200' : ''}`}
                   >
                     <div className="flex gap-3">
                       <div className={`shrink-0 p-2 rounded-full ${notification.isRead ? 'bg-slate-100' : style.bg}`}>
                         <IconComponent className={notification.isRead ? 'text-slate-400' : style.iconColor} size={20} />
                       </div>
                       <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-start gap-2">
                           <h4 className={`font-bold ${notification.isRead ? 'text-slate-600' : style.titleColor}`}>
                             {notification.title}
                             {!notification.isRead && (
                               <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                             )}
                           </h4>
                           <span className="text-slate-400 text-xs shrink-0">{notification.time}</span>
                         </div>
                         <p className={`text-sm mt-1 truncate ${notification.isRead ? 'text-slate-500' : style.textColor}`}>
                           {notification.message}
                         </p>
                       </div>
                       <ChevronRight className="text-slate-300 shrink-0 self-center" size={20} />
                     </div>
                   </button>
                 );
               })
             )}
        </div>
    )
}
