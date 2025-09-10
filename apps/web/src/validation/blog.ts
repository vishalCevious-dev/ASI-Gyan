import { z } from "zod";

export const blogCreateSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  excerpt: z.string().max(512).optional(),
  content: z.string().min(1, "Content is required"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  category: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).optional(),
  metaDescription: z.string().max(160).optional(),
});

export type BlogCreateInput = z.infer<typeof blogCreateSchema>;

export function parseTagsString(str: string): string[] | undefined {
  const a = str
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return a.length ? a : undefined;
}

export function isRichTextEmpty(html: string): boolean {
  if (!html) return true;
  // Remove tags
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length === 0;
}
