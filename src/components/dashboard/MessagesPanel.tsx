import { Send } from 'lucide-react';
import { sendStaffMessage } from '@/lib/work-actions';
import type { messages } from '@/db/schema/messages';

type Thread = {
  userId: string;
  name: string;
  latest: typeof messages.$inferSelect;
  unread: number;
  count: number;
};

export function MessagesPanel({
  threads,
  recipients,
  path,
}: {
  threads: Thread[];
  recipients: { userId: string; name: string }[];
  path: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Compose */}
      <section className="bg-white rounded-xl border shadow-sm p-5 lg:sticky lg:top-20 self-start">
        <h3 className="font-semibold text-gray-900 mb-4">New Message</h3>
        {recipients.length === 0 ? (
          <p className="text-sm text-gray-400">No clients with portal accounts to message yet.</p>
        ) : (
          <form action={sendStaffMessage} className="space-y-3">
            <input type="hidden" name="_path" value={path} />
            <div>
              <label htmlFor="msg-to" className="block text-xs font-medium text-gray-500 mb-1">To</label>
              <select id="msg-to" name="userId" required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]">
                {recipients.map((r) => (
                  <option key={r.userId} value={r.userId}>{r.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="msg-subject" className="block text-xs font-medium text-gray-500 mb-1">Subject</label>
              <input id="msg-subject" name="subject" placeholder="Subject" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <div>
              <label htmlFor="msg-content" className="block text-xs font-medium text-gray-500 mb-1">Message</label>
              <textarea id="msg-content" name="content" required rows={4} placeholder="Write your message…" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]" />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#00477A] text-white text-sm font-medium rounded-lg hover:bg-[#002B4A] transition">
              <Send size={16} /> Send
            </button>
          </form>
        )}
      </section>

      {/* Threads */}
      <section className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b">
          <h3 className="font-semibold text-gray-900">Conversations</h3>
        </div>
        {threads.length === 0 ? (
          <p className="px-5 py-16 text-center text-sm text-gray-400">No messages yet.</p>
        ) : (
          <ul className="divide-y">
            {threads.map((t) => (
              <li key={t.userId} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{t.name}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    {t.unread > 0 && (
                      <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#009FCE] text-white text-xs font-bold">
                        {t.unread}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {t.latest.createdAt ? new Date(t.latest.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {t.latest.direction === 'outbound' ? 'You: ' : ''}
                  <span className="text-gray-600">{t.latest.subject}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{t.latest.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
