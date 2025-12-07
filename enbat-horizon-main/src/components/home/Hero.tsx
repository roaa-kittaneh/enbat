import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-hero overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Data Flow Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path 
            d="M0,300 Q400,250 800,300 T1600,300" 
            fill="none" 
            stroke="url(#lineGradient)" 
            strokeWidth="2"
          />
          <path 
            d="M0,400 Q400,350 800,400 T1600,400" 
            fill="none" 
            stroke="url(#lineGradient)" 
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-up">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              AI Innovation & Social Impact
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-tight mb-6 animate-fade-up delay-100">
            Germinating Ideas…{" "}
            <span className="text-gradient">Growing Success</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-200">
            Enbat delivers customized, scalable, research-backed solutions combining 
            <span className="text-foreground font-medium"> AI technology </span> 
            and 
            <span className="text-foreground font-medium"> social impact </span> 
            for real-world transformation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
            <Button asChild variant="hero" size="xl">
              <Link to="/services">
                Explore Services
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-border/50 animate-fade-up delay-400">
            <p className="text-sm text-muted-foreground mb-4">Trusted by organizations across</p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground/60">
              <span className="text-sm font-medium">UAE</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-sm font-medium">Palestine</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-sm font-medium">International NGOs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
