import { z } from "zod";

export const galleryCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  type: z.enum(["PHOTO", "VIDEO"]),
  // For PHOTO: either file upload or imageUrl
  imageUrl: z.url().optional(),
  // For VIDEO: require videoUrl
  videoUrl: z.string().url().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export const galleryUpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(["PHOTO", "VIDEO"]).optional(),
  imageUrl: z.url().optional(),
  videoUrl: z.url().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  removeImage: z.union([z.literal("true"), z.literal("false")]).optional(),
});
