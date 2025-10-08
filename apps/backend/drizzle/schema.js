"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courses = exports.newsletterSubscribers = exports.gallery = exports.blog = exports.users = exports.videoType = exports.videoPlatform = exports.userRole = exports.galleryType = exports.galleryStatus = exports.blogStatus = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.blogStatus = (0, pg_core_1.pgEnum)("blog_status", ['DRAFT', 'PUBLISHED']);
exports.galleryStatus = (0, pg_core_1.pgEnum)("gallery_status", ['DRAFT', 'PUBLISHED']);
exports.galleryType = (0, pg_core_1.pgEnum)("gallery_type", ['PHOTO', 'VIDEO']);
exports.userRole = (0, pg_core_1.pgEnum)("user_role", ['ADMIN', 'USER']);
exports.videoPlatform = (0, pg_core_1.pgEnum)("video_platform", ['youtube', 'youtube-shorts', 'instagram-reel', 'instagram-post', 'tiktok', 'vimeo', 'twitter', 'dailymotion', 'direct-video', 'unknown']);
exports.videoType = (0, pg_core_1.pgEnum)("video_type", ['reel', 'short', 'video', 'post']);
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)().defaultRandom().primaryKey().notNull(),
    name: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    password: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    role: (0, exports.userRole)().default('USER').notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
    (0, pg_core_1.unique)("users_email_unique").on(table.email),
]);
exports.blog = (0, pg_core_1.pgTable)("blog", {
    id: (0, pg_core_1.uuid)().defaultRandom().primaryKey().notNull(),
    title: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    slug: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    excerpt: (0, pg_core_1.varchar)({ length: 512 }),
    content: (0, pg_core_1.text)().notNull(),
    coverImageUrl: (0, pg_core_1.varchar)("cover_image_url", { length: 512 }),
    videoUrl: (0, pg_core_1.varchar)("video_url", { length: 512 }),
    category: (0, pg_core_1.varchar)({ length: 128 }),
    tags: (0, pg_core_1.text)().array(),
    metaDescription: (0, pg_core_1.varchar)("meta_description", { length: 160 }),
    status: (0, exports.blogStatus)().default('DRAFT').notNull(),
    authorId: (0, pg_core_1.uuid)("author_id"),
    isDeleted: (0, pg_core_1.boolean)("is_deleted").default(false).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
    (0, pg_core_1.foreignKey)({
        columns: [table.authorId],
        foreignColumns: [exports.users.id],
        name: "blog_author_id_users_id_fk"
    }),
    (0, pg_core_1.unique)("blog_slug_unique").on(table.slug),
]);
exports.gallery = (0, pg_core_1.pgTable)("gallery", {
    id: (0, pg_core_1.uuid)().defaultRandom().primaryKey().notNull(),
    type: (0, exports.galleryType)().default('PHOTO').notNull(),
    imageUrl: (0, pg_core_1.varchar)("image_url", { length: 512 }),
    videoUrl: (0, pg_core_1.varchar)("video_url", { length: 512 }),
    status: (0, exports.galleryStatus)().default('PUBLISHED').notNull(),
    category: (0, pg_core_1.varchar)({ length: 128 }),
    tags: (0, pg_core_1.jsonb)(),
    isDeleted: (0, pg_core_1.boolean)("is_deleted").default(false).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow(),
    videoPlatform: (0, exports.videoPlatform)("video_platform"),
    videoType: (0, exports.videoType)("video_type"),
    videoId: (0, pg_core_1.varchar)("video_id", { length: 128 }),
    embedUrl: (0, pg_core_1.varchar)("embed_url", { length: 512 }),
    thumbnailUrl: (0, pg_core_1.varchar)("thumbnail_url", { length: 512 }),
    isShortForm: (0, pg_core_1.boolean)("is_short_form").default(false),
    title: (0, pg_core_1.varchar)({ length: 255 }).default('Untitled').notNull(),
});
exports.newsletterSubscribers = (0, pg_core_1.pgTable)("newsletter_subscribers", {
    id: (0, pg_core_1.uuid)().defaultRandom().primaryKey().notNull(),
    email: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    name: (0, pg_core_1.varchar)({ length: 255 }),
    isActive: (0, pg_core_1.boolean)("is_active").default(true).notNull(),
    subscribedAt: (0, pg_core_1.timestamp)("subscribed_at", { mode: 'string' }).defaultNow(),
    unsubscribedAt: (0, pg_core_1.timestamp)("unsubscribed_at", { mode: 'string' }),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
    (0, pg_core_1.unique)("newsletter_subscribers_email_unique").on(table.email),
]);
exports.courses = (0, pg_core_1.pgTable)("courses", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 256 }).notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    category: (0, pg_core_1.varchar)("category", { length: 100 }).notNull(),
    level: (0, pg_core_1.varchar)("level", { length: 50 }).notNull(),
    duration: (0, pg_core_1.integer)("duration").notNull(),
    price: (0, pg_core_1.decimal)("price", { precision: 10, scale: 2 }).notNull(),
    images: (0, pg_core_1.text)("images").array(),
    videos: (0, pg_core_1.text)("videos").array(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: 'string' }).defaultNow().notNull(),
});
//# sourceMappingURL=schema.js.map