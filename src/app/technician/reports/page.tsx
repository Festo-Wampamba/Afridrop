import Link from 'next/link';
import { ArrowLeft, FileText, Plus } from 'lucide-react';
import { getMyReports, createReport, updateReport, submitReport } from '../report-actions';
import { getMyJobs } from '../actions';
import { SubmitButton } from '@/components/dashboard/SubmitButton';

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  submitted: 'bg-blue-100 text-blue-700',
  reviewed: 'bg-green-100 text-green-700',
};

export default async function TechnicianReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const params = await searchParams;
  const editId = params.edit ?? null;

  const [reports, myJobs] = await Promise.all([getMyReports(), getMyJobs()]);

  const editReport = editId ? reports.find((r) => r.id === editId && r.status === 'draft') : null;

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/technician"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#00477A] transition-colors"
      >
        <ArrowLeft size={16} /> Back to tasks
      </Link>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">My Reports</h2>
        <span className="inline-flex items-center justify-center h-7 min-w-7 px-2 rounded-full bg-[#009FCE] text-white text-sm font-bold">
          {reports.length}
        </span>
      </div>

      {/* New / Edit report form */}
      <section className="bg-white rounded-2xl border shadow-sm p-5">
        <h3 className="font-semibold text-gray-900 mb-4">
          {editReport ? 'Edit Report' : 'New Report'}
        </h3>
        <form action={editReport ? updateReport : createReport} className="space-y-4">
          {editReport && (
            <input type="hidden" name="reportId" value={editReport.id} />
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="rpt-title">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="rpt-title"
              name="title"
              required
              maxLength={150}
              defaultValue={editReport?.title ?? ''}
              placeholder="Brief summary of the work"
              className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]"
            />
          </div>

          {/* Job (optional) */}
          {!editReport && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="rpt-job">
                Related job (optional)
              </label>
              <select
                id="rpt-job"
                name="jobId"
                className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]"
              >
                <option value="">— none —</option>
                {myJobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.quotationNumber} — {j.customerName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Work done */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="rpt-content">
              Work done <span className="text-red-500">*</span>
            </label>
            <textarea
              id="rpt-content"
              name="content"
              required
              rows={5}
              defaultValue={editReport?.content ?? ''}
              placeholder="Describe what was completed…"
              className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]"
            />
          </div>

          {/* What remains */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="rpt-undone">
              What still needs to be done (optional)
            </label>
            <textarea
              id="rpt-undone"
              name="undoneItems"
              rows={3}
              defaultValue={editReport?.undoneItems ?? ''}
              placeholder="Any remaining items or follow-up tasks…"
              className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]"
            />
          </div>

          <SubmitButton
            label={editReport ? 'Save Changes' : 'Save Draft'}
            pendingLabel="Saving…"
            className="w-full h-12 rounded-xl bg-[#00477A] text-white font-semibold text-sm hover:bg-[#002B4A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#009FCE] focus:ring-offset-2 disabled:opacity-60"
          />
        </form>
      </section>

      {/* Report list */}
      {reports.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
          <FileText size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="font-medium text-gray-500">No reports yet</p>
          <p className="text-sm text-gray-400 mt-1">Submit your first report using the form above.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {reports.map((r) => {
            const statusColor = STATUS_COLORS[r.status] ?? 'bg-gray-100 text-gray-600';
            return (
              <li key={r.id} className="bg-white rounded-2xl border shadow-sm p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-gray-900 leading-tight">{r.title}</p>
                  <span className={`shrink-0 inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor}`}>
                    {r.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3">{r.content}</p>

                {r.undoneItems && (
                  <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">
                    <p className="text-xs font-medium text-amber-700 mb-0.5">Still to do</p>
                    <p className="text-xs text-amber-600 line-clamp-2">{r.undoneItems}</p>
                  </div>
                )}

                {r.status === 'reviewed' && r.reviewNote && (
                  <div className="rounded-lg bg-green-50 border border-green-100 px-3 py-2">
                    <p className="text-xs font-medium text-green-700 mb-0.5">Manager note</p>
                    <p className="text-xs text-green-700">{r.reviewNote}</p>
                  </div>
                )}

                <p className="text-xs text-gray-400">
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-UG', { dateStyle: 'medium' }) : ''}
                  {r.submittedAt ? ` · Submitted ${new Date(r.submittedAt).toLocaleDateString('en-UG', { dateStyle: 'medium' })}` : ''}
                </p>

                {r.status === 'draft' && (
                  <div className="flex gap-2">
                    <Link
                      href={`/technician/reports?edit=${r.id}`}
                      className="flex-1 h-10 inline-flex items-center justify-center rounded-xl border text-sm font-medium text-gray-700 hover:bg-slate-50 transition-colors"
                    >
                      Edit
                    </Link>
                    <form action={submitReport} className="flex-1">
                      <input type="hidden" name="reportId" value={r.id} />
                      <SubmitButton
                        label="Submit"
                        pendingLabel="Submitting…"
                        className="w-full h-10 rounded-xl bg-[#009FCE] text-white font-semibold text-sm hover:bg-[#007baa] transition-colors focus:outline-none focus:ring-2 focus:ring-[#009FCE] focus:ring-offset-2 disabled:opacity-60"
                      />
                    </form>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
