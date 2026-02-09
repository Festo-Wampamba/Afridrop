import { getDashboardData, getMessages, getSchedule, getOrderHistory, getBillingData } from '../actions';
import DashboardView from './DashboardView';

export default async function DashboardPage() {
  // Fetch data in parallel
  const [dashboardData, schedule, messages, orderHistory, billingData] = await Promise.all([
    getDashboardData(),
    getSchedule(),
    getMessages(),
    getOrderHistory(),
    getBillingData(),
  ]);

  // If user not found (e.g. no mock user), redirect or show error
  // But DashboardView handles missing data gracefully
  
  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">Connection Failed</h1>
          <p className="text-slate-500 mt-2">Could not connect to database or authenticate user.</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardView 
      user={dashboardData.user}
      dashboardData={dashboardData}
      schedule={schedule}
      messages={messages}
      orderHistory={orderHistory}
      billingData={billingData}
    />
  );
}

