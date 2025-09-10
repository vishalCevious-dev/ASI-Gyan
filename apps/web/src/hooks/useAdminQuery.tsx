import { useQuery } from "@tanstack/react-query";
import { blogApi } from "@/lib/api";

// Admin blog list (currently reuses public list; backend endpoint returns PUBLISHED only)
export function useAdminBlogList(page = 1, limit = 20) {
  return useQuery({
    queryKey: ["admin", "blog", { page, limit }],
    queryFn: () => blogApi.list(page, limit),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}
