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

export { apiFetch };
