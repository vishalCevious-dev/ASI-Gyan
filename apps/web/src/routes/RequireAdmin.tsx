import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Props = { children: ReactNode };

export default function RequireAdmin({ children }: Props) {
  const { isLoading, isError, isAdmin } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Checking permissions…
      </div>
    );
  }

  if (isError || !isAdmin) {
    // If not authed or not admin, send to login with redirect back
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
