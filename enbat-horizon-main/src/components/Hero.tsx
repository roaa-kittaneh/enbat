import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-mustard/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-olive-light/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">AI-Driven Solutions for Social Impact</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <span className="block text-foreground mb-2">Germinating Ideas</span>
            <span className="block text-gradient-accent">Growing Success</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            With deep roots in industry, academia, and global collaboration, Enbat delivers customized, 
            research-backed solutions that bridge AI innovation and real-world social impact.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-olive-dark text-primary-foreground font-medium px-8 py-6 text-lg rounded-xl shadow-strong transition-all duration-300 hover:shadow-medium hover:scale-105"
              onClick={() => scrollToSection("services")}
            >
              Explore Our Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium px-8 py-6 text-lg rounded-xl transition-all duration-300"
              onClick={() => scrollToSection("case-studies")}
            >
              View Case Studies
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-display font-bold text-gradient-primary">$1M+</div>
              <div className="text-sm md:text-base text-muted-foreground">Grants Secured</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-display font-bold text-gradient-primary">3 Years</div>
              <div className="text-sm md:text-base text-muted-foreground">Ooredoo Partnership</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-display font-bold text-gradient-primary">15+</div>
              <div className="text-sm md:text-base text-muted-foreground">Major Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
