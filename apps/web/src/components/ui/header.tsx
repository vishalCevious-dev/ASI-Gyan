import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sun, Moon, Menu, X, LocateFixed } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { isDark, toggleTheme } = useTheme();

  const [shrink, setShrink] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const logoGreen = "#1DB954"; // Replace with your logo green

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setShrink(true); // scrolling down -> shrink
      } else {
        setShrink(false); // scrolling up -> grow
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const ThemeIcon = isDark ? Sun : Moon;

  return (
    <motion.header
      animate={{
        height: LocateFixed ? 60 : 90,
        paddingTop: shrink ? 4 : 6,
        paddingBottom: shrink ? 4 : 6,
        backdropFilter: "blur(10px)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/50 shadow-md backdrop-blur-lg transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="ASI Gyan Logo"
            className={cn(
              "transition-all duration-300 hover:scale-105",
              shrink ? "h-6" : "h-10",
              !prefersReducedMotion && "animate-logo-glow"
            )}
          />
          {/* <span
            className="font-bold text-xl"
            style={{ color: logoGreen }}
          >
            ASI Gyan
          </span> */}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="relative font-medium text-gray-700 dark:text-gray-200 hover:transition-all"
              style={{
                color: location.pathname === link.href ? logoGreen : undefined,
              }}
            >
              {link.name}
              {location.pathname === link.href && (
                <span
                  className="absolute -bottom-1 left-0 w-full h-0.5"
                  style={{ backgroundColor: logoGreen }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            className="text-foreground/70 hover:text-green-600 dark:hover:text-green-400 hover:bg-accent/30"
            style={{ color: logoGreen }}
          >
            <ThemeIcon className="h-5 w-5" />
          </Button>

          <Button
            asChild
            variant="outline"
            className="hidden md:inline-flex border-border text-foreground hover:bg-accent/30"
            style={{ borderColor: logoGreen, color: logoGreen }}
          >
            <Link to="/login">Login</Link>
          </Button>

          <Button
            asChild
            variant="default"
            className="hidden md:inline-flex text-white hover:bg-opacity-90"
            style={{ backgroundColor: logoGreen }}
          >
            <Link to="/courses">Explore Courses</Link>
          </Button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded hover:bg-accent/30"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background/80 border-t border-border shadow-md"
          >
            <div className="flex flex-col space-y-4 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-medium text-gray-700 dark:text-gray-200 hover:transition-all"
                  style={{ color: logoGreen }}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="font-medium text-gray-700 dark:text-gray-200 hover:transition-all"
                style={{ color: logoGreen }}
              >
                Login
              </Link>

              <Link
                to="/courses"
                onClick={() => setMobileOpen(false)}
                className="font-medium text-white text-center py-2 rounded transition-all"
                style={{ backgroundColor: logoGreen }}
              >
                Explore Courses
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
