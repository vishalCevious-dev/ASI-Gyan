import { eq } from 'drizzle-orm';
import { db } from '../config/db';
import { courses } from '../../drizzle/schema';
import type { Course } from '../../drizzle/schema';

type NewCourse = Omit<Course, 'id' | 'createdAt' | 'updatedAt'>;

const createCourse = async (courseData: NewCourse): Promise<Course> => {
  const result = await db.insert(courses).values(courseData).returning();
  return result[0];
};

const getAllCourses = async (): Promise<Course[]> => {
  const result = await db.select().from(courses);
  return result;
};

const getCourseById = async (id: number): Promise<Course | undefined> => {
  const result = await db.select().from(courses).where(eq(courses.id, id));
  return result[0];
};

const updateCourseById = async (id: number, payload: Partial<NewCourse>): Promise<Course | undefined> => {
  const result = await db
    .update(courses)
    .set({ ...payload, updatedAt: new Date().toISOString() })
    .where(eq(courses.id, id))
    .returning();
  return result[0];
};

const deleteCourseById = async (id: number): Promise<Course | undefined> => {
  const result = await db.delete(courses).where(eq(courses.id, id)).returning();
  return result[0];
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};