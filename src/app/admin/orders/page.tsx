import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq, desc, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import Link from 'next/link';

async function updateOrderStatus(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  const status = formData.get('status') as string;

  await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, id));
  revalidatePath('/admin/orders');
}

async function updatePaymentStatus(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  const paymentStatus = formData.get('paymentStatus') as string;

  await db.update(orders).set({ paymentStatus, updatedAt: new Date() }).where(eq(orders.id, id));
  revalidatePath('/admin/orders');
}

async function deleteOrder(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session || session.user.role !== 'super_admin') throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  await db.update(orders).set({ deletedAt: new Date() }).where(eq(orders.id, id));
  revalidatePath('/admin/orders');
}

export default async function OrdersPage() {
  const allOrders = await db.query.orders.findMany({
    where: isNull(orders.deletedAt),
    with: { user: true, items: true },
    orderBy: desc(orders.createdAt),
  });

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
  };

  const paymentColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <p className="text-gray-500 text-sm mt-1">{allOrders.length} orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['pending', 'processing', 'shipped', 'delivered'].map((status) => {
          const count = allOrders.filter((o) => o.status === status).length;
          return (
            <div key={status} className="bg-white rounded-xl border p-4 shadow-sm">
              <p className="text-sm text-gray-500 capitalize">{status}</p>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Order #</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Payment</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {allOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono font-medium text-gray-900">{order.orderNumber}</td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-xs text-gray-500">{order.customerEmail}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.items?.length || 0}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">UGX {Number(order.total).toLocaleString('en-UG')}</td>
                <td className="px-6 py-4">
                  <form action={updateOrderStatus} className="flex items-center gap-1">
                    <input type="hidden" name="id" value={order.id} />
                    <select
                      name="status"
                      defaultValue={order.status ?? 'pending'}
                      className="text-xs border rounded px-2 py-1"
                    >
                      {['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button type="submit" className="text-xs text-blue-600 hover:text-blue-800">✓</button>
                  </form>
                </td>
                <td className="px-6 py-4">
                  <form action={updatePaymentStatus} className="flex items-center gap-1">
                    <input type="hidden" name="id" value={order.id} />
                    <select
                      name="paymentStatus"
                      defaultValue={order.paymentStatus ?? 'pending'}
                      className="text-xs border rounded px-2 py-1"
                    >
                      {['pending', 'paid', 'failed', 'refunded'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button type="submit" className="text-xs text-blue-600 hover:text-blue-800">✓</button>
                  </form>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 text-right">
                  <form action={deleteOrder}>
                    <input type="hidden" name="id" value={order.id} />
                    <button type="submit" className="text-sm text-red-600 hover:text-red-800">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {allOrders.length === 0 && (
              <tr><td colSpan={8} className="px-6 py-12 text-center text-gray-500">No orders yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
