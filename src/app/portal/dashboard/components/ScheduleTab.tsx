'use client';

import { useState, useTransition } from 'react';
import { Calendar, Clock, Plus, Filter, Search, Edit2, Trash2, X, CheckCircle, AlertCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { submitServiceRequest, updateServiceRequest, cancelServiceRequest, updateServiceStatus } from '../../actions';
import { useRouter } from 'next/navigation';

interface ServiceRequest {
  id: string;
  quotationNumber: string;
  projectDescription: string;
  notes: string | null;
  validUntil: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending' },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Progress' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completed' },
  cancelled: { bg: 'bg-slate-100', text: 'text-slate-500', label: 'Cancelled' },
  reviewed: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Reviewed' },
};

const serviceTypeOptions = [
  { value: 'maintenance', label: 'Regular Maintenance' },
  { value: 'cleaning', label: 'Deep Cleaning' },
  { value: 'inspection', label: 'Safety Inspection' },
  { value: 'repair', label: 'Repair Service' },
];

export default function ScheduleTab({ data }: { data: ServiceRequest[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isRequesting, setIsRequesting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Filter data
  const filteredData = data.filter(item => {
    const matchesSearch = item.projectDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Handle new service request
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await submitServiceRequest(formData);
        setIsRequesting(false);
        router.refresh();
        setSuccessMessage('Service request submitted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch {
        setErrorMessage('Failed to submit request. Please try again.');
      }
    });
  };

  // Handle edit
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await updateServiceRequest(id, formData);
        setSuccessMessage('Service request updated!');
        setEditingId(null);
        router.refresh();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch {
        setErrorMessage('Failed to update request.');
      }
    });
  };

  // Handle cancel
  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this service request?')) return;
    
    startTransition(async () => {
      try {
        await cancelServiceRequest(id);
        setSuccessMessage('Service request cancelled.');
        router.refresh();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch {
        setErrorMessage('Failed to cancel request.');
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle size={18} /> {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle size={18} /> {errorMessage}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="flex gap-3 items-center flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search requests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50 w-48"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button 
          onClick={() => setIsRequesting(!isRequesting)}
          className="bg-[#009FCE] hover:bg-[#007FA5] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Request Service
        </button>
      </div>

      {/* New Request Form */}
      {isRequesting && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#009FCE]/20 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-bold text-[#002B4A] mb-4">Request New Service</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Type</label>
                <select name="serviceType" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50">
                  {serviceTypeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                <input type="date" name="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea name="description" rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50" placeholder="Describe your request..." required />
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setIsRequesting(false)} className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium text-sm">
                Cancel
              </button>
              <button type="submit" disabled={isPending} className="bg-[#009FCE] hover:bg-[#007FA5] text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 flex items-center gap-2">
                {isPending && <Loader2 size={16} className="animate-spin" />}
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Service Requests List */}
      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => {
            const status = statusColors[item.status] || statusColors.pending;
            const isExpanded = expandedId === item.id;
            const isEditing = editingId === item.id;

            return (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:border-[#009FCE]/30 transition-colors">
                {/* Header Row */}
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#B6E9F4]/30 p-3 rounded-lg text-[#00477A]">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#002B4A]">{item.notes || 'Service Request'}</h4>
                      <p className="text-sm text-slate-500">#{item.quotationNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.validUntil && (
                      <div className="text-right hidden md:block">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Scheduled For</p>
                        <div className="flex items-center gap-1 text-sm font-medium text-[#002B4A]">
                          <Clock size={14} /> {new Date(item.validUntil).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                    <span className={`${status.bg} ${status.text} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>
                      {status.label}
                    </span>
                    {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-4 bg-slate-50 animate-in slide-in-from-top-2 duration-200">
                    {isEditing ? (
                      // Edit Form
                      <form onSubmit={(e) => handleUpdate(e, item.id)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Service Type</label>
                            <select name="serviceType" defaultValue={serviceTypeOptions.find(o => o.label === item.notes)?.value || 'maintenance'} className="w-full px-4 py-2 border border-slate-300 rounded-lg">
                              {serviceTypeOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                            <input type="date" name="date" defaultValue={item.validUntil || ''} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                          <textarea name="description" rows={3} defaultValue={item.projectDescription} className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" disabled={isPending} className="bg-[#009FCE] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                            {isPending && <Loader2 size={14} className="animate-spin" />} Save Changes
                          </button>
                          <button type="button" onClick={() => setEditingId(null)} className="text-slate-600 px-4 py-2 text-sm">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      // View Details
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-slate-500 mb-1">Description</p>
                          <p className="text-slate-700">{item.projectDescription}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-slate-500">Created</p>
                            <p className="font-medium">{new Date(item.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Last Updated</p>
                            <p className="font-medium">{new Date(item.updatedAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Status</p>
                            <p className="font-medium">{status.label}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Reference</p>
                            <p className="font-medium">#{item.quotationNumber}</p>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        {item.status === 'pending' && (
                          <div className="flex gap-2 pt-2 border-t border-slate-200">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setEditingId(item.id); }}
                              className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-700"
                            >
                              <Edit2 size={14} /> Edit
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleCancel(item.id); }}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 rounded-lg text-sm text-red-600"
                            >
                              <Trash2 size={14} /> Cancel Request
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <Calendar className="mx-auto text-slate-300 mb-2" size={48} />
            <p className="text-slate-500 font-medium">No services scheduled yet.</p>
            <button onClick={() => setIsRequesting(true)} className="text-[#009FCE] hover:underline text-sm mt-1">Request a service now</button>
          </div>
        )}
      </div>
    </div>
  );
}
