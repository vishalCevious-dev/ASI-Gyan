import express from 'express';
import { CourseController } from './courses.controller';
import { makeMediaUploader } from '../../middlewares/upload.middleware';

const router = express.Router();

// Create media uploader for courses
const uploadCourseMedia = makeMediaUploader({
  folder: 'courses',
  fileSizeMB: 100, // 100MB for videos
  allowedMimeTypes: [
    'image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif',
    'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-matroska', 'video/avi', 'video/mov'
  ]
});

router.post('/', uploadCourseMedia.fields([
  { name: 'images', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), CourseController.createCourseController);
router.get('/', CourseController.getAllCoursesController);
router.get('/:id', CourseController.getCourseByIdController);
router.patch('/:id', uploadCourseMedia.fields([
  { name: 'images', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), CourseController.updateCourseController);
router.delete('/:id', CourseController.deleteCourseController);

export const CourseRoutes = router;