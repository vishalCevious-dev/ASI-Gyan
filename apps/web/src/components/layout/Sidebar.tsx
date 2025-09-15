import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  FileText,
  Image,
  Zap,
  ShoppingBag,
  CreditCard,
  BarChart3,
  Settings,
  Brain,
  Bot,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  activeTab?: string;
}

const navigation = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "communities", label: "Communities", icon: Users },
  { id: "members", label: "Members", icon: UserCheck },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "ai-tools", label: "AI Tools", icon: Zap },
  { id: "openai", label: "OpenAI", icon: Bot },
  { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar({ activeTab }: SidebarProps) {
  const location = useLocation();

  const currentFromPath = React.useMemo(() => {
    const p = location.pathname || "";
    if (!p.startsWith("/dashboard")) return activeTab || "dashboard";
    const rest = p.slice("/dashboard".length);
    const seg = rest.replace(/^\/+/, "").split("/")[0];
    return seg || "dashboard";
  }, [location.pathname, activeTab]);

  return (
    <div className="fixed left-0 top-0 h-screen w-64 glassmorphism border-r border-primary/20 p-6 z-50 flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="p-2 rounded-xl gradient-primary">
          <Brain className="w-6 h-6 text-black" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            ASI Gyan
          </h1>
          <p className="text-xs text-muted-foreground">Admin Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 pr-1">
        <nav className="space-y-2 py-1">
          {navigation?.map((item) => {
            const Icon = item.icon;
            const to =
              item.id === "dashboard" ? "/dashboard" : `/dashboard/${item.id}`;
            const isActive = currentFromPath === item.id;

            return (
              <Link
                key={item.id}
                to={to}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary/20 text-primary neon-glow border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Bottom decoration */}
      <div className="mt-4 pt-4 shrink-0">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="mt-4 text-center">
          <div className="w-8 h-8 mx-auto gradient-secondary rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">AI Powered</p>
        </div>
      </div>
    </div>
  );
}
