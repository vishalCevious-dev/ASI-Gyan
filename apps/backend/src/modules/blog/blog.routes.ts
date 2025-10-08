import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { rbac } from "../../middlewares/rbac.middleware";
import { validateBody } from "../../middlewares/validateBody.middleware";
import {
  blogCreateSchema,
  blogUpdateSchema,
} from "../../validation/blog.validation";
import {
  createPost,
  deletePost,
  getPostBySlug,
  listPosts,
  updatePost,
} from "./blog.controller";
import { uploadBlogImage } from "../../middlewares/upload.middleware";
import { UserRole } from "../../constants";

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
