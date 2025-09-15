import { Request, Response } from "express";
import { db } from "src/config/db";
import { Blog } from "src/model/blog.model";
import { Users } from "src/model/user.model";
import { and, desc, eq, ne, sql } from "drizzle-orm";
import { ApiError } from "src/utils/ApiError";
import { ApiResponse } from "src/utils/ApiResponse";
import {
  deleteFile,
  resolvePublicFilePath,
  type MulterRequest,
} from "src/middlewares/upload.middleware";
import { buildFileUrl } from "src/utils/url";

const slugify = (input: string) =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const listPosts = async (req: Request, res: Response) => {
  try {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit as string) || 10, 1),
      50,
    );
    const offset = (page - 1) * limit;

    // Only non-deleted + published posts
    const cond = and(eq(Blog.isDeleted, false), eq(Blog.status, "PUBLISHED"));

    // Fetch paginated posts
    const posts = await db
      .select({
        id: Blog.id,
        title: Blog.title,
        slug: Blog.slug,
        excerpt: Blog.excerpt,
        coverImageUrl: Blog.coverImageUrl,
        videoUrl: Blog.videoUrl,
        category: Blog.category,
        tags: Blog.tags,
        status: Blog.status,
        createdAt: Blog.createdAt,
        updatedAt: Blog.updatedAt,
      })
      .from(Blog)
      .where(cond)
      .orderBy(desc(Blog.createdAt))
      .limit(limit)
      .offset(offset);

    // Count total for pagination meta
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(Blog)
      .where(cond);

    res.status(200).json(
      ApiResponse(
        200,
        {
          data: posts,
          pagination: {
            page,
            limit,
            total: count,
            pages: Math.ceil(count / limit),
          },
        },
        "Posts fetched",
      ),
    );
    return;
  } catch (err) {
    res.status(500).json(ApiError(500, "Failed to fetch posts", req));
    return;
  }
};

export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      res.status(400).json(ApiError(400, "Slug is required", req));
      return;
    }

    const condition = and(
      eq(Blog.slug, slug),
      eq(Blog.status, "PUBLISHED"),
      eq(Blog.isDeleted, false),
    );

    const [post] = await db.select().from(Blog).where(condition).limit(1);

    if (!post) {
      res.status(404).json(ApiError(404, "Post not found", req));
      return;
    }

    res.status(200).json(ApiResponse(200, post, "Post fetched"));
    return;
  } catch (err) {
    res.status(500).json(ApiError(500, "Failed to fetch post", req));
    return;
  }
};

