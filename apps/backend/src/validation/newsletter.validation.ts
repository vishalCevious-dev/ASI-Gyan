import { z } from "zod";

export const subscribeNewsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
});

export const unsubscribeNewsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});
