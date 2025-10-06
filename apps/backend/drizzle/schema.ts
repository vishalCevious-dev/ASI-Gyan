import { pgTable, unique, uuid, varchar, timestamp, foreignKey, text, boolean, jsonb, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const blogStatus = pgEnum("blog_status", ['DRAFT', 'PUBLISHED'])
export const galleryStatus = pgEnum("gallery_status", ['DRAFT', 'PUBLISHED'])
export const galleryType = pgEnum("gallery_type", ['PHOTO', 'VIDEO'])
export const urlPostPlatform = pgEnum("url_post_platform", ['INSTAGRAM_REELS', 'YOUTUBE_SHORTS', 'TIKTOK', 'FACEBOOK', 'TWITTER'])
export const urlPostStatus = pgEnum("url_post_status", ['DRAFT', 'PUBLISHED', 'SCHEDULED'])
export const userRole = pgEnum("user_role", ['ADMIN', 'USER'])
export const videoPlatform = pgEnum("video_platform", ['youtube', 'youtube-shorts', 'instagram-reel', 'instagram-post', 'tiktok', 'vimeo', 'twitter', 'dailymotion', 'direct-video', 'unknown'])
export const videoType = pgEnum("video_type", ['reel', 'short', 'video', 'post'])


export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	role: userRole().default('USER').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const blog = pgTable("blog", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull(),
	excerpt: varchar({ length: 512 }),
	content: text().notNull(),
	coverImageUrl: varchar("cover_image_url", { length: 512 }),
	videoUrl: varchar("video_url", { length: 512 }),
	category: varchar({ length: 128 }),
	tags: text().array(),
	metaDescription: varchar("meta_description", { length: 160 }),
	status: blogStatus().default('DRAFT').notNull(),
	authorId: uuid("author_id"),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [users.id],
			name: "blog_author_id_users_id_fk"
		}),
	unique("blog_slug_unique").on(table.slug),
]);

export const urlPost = pgTable("url_post", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	originalUrl: varchar("original_url", { length: 512 }).notNull(),
	thumbnailUrl: varchar("thumbnail_url", { length: 512 }),
	platform: urlPostPlatform().notNull(),
	status: urlPostStatus().default('DRAFT').notNull(),
	scheduledAt: timestamp("scheduled_at", { mode: 'string' }),
	postedAt: timestamp("posted_at", { mode: 'string' }),
	externalPostId: varchar("external_post_id", { length: 255 }),
	externalPostUrl: varchar("external_post_url", { length: 512 }),
	tags: text().array(),
	category: varchar({ length: 128 }),
	authorId: uuid("author_id"),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [users.id],
			name: "url_post_author_id_users_id_fk"
		}),
]);

export const gallery = pgTable("gallery", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	type: galleryType().default('PHOTO').notNull(),
	imageUrl: varchar("image_url", { length: 512 }),
	videoUrl: varchar("video_url", { length: 512 }),
	status: galleryStatus().default('PUBLISHED').notNull(),
	category: varchar({ length: 128 }),
	tags: jsonb(),
	isDeleted: boolean("is_deleted").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	videoPlatform: videoPlatform("video_platform"),
	videoType: videoType("video_type"),
	videoId: varchar("video_id", { length: 128 }),
	embedUrl: varchar("embed_url", { length: 512 }),
	thumbnailUrl: varchar("thumbnail_url", { length: 512 }),
	isShortForm: boolean("is_short_form").default(false),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
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