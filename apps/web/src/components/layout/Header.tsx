import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Zap,
  Shield,
  HelpCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useLogout } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/providers/theme-provider";
// import { toast } from 'sonner';

interface HeaderProps {
  activeTab?: string;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

const notifications = [
  {
    id: 1,
    title: "New member joined",
    message: "Alex Chen has joined the AI Researchers community",
    time: "2 min ago",
    type: "user",
    unread: true,
  },
  {
    id: 2,
    title: "Course completed",
    message: 'Sarah Wilson completed "Machine Learning Fundamentals"',
    time: "15 min ago",
    type: "course",
    unread: true,
  },
  {
    id: 3,
    title: "System update",
    message: "AI tools have been updated with new features",
    time: "1 hour ago",
    type: "system",
    unread: false,
  },
  {
    id: 4,
    title: "Payment received",
    message: "Premium subscription payment of $99 received",
    time: "2 hours ago",
    type: "payment",
    unread: false,
  },
];

const getPageTitle = (activeTab: string) => {
  switch (activeTab) {
    case "dashboard":
      return "Dashboard Overview";
    case "communities":
      return "Communities";
    case "members":
      return "Members";
    case "courses":
      return "Courses";
    case "blog":
      return "Blog";
    case "gallery":
      return "Gallery";
    case "ai-tools":
      return "AI Tools";
    case "openai":
      return "OpenAI Chat";
    case "marketplace":
      return "Marketplace";
    case "payments":
      return "Payments";
    case "analytics":
      return "Analytics";
    case "settings":
      return "Settings";
    default:
      return "Dashboard";
  }
};

export function Header({
  activeTab,
  isSidebarCollapsed = false,
  onToggleSidebar,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDark, toggleTheme } = useTheme();
  const ThemeToggleIcon = isDark ? Sun : Moon;
  const unreadCount = notifications.filter((n) => n.unread).length;

  const navigate = useNavigate();
  const { mutateAsync: logout, isPending: loggingOut } = useLogout();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      // Proactively clear auth to let guest routes render immediately
      await queryClient.cancelQueries({ queryKey: ["auth", "me"] });
      queryClient.setQueryData(["auth", "me"], undefined);
      await logout();
      navigate("/login", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (e: any) {
      // Toast is handled inside the mutation hook; keep user on page if it fails
      // toast({ title: 'Failed to logout', description: e.message || 'Please try again', variant: 'destructive' });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header
      className={`fixed top-0 right-0 ${
        isSidebarCollapsed ? "left-16" : "left-64"
      } h-16 glassmorphism border-b border-primary/20 z-40 transition-[left] duration-200`}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Page Title & Search */}
        <div className="flex items-center gap-6">
          {/* Sidebar toggle */}
          {typeof onToggleSidebar === "function" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="text-muted-foreground hover:text-foreground hover:bg-accent/20"
              aria-label={
                isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          )}
          <div>
            <h1 className="text-md font-semibold text-foreground">
              {getPageTitle(activeTab || "dashboard")}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse" />
              <span className="text-xs text-muted-foreground">Live Status</span>
            </div>
          </div>

          {/* Global Search */}
          <form onSubmit={handleSearch} className="relative gap-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search across platform..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80 bg-input/50 border-primary/30 focus:border-primary/60 focus:bg-input/80 transition-all"
            />
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 glassmorphism border border-primary/20 rounded-lg p-4 space-y-2">
                <div className="text-sm text-muted-foreground">
                  Quick results for "{searchQuery}"
                </div>
                <div className="space-y-1">
                  <div className="p-2 hover:bg-accent/20 rounded cursor-pointer text-sm">
                    <span className="text-primary">Members:</span> Alex Chen,
                    Sarah Wilson
                  </div>
                  <div className="p-2 hover:bg-accent/20 rounded cursor-pointer text-sm">
                    <span className="text-accent-foreground">Courses:</span> AI
                    Fundamentals
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-4 mx-1">
          {/* AI Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent-foreground/30">
            <Zap className="w-4 h-4 text-accent-foreground" />
            <span className="text-xs font-medium text-accent-foreground">
              AI Active
            </span>
            <div className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse" />
          </div>

          {/* Theme Toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground hover:bg-accent/20"
            aria-label={
              isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            title={isDark ? "Light mode" : "Dark mode"}
          >
            <ThemeToggleIcon className="w-4 h-4" />
          </Button>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground hover:bg-accent/20"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-chart-4 text-white border-0">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-80 glassmorphism border-primary/20 p-0"
              align="end"
            >
              <div className="p-4 border-b border-primary/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">
                    Notifications
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-accent/20 text-accent-foreground"
                  >
                    {unreadCount} new
                  </Badge>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-primary/10 hover:bg-accent/10 transition-colors ${
                      notification.unread ? "bg-accent/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.unread
                            ? "bg-primary"
                            : "bg-muted-foreground"
                        }`}
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-primary/20">
                <Button
                  variant="ghost"
                  className="w-full text-primary hover:bg-primary/10"
                >
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 h-10 px-3 hover:bg-accent/20 transition-all"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="gradient-primary text-black font-medium text-sm">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">
                    Admin User
                  </p>
                  <p className="text-xs text-muted-foreground">Super Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 glassmorphism border-primary/20"
              align="end"
            >
              <div className="p-3 border-b border-primary/20">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="gradient-primary text-black font-medium">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">Admin User</p>
                    <p className="text-sm text-muted-foreground">
                      admin@asigyan.com
                    </p>
                  </div>
                </div>
              </div>

              <DropdownMenuItem className="hover:bg-accent/20 cursor-pointer">
                <User className="w-4 h-4 mr-3" />
                Profile Settings
              </DropdownMenuItem>

              <DropdownMenuItem className="hover:bg-accent/20 cursor-pointer">
                <Shield className="w-4 h-4 mr-3" />
                Security
              </DropdownMenuItem>

              <DropdownMenuItem className="hover:bg-accent/20 cursor-pointer">
                <Settings className="w-4 h-4 mr-3" />
                Preferences
              </DropdownMenuItem>

              <DropdownMenuItem className="hover:bg-accent/20 cursor-pointer">
                <HelpCircle className="w-4 h-4 mr-3" />
                Help & Support
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-primary/20" />

              <DropdownMenuItem
                className={`hover:bg-destructive/20 text-destructive cursor-pointer ${loggingOut ? "opacity-70 pointer-events-none" : ""}`}
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                {loggingOut ? "Signing out…" : "Sign Out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

