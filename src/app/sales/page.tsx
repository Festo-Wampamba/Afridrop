import { ComingSoon } from '@/components/dashboard/ComingSoon';

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Sales Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Leads, pipeline, and revenue tracking.</p>
      </div>
      <ComingSoon
        module="Sales Dashboard"
        description="Lead management, pipeline tracking, and revenue metrics will be available here."
      />
    </div>
  );
}
