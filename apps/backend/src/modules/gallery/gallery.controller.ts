import { Request, Response } from "express";
import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "src/config/db";
import { Gallery } from "src/model/gallery.model";
import { ApiError } from "src/utils/ApiError";
import { ApiResponse } from "src/utils/ApiResponse";
import {
  deleteFile,
  makeImageUploader,
  resolvePublicFilePath,
  type MulterRequest,
} from "src/middlewares/upload.middleware";
import { buildFileUrl } from "src/utils/url";

export const uploadGalleryImage = makeImageUploader({ folder: "gallery" });

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
        title: Gallery.title,
        description: Gallery.description,
        type: Gallery.type,
        imageUrl: Gallery.imageUrl,
        videoUrl: Gallery.videoUrl,
        status: Gallery.status,
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
  const file = (req as MulterRequest).file; // for cleanup
  try {
    const { title, description, type, imageUrl, videoUrl, status } =
      req.body as {
        title: string;
        description?: string;
        type: "PHOTO" | "VIDEO";
        imageUrl?: string;
        videoUrl?: string;
        status?: "DRAFT" | "PUBLISHED";
      };

    const data: any = {
      title,
      description,
      type,
      status: status ?? "PUBLISHED",
      updatedAt: new Date(),
    };

    if (type === "PHOTO") {
      if (file) {
        data.imageUrl = buildFileUrl(`/uploads/gallery/${file.filename}`);
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
      if (!videoUrl) {
        res
          .status(400)
          .json(ApiError(400, "videoUrl is required for VIDEO", req));
        return;
      }
      data.videoUrl = buildFileUrl(videoUrl);
      data.imageUrl = file
        ? buildFileUrl(`/uploads/gallery/${file.filename}`)
        : (imageUrl ?? null);
    }

    const [inserted] = await db
      .insert(Gallery)
      .values(data)
      .returning({ id: Gallery.id });
    if (!inserted) {
      if (file) deleteFile(file.path);
      res.status(500).json(ApiError(500, "Failed to create item", req));
      return;
    }

    res.status(201).json(ApiResponse(201, inserted, "Item created"));
    return;
  } catch (err) {
    if (file) deleteFile(file.path);
    res.status(500).json(ApiError(500, "Failed to create item", req));
    return;
  }
};

export const updateGalleryItem = async (req: Request, res: Response) => {
  const file = (req as MulterRequest).file; // for cleanup
  try {
    const { id } = req.params;
    const {
      title,
      description,
      type,
      imageUrl,
      videoUrl,
      status,
      removeImage,
    } = req.body as {
      title?: string;
      description?: string;
      type?: "PHOTO" | "VIDEO";
      imageUrl?: string;
      videoUrl?: string;
      status?: "DRAFT" | "PUBLISHED";
      removeImage?: boolean | "true" | "false";
    };

    const updates: any = { updatedAt: new Date() };
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (type !== undefined) updates.type = type;
    if (status !== undefined) updates.status = status;

    const shouldRemoveImage = removeImage === true || removeImage === "true";
    if (file) {
      updates.imageUrl = buildFileUrl(`/uploads/gallery/${file.filename}`);
    } else if (imageUrl !== undefined) {
      updates.imageUrl = buildFileUrl(imageUrl);
    } else if (shouldRemoveImage) {
      updates.imageUrl = null;
    }
    if (videoUrl !== undefined) updates.videoUrl = buildFileUrl(videoUrl);

    // delete old image if replaced or removed
    if (file || shouldRemoveImage) {
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

    const [result] = await db
      .update(Gallery)
      .set(updates)
      .where(eq(Gallery.id, id))
      .returning({ id: Gallery.id });

    if (!result) {
      if (file) deleteFile(file.path);
      res.status(404).json(ApiError(404, "Item not found", req));
      return;
    }

    res.status(200).json(ApiResponse(200, result, "Item updated"));
    return;
  } catch (err) {
    if (file) deleteFile(file.path);
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
