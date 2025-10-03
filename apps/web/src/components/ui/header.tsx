import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/providers/theme-provider";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { isDark, toggleTheme } = useTheme();

  // Smoothly scroll to hash targets across routes and on-page
  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;
    const id = decodeURIComponent(hash.replace(/^#/, ""));

    // Try a few times in case content mounts after header
    let attempts = 0;
    const maxAttempts = 10;
    const interval = setInterval(() => {
      attempts++;
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90; // offset for fixed header
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [location.hash]);

  const ThemeIcon = isDark ? Sun : Moon;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-0">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              aria-label="Go to homepage"
              className="inline-flex items-center"
            >
              <img
                src={logo}
                alt="ASI Gyan Logo"
                className={cn(
                  "h-20 w-auto transition-all duration-300 hover:scale-110 cursor-pointer",
                  !prefersReducedMotion && "animate-logo-glow"
                )}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/#courses"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/#about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="/#newsletter"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Newsletter
            </Link>
            <Link
              to="/#blog"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/#contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
              className="text-muted-foreground hover:text-primary"
            >
              <ThemeIcon className="h-5 w-5" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              asChild
              variant="default"
              className={cn(
                "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-green",
                !prefersReducedMotion && "animate-glow-pulse"
              )}
            >
              <Link to="/#courses">Explore Courses</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Header;
