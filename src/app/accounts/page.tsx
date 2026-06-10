import { ComingSoon } from '@/components/dashboard/ComingSoon';

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Accounts Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Invoicing, payments, and financial records.</p>
      </div>
      <ComingSoon
        module="Accounts Dashboard"
        description="Invoice management, payment tracking, and financial reports will be available here."
      />
    </div>
  );
}
