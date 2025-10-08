import { pgTable, serial, varchar, text, integer, decimal, timestamp, text as textArray, pgEnum } from 'drizzle-orm/pg-core';

// Course status enum
export const courseStatusEnum = pgEnum('course_status', ['DRAFT', 'PUBLISHED']);

// Drizzle schema for the 'courses' table
export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  level: varchar('level', { length: 50 }).notNull(), 
  duration: integer('duration').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  images: textArray('images').array(),
  videos: textArray('videos').array(),
  status: courseStatusEnum('status').default('DRAFT').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Infer TypeScript types from the schema for use in our application
export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;