'use client';

import { useEffect, useState } from 'react';
import { Activity, Calendar, CreditCard, MessageSquare, CloudSun, Wrench, Cloud, Sun, CloudRain, Loader2, FileText, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

// Weather data type
interface WeatherData {
  temperature: number;
  uvIndex: number;
  weatherCode: number;
  isDay: boolean;
  humidity: number;
}

// Get UV level text
function getUVLevel(uv: number): { text: string; color: string; bgColor: string } {
  if (uv <= 2) return { text: 'Low', color: 'text-green-600', bgColor: 'bg-green-50' };
  if (uv <= 5) return { text: 'Moderate', color: 'text-amber-600', bgColor: 'bg-amber-50' };
  if (uv <= 7) return { text: 'High', color: 'text-orange-600', bgColor: 'bg-orange-50' };
  if (uv <= 10) return { text: 'Very High', color: 'text-red-600', bgColor: 'bg-red-50' };
  return { text: 'Extreme', color: 'text-purple-600', bgColor: 'bg-purple-50' };
}

// Get weather icon based on code
function getWeatherIcon(code: number) {
  if (code === 0) return <Sun className="text-amber-500" size={28} />;
  if (code >= 1 && code <= 3) return <CloudSun className="text-amber-500" size={28} />;
  if (code >= 45 && code <= 48) return <Cloud className="text-slate-400" size={28} />;
  if (code >= 51 && code <= 67) return <CloudRain className="text-blue-500" size={28} />;
  if (code >= 80) return <CloudRain className="text-blue-500" size={28} />;
  return <CloudSun className="text-amber-500" size={28} />;
}

interface DashboardTabProps {
  data: any;
  onTabChange?: (tab: string) => void;
}

export default function DashboardTab({ data, onTabChange }: DashboardTabProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Fetch weather from Open-Meteo API (Kampala coordinates)
  useEffect(() => {
    async function fetchWeather() {
      try {
        // Kampala, Uganda coordinates
        const lat = 0.3136;
        const lon = 32.5811;
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,is_day&daily=uv_index_max&timezone=Africa%2FKampala&forecast_days=1`,
          { cache: 'no-store' }
        );
        const result = await response.json();
        
        if (result.current) {
          setWeather({
            temperature: Math.round(result.current.temperature_2m),
            weatherCode: result.current.weather_code,
            isDay: result.current.is_day === 1,
            uvIndex: Math.round(result.daily?.uv_index_max?.[0] || 0),
            humidity: Math.round(result.current.relative_humidity_2m),
          });
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      } finally {
        setWeatherLoading(false);
      }
    }
    fetchWeather();
  }, []);

  if (!data) return <div className="p-8 text-center text-slate-500">Loading dashboard data...</div>;

  const uvLevel = weather ? getUVLevel(weather.uvIndex) : { text: 'Loading...', color: 'text-slate-500', bgColor: 'bg-slate-50' };

  // Quick action handlers
  const handleQuickAction = (action: string) => {
    if (onTabChange) {
      if (action === 'emergency' || action === 'reschedule') {
        onTabChange('schedule');
      } else if (action === 'payment') {
        onTabChange('billing');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Cards - Clickable */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Pending Services" 
          value={data.pendingServices?.toString() || '0'} 
          subtext="Awaiting completion" 
          icon={<Clock className="text-amber-500" />} 
          onClick={() => onTabChange?.('schedule')}
        />
        <KPICard 
          title="Completed Services" 
          value={data.completedServices?.toString() || '0'} 
          subtext="All time" 
          icon={<CheckCircle className="text-green-500" />}
          status="success"
          onClick={() => onTabChange?.('history')}
        />
        <KPICard 
          title="Account Balance" 
          value="UGX 0" 
          subtext="View billing details" 
          icon={<CreditCard className="text-[#009FCE]" />} 
          onClick={() => onTabChange?.('billing')}
        />
        <KPICard 
          title="New Messages" 
          value={data.unreadMessages?.toString() || '0'} 
          subtext={data.unreadMessages > 0 ? 'Unread messages' : 'All caught up!'} 
          icon={<MessageSquare className="text-purple-500" />} 
          onClick={() => onTabChange?.('messages')}
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Overview - Replaces Pool Monitoring */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-[#002B4A] mb-6 flex items-center gap-2">
            <Activity size={20} className="text-[#009FCE]" /> Activity Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Recent Activity</h3>
              {data.upcomingOrders?.length > 0 ? (
                data.upcomingOrders.slice(0, 3).map((order: any, i: number) => (
                  <div key={order.id || i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-[#009FCE]/10 flex items-center justify-center">
                      <FileText size={18} className="text-[#009FCE]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-slate-800 truncate">
                        Order #{order.orderNumber || 'N/A'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {order.createdAt ? format(new Date(order.createdAt), 'MMM d, yyyy') : 'Unknown date'}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {order.status || 'pending'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-slate-50 rounded-lg text-center text-slate-500 text-sm">
                  No recent activity
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Account Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Account Type</span>
                  <span className="text-sm font-bold text-[#002B4A]">Premium</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Member Since</span>
                  <span className="text-sm font-bold text-[#002B4A]">Jan 2024</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Service Plan</span>
                  <span className="text-sm font-bold text-[#002B4A]">Weekly Maintenance</span>
                </div>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <button 
            onClick={() => onTabChange?.('history')}
            className="mt-6 w-full py-3 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors"
          >
            View Full History <ArrowRight size={16} />
          </button>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Weather Widget - Fixed API */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-slate-700">Kampala Weather</h3>
              {weatherLoading ? (
                <Loader2 className="text-slate-400 animate-spin" size={24} />
              ) : (
                weather && getWeatherIcon(weather.weatherCode)
              )}
            </div>
            
            {weatherLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="text-[#009FCE] animate-spin" size={32} />
              </div>
            ) : weather ? (
              <>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl font-bold text-[#002B4A]">{weather.temperature}°C</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className={`${uvLevel.bgColor} ${uvLevel.color} px-3 py-1.5 rounded-lg text-sm font-medium text-center`}>
                    UV: {uvLevel.text}
                  </div>
                  <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-medium text-center">
                    {weather.humidity}% Humidity
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {weather.uvIndex >= 6 
                    ? 'High UV today. Pools may need extra chlorine monitoring.'
                    : weather.weatherCode >= 51
                    ? 'Rain expected. Pool covers recommended if available.'
                    : 'Good weather for pool activities today.'}
                </p>
              </>
            ) : (
              <p className="text-slate-500 text-sm">Unable to load weather data.</p>
            )}
          </div>

          {/* Quick Actions - Now Functional */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-700 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => handleQuickAction('emergency')}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-red-300 hover:bg-red-50 transition-all text-slate-600 hover:text-red-600 text-sm font-medium group text-left"
              >
                <span className="text-slate-400 group-hover:text-red-500 transition-colors"><AlertCircle size={18} /></span>
                Request Emergency Service
              </button>
              <button 
                onClick={() => handleQuickAction('reschedule')}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-[#009FCE] hover:bg-[#F0FAFC] transition-all text-slate-600 hover:text-[#00477A] text-sm font-medium group text-left"
              >
                <span className="text-slate-400 group-hover:text-[#009FCE] transition-colors"><Calendar size={18} /></span>
                Schedule New Service
              </button>
              <button 
                onClick={() => handleQuickAction('payment')}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-green-300 hover:bg-green-50 transition-all text-slate-600 hover:text-green-600 text-sm font-medium group text-left"
              >
                <span className="text-slate-400 group-hover:text-green-500 transition-colors"><CreditCard size={18} /></span>
                View Billing & Payments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, subtext, icon, status, onClick }: { 
  title: string; 
  value: string; 
  subtext: string; 
  icon: React.ReactNode; 
  status?: string;
  onClick?: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md hover:border-[#009FCE]/30 transition-all text-left w-full group"
    >
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-[#002B4A] mb-1">{value}</h3>
        <p className={`text-xs font-medium ${status === 'success' ? 'text-green-600' : 'text-slate-500'}`}>
          {subtext}
        </p>
      </div>
      <div className="bg-slate-50 p-3 rounded-full group-hover:bg-[#009FCE]/10 transition-colors">
        {icon}
      </div>
    </button>
  );
}
