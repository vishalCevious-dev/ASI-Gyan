import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { Users } from "src/model/user.model";

export const blogStatusEnum = pgEnum("blog_status", ["DRAFT", "PUBLISHED"]);

export const Blog = pgTable("blog", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: varchar("excerpt", { length: 512 }),
  content: text("content").notNull(),
  coverImageUrl: varchar("cover_image_url", { length: 512 }),
  videoUrl: varchar("video_url", { length: 512 }),
  status: blogStatusEnum("status").notNull().default("DRAFT"),
  authorId: uuid("author_id").references(() => Users.id),
  isDeleted: boolean("is_deleted").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
