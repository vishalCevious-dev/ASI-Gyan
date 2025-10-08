import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string({ message: 'Course title is required' }).min(3),
  description: z.string({ message: 'Description is required' }).min(10),
  category: z.string({ message: 'Category is required' }),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  duration: z.number({ message: 'Duration is required' }).positive(),
  price: z.number({ message: 'Price is required' }).positive(),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
});

export const updateCourseSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  category: z.string().optional(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  duration: z.number().positive().optional(),
  price: z.number().positive().optional(),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  removeImages: z.boolean().optional(),
  removeVideos: z.boolean().optional(),
});