import { Router } from "express";
import asyncHandler from "src/utils/asyncHandler";
import { authMiddleware } from "src/middlewares/auth.middleware";
import { rbac } from "src/middlewares/rbac.middleware";
import { validateBody } from "src/middlewares/validateBody.middleware";
import {
  blogCreateSchema,
  blogUpdateSchema,
} from "src/validation/blog.validation";
import {
  createPost,
  deletePost,
  getPostBySlug,
  listPosts,
  updatePost,
} from "src/modules/blog/blog.controller";
import { uploadBlogImage } from "src/middlewares/upload.middleware";
import { UserRole } from "src/constants";

const router = Router();

// Public routes
router.get("/", asyncHandler(listPosts));
router.get("/:slug", asyncHandler(getPostBySlug));

// Admin routes
// Accept multipart/form-data with optional image field for cover image
router.post(
  "/add",
  authMiddleware,
  rbac(UserRole.Admin),
  uploadBlogImage.single("image"),
  validateBody(blogCreateSchema),
  asyncHandler(createPost),
);
router.put(
  "/update/:id",
  authMiddleware,
  rbac(UserRole.Admin),
  uploadBlogImage.single("image"),
  validateBody(blogUpdateSchema),
  asyncHandler(updatePost),
);
router.delete(
  "/:id",
  authMiddleware,
  rbac(UserRole.Admin),
  asyncHandler(deletePost),
);

// Upload blog image (cover or inline) -> returns URL
// Removed dedicated /upload endpoint; uploads handled by create/update

export { router as BlogRouter };
