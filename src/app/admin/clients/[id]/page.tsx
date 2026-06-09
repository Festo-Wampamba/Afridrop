import { db } from '@/db';
import { clients, users, orders, quotations, payments } from '@/db/schema';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  lead: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-700',
};

function ugx(amount: string | number | null) {
  return `UGX ${Number(amount ?? 0).toLocaleString('en-UG')}`;
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = await db.query.clients.findFirst({
    where: and(eq(clients.id, id), isNull(clients.deletedAt)),
  });
  if (!client) notFound();

  const manager = client.assignedManagerId
    ? await db.query.users.findFirst({ where: eq(users.id, client.assignedManagerId) })
    : null;

  // Linked portal account history (only when a user account is attached).
  const linkedOrders = client.userId
    ? await db.select().from(orders).where(and(eq(orders.userId, client.userId), isNull(orders.deletedAt))).orderBy(desc(orders.createdAt))
    : [];
  const linkedQuotes = client.userId
    ? await db.select().from(quotations).where(and(eq(quotations.customerId, client.userId), isNull(quotations.deletedAt))).orderBy(desc(quotations.createdAt))
    : [];
  const linkedPayments = client.userId
    ? await db.select().from(payments).where(eq(payments.userId, client.userId)).orderBy(desc(payments.createdAt))
    : [];

  const field = (label: string, value: React.ReactNode) => (
    <div>
      <dt className="text-xs text-gray-500 uppercase tracking-wide">{label}</dt>
      <dd className="text-sm text-gray-900 mt-0.5">{value || <span className="text-gray-400">—</span>}</dd>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/clients" className="text-sm text-gray-500 hover:text-gray-900">← Clients</Link>
          <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[client.status] ?? 'bg-gray-100 text-gray-700'}`}>{client.status}</span>
        </div>
        <Link href={`/admin/clients?edit=${client.id}`} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">Edit</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile */}
        <div className="lg:col-span-2 bg-white rounded-xl border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Profile</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('Email', client.email)}
            {field('Phone', client.phone)}
            {field('City', client.city)}
            {field('Address', client.address)}
            {field('Pool Type', client.poolType ? <span className="capitalize">{client.poolType}</span> : null)}
            {field('Pool Size', client.poolSize)}
            {field('Equipment', client.equipment)}
            {field('Manager', manager ? `${manager.firstName} ${manager.lastName}` : null)}
          </dl>
          {client.notes && (
            <div className="mt-4 pt-4 border-t">
              <dt className="text-xs text-gray-500 uppercase tracking-wide">Notes</dt>
              <dd className="text-sm text-gray-900 mt-1 whitespace-pre-wrap">{client.notes}</dd>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="bg-white rounded-xl border p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold">Account</h3>
          {client.userId ? (
            <p className="text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">Linked to a portal account</p>
          ) : (
            <p className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">No portal account linked</p>
          )}
          {field('Added', client.createdAt ? new Date(client.createdAt).toLocaleDateString() : null)}
        </div>
      </div>

      {/* History (only meaningful with a linked account) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <HistoryCard title="Quotations" count={linkedQuotes.length}>
          {linkedQuotes.slice(0, 5).map((q) => (
            <li key={q.id} className="flex justify-between py-2 text-sm">
              <span className="text-gray-700">{q.quotationNumber}</span>
              <span className="text-gray-500 capitalize">{q.status}</span>
            </li>
          ))}
        </HistoryCard>
        <HistoryCard title="Orders" count={linkedOrders.length}>
          {linkedOrders.slice(0, 5).map((o) => (
            <li key={o.id} className="flex justify-between py-2 text-sm">
              <span className="text-gray-700">{o.orderNumber}</span>
              <span className="text-gray-900 font-medium">{ugx(o.total)}</span>
            </li>
          ))}
        </HistoryCard>
        <HistoryCard title="Payments" count={linkedPayments.length}>
          {linkedPayments.slice(0, 5).map((p) => (
            <li key={p.id} className="flex justify-between py-2 text-sm">
              <span className="text-gray-700 capitalize">{p.status}</span>
              <span className="text-gray-900 font-medium">{ugx(p.amount)}</span>
            </li>
          ))}
        </HistoryCard>
      </div>
    </div>
  );
}

function HistoryCard({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">{count}</span>
      </div>
      <ul className="px-4 divide-y">
        {count === 0 ? <li className="py-6 text-center text-sm text-gray-400">None</li> : children}
      </ul>
    </div>
  );
}
