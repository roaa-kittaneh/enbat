import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Ready to Transform Your{" "}
            <span className="text-gradient">Ideas into Reality?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Whether you need AI-powered solutions, social impact research, or strategic 
            fundraising support, Enbat is here to help you grow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Start a Conversation
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="mailto:info@enbat.co">
                <Mail className="h-5 w-5" />
                info@enbat.co
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
