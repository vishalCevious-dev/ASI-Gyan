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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
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
                  "h-12 w-auto transition-all duration-300 hover:scale-110 cursor-pointer",
                  !prefersReducedMotion && "animate-logo-glow"
                )}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/courses"
              className={cn(
                "relative text-foreground/70 hover:text-green-600 dark:hover:text-green-400 transition-colors pb-1",
                location.pathname === "/courses" && "text-green-600 dark:text-green-400"
              )}
            >
              Courses
              {location.pathname === "/courses" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 dark:bg-green-400"></span>
              )}
            </Link>
            <Link
              to="/#about"
              className={cn(
                "relative text-foreground/70 hover:text-green-600 dark:hover:text-green-400 transition-colors pb-1",
                location.pathname === "/" && location.hash === "#about" && "text-green-600 dark:text-green-400"
              )}
            >
              About
              {location.pathname === "/" && location.hash === "#about" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 dark:bg-green-400"></span>
              )}
            </Link>
            <Link
              to="/#newsletter"
              className={cn(
                "relative text-foreground/70 hover:text-green-600 dark:hover:text-green-400 transition-colors pb-1",
                location.pathname === "/" && location.hash === "#newsletter" && "text-green-600 dark:text-green-400"
              )}
            >
              Newsletter
              {location.pathname === "/" && location.hash === "#newsletter" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 dark:bg-green-400"></span>
              )}
            </Link>
            <Link
              to="/blog"
              className={cn(
                "relative text-foreground/70 hover:text-green-600 dark:hover:text-green-400 transition-colors pb-1",
                location.pathname === "/blog" && "text-green-600 dark:text-green-400"
              )}
            >
              Blog
              {location.pathname === "/blog" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 dark:bg-green-400"></span>
              )}
            </Link>
            <Link
              to="/#contact"
              className={cn(
                "relative text-foreground/70 hover:text-green-600 dark:hover:text-green-400 transition-colors pb-1",
                location.pathname === "/" && location.hash === "#contact" && "text-green-600 dark:text-green-400"
              )}
            >
              Contact
              {location.pathname === "/" && location.hash === "#contact" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 dark:bg-green-400"></span>
              )}
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
              className="text-foreground/70 hover:text-green-600 dark:hover:text-green-400 hover:bg-accent/50"
            >
              <ThemeIcon className="h-5 w-5" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border text-foreground hover:bg-accent/50"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-200"
            >
              <Link to="/courses">Explore Courses</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Header;
