import { Request, Response } from 'express';
import { CourseService } from '../../services/courses.service';

const createCourseController = async (req: Request, res: Response) => {
  try {
    const course = await CourseService.createCourse(req.body);
    res.status(201).json({ success: true, message: 'Course created successfully!', data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create course', error });
  }
};

const getAllCoursesController = async (_req: Request, res: Response) => {
  try {
    const courses = await CourseService.getAllCourses();
    return res.status(200).json({ success: true, message: 'Courses retrieved successfully!', data: courses });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve courses', error });
  }
};

const getCourseByIdController = async (req: Request, res: Response) => {
  try {
    const courseId = parseInt(req.params.id, 10);
    const course = await CourseService.getCourseById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    return res.status(200).json({ success: true, message: 'Course retrieved successfully!', data: course });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve course', error });
  }
};

const updateCourseController = async (req: Request, res: Response) => {
  try {
    const courseId = parseInt(req.params.id, 10);
    const course = await CourseService.updateCourseById(courseId, req.body);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    return res.status(200).json({ success: true, message: 'Course updated successfully!', data: course });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update course', error });
  }
};

const deleteCourseController = async (req: Request, res: Response) => {
  try {
    const courseId = parseInt(req.params.id, 10);
    const course = await CourseService.deleteCourseById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    return res.status(200).json({ success: true, message: 'Course deleted successfully!', data: course });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete course', error });
  }
};

export const CourseController = {
  createCourseController,
  getAllCoursesController,
  getCourseByIdController,
  updateCourseController,
  deleteCourseController,
};