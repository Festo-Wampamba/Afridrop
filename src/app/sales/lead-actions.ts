'use server';

import { db } from '@/db';
import { clients } from '@/db/schema/clients';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ALLOWED_STATUSES = ['active', 'inactive'] as const;
type AllowedStatus = (typeof ALLOWED_STATUSES)[number];

export async function updateLeadStatus(formData: FormData) {
  await requireRole(['sales_manager', 'super_admin']);

  const leadId = formData.get('leadId') as string;
  const newStatus = formData.get('newStatus') as string;

  if (!leadId || !UUID_RE.test(leadId)) throw new Error('Invalid lead id');
  if (!ALLOWED_STATUSES.includes(newStatus as AllowedStatus)) {
    throw new Error('Invalid status');
  }

  const updated = await db
    .update(clients)
    .set({ status: newStatus, updatedAt: new Date() })
    .where(and(eq(clients.id, leadId), eq(clients.status, 'lead')))
    .returning({ id: clients.id });

  if (updated.length === 0) {
    throw new Error('Lead already converted or not found');
  }

  revalidatePath('/sales/leads');
  revalidatePath('/sales');
}
