import { pgTable, uuid, varchar, text, timestamp, doublePrecision } from 'drizzle-orm/pg-core';
import { users } from './auth';

// CRM clients. A client may be a lead with no login; optionally linked to a
// users account (userId) for client-portal access.
export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 30 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),

  // Pool details
  poolType: varchar('pool_type', { length: 50 }),   // concrete / fiberglass / vinyl / other
  poolSize: varchar('pool_size', { length: 100 }),  // e.g. "8m x 4m" or volume
  equipment: text('equipment'),                     // pumps / filters / heater notes

  status: varchar('status', { length: 20 }).default('lead').notNull(), // lead / active / inactive
  notes: text('notes'),

  assignedManagerId: uuid('assigned_manager_id').references(() => users.id, { onDelete: 'set null' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }), // optional portal account
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
