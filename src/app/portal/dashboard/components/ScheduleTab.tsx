'use client';

import { useState } from 'react';
import { Calendar, Clock, Plus, Filter, Search } from 'lucide-react';
import { submitServiceRequest } from '../../actions';

export default function ScheduleTab({ data }: { data: any[] }) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRequestService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    const formData = new FormData(e.currentTarget);
    try {
      await submitServiceRequest(formData);
      setSuccessMessage('Service requested successfully!');
      setTimeout(() => {
        setIsRequesting(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setSuccessMessage('Failed to request service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search schedule..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter size={16} /> Filter
          </button>
        </div>
        <button 
          onClick={() => setIsRequesting(!isRequesting)}
          className="bg-[#009FCE] hover:bg-[#007FA5] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Request Service
        </button>
      </div>

      {isRequesting && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#009FCE]/20 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-bold text-[#002B4A] mb-4">Request New Service</h3>
          <form onSubmit={handleRequestService} className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Type</label>
                <select name="serviceType" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009FCE]/50">
                  <option value="maintenance">Regular Maintenance</option>
                  <option value="cleaning">Deep Cleaning</option>
                  <option value="inspection">Safety Inspection</option>
                  <option value="repair">Repair</option>
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
             
             {successMessage && <p className="text-green-600 text-sm font-medium">{successMessage}</p>}

             <div className="flex justify-end gap-3">
               <button 
                 type="button" 
                 onClick={() => setIsRequesting(false)}
                 className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium text-sm"
               >
                 Cancel
               </button>
               <button 
                 type="submit" 
                 disabled={isSubmitting}
                 className="bg-[#009FCE] hover:bg-[#007FA5] text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
               >
                 {isSubmitting ? 'Submitting...' : 'Submit Request'}
               </button>
             </div>
          </form>
        </div>
      )}

      {/* Schedule List */}
      <div className="space-y-4">
        {data.length > 0 ? (
          data.map((item: any) => (
             <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-[#009FCE]/30 transition-colors">
               <div className="flex items-center gap-4">
                 <div className="bg-[#B6E9F4]/30 p-3 rounded-lg text-[#00477A]">
                   <Calendar size={20} />
                 </div>
                 <div>
                   <h4 className="font-semibold text-[#002B4A]">{item.orderNumber || 'Scheduled Service'}</h4>
                   <p className="text-sm text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                 </div>
               </div>
               <div className="flex items-center gap-6">
                 <div className="text-right hidden md:block">
                   <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Time</p>
                   <div className="flex items-center gap-1 text-sm font-medium text-[#002B4A]">
                     <Clock size={14} /> 09:00 AM - 11:00 AM
                   </div>
                 </div>
                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                   {item.status}
                 </span>
               </div>
             </div>
          ))
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
