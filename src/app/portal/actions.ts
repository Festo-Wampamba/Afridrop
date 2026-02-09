'use server';

import { db } from '@/db';
import { users } from '@/db/schema/auth';
import { orders } from '@/db/schema/orders';
import { messages } from '@/db/schema/messages';
import { quotations } from '@/db/schema/quotations';
import { eq, desc, and, count, or } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Mock getUser - in production this would use next-auth
async function getUser() {
  const user = await db.query.users.findFirst({
    where: eq(users.email, 'admin@afridrop.com'),
  });
  
  return user;
}

export async function getDashboardData() {
  const user = await getUser();
  if (!user) return null;

  // Get upcoming orders
  const upcomingOrders = await db.query.orders.findMany({
    where: eq(orders.userId, user.id),
    orderBy: [desc(orders.createdAt)],
    limit: 5,
  });

  // Get unread messages count
  const unreadMessagesCount = await db
    .select({ count: count() })
    .from(messages)
    .where(
      and(
        eq(messages.userId, user.id),
        eq(messages.isRead, false),
        eq(messages.direction, 'outbound')
      )
    );

  // Get pending service requests count
  const pendingServicesCount = await db
    .select({ count: count() })
    .from(quotations)
    .where(
      and(
        eq(quotations.customerId, user.id),
        or(
          eq(quotations.status, 'pending'),
          eq(quotations.status, 'in_progress')
        )
      )
    );

  // Get completed services count
  const completedServicesCount = await db
    .select({ count: count() })
    .from(quotations)
    .where(
      and(
        eq(quotations.customerId, user.id),
        eq(quotations.status, 'completed')
      )
    );

  return {
    user: {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    },
    upcomingOrders,
    unreadMessages: unreadMessagesCount[0]?.count || 0,
    pendingServices: pendingServicesCount[0]?.count || 0,
    completedServices: completedServicesCount[0]?.count || 0,
  };
}

// Fetch service requests (quotations) for the schedule
export async function getSchedule() {
  const user = await getUser();
  if (!user) return [];

  const serviceRequests = await db.query.quotations.findMany({
    where: eq(quotations.customerId, user.id),
    orderBy: [desc(quotations.createdAt)],
  });

  return serviceRequests;
}

// Submit a new service request
export async function submitServiceRequest(formData: FormData) {
  const user = await getUser();
  if (!user) throw new Error('Not authenticated');

  const serviceType = formData.get('serviceType') as string;
  const description = formData.get('description') as string;
  const preferredDate = formData.get('date') as string;

  const serviceTypeLabels: Record<string, string> = {
    maintenance: 'Regular Maintenance',
    cleaning: 'Deep Cleaning',
    inspection: 'Safety Inspection',
    repair: 'Repair Service',
  };

  await db.insert(quotations).values({
    quotationNumber: `SVC-${Date.now()}`,
    customerId: user.id,
    customerName: `${user.firstName} ${user.lastName}`,
    customerEmail: user.email,
    projectDescription: description,
    notes: serviceTypeLabels[serviceType] || serviceType,
    validUntil: preferredDate || null,
    status: 'pending',
  });

  revalidatePath('/portal/dashboard');
  return { success: true };
}

// Update service request status
export async function updateServiceStatus(id: string, status: string) {
  const user = await getUser();
  if (!user) throw new Error('Not authenticated');

  await db.update(quotations)
    .set({ 
      status,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(quotations.id, id),
        eq(quotations.customerId, user.id)
      )
    );

  revalidatePath('/portal/dashboard');
  return { success: true };
}

// Update/edit a service request
export async function updateServiceRequest(id: string, formData: FormData) {
  const user = await getUser();
  if (!user) throw new Error('Not authenticated');

  const serviceType = formData.get('serviceType') as string;
  const description = formData.get('description') as string;
  const preferredDate = formData.get('date') as string;

  const serviceTypeLabels: Record<string, string> = {
    maintenance: 'Regular Maintenance',
    cleaning: 'Deep Cleaning',
    inspection: 'Safety Inspection',
    repair: 'Repair Service',
  };

  await db.update(quotations)
    .set({
      projectDescription: description,
      notes: serviceTypeLabels[serviceType] || serviceType,
      validUntil: preferredDate || null,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(quotations.id, id),
        eq(quotations.customerId, user.id)
      )
    );

  revalidatePath('/portal/dashboard');
  return { success: true };
}

// Delete/cancel a service request
export async function cancelServiceRequest(id: string) {
  const user = await getUser();
  if (!user) throw new Error('Not authenticated');

  await db.update(quotations)
    .set({ 
      status: 'cancelled',
      deletedAt: new Date(),
    })
    .where(
      and(
        eq(quotations.id, id),
        eq(quotations.customerId, user.id)
      )
    );

  revalidatePath('/portal/dashboard');
  return { success: true };
}

export async function getMessages() {
  const user = await getUser();
  if (!user) return [];

  const userMessages = await db.query.messages.findMany({
    where: eq(messages.userId, user.id),
    orderBy: [desc(messages.createdAt)],
  });

  return userMessages;
}

export async function sendMessage(formData: FormData) {
  const user = await getUser();
  if (!user) throw new Error('Not authenticated');

  const content = formData.get('content') as string;
  const subject = formData.get('subject') as string || 'New Message';

  await db.insert(messages).values({
    userId: user.id,
    subject,
    content,
    direction: 'inbound',
    isRead: false,
    status: 'sent',
  });

  revalidatePath('/portal/dashboard');
  return { success: true };
}

export async function getOrderHistory() {
  const user = await getUser();
  if (!user) return [];

  const orderHistory = await db.query.orders.findMany({
    where: eq(orders.userId, user.id),
    orderBy: [desc(orders.createdAt)],
    with: {
      items: true,
    },
  });

  return orderHistory;
}

export async function getBillingData() {
  const user = await getUser();
  if (!user) return null;

  const { payments } = await import('@/db/schema/payments');
  
  const userPayments = await db.query.payments.findMany({
    where: eq(payments.userId, user.id),
    orderBy: [desc(payments.createdAt)],
  });

  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userId, user.id),
  });

  const totalBilled = userOrders.reduce((sum, order) => sum + parseFloat(order.total || '0'), 0);
  const totalPaid = userPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + parseFloat(payment.amount || '0'), 0);
  const accountBalance = totalBilled - totalPaid;

  return {
    payments: userPayments,
    totalBilled,
    totalPaid,
    accountBalance,
    pendingPayments: userPayments.filter(p => p.status === 'pending'),
  };
}
