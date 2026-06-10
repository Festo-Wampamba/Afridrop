import { ComingSoon } from '@/components/dashboard/ComingSoon';

export default function ReceptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reception Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Appointments, enquiries, and front-desk operations.</p>
      </div>
      <ComingSoon
        module="Reception Dashboard"
        description="Appointment scheduling, customer enquiries, and front-desk tools will be available here."
      />
    </div>
  );
}
