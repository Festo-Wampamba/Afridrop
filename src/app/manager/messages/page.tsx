import { getManagerMessagesView } from '../actions';
import { MessagesPanel } from '@/components/dashboard/MessagesPanel';

export default async function ManagerMessagesPage() {
  const { threads, recipients } = await getManagerMessagesView();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Messages</h2>
        <p className="text-sm text-gray-500 mt-1">Communicate with your assigned clients.</p>
      </div>
      <MessagesPanel threads={threads} recipients={recipients} path="/manager/messages" />
    </div>
  );
}
