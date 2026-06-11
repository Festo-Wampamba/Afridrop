import { getTeamReports, markReportReviewed } from '../report-actions';
import { SubmitButton } from '@/components/dashboard/SubmitButton';

export default async function ManagerReportsPage() {
  const reports = await getTeamReports();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Team Reports</h2>
        <p className="text-sm text-gray-500 mt-1">Review work reports submitted by your technicians.</p>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white rounded-xl border shadow-sm px-6 py-16 text-center">
          <p className="text-sm text-gray-400">No submitted or reviewed reports yet.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {reports.map((r) => {
            const techName = [r.techFirstName, r.techLastName].filter(Boolean).join(' ') || 'Unknown technician';
            const reviewerName = [r.reviewerFirstName, r.reviewerLastName].filter(Boolean).join(' ');

            return (
              <li key={r.id} className="bg-white rounded-xl border shadow-sm p-5 space-y-3">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{r.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {techName}
                      {r.jobQuotationNumber && (
                        <> &middot; Job <span className="font-medium">{r.jobQuotationNumber}</span>
                          {r.jobCustomerName && <> ({r.jobCustomerName})</>}
                        </>
                      )}
                      {r.submittedAt && (
                        <> &middot; Submitted {new Date(r.submittedAt).toLocaleDateString()}</>
                      )}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                      r.status === 'submitted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {r.status === 'submitted' ? 'Submitted' : 'Reviewed'}
                  </span>
                </div>

                {/* Content */}
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{r.content}</p>

                {/* Outstanding items */}
                {r.undoneItems && (
                  <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
                    <p className="text-xs font-semibold text-amber-800 mb-1">Outstanding items</p>
                    <p className="text-sm text-amber-700 whitespace-pre-wrap">{r.undoneItems}</p>
                  </div>
                )}

                {/* Review note (already reviewed) */}
                {r.status === 'reviewed' && (
                  <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3">
                    <p className="text-xs font-semibold text-green-800 mb-1">
                      Review note
                      {reviewerName && <span className="font-normal"> &mdash; {reviewerName}</span>}
                      {r.reviewedAt && (
                        <span className="font-normal"> on {new Date(r.reviewedAt).toLocaleDateString()}</span>
                      )}
                    </p>
                    {r.reviewNote ? (
                      <p className="text-sm text-green-700 whitespace-pre-wrap">{r.reviewNote}</p>
                    ) : (
                      <p className="text-sm text-green-600 italic">No note provided.</p>
                    )}
                  </div>
                )}

                {/* Review form (submitted only) */}
                {r.status === 'submitted' && (
                  <form action={markReportReviewed} className="space-y-2 pt-1">
                    <input type="hidden" name="reportId" value={r.id} />
                    <div>
                      <label htmlFor={`note-${r.id}`} className="block text-xs font-medium text-gray-500 mb-1">
                        Review note <span className="font-normal text-gray-400">(optional)</span>
                      </label>
                      <textarea
                        id={`note-${r.id}`}
                        name="reviewNote"
                        rows={2}
                        maxLength={1000}
                        placeholder="Add a review note…"
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]"
                      />
                    </div>
                    <SubmitButton
                      label="Mark Reviewed"
                      pendingLabel="Saving…"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#00477A] text-white text-sm font-medium rounded-lg hover:bg-[#002B4A] transition disabled:opacity-60"
                    />
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
