ALTER TABLE "gallery" ADD COLUMN "video_platform" "video_platform";--> statement-breakpoint
ALTER TABLE "gallery" ADD COLUMN "video_type" "video_type";--> statement-breakpoint
ALTER TABLE "gallery" ADD COLUMN "video_id" varchar(128);--> statement-breakpoint
ALTER TABLE "gallery" ADD COLUMN "embed_url" varchar(512);--> statement-breakpoint
ALTER TABLE "gallery" ADD COLUMN "thumbnail_url" varchar(512);--> statement-breakpoint
ALTER TABLE "gallery" ADD COLUMN "is_short_form" boolean DEFAULT false;