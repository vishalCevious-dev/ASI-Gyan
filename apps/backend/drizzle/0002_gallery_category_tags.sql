ALTER TABLE "gallery" ADD COLUMN IF NOT EXISTS "category" varchar(128);
ALTER TABLE "gallery" ADD COLUMN IF NOT EXISTS "tags" jsonb DEFAULT '[]'::jsonb;
ALTER TABLE "gallery" DROP COLUMN IF EXISTS "description";

