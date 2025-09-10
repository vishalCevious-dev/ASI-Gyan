/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InvalidateQueryFilters } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

type Message = { title: string; description?: string };

export function useAppMutation<TData = unknown, TVariables = void>(opts: {
  mutationKey: readonly unknown[];
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidate?: InvalidateQueryFilters | InvalidateQueryFilters[];
  successMessage?: ((data: TData) => Message) | Message;
  errorMessage?: ((err: any) => Message) | Message;
  onSuccess?: (data: TData) => void;
}) {
  const client = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation<TData, any, TVariables>({
    mutationKey: opts.mutationKey,
    mutationFn: opts.mutationFn,
    onSuccess: async (data) => {
      if (opts.successMessage) {
        const m =
          typeof opts.successMessage === "function"
            ? (opts.successMessage as any)(data)
            : opts.successMessage;
        toast({ title: m.title, description: m.description });
      }
      if (opts.onSuccess) opts.onSuccess(data);
      if (opts.invalidate) {
        if (Array.isArray(opts.invalidate)) {
          await Promise.all(
            opts.invalidate.map((f) => client.invalidateQueries(f)),
          );
        } else {
          await client.invalidateQueries(opts.invalidate);
        }
      }
    },
    onError: (err: any) => {
      if (opts.errorMessage) {
        const m =
          typeof opts.errorMessage === "function"
            ? (opts.errorMessage as any)(err)
            : opts.errorMessage;
        toast({
          title: m.title,
          description: m.description,
          variant: "destructive",
        });
      }
    },
  });

  return mutation;
}

// Back-compat helper matching your original signature
// useMutationData(mutationKey, mutationFn, queryKey, onSuccess)
export function useMutationData(
  mutationKey: readonly unknown[],

  mutationFn: (variables: any) => Promise<any>,
  // queryKey can be a QueryKey or a QueryFilter object
  queryKey?: unknown,
  onSuccess?: () => void,
) {
  const client = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation<any, any, any>({
    mutationKey,

    mutationFn: mutationFn as any,

    onSuccess: async (data: any) => {
      if (onSuccess) onSuccess();
      const message =
        (data as any)?.message || (data as any)?.data?.message || "Success";
      toast({ title: message });

      if (queryKey) {
        // Support passing a plain queryKey or a full filter
        const filter =
          Array.isArray(queryKey) || typeof queryKey === "string"
            ? { queryKey }
            : queryKey;
        await client.invalidateQueries(filter as InvalidateQueryFilters);
      }
    },

    onError: (err: any) => {
      const msg =
        err?.response?.data?.message || err?.message || "Something went wrong";
      toast({ title: "Error", description: msg, variant: "destructive" });
    },
  });

  return { mutate, isPending };
}
