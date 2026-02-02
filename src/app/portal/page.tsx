'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  ChevronRight
} from 'lucide-react';

// Mock Data
const PROJECTS = [
  { id: 1, name: 'Swimming Pool Construction - Kololo', status: 'In Progress', progress: 65, date: '2024-02-01' },
  { id: 2, name: 'Monthly Maintenance', status: 'Active', progress: 100, date: '2024-01-28' },
  { id: 3, name: 'Pump Repair & Service', status: 'Completed', progress: 100, date: '2023-12-15' },
];

const INVOICES = [
  { id: 'INV-2024-001', service: 'Pool Construction Phase 1', amount: 'UGX 15,000,000', status: 'Paid', date: '2024-01-15' },
  { id: 'INV-2024-002', service: 'Monthly Maintenance (Jan)', amount: 'UGX 500,000', status: 'Pending', date: '2024-02-01' },
];

export default function ClientPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-xl mb-4">
              <Image 
                src="/assets/Images/logo_Afridrop_Solutions.png" 
                alt="Afridrop Logo" 
                width={120} 
                height={60} 
                className="mx-auto" 
              />
            </div>
            <h1 className="text-2xl font-bold text-[#00477A]">Client Portal</h1>
            <p className="text-slate-500">Sign in to manage your pool services</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50 focus:border-[#009FCE]"
                placeholder="client@example.com"
                defaultValue="demo@client.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50 focus:border-[#009FCE]"
                defaultValue="password"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#009FCE] text-white py-3 rounded-lg font-semibold hover:bg-[#00477A] transition-colors"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account? <Link href="/contact" className="text-[#009FCE] font-medium">Contact Support</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Layout
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`bg-[#002B4A] text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col fixed h-full z-20`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen ? (
            <Image src="/assets/Images/logo_Afridrop_Solutions.png" alt="Logo" width={120} height={50} className="brightness-0 invert" />
          ) : (
             <span className="font-bold text-xl mx-auto">AS</span>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} collapsed={!sidebarOpen} />
          <SidebarItem icon={<Briefcase size={20} />} label="My Projects" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} collapsed={!sidebarOpen} />
          <SidebarItem icon={<FileText size={20} />} label="Invoices" active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} collapsed={!sidebarOpen} />
          <SidebarItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} collapsed={!sidebarOpen} />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className={`flex items-center gap-3 text-red-300 hover:text-red-100 transition-colors w-full px-4 py-3 rounded-lg hover:bg-white/5 ${!sidebarOpen && 'justify-center'}`}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-white px-8 py-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-slate-800 capitalize">{activeTab}</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell className="text-slate-400 hover:text-[#009FCE] cursor-pointer" size={24} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#009FCE] flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-700">John Doe</p>
                <p className="text-xs text-slate-500">Demo Client</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'projects' && <ProjectsView />}
          {activeTab === 'invoices' && <InvoicesView />}
          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

// Sub-components
function SidebarItem({ icon, label, active, onClick, collapsed }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        active 
        ? 'bg-[#009FCE] text-white shadow-lg' 
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      {icon}
      {!collapsed && <span className="font-medium">{label}</span>}
    </button>
  );
}

function DashboardView() {
  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Projects" value="1" icon={<Briefcase className="text-[#009FCE]" />} />
        <StatCard title="Pending Invoices" value="UGX 500k" icon={<AlertCircle className="text-orange-500" />} />
        <StatCard title="Next Maintenance" value="Feb 15" icon={<Clock className="text-green-500" />} />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-[#00477A] mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <ActivityItem 
            title="Invoice #002 Generated" 
            time="2 hours ago" 
            icon={<FileText size={18} />} 
            color="bg-blue-100 text-blue-600"
          />
          <ActivityItem 
            title="Maintenance Completed" 
            time="Yesterday" 
            icon={<CheckCircle size={18} />} 
            color="bg-green-100 text-green-600"
          />
          <ActivityItem 
            title="Project 'Kololo Pool' Updated" 
            time="3 days ago" 
            icon={<Settings size={18} />} 
            color="bg-purple-100 text-purple-600"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className="p-3 bg-slate-50 rounded-lg">
        {icon}
      </div>
    </div>
  );
}

function ActivityItem({ title, time, icon, color }: any) {
  return (
    <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="font-medium text-slate-800">{title}</p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
    </div>
  );
}

function ProjectsView() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Project Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Progress</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Start Date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {PROJECTS.map((project) => (
            <tr key={project.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-800">{project.name}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {project.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="w-full bg-slate-100 rounded-full h-2 max-w-[100px]">
                  <div 
                    className="bg-[#009FCE] h-2 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-500 mt-1 block">{project.progress}%</span>
              </td>
              <td className="px-6 py-4 text-slate-500 text-sm">{project.date}</td>
              <td className="px-6 py-4">
                <button className="text-[#009FCE] hover:text-[#00477A] text-sm font-medium">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InvoicesView() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Invoice ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Service</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Amount</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Download</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {INVOICES.map((inv) => (
            <tr key={inv.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-800">{inv.id}</td>
              <td className="px-6 py-4 text-slate-600">{inv.service}</td>
              <td className="px-6 py-4 font-medium">{inv.amount}</td>
              <td className="px-6 py-4">
                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {inv.status}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500 text-sm">{inv.date}</td>
              <td className="px-6 py-4">
                <button className="flex items-center gap-2 text-slate-500 hover:text-[#009FCE]">
                  <Download size={16} />
                  <span className="text-sm">PDF</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold text-[#00477A] mb-6">Profile Settings</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
            <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50" defaultValue="John" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
            <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50" defaultValue="Doe" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
          <input type="email" className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50" defaultValue="client@demo.com" disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
          <input type="tel" className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50" defaultValue="+256 700 000000" />
        </div>
        <div className="pt-4">
          <button className="bg-[#009FCE] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#00477A] transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
