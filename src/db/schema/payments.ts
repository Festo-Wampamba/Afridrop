import { pgTable, uuid, varchar, text, timestamp, decimal, jsonb, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './auth';
import { orders } from './orders';

// Payments
export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'set null' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(), // flutterwave_mobile, flutterwave_card, bank_transfer, cash
  transactionId: varchar('transaction_id', { length: 255 }),
  
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('UGX'), // Ugandan Shilling
  
  status: varchar('status', { length: 20 }).default('pending'), // pending, completed, failed, refunded
  
  // Payment Gateway Response
  gatewayResponse: jsonb('gateway_response'),
  
  // Additional Info
  notes: text('notes'),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Inventory Stock
export const inventoryStock = pgTable('inventory_stock', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').notNull(),
  variantId: uuid('variant_id'),
  
  quantityOnHand: integer('quantity_on_hand').default(0),
  quantityReserved: integer('quantity_reserved').default(0),
  
  reorderPoint: integer('reorder_point').default(10),
  reorderQuantity: integer('reorder_quantity').default(50),
  
  location: varchar('location', { length: 100 }),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Inventory Transactions
export const inventoryTransactions = pgTable('inventory_transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id'),
  variantId: uuid('variant_id'),
  
  type: varchar('type', { length: 20 }).notNull(), // purchase, sale, adjustment, return, damage
  quantity: integer('quantity').notNull(),
  
  referenceType: varchar('reference_type', { length: 50 }),
  referenceId: uuid('reference_id'),
  
  performedBy: uuid('performed_by').references(() => users.id, { onDelete: 'set null' }),
  notes: text('notes'),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Audit Logs
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  
  action: varchar('action', { length: 50 }).notNull(),
  resourceType: varchar('resource_type', { length: 50 }).notNull(),
  resourceId: uuid('resource_id'),
  
  oldValues: jsonb('old_values'),
  newValues: jsonb('new_values'),
  
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Relations
export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
}));

export const inventoryTransactionsRelations = relations(inventoryTransactions, ({ one }) => ({
  performer: one(users, {
    fields: [inventoryTransactions.performedBy],
    references: [users.id],
  }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
}));
