CREATE TYPE "public"."gallery_status" AS ENUM('DRAFT', 'PUBLISHED');--> statement-breakpoint
CREATE TYPE "public"."gallery_type" AS ENUM('PHOTO', 'VIDEO');--> statement-breakpoint
CREATE TABLE "gallery" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"type" "gallery_type" DEFAULT 'PHOTO' NOT NULL,
	"image_url" varchar(512),
	"video_url" varchar(512),
	"status" "gallery_status" DEFAULT 'PUBLISHED' NOT NULL,
	"category" varchar(128),
	"tags" jsonb,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
