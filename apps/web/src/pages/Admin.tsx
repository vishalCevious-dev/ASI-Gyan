import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Communities } from "@/components/communities/Communities";
import { Members } from "@/components/members/Members";
import { AITools } from "@/components/ai-tools/AITools";
import { Blog } from "@/components/blog/Blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  ShoppingBag,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

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
  const activeFromPath = (() => {
    const p = location.pathname || "";
    if (!p.startsWith("/dashboard")) return "dashboard";
    const rest = p.slice("/dashboard".length);
    const seg = rest.replace(/^\/+/, "").split("/")[0];
    return seg || "dashboard";
  })();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeFromPath} />
      <Header activeTab={activeFromPath} />
      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="communities" element={<Communities />} />
            <Route path="members" element={<Members />} />
            <Route path="courses" element={<Courses />} />
            <Route path="blog" element={<Blog />} />
            <Route path="ai-tools" element={<AITools />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="payments" element={<Payments />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<SettingsPage />} />
            {/* Back-compat: redirect unknown child paths to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
