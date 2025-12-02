import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const footerLinks = {
  services: [
    { name: "AI & Workflow Automation", href: "/services#ai" },
    { name: "Social Studies", href: "/services#social" },
    { name: "BSS Architecture", href: "/services#bss" },
    { name: "Fundraising", href: "/services#fundraising" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Enbat Logo" className="h-10 w-auto brightness-0 invert" />
              <span className="text-xl font-semibold">Enbat</span>
            </Link>
            <p className="text-background/70 text-sm mb-6 leading-relaxed">
              Germinating Ideas… Growing Success. Delivering customized, effective, scalable, research-backed solutions with real-world impact.
            </p>
            <p className="text-sm italic text-background/60 font-display">
              "Germinating Ideas… Growing Success"
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-background/90">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-background/90">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-background/90">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@enbat.co"
                  className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  info@enbat.co
                </a>
              </li>
              <li>
                <a
                  href="tel:+971529981952"
                  className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +971 52 998 1952 (UAE)
                </a>
              </li>
              <li>
                <a
                  href="tel:+972597605631"
                  className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +972 597 605 631 (Palestine)
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-background/60">
                <MapPin className="h-4 w-4 mt-0.5" />
                UAE & Palestine
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} Enbat. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-background/50 hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-background/50 hover:text-background transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
