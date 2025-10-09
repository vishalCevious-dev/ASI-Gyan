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
  adminListPosts,
  adminGetPost,
  updatePost,
} from "./blog.controller";
import { uploadBlogImage } from "../../middlewares/upload.middleware";
import { UserRole } from "../../constants";

const router = Router();

// Admin routes (must be defined BEFORE slug route to avoid collision)
router.get(
  "/admin",
  authMiddleware,
  rbac(UserRole.Admin),
  asyncHandler(adminListPosts),
);
router.get(
  "/admin/:id",
  authMiddleware,
  rbac(UserRole.Admin),
  asyncHandler(adminGetPost),
);

// Public routes
router.get("/", asyncHandler(listPosts));
router.get("/:slug", asyncHandler(getPostBySlug));
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
