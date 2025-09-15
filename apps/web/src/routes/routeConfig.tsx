import Index from "@/pages/Index";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
import PublicGallery from "@/pages/PublicGallery";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export const PUBLIC_ROUTES = [
  { path: "/", element: <Index /> },
  { path: "/blog", element: <BlogList /> },
  { path: "/blog/:slug", element: <BlogPost /> },
  { path: "/gallery", element: <PublicGallery /> },
];

export const GUEST_ROUTES = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

// Admin routes are handled under /dashboard/* via the Admin layout component
// inside apps/web/src/pages/Admin.tsx. If you prefer to configure them here,
// you can export an array for child routes and consume it in Admin.
