import { ComingSoon } from '@/components/dashboard/ComingSoon';

export default function DirectorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Director Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Company-wide performance and strategic view.</p>
      </div>
      <ComingSoon
        module="Director Dashboard"
        description="Company-wide KPIs, financials, and team performance will be available here."
      />
    </div>
  );
}
