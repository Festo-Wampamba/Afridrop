'use server';

import { db } from '@/db';
import { quotations } from '@/db/schema/quotations';
import { auditLogs } from '@/db/schema/payments';
import { eq, and, inArray, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Director-allowed status transitions: fromStatus → allowed toStatuses
const DIRECTOR_TRANSITIONS: Record<string, string[]> = {
  pending:     ['approved', 'rejected', 'on_hold', 'cancelled'],
  reviewed:    ['approved', 'rejected', 'on_hold', 'cancelled'],
  on_hold:     ['approved', 'rejected', 'pending', 'cancelled'],
  approved:    ['on_hold', 'cancelled'],
  rejected:    ['pending'],
  assigned:    ['cancelled'],
  in_progress: ['cancelled'],
};
// completed, verified, converted → no director transitions (terminal)

const TERMINAL_STATUSES = ['completed', 'verified', 'converted'];

async function transitionQuotation(
  quotationId: string,
  newStatus: string,
  userId: string,
  allowedFromStatuses: string[],
) {
  if (!quotationId || !UUID_RE.test(quotationId)) throw new Error('Invalid quotation id');

  await db.transaction(async (tx) => {
    const updated = await tx
      .update(quotations)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(
        and(
          eq(quotations.id, quotationId),
          inArray(quotations.status as any, allowedFromStatuses),
        ),
      )
      .returning({ id: quotations.id });

    if (updated.length === 0) {
      throw new Error('Quotation cannot be transitioned from its current status');
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

// Generalized director status transition — validates against the allow-list map.
export async function setQuotationStatus(formData: FormData) {
  const session = await requireRole(['director', 'super_admin']);
  const quotationId = formData.get('quotationId') as string;
  const targetStatus = formData.get('targetStatus') as string;

  if (!quotationId) throw new Error('Missing quotationId');
  if (!targetStatus) throw new Error('Missing targetStatus');

  // Load current status to validate the transition
  if (!UUID_RE.test(quotationId)) throw new Error('Invalid quotation id');
  const row = await db.query.quotations.findFirst({
    where: and(eq(quotations.id, quotationId), isNull(quotations.deletedAt)),
    columns: { status: true },
  });
  if (!row) throw new Error('Quotation not found');

  const currentStatus = row.status ?? 'pending';
  if (TERMINAL_STATUSES.includes(currentStatus)) {
    throw new Error('Quotation is in a terminal status and cannot be changed');
  }

  const allowed = DIRECTOR_TRANSITIONS[currentStatus] ?? [];
  if (!allowed.includes(targetStatus)) {
    throw new Error(`Cannot transition from '${currentStatus}' to '${targetStatus}'`);
  }

  await transitionQuotation(quotationId, targetStatus, session.user.id, [currentStatus]);

  revalidatePath('/director/quotations');
  revalidatePath('/director/approvals');
  revalidatePath('/director');
}

// Thin wrappers — keep existing callers on /director/approvals working.
export async function approveQuotation(formData: FormData) {
  const session = await requireRole(['director', 'super_admin']);
  const quotationId = formData.get('quotationId') as string;
  if (!quotationId) throw new Error('Missing quotationId');

  await transitionQuotation(quotationId, 'approved', session.user.id, ['pending', 'reviewed', 'on_hold']);

  revalidatePath('/director/approvals');
  revalidatePath('/director/quotations');
  revalidatePath('/director');
}

export async function rejectQuotation(formData: FormData) {
  const session = await requireRole(['director', 'super_admin']);
  const quotationId = formData.get('quotationId') as string;
  if (!quotationId) throw new Error('Missing quotationId');

  await transitionQuotation(quotationId, 'rejected', session.user.id, ['pending', 'reviewed', 'on_hold']);

  revalidatePath('/director/approvals');
  revalidatePath('/director/quotations');
  revalidatePath('/director');
}

// Director edits a quotation's mutable fields.
export async function updateQuotation(formData: FormData) {
  const session = await requireRole(['director', 'super_admin']);
  const quotationId = formData.get('quotationId') as string;
  if (!quotationId || !UUID_RE.test(quotationId)) throw new Error('Invalid quotation id');

  const projectDescription = (formData.get('projectDescription') as string)?.trim();
  const location = (formData.get('location') as string)?.trim() || null;
  const totalAmountRaw = (formData.get('totalAmount') as string)?.trim();
  const validUntilRaw = (formData.get('validUntil') as string)?.trim();
  const notes = (formData.get('notes') as string)?.trim() || null;

  const totalAmount = totalAmountRaw ? parseFloat(totalAmountRaw) : null;
  if (totalAmountRaw && (isNaN(totalAmount!) || totalAmount! < 0)) {
    throw new Error('Invalid total amount');
  }

  const validUntil = validUntilRaw || null;

  await db.transaction(async (tx) => {
    const row = await tx.query.quotations.findFirst({
      where: and(eq(quotations.id, quotationId), isNull(quotations.deletedAt)),
      columns: { status: true },
    });
    if (!row) throw new Error('Quotation not found');
    if (TERMINAL_STATUSES.includes(row.status ?? '')) {
      throw new Error('Cannot edit a quotation in a terminal status');
    }

    const setValues: Record<string, unknown> = { updatedAt: new Date() };
    if (projectDescription) setValues.projectDescription = projectDescription;
    if (location !== undefined) setValues.location = location;
    if (totalAmountRaw !== undefined && totalAmountRaw !== '') setValues.totalAmount = String(totalAmount);
    if (validUntil !== undefined) setValues.validUntil = validUntil;
    if (notes !== undefined) setValues.notes = notes;

    await tx.update(quotations).set(setValues).where(eq(quotations.id, quotationId));

    await tx.insert(auditLogs).values({
      userId: session.user.id,
      action: 'quotation.updated',
      resourceType: 'quotation',
      resourceId: quotationId,
      newValues: setValues,
    });
  });

  revalidatePath('/director/quotations');
}

// Director creates a new quotation on behalf of a customer.
export async function createQuotation(formData: FormData) {
  const session = await requireRole(['director', 'super_admin']);

  const customerName = (formData.get('customerName') as string)?.trim();
  const customerEmail = (formData.get('customerEmail') as string)?.trim() || '';
  const projectDescription = (formData.get('projectDescription') as string)?.trim();
  const location = (formData.get('location') as string)?.trim() || null;
  const totalAmountRaw = (formData.get('totalAmount') as string)?.trim();
  const validUntilRaw = (formData.get('validUntil') as string)?.trim();
  const notes = (formData.get('notes') as string)?.trim() || null;

  if (!customerName) throw new Error('Customer name is required');
  if (!projectDescription) throw new Error('Project description is required');

  const totalAmount = totalAmountRaw ? parseFloat(totalAmountRaw) : null;
  if (totalAmountRaw && (isNaN(totalAmount!) || totalAmount! < 0)) {
    throw new Error('Invalid total amount');
  }

  const quotationNumber = `QT-${Date.now()}`;

  await db.transaction(async (tx) => {
    const [inserted] = await tx
      .insert(quotations)
      .values({
        quotationNumber,
        customerName,
        customerEmail,
        projectDescription,
        location,
        totalAmount: totalAmount !== null ? String(totalAmount) : null,
        validUntil: validUntilRaw || null,
        notes,
        status: 'pending',
      })
      .returning({ id: quotations.id });

    await tx.insert(auditLogs).values({
      userId: session.user.id,
      action: 'quotation.created',
      resourceType: 'quotation',
      resourceId: inserted.id,
      newValues: { quotationNumber, customerName, status: 'pending' },
    });
  });

  revalidatePath('/director/quotations');
}
