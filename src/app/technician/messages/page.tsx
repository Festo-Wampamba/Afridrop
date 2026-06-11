import Link from 'next/link';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { getMyThread, sendTechnicianMessage } from '../message-actions';
import { SubmitButton } from '@/components/dashboard/SubmitButton';

export default async function TechnicianMessagesPage() {
  const thread = await getMyThread();

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/technician"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#00477A] transition-colors"
      >
        <ArrowLeft size={16} /> Back to tasks
      </Link>

      <div>
        <h2 className="text-lg font-bold text-gray-900">Ask about a task</h2>
        <p className="text-sm text-gray-500 mt-0.5">Send a message to your manager or the office.</p>
      </div>

      {/* Chat thread */}
      {thread.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
          <MessageSquare size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="font-medium text-gray-500">No messages yet</p>
          <p className="text-sm text-gray-400 mt-1">Send your first message below.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {thread.map((m) => {
            const isMine = m.direction === 'inbound';
            return (
              <li key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs sm:max-w-sm rounded-2xl px-4 py-3 shadow-sm ${
                    isMine
                      ? 'bg-[#009FCE] text-white rounded-br-sm'
                      : 'bg-white border text-gray-800 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{m.content}</p>
                  <p className={`text-xs mt-1.5 ${isMine ? 'text-[#B6E9F4]' : 'text-gray-400'}`}>
                    {m.createdAt ? new Date(m.createdAt).toLocaleString('en-UG', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Compose */}
      <section className="bg-white rounded-2xl border shadow-sm p-4">
        <form action={sendTechnicianMessage} className="space-y-3">
          <textarea
            name="content"
            required
            maxLength={2000}
            rows={4}
            placeholder="Type your message…"
            className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#009FCE] focus:border-[#009FCE]"
          />
          <SubmitButton
            label="Send Message"
            pendingLabel="Sending…"
            className="w-full h-12 rounded-xl bg-[#009FCE] text-white font-semibold text-sm hover:bg-[#007baa] transition-colors focus:outline-none focus:ring-2 focus:ring-[#009FCE] focus:ring-offset-2 disabled:opacity-60"
          />
        </form>
      </section>
    </div>
  );
}
