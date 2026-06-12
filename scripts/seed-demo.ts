// Seed staff accounts + demo data so every dashboard has content.
// Idempotent: accounts are skipped if the email exists; demo rows are tagged
// with QT-SEED-* numbers / "[seed]" notes and only inserted once.
//
// Run: NODE_OPTIONS='--dns-result-order=ipv4first' npx tsx --env-file=.env.local scripts/seed-demo.ts
import { auth } from '../src/lib/auth';
import { db } from '../src/db';
import { users } from '../src/db/schema/auth';
import { clients } from '../src/db/schema/clients';
import { quotations } from '../src/db/schema/quotations';
import { payments } from '../src/db/schema/payments';
import { messages } from '../src/db/schema/messages';
import { technicianReports } from '../src/db/schema/reports';
import { and, eq, isNull, like } from 'drizzle-orm';

const PASSWORD = 'Afridrop2026!';

const STAFF = [
  { email: 'tech@afridrop.com', firstName: 'Peter', lastName: 'Okello', role: 'technician' },
  { email: 'sales@afridrop.com', firstName: 'Sarah', lastName: 'Nakato', role: 'sales_manager' },
  { email: 'accountant@afridrop.com', firstName: 'Joseph', lastName: 'Mugisha', role: 'accountant' },
] as const;

async function ensureUser(s: (typeof STAFF)[number]): Promise<string> {
  const [existing] = await db.select({ id: users.id, deletedAt: users.deletedAt }).from(users).where(eq(users.email, s.email)).limit(1);
  if (existing) {
    if (existing.deletedAt) {
      await db.update(users).set({ deletedAt: null, isActive: true, role: s.role }).where(eq(users.id, existing.id));
      console.log(`restored ${s.email} (${s.role})`);
    } else {
      console.log(`exists ${s.email} (${s.role})`);
    }
    return existing.id;
  }
  const res = await auth.api.createUser({
    body: {
      email: s.email,
      password: PASSWORD,
      name: `${s.firstName} ${s.lastName}`,
      role: s.role,
      data: { firstName: s.firstName, lastName: s.lastName },
    },
  });
  console.log(`created ${s.email} (${s.role})`);
  return res.user.id;
}

