import { Request, Response } from 'express';
import { CourseService } from '../../services/courses.service';
import { sendNewsletterNotificationForNewContent } from '../../services/newsletter.service';
import EnvSecret from '../../constants/envVariables';

const createCourseController = async (req: Request, res: Response) => {
  try {
    // Extract file paths from uploaded files
    const files = req.files as Record<string, Express.Multer.File[]> | undefined;
    const imagePaths = files?.images?.map(file => `/uploads/courses/${file.filename}`) || [];
    const videoPaths = files?.videos?.map(file => `/uploads/courses/${file.filename}`) || [];
    
    // Prepare course data
    const courseData = {
      ...req.body,
      duration: parseInt(req.body.duration),
      price: parseFloat(req.body.price),
      images: imagePaths.length > 0 ? imagePaths : undefined,
      videos: videoPaths.length > 0 ? videoPaths : undefined,
    };
    
    const course = await CourseService.createCourse(courseData);
    
    // Send newsletter notification if course is published
    if (courseData.status === "PUBLISHED") {
      try {
        const courseUrl = `${EnvSecret.BASE_URL}/courses/${course.id}`;
        await sendNewsletterNotificationForNewContent(
          "course",
          courseData.title,
          courseData.description,
          courseUrl
        );
      } catch (error) {
        console.error("Error sending newsletter notification:", error);
        // Don't fail the course creation if newsletter notification fails
      }
    }
    
    res.status(201).json({ success: true, message: 'Course created successfully!', data: course });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ success: false, message: 'Failed to create course', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

const getAllCoursesController = async (_req: Request, res: Response) => {
  try {
    const courses = await CourseService.getAllCourses();
    return res.status(200).json({ 
      success: true, 
      message: 'Courses retrieved successfully!', 
      data: {
        data: courses,
        pagination: {
          page: 1,
          limit: courses.length,
          total: courses.length,
          pages: 1
        }
      }
    });
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
    
    // Extract file paths from uploaded files
    const files = req.files as Record<string, Express.Multer.File[]> | undefined;
    const imagePaths = files?.images?.map(file => `/uploads/courses/${file.filename}`) || [];
    const videoPaths = files?.videos?.map(file => `/uploads/courses/${file.filename}`) || [];
    
    // Prepare update data
    const updateData: any = { ...req.body };
    
    // Convert string numbers to actual numbers
    if (req.body.duration) updateData.duration = parseInt(req.body.duration);
    if (req.body.price) updateData.price = parseFloat(req.body.price);
    
    // Handle file uploads
    if (imagePaths.length > 0) {
      updateData.images = imagePaths;
    }
    if (videoPaths.length > 0) {
      updateData.videos = videoPaths;
    }
    
    // Handle file removal
    if (req.body.removeImages === 'true') {
      updateData.images = [];
    }
    if (req.body.removeVideos === 'true') {
      updateData.videos = [];
    }
    
    const course = await CourseService.updateCourseById(courseId, updateData);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    // Send newsletter notification if course is updated to published
    if (updateData.status === "PUBLISHED") {
      try {
        const courseUrl = `${EnvSecret.BASE_URL}/courses/${course.id}`;
        await sendNewsletterNotificationForNewContent(
          "course",
          course.title,
          course.description,
          courseUrl
        );
      } catch (error) {
        console.error("Error sending newsletter notification:", error);
        // Don't fail the course update if newsletter notification fails
      }
    }
    
    return res.status(200).json({ success: true, message: 'Course updated successfully!', data: course });
  } catch (error) {
    console.error('Update course error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update course', error: error instanceof Error ? error.message : 'Unknown error' });
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