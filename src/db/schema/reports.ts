import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './auth';
import { quotations } from './quotations';

export const technicianReports = pgTable('technician_reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  technicianId: uuid('technician_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  jobId: uuid('job_id').references(() => quotations.id, { onDelete: 'set null' }),
  title: varchar('title', { length: 150 }).notNull(),
  content: text('content').notNull(),
  undoneItems: text('undone_items'),
  status: varchar('status', { length: 20 }).notNull().default('draft'), // draft | submitted | reviewed
  submittedAt: timestamp('submitted_at', { withTimezone: true }),
  reviewedBy: uuid('reviewed_by').references(() => users.id, { onDelete: 'set null' }),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewNote: text('review_note'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const technicianReportsRelations = relations(technicianReports, ({ one }) => ({
  technician: one(users, {
    fields: [technicianReports.technicianId],
    references: [users.id],
    relationName: 'reportTechnician',
  }),
  job: one(quotations, {
    fields: [technicianReports.jobId],
    references: [quotations.id],
  }),
  reviewer: one(users, {
    fields: [technicianReports.reviewedBy],
    references: [users.id],
    relationName: 'reportReviewer',
  }),
}));
