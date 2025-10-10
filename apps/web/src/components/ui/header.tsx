import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/providers/theme-provider";
import { Moon, Sun, Menu, X } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll for glassmorphic transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll for hash links
  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    let attempts = 0;
    const maxAttempts = 10;
    const interval = setInterval(() => {
      attempts++;
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [location.hash]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const ThemeIcon = isDark ? Sun : Moon;
  const MenuIcon = mobileMenuOpen ? X : Menu;
  const accentColor = "#16a34a"; // primary green
  const navLinks = [
    { label: "Courses", to: "/courses" },
    { label: "About", to: "/#about" },
    { label: "Newsletter", to: "/#newsletter" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/#contact" },
  ];

  const isLinkActive = (linkPath: string) => {
    return (
      location.pathname === linkPath ||
      location.pathname + location.hash === linkPath
    );
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-500 ease-in-out backdrop-blur-md",
          scrolled
            ? "top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl h-20 rounded-2xl bg-white/60 dark:bg-black/40 border border-white/30 dark:border-white/10 shadow-lg"
            : "w-full h-20 bg-white/40 dark:bg-black/30 border-b border-white/30 dark:border-white/10 shadow-sm"
        )}
      >
        <div
          className={cn(
            "w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-500",
            scrolled ? "scale-100 opacity-100" : "scale-70 opacity-95"
          )}
        >
          {/* Logo */}
          <Link to="/" aria-label="Go to homepage" className="inline-flex items-center">
            <img
              src={logo}
              alt="ASI Gyan Logo"
              className={cn(
                "h-10 w-auto transition-all duration-300 hover:scale-110 cursor-pointer drop-shadow-[0_0_8px_rgba(0,181,106,0.3)]",
                !prefersReducedMotion && "animate-logo-glow"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={active ? { color: accentColor } : {}}
                  className={cn(
                    "relative pb-1 font-medium transition-all duration-300",
                    isDark
                      ? "text-white/80 hover:text-white"
                      : "text-gray-800/80 hover:text-gray-900",
                    active && "font-semibold",
                    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300",
                    active
                      ? "after:w-full"
                      : ""
                  )}
                >
                  <span
                    className={cn(
                      "transition-colors",
                      active
                        ? "font-semibold"
                        : ""
                    )}
                    style={{
                      color: active ? accentColor : undefined,
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="absolute left-0 -bottom-[2px] h-[2px] w-0 transition-all duration-300"
                    style={{
                      backgroundColor: accentColor,
                      width: active ? "100%" : "0%",
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
              className={cn(
                "transition-all duration-300 hover:scale-105",
                isDark
                  ? "text-white/80 hover:text-[#16a34a] hover:bg-[#16a34a]/10"
                  : "text-gray-800 hover:text-[#16a34a] hover:bg-[#16a34a]/10"
              )}
            >
              <ThemeIcon className="h-5 w-5" />
            </Button>

            {/* Login */}
            <Button
              asChild
              variant="outline"
              className="border border-[#16a34a]/50 text-[#16a34a] 
                         bg-white/70 dark:bg-black/40 hover:bg-[#16a34a]/10 
                         transition-all duration-300 font-medium"
            >
              <Link to="/login">Login</Link>
            </Button>

            {/* Explore Courses */}
            <Button
              asChild
              className="bg-[#16a34a]/90 text-white hover:bg-[#16a34a]/70 
                         shadow-md hover:shadow-[0_0_20px_#16a34a/40] 
                         backdrop-blur-lg transition-all duration-500 border border-white/20"
            >
              <Link to="/courses">Explore Courses</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme Toggle for mobile */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
              className={cn(
                "transition-all duration-300 hover:scale-105",
                isDark
                  ? "text-white/80 hover:text-[#16a34a] hover:bg-[#16a34a]/10"
                  : "text-gray-800 hover:text-[#16a34a] hover:bg-[#16a34a]/10"
              )}
            >
              <ThemeIcon className="h-5 w-5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className={cn(
                "transition-all duration-300",
                isDark
                  ? "text-white/80 hover:text-[#16a34a] hover:bg-[#16a34a]/10"
                  : "text-gray-800 hover:text-[#16a34a] hover:bg-[#16a34a]/10"
              )}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen
            ? "bg-black/50 backdrop-blur-sm opacity-100"
            : "bg-black/0 backdrop-blur-0 opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-80 max-w-full bg-white/95 dark:bg-black/95 backdrop-blur-xl border-l border-white/30 dark:border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          {/* Mobile Navigation */}
          <nav className="flex-1 space-y-6">
            {navLinks.map((link) => {
              const active = isLinkActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={active ? { color: accentColor } : {}}
                  className={cn(
                    "block text-lg font-medium transition-all duration-300 py-3 px-4 rounded-xl",
                    isDark
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-gray-800/80 hover:text-gray-900 hover:bg-black/5",
                    active && "font-semibold bg-[#16a34a]/10"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span
                    className={cn(
                      "transition-colors",
                      active ? "font-semibold" : ""
                    )}
                    style={{
                      color: active ? accentColor : undefined,
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Actions */}
          <div className="space-y-4 pt-8 border-t border-white/20 dark:border-white/10">
            <Button
              asChild
              variant="outline"
              className="w-full border border-[#16a34a]/50 text-[#16a34a] 
                         bg-white/70 dark:bg-black/40 hover:bg-[#16a34a]/10 
                         transition-all duration-300 font-medium h-12"
            >
              <Link to="/login">Login</Link>
            </Button>

            <Button
              asChild
              className="w-full bg-[#16a34a]/90 text-white hover:bg-[#16a34a]/70 
                         shadow-md hover:shadow-[0_0_20px_#16a34a/40] 
                         backdrop-blur-lg transition-all duration-500 border border-white/20 h-12"
            >
              <Link to="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;