async function main() {
  // 1. Staff accounts
  const techId = await ensureUser(STAFF[0]);
  await ensureUser(STAFF[1]);
  await ensureUser(STAFF[2]);

  // 2. Verify the technician can actually sign in (the reported bug).
  try {
    const login = await auth.api.signInEmail({ body: { email: 'tech@afridrop.com', password: PASSWORD } });
    console.log('technician login check: OK, role =', (login.user as { role?: string }).role ?? 'technician');
  } catch (e) {
    console.error('technician login check FAILED:', e);
    process.exit(1);
  }

  // Reference users for demo data.
  const [manager] = await db.select({ id: users.id }).from(users)
    .where(and(eq(users.role, 'manager'), eq(users.isActive, true), isNull(users.deletedAt))).limit(1);
  const [customer] = await db.select({ id: users.id, name: users.name, email: users.email }).from(users)
    .where(and(eq(users.role, 'customer'), eq(users.isActive, true), isNull(users.deletedAt))).limit(1);

  // 3. Demo rows — only once (tagged via QT-SEED numbers).
  const seeded = await db.select({ id: quotations.id }).from(quotations).where(like(quotations.quotationNumber, 'QT-SEED-%')).limit(1);
  if (seeded.length > 0) {
    console.log('demo data already seeded — skipping');
    process.exit(0);
  }

  // Clients (reception contacts + manager scope + accounts clients)
  const clientRows = await db.insert(clients).values([
    { name: 'Hotel Crane Gardens', email: 'frontdesk@cranegardens.ug', phone: '+256 772 100200', address: 'Plot 14 Kira Rd', city: 'Kampala', poolType: 'concrete', poolSize: '12m x 6m', status: 'active', assignedManagerId: manager?.id ?? null, notes: '[seed]' },
    { name: 'Lakeview Apartments', email: 'admin@lakeview.ug', phone: '+256 701 334455', address: 'Bugonga Rd', city: 'Entebbe', poolType: 'fiberglass', poolSize: '8m x 4m', status: 'active', assignedManagerId: manager?.id ?? null, notes: '[seed]' },
    { name: 'Ssemanda Residence', email: 'dssemanda@gmail.com', phone: '+256 752 998877', address: 'Muyenga Hill', city: 'Kampala', poolType: 'vinyl', poolSize: '6m x 3m', status: 'lead', notes: '[seed]' },
    { name: 'Acacia Country Club', email: 'ops@acaciaclub.ug', phone: '+256 788 220011', address: 'Acacia Avenue', city: 'Mbarara', poolType: 'concrete', poolSize: '15m x 8m', status: 'lead', notes: '[seed]' },
  ]).returning({ id: clients.id });

  // Quotations across the whole pipeline (director, sales, manager, technician views)
  const custName = customer?.name ?? 'James Bond';
  const custEmail = customer?.email ?? 'bond@gmail.com';
  const q = (n: number) => `QT-SEED-${String(n).padStart(3, '0')}`;
  const quotes = await db.insert(quotations).values([
    { quotationNumber: q(1), customerId: customer?.id ?? null, customerName: custName, customerEmail: custEmail, customerPhone: '+256 700 111222', projectDescription: 'Weekly pool cleaning and chemical balancing', location: 'Muyenga, Kampala', estimatedBudget: '450000', status: 'pending', notes: '[seed]' },
    { quotationNumber: q(2), customerName: 'Hotel Crane Gardens', customerEmail: 'frontdesk@cranegardens.ug', customerPhone: '+256 772 100200', projectDescription: 'Pump replacement and filter overhaul', location: 'Kira Rd, Kampala', estimatedBudget: '2800000', totalAmount: '3100000', status: 'reviewed', notes: '[seed]' },
    { quotationNumber: q(3), customerName: 'Lakeview Apartments', customerEmail: 'admin@lakeview.ug', projectDescription: 'New pool construction — 8m x 4m fiberglass', location: 'Entebbe', estimatedBudget: '85000000', totalAmount: '92500000', status: 'approved', notes: '[seed]' },
    { quotationNumber: q(4), customerId: customer?.id ?? null, customerName: custName, customerEmail: custEmail, projectDescription: 'Green water treatment and shock chlorination', location: 'Muyenga, Kampala', totalAmount: '650000', status: 'assigned', assignedTo: techId, notes: '[seed]' },
    { quotationNumber: q(5), customerName: 'Hotel Crane Gardens', customerEmail: 'frontdesk@cranegardens.ug', projectDescription: 'Tile regrouting and underwater light repair', location: 'Kira Rd, Kampala', totalAmount: '1900000', status: 'in_progress', assignedTo: techId, notes: '[seed]' },
    { quotationNumber: q(6), customerName: 'Lakeview Apartments', customerEmail: 'admin@lakeview.ug', projectDescription: 'Quarterly maintenance visit', location: 'Entebbe', totalAmount: '750000', status: 'completed', assignedTo: techId, notes: '[seed]' },
    { quotationNumber: q(7), customerName: 'Acacia Country Club', customerEmail: 'ops@acaciaclub.ug', projectDescription: 'Olympic lane rope and starting block supply', location: 'Mbarara', estimatedBudget: '12000000', status: 'on_hold', notes: '[seed]' },
  ]).returning({ id: quotations.id, status: quotations.status });

  // Payments (accounts dashboard)
  if (customer) {
    await db.insert(payments).values([
      { userId: customer.id, paymentMethod: 'flutterwave_mobile', transactionId: 'FLW-SEED-90001', amount: '450000', currency: 'UGX', status: 'completed', notes: '[seed] Weekly cleaning — March' },
      { userId: customer.id, paymentMethod: 'bank_transfer', transactionId: 'BT-SEED-90002', amount: '3100000', currency: 'UGX', status: 'completed', notes: '[seed] Pump replacement deposit' },
      { userId: customer.id, paymentMethod: 'cash', amount: '650000', currency: 'UGX', status: 'pending', notes: '[seed] Green water treatment' },
      { userId: customer.id, paymentMethod: 'flutterwave_card', transactionId: 'FLW-SEED-90004', amount: '750000', currency: 'UGX', status: 'failed', notes: '[seed] Card declined — retry requested' },
    ]);
  }

  // Messages (manager/reception threads + technician clarification thread)
  if (customer) {
    await db.insert(messages).values([
      { userId: customer.id, subject: 'Service request follow-up', content: 'Hello, when will the technician arrive for the green water treatment?', direction: 'inbound', isRead: false },
      { userId: customer.id, subject: 'Service request follow-up', content: 'Good afternoon — our technician is scheduled for Friday 9am. Thank you for your patience.', direction: 'outbound', isRead: true },
    ]);
  }
  await db.insert(messages).values([
    { userId: techId, subject: 'Task clarification', content: 'For the Hotel Crane Gardens light repair — should I replace the transformer too or only the lamp unit?', direction: 'inbound', isRead: false },
  ]);

  // Technician reports (technician + manager review views)
  const completedJob = quotes.find((x) => x.status === 'completed');
  const inProgressJob = quotes.find((x) => x.status === 'in_progress');
  await db.insert(technicianReports).values([
    { technicianId: techId, jobId: completedJob?.id ?? null, title: 'Quarterly maintenance — Lakeview Apartments', content: 'Backwashed filter, balanced pH to 7.4, vacuumed pool floor, inspected pump seals. All equipment in good order.', undoneItems: null, status: 'submitted', submittedAt: new Date() },
    { technicianId: techId, jobId: inProgressJob?.id ?? null, title: 'Tile regrouting progress — Hotel Crane Gardens', content: 'Drained shallow end, removed loose grout on 14 sqm. Regrouting 60% done.', undoneItems: 'Underwater light repair pending transformer clarification; deep-end grout section remaining.', status: 'draft' },
  ]);

  console.log(`seeded: ${clientRows.length} clients, ${quotes.length} quotations, 4 payments, 3 messages, 2 reports`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
