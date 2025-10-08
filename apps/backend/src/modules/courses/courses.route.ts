import express from 'express';
import { CourseController } from './courses.controller';
import { validateBody } from '../../middlewares/validateBody.middleware';
import { createCourseSchema, updateCourseSchema } from '../../validation/courses.validation';

const router = express.Router();

router.post('/', validateBody(createCourseSchema), CourseController.createCourseController);
router.get('/', CourseController.getAllCoursesController);
router.get('/:id', CourseController.getCourseByIdController);
router.patch('/:id', validateBody(updateCourseSchema), CourseController.updateCourseController);
router.delete('/:id', CourseController.deleteCourseController);

export const CourseRoutes = router;