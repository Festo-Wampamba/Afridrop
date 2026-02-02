import { pgTable, uuid, varchar, text, timestamp, integer, boolean, date, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './auth';

// Project Tags
export const projectTags = pgTable('project_tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Projects
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  location: varchar('location', { length: 255 }),
  clientName: varchar('client_name', { length: 255 }),
  projectType: varchar('project_type', { length: 50 }), // residential, commercial, public
  completionDate: date('completion_date'),
  budget: decimal('budget', { precision: 12, scale: 2 }),
  featuredImageUrl: text('featured_image_url'),
  status: varchar('status', { length: 20 }).default('completed'), // ongoing, completed, archived
  isFeatured: boolean('is_featured').default(false),
  displayOrder: integer('display_order').default(0),
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

// Project Images
export const projectImages = pgTable('project_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  imageUrl: text('image_url').notNull(),
  caption: text('caption'),
  displayOrder: integer('display_order').default(0),
  uploadedAt: timestamp('uploaded_at', { withTimezone: true }).defaultNow(),
});

// Projects-Tags Junction
export const projectsProjectTags = pgTable('projects_project_tags', {
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id').notNull().references(() => projectTags.id, { onDelete: 'cascade' }),
});

// Relations
export const projectsRelations = relations(projects, ({ one, many }) => ({
  creator: one(users, {
    fields: [projects.createdBy],
    references: [users.id],
  }),
  images: many(projectImages),
  tags: many(projectsProjectTags),
}));

export const projectImagesRelations = relations(projectImages, ({ one }) => ({
  project: one(projects, {
    fields: [projectImages.projectId],
    references: [projects.id],
  }),
}));

export const projectTagsRelations = relations(projectTags, ({ many }) => ({
  projects: many(projectsProjectTags),
}));
