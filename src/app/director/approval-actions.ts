'use server';

import { db } from '@/db';
import { quotations } from '@/db/schema/quotations';
import { auditLogs } from '@/db/schema/payments';
import { eq, and, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function transitionQuotation(
  quotationId: string,
  newStatus: 'approved' | 'rejected',
  userId: string,
) {
  if (!quotationId || !UUID_RE.test(quotationId)) throw new Error('Invalid quotation id');

  await db.transaction(async (tx) => {
    const updated = await tx
      .update(quotations)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(
        and(
          eq(quotations.id, quotationId),
          inArray(quotations.status as any, ['pending', 'reviewed']),
        ),
      )
      .returning({ id: quotations.id });

    if (updated.length === 0) {
      throw new Error('Quotation is no longer pending approval');
    }

    await tx.insert(auditLogs).values({
      userId,
      action: `quotation.${newStatus}`,
      resourceType: 'quotation',
      resourceId: quotationId,
      newValues: { status: newStatus },
    });
  });
}

export async function approveQuotation(formData: FormData) {
  const session = await requireRole(['director', 'super_admin']);
  const quotationId = formData.get('quotationId') as string;
  if (!quotationId) throw new Error('Missing quotationId');

  await transitionQuotation(quotationId, 'approved', session.user.id);

  revalidatePath('/director/approvals');
  revalidatePath('/director');
}

export async function rejectQuotation(formData: FormData) {
  const session = await requireRole(['director', 'super_admin']);
  const quotationId = formData.get('quotationId') as string;
  if (!quotationId) throw new Error('Missing quotationId');

  await transitionQuotation(quotationId, 'rejected', session.user.id);

  revalidatePath('/director/approvals');
  revalidatePath('/director');
}
