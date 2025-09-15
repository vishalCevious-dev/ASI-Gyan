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

export const Gallery = pgTable("gallery", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  type: galleryTypeEnum("type").notNull().default("PHOTO"),
  imageUrl: varchar("image_url", { length: 512 }),
  videoUrl: varchar("video_url", { length: 512 }),
  status: galleryStatusEnum("status").notNull().default("PUBLISHED"),
  category: varchar("category", { length: 128 }),
  tags: jsonb("tags").$type<string[] | null>(),
  isDeleted: boolean("is_deleted").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
