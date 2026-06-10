'use server';

import { db } from '@/db';
import { users } from '@/db/schema/auth';
import { quotations } from '@/db/schema/quotations';
import { messages } from '@/db/schema/messages';
import { clients } from '@/db/schema/clients';
import { count, eq, inArray, isNull, and, desc, ilike, or, sql } from 'drizzle-orm';
import { requireRole } from '@/lib/auth';

// ── Technician Availability ──────────────────────────────────────────────────
// Returns active technicians with their active-job count (assigned or in_progress).
// Sorted least-busy first. No staff email/phone — name + id only.
export async function getTechnicianAvailability() {
  await requireRole(['receptionist', 'super_admin']);

  const activeJobCount = db
    .select({ assignedTo: quotations.assignedTo, cnt: count().as('cnt') })
    .from(quotations)
    .where(
      and(
        isNull(quotations.deletedAt),
        inArray(quotations.status as any, ['assigned', 'in_progress']),
      ),
    )
    .groupBy(quotations.assignedTo)
    .as('active_jobs');

  const rows = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      activeJobs: sql<number>`coalesce(${activeJobCount.cnt}, 0)`,
    })
    .from(users)
    .leftJoin(activeJobCount, eq(users.id, activeJobCount.assignedTo))
    .where(
      and(
        eq(users.role, 'technician'),
        eq(users.isActive, true),
        isNull(users.deletedAt),
      ),
    )
    .orderBy(sql`coalesce(${activeJobCount.cnt}, 0)`, users.firstName);

  return rows.map((r) => ({
    id: r.id,
    name: `${r.firstName} ${r.lastName}`.trim(),
    activeJobs: Number(r.activeJobs),
  }));
}

// ── Recent Inbound Inquiries ─────────────────────────────────────────────────
// Latest 10 inbound messages with sender name + snippet.
export async function getRecentInquiries() {
  await requireRole(['receptionist', 'super_admin']);

  const rows = await db
    .select({
      id: messages.id,
      subject: messages.subject,
      content: messages.content,
      createdAt: messages.createdAt,
      senderFirstName: users.firstName,
      senderLastName: users.lastName,
    })
    .from(messages)
    .leftJoin(users, eq(messages.userId, users.id))
    .where(eq(messages.direction, 'inbound'))
    .orderBy(desc(messages.createdAt))
    .limit(10);

  return rows.map((r) => ({
    id: r.id,
    subject: r.subject,
    snippet: r.content ? r.content.slice(0, 120) : '',
    createdAt: r.createdAt,
    senderName: r.senderFirstName
      ? `${r.senderFirstName} ${r.senderLastName ?? ''}`.trim()
      : 'Unknown',
  }));
}

// ── Contact Directory ────────────────────────────────────────────────────────
// Client contact info — NO financial joins, excludes soft-deleted.
// Optional case-insensitive name or phone search.
export async function getContactDirectory(query?: string) {
  await requireRole(['receptionist', 'super_admin']);

  const q = query?.trim();
  const escaped = q ? q.replace(/[\\%_]/g, (m) => '\\' + m) : undefined;

  const where = escaped
    ? and(
        isNull(clients.deletedAt),
        or(ilike(clients.name, `%${escaped}%`), ilike(clients.phone, `%${escaped}%`)),
      )
    : isNull(clients.deletedAt);

  return db
    .select({
      id: clients.id,
      name: clients.name,
      email: clients.email,
      phone: clients.phone,
      address: clients.address,
      city: clients.city,
      status: clients.status,
    })
    .from(clients)
    .where(where)
    .orderBy(clients.name);
}
