import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import Admin from "@/pages/Admin";
import RequireAdmin from "@/routes/RequireAdmin";
import RequireGuest from "@/routes/RequireGuest";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";

export default function AppRoutes() {
  return (
    <Routes>
      {/* User routes */}
      <Route path="/" element={<Index />} />
      <Route
        path="/login"
        element={
          <RequireGuest>
            <Login />
          </RequireGuest>
        }
      />
      <Route
        path="/register"
        element={
          <RequireGuest>
            <Register />
          </RequireGuest>
        }
      />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      {/* Admin routes */}
      <Route
        path="/dashboard/*"
        element={
          <RequireAdmin>
            <Admin />
          </RequireAdmin>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
