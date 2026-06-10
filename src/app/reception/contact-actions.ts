'use server';

import { db } from '@/db';
import { clients } from '@/db/schema/clients';
import { eq, and, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_LEN = 200;

function trimCap(val: FormDataEntryValue | null): string | undefined {
  if (!val) return undefined;
  const s = String(val).trim();
  return s.length > 0 ? s.slice(0, MAX_LEN) : undefined;
}

// Receptionist may only update contact fields: phone, email, address, city.
// Status and all other fields are intentionally excluded.
export async function updateClientContact(formData: FormData) {
  await requireRole(['receptionist', 'super_admin']);

  const clientId = formData.get('clientId') as string;
  if (!clientId || !UUID_RE.test(clientId)) throw new Error('Invalid client id');

  const phone = trimCap(formData.get('phone'));
  const email = trimCap(formData.get('email'));
  const address = trimCap(formData.get('address'));
  const city = trimCap(formData.get('city'));

  const updated = await db
    .update(clients)
    .set({
      ...(phone !== undefined && { phone }),
      ...(email !== undefined && { email }),
      ...(address !== undefined && { address }),
      ...(city !== undefined && { city }),
      updatedAt: new Date(),
    })
    .where(and(eq(clients.id, clientId), isNull(clients.deletedAt)))
    .returning({ id: clients.id });

  if (updated.length === 0) {
    throw new Error('Client not found or has been deleted');
  }

  revalidatePath('/reception/contacts');
}
