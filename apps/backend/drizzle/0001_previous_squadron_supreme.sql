ALTER TABLE "blog" ADD COLUMN "category" varchar(128);--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN "tags" text[];--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN "meta_description" varchar(160);