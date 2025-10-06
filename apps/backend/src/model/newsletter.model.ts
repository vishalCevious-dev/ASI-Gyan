import { pgTable, unique, uuid, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

export const NewsletterSubscribers = pgTable("newsletter_subscribers", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }),
	isActive: boolean("is_active").default(true).notNull(),
	subscribedAt: timestamp("subscribed_at", { mode: 'string' }).defaultNow(),
	unsubscribedAt: timestamp("unsubscribed_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("newsletter_subscribers_email_unique").on(table.email),
]);
