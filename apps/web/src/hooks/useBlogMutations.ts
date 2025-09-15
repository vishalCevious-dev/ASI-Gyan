/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutationData } from "@/hooks/useMutation";
import { blogApi } from "@/lib/api";

type CreateInput = {
  path: "create";
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  status: "DRAFT" | "PUBLISHED";
  category?: string;
  tags?: string[];
  metaDescription?: string;
  videoUrl?: string;
  image?: File;
};

type UpdateInput = {
  path: "update";
  id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  status?: "DRAFT" | "PUBLISHED";
  category?: string;
  tags?: string[];
  metaDescription?: string;
  videoUrl?: string;
  image?: File;
  removeImage?: boolean;
};

type DeleteInput = {
  path: "delete";
  id: string;
};

export function useBlogMutation(onSuccess?: () => void) {
  const { mutate, isPending } = useMutationData(
    ["blog", "mutation"],
    async (data: CreateInput | UpdateInput | DeleteInput) => {
      if (data.path === "create") {
        const { path, ...rest } = data;
        return blogApi.create(rest);
      }
      if (data.path === "update") {
        const { path, id, ...rest } = data;
        return blogApi.update(id, rest);
      }
      // delete
      return blogApi.remove((data as DeleteInput).id);
    },
    [{ queryKey: ["blog", "list"] }],
    onSuccess,
  );

  return { mutate, isPending };
}

// Exact back-compat style matching your shared pattern
// mutate({ path: '/blog/add' | '/blog/update/:id' | '/blog/delete', id?, formData })
export function useCreateAndUpdateBlog(onSuccess?: () => void) {
  const { mutate, isPending } = useMutationData(
    ["blog-mutation"],
    async ({
      id,
      formData,
      path,
    }: {
      id?: string;
      formData?: FormData;
      path: string;
    }) => {
      if (path === "/blog/add") {
        return blogApi.createForm(formData as FormData);
      }
      if (path.includes("/blog/update/")) {
        return blogApi.updateForm(id as string, formData as FormData);
      }
      if (path === "/blog/delete") {
        return blogApi.remove(id as string);
      }
      throw new Error("Unknown blog mutation path");
    },
    [{ queryKey: ["blog", "list"] }],
    onSuccess,
  );

  return { mutate, isPending };
}
