/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

// Build base URL ensuring '/api' prefix even if VITE_API_URL lacks it
const rawBase = import.meta.env.VITE_API_URL?.trim();
const hasBase = !!rawBase && rawBase.length > 0;
const normalizedBase = hasBase ? rawBase!.replace(/\/+$/, "") : "";
const baseWithApi = hasBase
  ? normalizedBase.endsWith("/api")
    ? normalizedBase
    : `${normalizedBase}/api`
  : "/api";

const client = axios.create({
  baseURL: baseWithApi,
  withCredentials: true,
});

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  json?: unknown;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  body?: any;
};

async function apiFetch<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  try {
    const res = await client.request<T>({
      url: path,
      method: opts.method || "GET",
      headers: opts.headers,
      data: opts.json !== undefined ? opts.json : opts.body,
      params: opts.params,
    });
    return res.data as T;
  } catch (error) {
    const e = error as AxiosError<any>;
    const data = e.response?.data as any;
    const message =
      (data && (data.message || data.error)) || e.message || "Request failed";
    throw new Error(message);
  }
}

// API response helpers (backend returns ApiResponse or ApiError)
type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

export const authApi = {
  async register(
    name: string,
    email: string,
    password: string,
    opts?: { superAdminKey?: string },
  ) {
    return apiFetch<ApiResponse<null>>("/v1/auth/register", {
      method: "POST",
      json: { name, email, password },
      params: opts?.superAdminKey
        ? { superAdminKey: opts.superAdminKey }
        : undefined,
    });
  },
  async login(email: string, password: string) {
    return apiFetch<
      ApiResponse<{ token: string; id: string; email: string; role: string }>
    >("/v1/auth/login", { method: "POST", json: { email, password } });
  },
  async me() {
    return apiFetch<
      ApiResponse<{
        id: string;
        email: string;
        role: string;
        createdAt: string;
      }>
    >("/v1/auth/me", { method: "GET" });
  },
  async logout() {
    return apiFetch<ApiResponse<null>>("/v1/auth/logout", { method: "POST" });
  },
};

// Blog API
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string;
  coverImageUrl?: string | null;
  videoUrl?: string | null;
  status: "DRAFT" | "PUBLISHED";
  createdAt?: string;
  updatedAt?: string;
};

export const blogApi = {
  async list(page = 1, limit = 9) {
    return apiFetch<
      ApiResponse<{
        data: BlogPost[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
      }>
    >("/v1/blog", { method: "GET", params: { page, limit } });
  },
  async getBySlug(slug: string) {
    return apiFetch<ApiResponse<BlogPost>>(
      `/v1/blog/${encodeURIComponent(slug)}`,
      { method: "GET" },
    );
  },
  async create(input: {
    title: string;
    slug?: string;
    excerpt?: string;
    content: string;
    status: "DRAFT" | "PUBLISHED";
    image?: File;
    category?: string;
    tags?: string[];
    metaDescription?: string;
  }) {
    const fd = new FormData();
    fd.append("title", input.title);
    if (input.slug) fd.append("slug", input.slug);
    if (input.excerpt) fd.append("excerpt", input.excerpt);
    fd.append("content", input.content);
    if (input.status) fd.append("status", input.status);
    if (input.image) fd.append("image", input.image);
    if (input.category) fd.append("category", input.category);
    if (input.metaDescription)
      fd.append("metaDescription", input.metaDescription);
    if (input.tags && Array.isArray(input.tags)) {
      fd.append("tags", JSON.stringify(input.tags));
    }
    return apiFetch<ApiResponse<{ id: string; slug: string }>>("/v1/blog/add", {
      method: "POST",
      body: fd,
      headers: undefined,
    });
  },
  async createForm(fd: FormData) {
    return apiFetch<ApiResponse<{ id: string; slug: string }>>("/v1/blog/add", {
      method: "POST",
      body: fd,
      headers: undefined,
    });
  },
  async update(
    id: string,
    input: {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      status?: "DRAFT" | "PUBLISHED";
      image?: File;
      category?: string;
      tags?: string[];
      metaDescription?: string;
      removeImage?: boolean;
    },
  ) {
    const fd = new FormData();
    if (input.title !== undefined) fd.append("title", input.title);
    if (input.slug !== undefined) fd.append("slug", input.slug);
    if (input.excerpt !== undefined) fd.append("excerpt", input.excerpt);
    if (input.content !== undefined) fd.append("content", input.content);
    if (input.status !== undefined) fd.append("status", input.status);
    if (input.category !== undefined) fd.append("category", input.category);
    if (input.metaDescription !== undefined)
      fd.append("metaDescription", input.metaDescription);
    if (Array.isArray(input.tags)) {
      fd.append("tags", JSON.stringify(input.tags));
    }
    if (input.image) fd.append("image", input.image);
    if (input.removeImage !== undefined)
      fd.append("removeImage", String(input.removeImage));
    return apiFetch<ApiResponse<{ id: string; slug: string }>>(
      `/v1/blog/update/${encodeURIComponent(id)}`,
      {
        method: "PUT",
        body: fd,
        headers: undefined,
      },
    );
  },
  async updateForm(id: string, fd: FormData) {
    return apiFetch<ApiResponse<{ id: string; slug: string }>>(
      `/v1/blog/update/${encodeURIComponent(id)}`,
      {
        method: "PUT",
        body: fd,
        headers: undefined,
      },
    );
  },
  async remove(id: string) {
    return apiFetch<ApiResponse<{ id: string }>>(
      `/v1/blog/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
      },
    );
  },
};

export { apiFetch };
