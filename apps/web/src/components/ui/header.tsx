import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
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
                className="h-16 w-auto animate-logo-float animate-logo-glow transition-all duration-300 hover:scale-110 cursor-pointer"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#courses"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Courses
            </a>
            <a
              href="#about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#newsletter"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Newsletter
            </a>
            <a
              href="#blog"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Blog
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
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
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-green animate-glow-pulse"
            >
              <a href="#courses">Explore Courses</a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Header;
