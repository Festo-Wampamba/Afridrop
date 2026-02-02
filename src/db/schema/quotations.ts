import { pgTable, uuid, varchar, text, timestamp, decimal, date, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './auth';
import { products } from './products';

// Quotations
export const quotations = pgTable('quotations', {
  id: uuid('id').defaultRandom().primaryKey(),
  quotationNumber: varchar('quotation_number', { length: 50 }).notNull().unique(),
  customerId: uuid('customer_id').references(() => users.id, { onDelete: 'set null' }),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 20 }),
  projectDescription: text('project_description').notNull(),
  location: varchar('location', { length: 255 }),
  estimatedBudget: decimal('estimated_budget', { precision: 12, scale: 2 }),
  status: varchar('status', { length: 20 }).default('pending'), // pending, reviewed, approved, rejected, converted
  totalAmount: decimal('total_amount', { precision: 12, scale: 2 }),
  notes: text('notes'),
  validUntil: date('valid_until'),
  assignedTo: uuid('assigned_to').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

// Quotation Items
export const quotationItems = pgTable('quotation_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  quotationId: uuid('quotation_id').notNull().references(() => quotations.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'set null' }),
  description: text('description').notNull(),
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  discountPercentage: decimal('discount_percentage', { precision: 5, scale: 2 }).default('0'),
  taxPercentage: decimal('tax_percentage', { precision: 5, scale: 2 }).default('0'),
  subtotal: decimal('subtotal', { precision: 12, scale: 2 }).notNull(),
  displayOrder: integer('display_order').default(0),
});

// Relations
export const quotationsRelations = relations(quotations, ({ one, many }) => ({
  customer: one(users, {
    fields: [quotations.customerId],
    references: [users.id],
  }),
  assignee: one(users, {
    fields: [quotations.assignedTo],
    references: [users.id],
  }),
  items: many(quotationItems),
}));

export const quotationItemsRelations = relations(quotationItems, ({ one }) => ({
  quotation: one(quotations, {
    fields: [quotationItems.quotationId],
    references: [quotations.id],
  }),
  product: one(products, {
    fields: [quotationItems.productId],
    references: [products.id],
  }),
}));
