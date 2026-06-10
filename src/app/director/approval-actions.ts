'use server';

import { db } from '@/db';
import { quotations } from '@/db/schema/quotations';
import { auditLogs } from '@/db/schema/payments';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';

export async function approveQuotation(formData: FormData) {
  const session = await requireRole(['director', 'super_admin']);
  const quotationId = formData.get('quotationId') as string;
  if (!quotationId) throw new Error('Missing quotationId');

  await db
    .update(quotations)
    .set({ status: 'approved', updatedAt: new Date() })
    .where(eq(quotations.id, quotationId));

  await db.insert(auditLogs).values({
    userId: session.user.id,
    action: 'quotation.approved',
    resourceType: 'quotation',
    resourceId: quotationId,
    newValues: { status: 'approved' },
  });

  revalidatePath('/director/approvals');
  revalidatePath('/director');
}

export async function rejectQuotation(formData: FormData) {
  const session = await requireRole(['director', 'super_admin']);
  const quotationId = formData.get('quotationId') as string;
  if (!quotationId) throw new Error('Missing quotationId');

  await db
    .update(quotations)
    .set({ status: 'rejected', updatedAt: new Date() })
    .where(eq(quotations.id, quotationId));

  await db.insert(auditLogs).values({
    userId: session.user.id,
    action: 'quotation.rejected',
    resourceType: 'quotation',
    resourceId: quotationId,
    newValues: { status: 'rejected' },
  });

  revalidatePath('/director/approvals');
  revalidatePath('/director');
}
