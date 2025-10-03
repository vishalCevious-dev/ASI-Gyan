import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
const Footer = () => {
  const footerSections = [
    {
      title: "Learn",
      links: [
        "AI Fundamentals",
        "Advanced AI",
        "Leadership Track",
        "Corporate Training",
      ],
    },
    {
      title: "Resources",
      links: ["Blog", "Newsletter", "AI Tools", "Career Guide"],
    },
    {
      title: "Company",
      links: ["About Us", "Our Mission", "Careers", "Contact"],
    },
    {
      title: "Community",
      links: ["Public Gallery", "Discord", "LinkedIn", "Twitter", "YouTube"],
    },
  ];
  return (
    <footer id="contact" className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-5 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6  gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="ASI Gyan Logo" className="h-10 w-auto" />
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              AI School of Entrepreneur - Empowering the next generation of AI
              leaders through innovation, global impact, and transformative
              learning experiences.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link === "Public Gallery" ? (
                      <Link
                        to="/gallery"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Gallery
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Newsletter Signup */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-foreground">Stay Updated</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Your email"
              className="bg-background/50 border-border focus:border-primary w-1/5"
            />
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4"
            >
              Subscribe
            </Button>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-border pt-12 mb-12">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                📧 Email Us
              </h4>
              <a
                href="mailto:info@asigyan.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                info@asigyan.com
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                🌍 Global Reach
              </h4>
              <p className="text-muted-foreground">
                Made in Bharat, Scaling to the World
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                🤝 Partnership
              </h4>
              <a
                href="mailto:partnerships@asigyan.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                partnerships@asigyan.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              © 2024 ASI Gyan - AI School of Entrepreneur. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
      </div>
    </footer>
  );
};
export default Footer;
