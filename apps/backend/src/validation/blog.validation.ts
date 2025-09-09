import { z } from "zod";

const relativePath = z.string().regex(/^\/[A-Za-z0-9_\-.\/]+$/, {
  message: "Must start with / and contain only URL-safe characters",
});

export const blogCreateSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be kebab-case (letters, numbers, hyphens)",
    })
    .optional(),
  excerpt: z.string().max(512).optional(),
  content: z.string().min(1, { message: "Content is required" }),
  coverImageUrl: z.union([z.url(), relativePath]).optional(),
  videoUrl: z.union([z.url(), relativePath]).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export const blogUpdateSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  excerpt: z.string().max(512).optional(),
  content: z.string().min(1).optional(),
  coverImageUrl: z.union([z.url(), relativePath]).optional(),
  videoUrl: z.union([z.url(), relativePath]).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});
