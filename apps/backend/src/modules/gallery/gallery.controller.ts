import { Request, Response } from "express";
import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "src/config/db";
import { Gallery } from "src/model/gallery.model";
import { ApiError } from "src/utils/ApiError";
import { ApiResponse } from "src/utils/ApiResponse";
import {
  deleteFile,
  makeMediaUploader,
  resolvePublicFilePath,
  type MultiMulterRequest,
} from "src/middlewares/upload.middleware";
import { buildFileUrl } from "src/utils/url";

export const uploadGalleryMedia = makeMediaUploader({ folder: "gallery" });

export const listGallery = async (req: Request, res: Response) => {
  try {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit as string) || 12, 1),
      50,
    );
    const offset = (page - 1) * limit;

    const cond = and(
      eq(Gallery.isDeleted, false),
      eq(Gallery.status, "PUBLISHED"),
    );

    const items = await db
      .select({
        id: Gallery.id,
        type: Gallery.type,
        imageUrl: Gallery.imageUrl,
        videoUrl: Gallery.videoUrl,
        status: Gallery.status,
        category: Gallery.category,
        tags: Gallery.tags,
        createdAt: Gallery.createdAt,
      })
      .from(Gallery)
      .where(cond)
      .orderBy(desc(Gallery.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(Gallery)
      .where(cond);

    res.status(200).json(
      ApiResponse(
        200,
        {
          data: items,
          pagination: {
            page,
            limit,
            total: count,
            pages: Math.ceil(count / limit),
          },
        },
        "Gallery fetched",
      ),
    );
    return;
  } catch (err) {
    res.status(500).json(ApiError(500, "Failed to fetch gallery", req));
    return;
  }
};

export const getGalleryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json(ApiError(400, "ID is required", req));
      return;
    }

    const [item] = await db
      .select()
      .from(Gallery)
      .where(
        and(
          eq(Gallery.id, id),
          eq(Gallery.isDeleted, false),
          eq(Gallery.status, "PUBLISHED"),
        ),
      )
      .limit(1);

    if (!item) {
      res.status(404).json(ApiError(404, "Item not found", req));
      return;
    }

    res.status(200).json(ApiResponse(200, item, "Item fetched"));
    return;
  } catch (err) {
    res.status(500).json(ApiError(500, "Failed to fetch item", req));
    return;
  }
};

export const createGalleryItem = async (req: Request, res: Response) => {
  const files = (req as MultiMulterRequest).files || {};
  const imageFile = files["image"]?.[0];
  const videoFile = files["video"]?.[0];
  try {
    const { type, imageUrl, videoUrl, status, category, tags } =
      req.body as {
        type: "PHOTO" | "VIDEO";
        imageUrl?: string;
        videoUrl?: string;
        status?: "DRAFT" | "PUBLISHED";
        category?: string;
        tags?: string | string[];
      };

    const data: any = {
      type,
      status: status ?? "PUBLISHED",
      category: category ?? null,
      tags: Array.isArray(tags)
        ? tags
        : typeof tags === "string" && tags.trim().length
          ? (() => {
            try {
              const parsed = JSON.parse(tags);
              return Array.isArray(parsed) ? parsed : [];
            } catch {
              return [];
            }
          })()
          : [],
      updatedAt: new Date(),
    };

    if (type === "PHOTO") {
      if (imageFile) {
        data.imageUrl = buildFileUrl(`/uploads/gallery/${imageFile.filename}`);
      } else if (imageUrl) {
        data.imageUrl = buildFileUrl(imageUrl);
      } else {
        res
          .status(400)
          .json(ApiError(400, "Provide an image file or imageUrl", req));
        return;
      }
      data.videoUrl = null;
    } else if (type === "VIDEO") {
      if (videoFile) {
        data.videoUrl = buildFileUrl(`/uploads/gallery/${videoFile.filename}`);
      } else if (videoUrl) {
        // Validate video URL format
        if (!/^https?:\/\/.+\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i.test(videoUrl) && 
            !videoUrl.includes('youtube.com') && 
            !videoUrl.includes('youtu.be') && 
            !videoUrl.includes('vimeo.com') && 
            !videoUrl.includes('dailymotion.com')) {
          res.status(400).json(
            ApiError(400, "Invalid video URL format. Please provide a valid video URL or upload a video file.", req)
          );
          return;
        }
        data.videoUrl = buildFileUrl(videoUrl);
      } else {
        res
          .status(400)
          .json(
            ApiError(400, "Provide a video file or videoUrl for VIDEO", req),
          );
        return;
      }
      
      // Handle poster image for video (thumbnail)
      if (imageFile) {
        data.imageUrl = buildFileUrl(`/uploads/gallery/${imageFile.filename}`);
      } else if (imageUrl) {
        data.imageUrl = buildFileUrl(imageUrl);
      } else {
        // Generate a default video thumbnail placeholder
        data.imageUrl = null; // Will be handled in frontend
      }
    }

    const [inserted] = await db
      .insert(Gallery)
      .values(data)
      .returning({ id: Gallery.id });
    if (!inserted) {
      if (imageFile) deleteFile(imageFile.path);
      if (videoFile) deleteFile(videoFile.path);
      res.status(500).json(ApiError(500, "Failed to create item", req));
      return;
    }

    res.status(201).json(ApiResponse(201, inserted, "Item created"));
    return;
  } catch (err) {
    if (imageFile) deleteFile(imageFile.path);
    if (videoFile) deleteFile(videoFile.path);
    res.status(500).json(ApiError(500, "Failed to create item", req));
    return;
  }
};

