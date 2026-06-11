'use server';

import { db } from '@/db';
import { messages } from '@/db/schema/messages';
import { and, asc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';

export async function getMyThread() {
  const session = await requireRole(['technician']);

  // Mark office replies (outbound) as read before returning.
  await db
    .update(messages)
    .set({ isRead: true, updatedAt: new Date() })
    .where(
      and(
        eq(messages.userId, session.user.id),
        eq(messages.direction, 'outbound'),
        eq(messages.isRead, false),
      ),
    );

  return db
    .select()
    .from(messages)
    .where(eq(messages.userId, session.user.id))
    .orderBy(asc(messages.createdAt));
}

export async function sendTechnicianMessage(formData: FormData) {
  const session = await requireRole(['technician']);

  const content = (formData.get('content') as string)?.trim();
  if (!content) throw new Error('Message content is required');
  if (content.length > 2000) throw new Error('Message too long (max 2000 characters)');

  const subject = 'Task clarification';

  await db.insert(messages).values({
    userId: session.user.id,
    subject,
    content,
    direction: 'inbound',
    isRead: false,
    status: 'sent',
  });

  revalidatePath('/technician/messages');
}
