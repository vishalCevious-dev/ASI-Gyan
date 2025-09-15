import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Props = { children: ReactNode };

// Redirect authenticated users away from guest-only pages (login/register/etc)
export default function RequireGuest({ children }: Props) {
  const { isAuthenticated, isAdmin } = useAuth();

  // If authenticated, redirect away from guest pages
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/dashboard" : "/"} replace />;
  }

  // Render guest content immediately; don't block on auth check
  return <>{children}</>;
}
