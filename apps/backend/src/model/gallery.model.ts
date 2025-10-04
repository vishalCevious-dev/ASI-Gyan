import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

export const galleryTypeEnum = pgEnum("gallery_type", ["PHOTO", "VIDEO"]);
export const galleryStatusEnum = pgEnum("gallery_status", [
  "DRAFT",
  "PUBLISHED",
]);
export const videoPlatformEnum = pgEnum("video_platform", [
  "youtube",
  "youtube-shorts", 
  "instagram-reel",
  "instagram-post",
  "tiktok",
  "vimeo",
  "twitter",
  "dailymotion",
  "direct-video",
  "unknown"
]);
export const videoTypeEnum = pgEnum("video_type", [
  "reel",
  "short", 
  "video",
  "post"
]);

export const Gallery = pgTable("gallery", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull().default("Untitled"),
  type: galleryTypeEnum("type").notNull().default("PHOTO"),
  imageUrl: varchar("image_url", { length: 512 }),
  videoUrl: varchar("video_url", { length: 512 }),
  videoPlatform: videoPlatformEnum("video_platform"),
  videoType: videoTypeEnum("video_type"),
  videoId: varchar("video_id", { length: 128 }),
  embedUrl: varchar("embed_url", { length: 512 }),
  thumbnailUrl: varchar("thumbnail_url", { length: 512 }),
  isShortForm: boolean("is_short_form").default(false),
  status: galleryStatusEnum("status").notNull().default("PUBLISHED"),
  category: varchar("category", { length: 128 }),
  tags: jsonb("tags").$type<string[] | null>(),
  isDeleted: boolean("is_deleted").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
