'use server';

import { db } from '@/db';
import { users } from '@/db/schema/auth';
import { orders } from '@/db/schema/orders';
import { messages } from '@/db/schema/messages';
import { quotations } from '@/db/schema/quotations';
import { eq, desc, and, count } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Mock getUser - in production this would use next-auth
async function getUser() {
  // diverse strategy: try to find the admin user, or the first user
  const user = await db.query.users.findFirst({
    where: eq(users.email, 'admin@afridrop.com'),
  });
  
  return user;
}

export async function getDashboardData() {
  const user = await getUser();
  if (!user) return null;

  // Get upcoming orders (mock logic for "upcoming")
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
        eq(messages.direction, 'outbound') // Messages FROM admin TO user
      )
    );

  return {
    user: {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    },
    upcomingOrders,
    unreadMessages: unreadMessagesCount[0]?.count || 0,
  };
}

export async function getSchedule() {
  const user = await getUser();
  if (!user) return [];

  // Fetch orders that might act as "scheduled services"
  // In a real app, this might be a separate 'appointments' table or status
  const scheduledServices = await db.query.orders.findMany({
    where: eq(orders.userId, user.id),
    orderBy: [desc(orders.createdAt)],
  });

  return scheduledServices;
}

export async function submitServiceRequest(formData: FormData) {
  const user = await getUser();
  if (!user) throw new Error('Not authenticated');

  const serviceType = formData.get('serviceType') as string;
  const description = formData.get('description') as string;
  const preferredDate = formData.get('date') as string;

  // Create a quotation for the request
  await db.insert(quotations).values({
    quotationNumber: `REQ-${Date.now()}`, // Simple ID generation
    customerId: user.id,
    customerName: `${user.firstName} ${user.lastName}`,
    customerEmail: user.email,
    projectDescription: `[${serviceType}] ${description}`,
    validUntil: preferredDate ? new Date(preferredDate).toISOString() : null, // Using validUntil as preferred date holder for now
    status: 'pending',
  });

  revalidatePath('/portal/dashboard');
  return { success: true };
}

export async function getMessages() {
  const user = await getUser();
  if (!user) return [];

  // Fetch all messages for the user
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
    direction: 'inbound', // From client to admin
    isRead: false,
    status: 'sent',
  });

  revalidatePath('/portal/dashboard');
  return { success: true };
}
