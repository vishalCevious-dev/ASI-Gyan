import {
  Routes,
  Route,
  Navigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Admin from "@/pages/Admin";
import { PUBLIC_ROUTES, GUEST_ROUTES } from "@/routes/routeConfig";
import { useAuth } from "@/hooks/useAuth";

export default function AppRoutes() {
  const { isLoading, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const onGuestPath = GUEST_ROUTES.some(
    (r) => !!matchPath(r.path, location.pathname),
  );

  if (isLoading && !onGuestPath) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Checking permissions…
      </div>
    );
  }
  console.log("isAuthenticated", isAuthenticated);
  console.log("isAdmin", isAdmin);

  return (
    <Routes>
      {/* Public routes (always accessible) */}
      {PUBLIC_ROUTES.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Guest-only routes: if authed, redirect away */}
      {!isAuthenticated
        ? GUEST_ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))
        : GUEST_ROUTES.map(({ path }) => (
            <Route
              key={path}
              path={path}
              element={<Navigate to={isAdmin ? "/dashboard" : "/"} replace />}
            />
          ))}

      {/* Admin routes: only mount dashboard for admins */}
      {isAdmin ? (
        <Route path="/dashboard/*" element={<Admin />} />
      ) : (
        // Non-admins hitting /dashboard get redirected to login
        <Route path="/dashboard/*" element={<Navigate to="/login" replace />} />
      )}

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
