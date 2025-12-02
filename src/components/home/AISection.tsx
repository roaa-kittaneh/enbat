import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, LineChart, Lightbulb, Zap, ArrowRight } from "lucide-react";

const capabilities = [
  { icon: Bot, label: "LLM Applications" },
  { icon: LineChart, label: "Business Analytics" },
  { icon: Lightbulb, label: "AI Research" },
  { icon: Zap, label: "Automation" },
];

export function AISection() {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Creative AI Card */}
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-foreground via-foreground to-foreground/95 rounded-3xl p-8 lg:p-12 overflow-hidden">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-sm font-medium tracking-wide uppercase">Featured Service</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-background mb-4 leading-tight">
                AI & Workflow Automation
              </h2>
              
              <p className="text-background/70 text-lg max-w-2xl mb-8">
                Transform your operations with intelligent solutions — from large language 
                models to advanced analytics and end-to-end automation.
              </p>

              {/* Capabilities */}
              <div className="flex flex-wrap gap-3 mb-10">
                {capabilities.map((cap) => (
                  <div 
                    key={cap.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 border border-background/20"
                  >
                    <cap.icon className="h-4 w-4 text-primary" />
                    <span className="text-background text-sm font-medium">{cap.label}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="heroOutline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground">
                  <Link to="/services#ai">
                    Learn More
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="text-background/70 hover:text-background hover:bg-background/10">
                  <Link to="/projects">
                    View Projects
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Other Services */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/services">
              Explore All Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
