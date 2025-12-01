import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-primary/5 border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-foreground">Enbat</div>
                <div className="text-xs text-muted-foreground">Germinating Ideas, Growing Success</div>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <a href="#about" className="hover:text-primary transition-colors duration-200">About</a>
              <span className="text-border">•</span>
              <a href="#services" className="hover:text-primary transition-colors duration-200">Services</a>
              <span className="text-border">•</span>
              <a href="#case-studies" className="hover:text-primary transition-colors duration-200">Case Studies</a>
              <span className="text-border">•</span>
              <a href="#contact" className="hover:text-primary transition-colors duration-200">Contact</a>
              <span className="text-border">•</span>
              <a href="mailto:info@enbat.co" className="hover:text-primary transition-colors duration-200">info@enbat.co</a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground text-center md:text-right">
              © {new Date().getFullYear()} Enbat. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
