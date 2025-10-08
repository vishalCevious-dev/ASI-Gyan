CREATE TYPE "public"."course_status" AS ENUM('DRAFT', 'PUBLISHED');--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "status" "course_status" DEFAULT 'DRAFT' NOT NULL;