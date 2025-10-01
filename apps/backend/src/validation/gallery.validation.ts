import { z } from "zod";

export const galleryCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["PHOTO", "VIDEO"]),
  // For PHOTO: either file upload or imageUrl
  imageUrl: z.string().optional(),
  // For VIDEO: require videoUrl - support more platforms
  videoUrl: z.string().optional(),
  // Video detection fields (auto-populated by backend)
  videoPlatform: z.enum([
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
  ]).optional(),
  videoType: z.enum(["reel", "short", "video", "post"]).optional(),
  videoId: z.string().max(128).optional(),
  embedUrl: z.string().max(512).optional(),
  thumbnailUrl: z.string().max(512).optional(),
  isShortForm: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  category: z.string().max(128).optional(),
  // Tags can arrive as a JSON string or array in JSON bodies
  tags: z.union([z.string(), z.array(z.string())]).optional(),
});

export const galleryUpdateSchema = z.object({
  title: z.string().optional(),
  type: z.enum(["PHOTO", "VIDEO"]).optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  // Video detection fields (auto-populated by backend)
  videoPlatform: z.enum([
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
  ]).optional(),
  videoType: z.enum(["reel", "short", "video", "post"]).optional(),
  videoId: z.string().max(128).optional(),
  embedUrl: z.string().max(512).optional(),
  thumbnailUrl: z.string().max(512).optional(),
  isShortForm: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  category: z.string().max(128).optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  removeImage: z.union([z.literal("true"), z.literal("false")]).optional(),
});
