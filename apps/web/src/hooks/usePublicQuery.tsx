import { useQuery } from "@tanstack/react-query";
import { blogApi, galleryApi } from "@/lib/api";

// Public blog list (published only)
export function usePublicBlogList(page = 1, limit = 9) {
  return useQuery({
    queryKey: ["blog", "list", { page, limit }],
    queryFn: () => blogApi.list(page, limit),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}

// Single blog by slug (published)
export function useBlogBySlug(slug?: string) {
  return useQuery({
    queryKey: ["blog", "slug", slug || ""],
    queryFn: () => blogApi.getBySlug(slug as string),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!slug,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}

// Public gallery list (published only)
export function usePublicGalleryList(page = 1, limit = 12) {
  return useQuery({
    queryKey: ["gallery", "list", { page, limit }],
    queryFn: () => galleryApi.list(page, limit),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}
