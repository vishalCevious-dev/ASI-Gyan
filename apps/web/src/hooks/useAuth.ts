import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { useAppMutation } from "./useMutation";

export function useAuth() {
  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authApi.me(),
    retry: false,
    staleTime: 60_000,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const role: string | undefined = query.data?.data?.role as any;
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
  return useAppMutation({
    mutationKey: ["auth", "login"],
    // variables: { email, password }
    mutationFn: (v: { email: string; password: string }) =>
      authApi.login(v.email, v.password),
    successMessage: { title: "Signed in" },
    invalidate: [{ queryKey: ["auth", "me"] }],
  });
}

// Logout
export function useLogout() {
  return useAppMutation({
    mutationKey: ["auth", "logout"],
    // variables unused
    mutationFn: () => authApi.logout(),
    successMessage: { title: "Signed out" },
    invalidate: [{ queryKey: ["auth", "me"] }],
  });
}

export {};
