'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import DashboardTab from './components/DashboardTab';
import ScheduleTab from './components/ScheduleTab';
import MessagesTab from './components/MessagesTab';
import HistoryTab from './components/HistoryTab';
import BillingTab from './components/BillingTab';
import AnalyticsTab from './components/AnalyticsTab';

export default function DashboardView({ 
  user,
  dashboardData, 
  schedule, 
  messages 
}: { 
  user: any,
  dashboardData: any, 
  schedule: any[], 
  messages: any[] 
}) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab data={dashboardData} />;
      case 'schedule':
        return <ScheduleTab data={schedule} />;
      case 'messages':
        return <MessagesTab data={messages} />;
      case 'history':
        return <HistoryTab />;
      case 'billing':
        return <BillingTab />;
      case 'analytics':
        return <AnalyticsTab />;
      default:
        return <DashboardTab data={dashboardData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="bg-[#002B4A] text-white">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name.split(' ')[0] || 'Client'}!</h1>
            <p className="text-[#B6E9F4] text-sm">Account: Premium Pool Care</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-sm opacity-80">Next Service</p>
              <p className="font-bold">
                {dashboardData?.upcomingOrders[0] 
                  ? new Date(dashboardData.upcomingOrders[0].createdAt).toLocaleDateString() 
                  : 'No upcoming service'}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full relative">
                <Bell size={20} />
                {dashboardData?.unreadMessages > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <Link href="/portal/login" className="bg-[#009FCE] hover:bg-[#007FA5] px-4 py-2 rounded-lg font-medium transition-colors">
                Sign Out
              </Link>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="container mx-auto px-4 mt-4 overflow-x-auto">
          <nav className="flex gap-8 border-b border-white/10">
            {['Dashboard', 'Schedule', 'Analytics', 'History', 'Billing', 'Messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`pb-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.toLowerCase() 
                    ? 'border-[#009FCE] text-[#009FCE]' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {renderTabContent()}
      </main>
    </div>
  );
}
