import { Card } from "@/components/ui/card";
import { Brain, Heart, Network, TrendingUp, Database, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI & Workflow Automation",
    items: [
      "AI integration and large language model applications",
      "AI for business analytics, prediction, and forecasting",
      "Research and innovation in AI"
    ],
    gradient: "from-primary/10 to-olive-medium/10"
  },
  {
    icon: Heart,
    title: "Social Studies & Resource Mobilization",
    items: [
      "Impact and outcome measurement studies",
      "Fundraising and resource mobilization for NGOs",
      "Green Finance understanding and implementation"
    ],
    gradient: "from-accent/10 to-mustard-light/10"
  },
  {
    icon: Network,
    title: "BSS Architecture & Modernization",
    items: [
      "Integration audits, revenue assurance, fraud management",
      "Operational automation and change management",
      "Interconnect, roaming systems, and digital channel alignment"
    ],
    gradient: "from-olive-light/30 to-secondary/30"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
            Our <span className="text-gradient-accent">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            End-to-end intelligent solutions tailored to low-resource and regional needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className={`group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-medium animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative p-8 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-display font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <ul className="space-y-3">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional capabilities */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-soft">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display font-semibold text-foreground">Data-Driven</h4>
                <p className="text-sm text-muted-foreground">Research-backed insights and analytics</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display font-semibold text-foreground">Scalable</h4>
                <p className="text-sm text-muted-foreground">Solutions that grow with your needs</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display font-semibold text-foreground">Innovative</h4>
                <p className="text-sm text-muted-foreground">Cutting-edge AI and automation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
