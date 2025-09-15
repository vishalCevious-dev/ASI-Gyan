import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Communities } from "@/components/communities/Communities";
import { Members } from "@/components/members/Members";
import { AITools } from "@/components/ai-tools/AITools";
import OpenAIPage from "@/components/ai-tools/OpenAIPage";
import { Blog } from "@/components/blog/Blog";
import Gallery from "@/components/gallery/Gallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  ShoppingBag,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import React from "react";

function Courses() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
        Courses Management
      </h1>
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Course Management System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Course management interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Marketplace() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
        Marketplace
      </h1>
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Product Marketplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Marketplace management interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Payments() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
        Payments
      </h1>
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Payment Processing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Payment management interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
        Analytics
      </h1>
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Advanced Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Analytics dashboard coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
        Settings
      </h1>
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Platform Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Settings configuration coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Admin() {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState<boolean>(
    () => {
      try {
        const v = localStorage.getItem("asi.sidebar.collapsed");
        return v === "1" || v === "true";
      } catch {
        return false;
      }
    },
  );
  const toggleSidebar = React.useCallback(() => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("asi.sidebar.collapsed", next ? "1" : "0");
      } catch {
        //
      }
      return next;
    });
  }, []);
  const activeFromPath = (() => {
    const p = location.pathname || "";
    if (!p.startsWith("/dashboard")) return "dashboard";
    const rest = p.slice("/dashboard".length);
    const seg = rest.replace(/^\/+/, "").split("/")[0];
    return seg || "dashboard";
  })();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        activeTab={activeFromPath}
        collapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />
      <Header
        activeTab={activeFromPath}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />
      <main
        className={`${isSidebarCollapsed ? "ml-16" : "ml-64"} mt-16 p-8 transition-[margin] duration-200`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Admin route map for easy maintenance */}
          <Routes>
            {[
              { index: true, element: <Dashboard /> },
              { path: "communities", element: <Communities /> },
              { path: "members", element: <Members /> },
              { path: "courses", element: <Courses /> },
              { path: "blog", element: <Blog /> },
              { path: "gallery", element: <Gallery /> },
              { path: "ai-tools", element: <AITools /> },
              { path: "openai", element: <OpenAIPage /> },
              { path: "marketplace", element: <Marketplace /> },
              { path: "payments", element: <Payments /> },
              { path: "analytics", element: <Analytics /> },
              { path: "settings", element: <SettingsPage /> },
            ].map((r, i) =>
              r.index ? (
                <Route key={`admin-index-${i}`} index element={r.element} />
              ) : (
                <Route
                  key={`admin-${r.path}-${i}`}
                  path={r.path!}
                  element={r.element}
                />
              ),
            )}
            {/* Back-compat: redirect unknown child paths to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