export const updateGalleryItem = async (req: Request, res: Response) => {
  const files = (req as MultiMulterRequest).files || {};
  const imageFile = files["image"]?.[0];
  const videoFile = files["video"]?.[0];
  try {
    const { id } = req.params;
    const {
      type,
      imageUrl,
      videoUrl,
      status,
      removeImage,
      category,
      tags,
    } = req.body as {
      type?: "PHOTO" | "VIDEO";
      imageUrl?: string;
      videoUrl?: string;
      status?: "DRAFT" | "PUBLISHED";
      removeImage?: boolean | "true" | "false";
      category?: string;
      tags?: string | string[];
    };

    const updates: any = { updatedAt: new Date() };
    if (type !== undefined) updates.type = type;
    if (status !== undefined) updates.status = status;
    if (category !== undefined) updates.category = category;
    if (tags !== undefined)
      updates.tags = Array.isArray(tags)
        ? tags
        : typeof tags === "string" && tags.trim().length
          ? (() => {
            try {
              const parsed = JSON.parse(tags);
              return Array.isArray(parsed) ? parsed : [];
            } catch {
              return [];
            }
          })()
          : [];

    const shouldRemoveImage = removeImage === true || removeImage === "true";
    if (imageFile) {
      updates.imageUrl = buildFileUrl(`/uploads/gallery/${imageFile.filename}`);
    } else if (imageUrl !== undefined) {
      updates.imageUrl = buildFileUrl(imageUrl);
    } else if (shouldRemoveImage) {
      updates.imageUrl = null;
    }
    if (videoFile) {
      updates.videoUrl = buildFileUrl(`/uploads/gallery/${videoFile.filename}`);
    } else if (videoUrl !== undefined) {
      updates.videoUrl = buildFileUrl(videoUrl);
    }

    // delete old image if replaced or removed
    if (imageFile || shouldRemoveImage) {
      const [current] = await db
        .select({ imageUrl: Gallery.imageUrl })
        .from(Gallery)
        .where(eq(Gallery.id, id))
        .limit(1);
      if (current?.imageUrl) {
        const abs = resolvePublicFilePath(current.imageUrl);
        if (abs) deleteFile(abs);
      }
    }
    if (videoFile) {
      const [current] = await db
        .select({ videoUrl: Gallery.videoUrl })
        .from(Gallery)
        .where(eq(Gallery.id, id))
        .limit(1);
      if (current?.videoUrl) {
        const abs = resolvePublicFilePath(current.videoUrl);
        if (abs) deleteFile(abs);
      }
    }

    const [result] = await db
      .update(Gallery)
      .set(updates)
      .where(eq(Gallery.id, id))
      .returning({ id: Gallery.id });

    if (!result) {
      if (imageFile) deleteFile(imageFile.path);
      if (videoFile) deleteFile(videoFile.path);
      res.status(404).json(ApiError(404, "Item not found", req));
      return;
    }

    res.status(200).json(ApiResponse(200, result, "Item updated"));
    return;
  } catch (err) {
    const files = (req as MultiMulterRequest).files;

    if (files && Array.isArray(files)) {
      for (const file of files) {
        deleteFile(file.path);
      }
    }

    res.status(500).json(ApiError(500, "Failed to update item", req));
    return;
  }

};

export const deleteGalleryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result] = await db
      .update(Gallery)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(eq(Gallery.id, id))
      .returning({ id: Gallery.id });
    if (!result) {
      res.status(404).json(ApiError(404, "Item not found", req));
      return;
    }
    res.status(200).json(ApiResponse(200, result, "Item deleted"));
    return;
  } catch (err) {
    res.status(500).json(ApiError(500, "Failed to delete item", req));
    return;
  }
};
