import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, setAuthToken } from "@/lib/api";
import { useAppMutation } from "./useMutation";

export function useAuth() {
  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authApi.me(),
    retry: false,
    // staleTime: 60_000,
  });

  // Treat any error from /me as unauthenticated, regardless of stale data
  const role: string | undefined = query.isSuccess
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((query.data as any)?.data?.role as any)
    : undefined;
  const isAuthenticated = !!role;
  const isAdmin = role === "ADMIN";

  return { ...query, role, isAuthenticated, isAdmin };
}

// Register (optionally with superAdminKey to create admin)
export function useRegister() {
  return useAppMutation({
    mutationKey: ["auth", "register"],
    // variables: { name, email, password, superAdminKey? }
    mutationFn: (v: {
      name: string;
      email: string;
      password: string;
      superAdminKey?: string;
    }) =>
      authApi.register(
        v.name,
        v.email,
        v.password,
        v.superAdminKey ? { superAdminKey: v.superAdminKey } : undefined,
      ),
    successMessage: { title: "Registration successful" },
    invalidate: [{ queryKey: ["auth", "me"] }],
  });
}

// Login
export function useLogin() {
  const client = useQueryClient();
  return useAppMutation({
    mutationKey: ["auth", "login"],
    // variables: { email, password }
    mutationFn: (v: { email: string; password: string }) =>
      authApi.login(v.email, v.password),
    successMessage: { title: "Signed in" },
    onSuccess: (resp) => {
      // Prime the `me` cache so protected routes can render immediately
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const u = (resp as any)?.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const token = (resp as any)?.data?.token as string | undefined;
      if (token) setAuthToken(token);
      if (u && u.id && u.email && u.role) {
        client.setQueryData(["auth", "me"], {
          statusCode: 200,
          success: true,
          message: "ok",
          data: {
            id: u.id,
            email: u.email,
            role: u.role,
            createdAt: new Date().toISOString(),
          },
        });
      }
    },
    invalidate: [{ queryKey: ["auth", "me"] }],
  });
}

// Logout
export function useLogout() {
  const client = useQueryClient();
  return useAppMutation({
    mutationKey: ["auth", "logout"],
    // variables unused
    mutationFn: () => authApi.logout(),
    successMessage: { title: "Signed out" },
    // Optimistically clear auth cache so guest routes render immediately
    onSuccess: async () => {
      // Stop any inflight `me` request, then clear cache
      await client.cancelQueries({ queryKey: ["auth", "me"] });
      client.setQueryData(["auth", "me"], undefined);
      setAuthToken(undefined);
    },
    invalidate: [{ queryKey: ["auth", "me"] }],
  });
}

export {};
