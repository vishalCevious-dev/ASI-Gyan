import Index from "@/pages/Index";
import Blog from "@/pages/Blog";
import PublicGallery from "@/pages/PublicGallery";
import Courses from "@/pages/Courses";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export const PUBLIC_ROUTES = [
  { path: "/", element: <Index /> },
  { path: "/courses/*", element: <Courses /> },
  { path: "/blog/*", element: <Blog /> },
  { path: "/gallery", element: <PublicGallery /> },
  
];

export const GUEST_ROUTES = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

// Admin routes are handled under /dashboard/* via the Admin layout component
// inside apps/web/src/pages/Admin.tsx. If you prefer to configure them here,
// you can export an array for child routes and consume it in Admin.