export const createPost = async (req: Request, res: Response) => {
  const file = (req as MulterRequest).file; // capture early for cleanup
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      coverImageUrl,
      videoUrl,
      status,
      category,
      tags,
      metaDescription,
    } = req.body as {
      title: string;
      slug?: string;
      excerpt?: string;
      content: string;
      coverImageUrl?: string;
      videoUrl?: string;
      status?: "DRAFT" | "PUBLISHED";
      category?: string;
      tags?: string[];
      metaDescription?: string;
    };

    const finalSlug = (slug && slugify(slug)) || slugify(title);

    // ensure unique slug
    const existing = await db
      .select({ id: Blog.id })
      .from(Blog)
      .where(eq(Blog.slug, finalSlug))
      .limit(1);
    if (existing.length) {
      res.status(409).json(ApiError(409, "Slug already exists", req));
      return;
    }

    const authorId = req.user?.id || null;
    if (authorId) {
      // sanity: ensure author exists
      const [author] = await db
        .select({ id: Users.id })
        .from(Users)
        .where(eq(Users.id, authorId))
        .limit(1);
      if (!author) {
        res.status(400).json(ApiError(400, "Invalid author", req));
        return;
      }
    }

    const file = (req as MulterRequest).file;

    const coverUrl = file
      ? buildFileUrl(`/uploads/blog/${file.filename}`)
      : coverImageUrl
        ? buildFileUrl(coverImageUrl)
        : null;
    const finalVideoUrl = videoUrl ? buildFileUrl(videoUrl) : null;

    const [inserted] = await db
      .insert(Blog)
      .values({
        title,
        slug: finalSlug,
        excerpt,
        content,
        coverImageUrl: coverUrl,
        videoUrl: finalVideoUrl || undefined,
        category: category || undefined,
        tags: Array.isArray(tags) ? tags : undefined,
        metaDescription: metaDescription || undefined,
        status: status || "DRAFT",
        authorId: authorId || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({ id: Blog.id, slug: Blog.slug });

    if (!inserted) {
      if (file) deleteFile(file.path); // cleanup new file
      res.status(404).json(ApiError(404, "Failed to create post", req));
      return;
    }

    res.status(201).json(ApiResponse(201, inserted, "Post created"));
    return;
  } catch (err) {
    if (file) deleteFile(file.path); // cleanup if DB update failed
    res.status(500).json(ApiError(500, "Failed to create post", req));
    return;
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const file = (req as MulterRequest).file; // capture early for cleanup
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      excerpt,
      content,
      status,
      category,
      tags,
      metaDescription,
      videoUrl,
      removeImage,
    } = req.body as {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      status?: "DRAFT" | "PUBLISHED";
      category?: string;
      tags?: string[];
      metaDescription?: string;
      videoUrl?: string;
      removeImage?: boolean | "true" | "false";
    };

    const updates: any = { title, excerpt, content, updatedAt: new Date() };

    if (slug !== undefined) updates.slug = slugify(slug);

    const shouldRemoveImage = removeImage === true || removeImage === "true";
    if (file) {
      updates.coverImageUrl = buildFileUrl(`/uploads/blog/${file.filename}`);
    } else if (shouldRemoveImage) {
      updates.coverImageUrl = null;
    }
    if (status !== undefined) updates.status = status;
    if (category !== undefined) updates.category = category;
    if (tags !== undefined)
      updates.tags = Array.isArray(tags) ? tags : undefined;
    if (metaDescription !== undefined)
      updates.metaDescription = metaDescription;
    if (videoUrl !== undefined) updates.videoUrl = buildFileUrl(videoUrl);

    if (updates.slug) {
      // check for slug collision
      const collide = await db
        .select({ id: Blog.id })
        .from(Blog)
        .where(and(eq(Blog.slug, updates.slug), ne(Blog.id, id)));
      if (collide.length) {
        res.status(409).json(ApiError(409, "Slug already exists", req));
        return;
      }
    }

    const [currentPost] = await db
      .select({ coverImageUrl: Blog.coverImageUrl })
      .from(Blog)
      .where(eq(Blog.id, id))
      .limit(1);

    // Only delete previous file if uploading a new one or removing
    if ((file || shouldRemoveImage) && currentPost?.coverImageUrl) {
      const abs = resolvePublicFilePath(currentPost.coverImageUrl);
      if (abs) deleteFile(abs);
    }

    const [result] = await db
      .update(Blog)
      .set(updates)
      .where(eq(Blog.id, id))
      .returning({ id: Blog.id, slug: Blog.slug });

    if (!result) {
      if (file) deleteFile(file.path); // cleanup new file
      res.status(404).json(ApiError(404, "Post not found", req));
      return;
    }

    res.status(200).json(ApiResponse(200, result, "Post updated"));
    return;
  } catch (err) {
    if (file) deleteFile(file.path); // cleanup if DB update failed
    res.status(500).json(ApiError(500, "Failed to update post", req));
    return;
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Soft-delete: mark as deleted instead of removing
    const [result] = await db
      .update(Blog)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(eq(Blog.id, id))
      .returning({ id: Blog.id, isDeleted: Blog.isDeleted });

    if (!result) {
      res.status(404).json(ApiError(404, "Post not found", req));
      return;
    }

    res.status(200).json(ApiResponse(200, result, "Post deleted"));
    return;
  } catch (err) {
    res.status(500).json(ApiError(500, "Failed to delete post", req));
    return;
  }
};
