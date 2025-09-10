import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Props = { children: ReactNode };

// Redirect authenticated users away from guest-only pages (login/register/etc)
export default function RequireGuest({ children }: Props) {
  const { isLoading, isAuthenticated, isAdmin } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Checking session…
      </div>
    );
  }

  if (isAuthenticated) {
    // Send admins to dashboard, others to home
    return <Navigate to={isAdmin ? "/dashboard" : "/"} replace />;
  }

  return <>{children}</>;
}
