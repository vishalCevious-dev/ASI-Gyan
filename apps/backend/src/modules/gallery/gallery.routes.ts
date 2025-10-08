import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { rbac } from "../../middlewares/rbac.middleware";
import { UserRole } from "../../constants";
import { validateBody } from "../../middlewares/validateBody.middleware";
import {
  galleryCreateSchema,
  galleryUpdateSchema,
} from "../../validation/gallery.validation";
import {
  createGalleryItem,
  deleteGalleryItem,
  getGalleryItem,
  listGallery,
  updateGalleryItem,
  uploadGalleryMedia,
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
  uploadGalleryMedia.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  validateBody(galleryCreateSchema),
  asyncHandler(createGalleryItem),
);
router.put(
  "/update/:id",
  authMiddleware,
  rbac(UserRole.Admin),
  uploadGalleryMedia.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
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
