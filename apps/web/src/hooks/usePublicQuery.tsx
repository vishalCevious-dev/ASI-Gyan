import { useQuery } from "@tanstack/react-query";
import { blogApi } from "@/lib/api";

// Public blog list (published only)
export function usePublicBlogList(page = 1, limit = 9) {
  return useQuery({
    queryKey: ["blog", "list", { page, limit }],
    queryFn: () => blogApi.list(page, limit),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}

// Single blog by slug (published)
export function useBlogBySlug(slug?: string) {
  return useQuery({
    queryKey: ["blog", "slug", slug || ""],
    queryFn: () => blogApi.getBySlug(slug as string),
    enabled: !!slug,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}
