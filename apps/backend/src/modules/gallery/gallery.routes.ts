import { Router } from "express";
import asyncHandler from "src/utils/asyncHandler";
import { authMiddleware } from "src/middlewares/auth.middleware";
import { rbac } from "src/middlewares/rbac.middleware";
import { UserRole } from "src/constants";
import { validateBody } from "src/middlewares/validateBody.middleware";
import {
  galleryCreateSchema,
  galleryUpdateSchema,
} from "src/validation/gallery.validation";
import {
  createGalleryItem,
  deleteGalleryItem,
  getGalleryItem,
  listGallery,
  updateGalleryItem,
  uploadGalleryImage,
} from "./gallery.controller";

const router = Router();

// Public view routes
router.get("/", asyncHandler(listGallery));
router.get("/:id", asyncHandler(getGalleryItem));

// Admin manage routes
router.post(
  "/add",
  authMiddleware,
  rbac(UserRole.Admin),
  uploadGalleryImage.single("image"),
  validateBody(galleryCreateSchema),
  asyncHandler(createGalleryItem),
);
router.put(
  "/update/:id",
  authMiddleware,
  rbac(UserRole.Admin),
  uploadGalleryImage.single("image"),
  validateBody(galleryUpdateSchema),
  asyncHandler(updateGalleryItem),
);
router.delete(
  "/:id",
  authMiddleware,
  rbac(UserRole.Admin),
  asyncHandler(deleteGalleryItem),
);

export { router as GalleryRouter };
