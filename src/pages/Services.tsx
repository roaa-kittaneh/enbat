import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Bot, LineChart, Lightbulb, Zap, 
  Users, HeartHandshake, TrendingUp, Leaf,
  Building, Shield, Settings, Network,
  ArrowRight
} from "lucide-react";

const services = [
  {
    id: "ai",
    title: "AI and Workflow Automation",
    description: "Transform your operations with intelligent AI solutions and automation",
    icon: Bot,
    color: "bg-primary/10 text-primary",
    items: [
      { icon: Bot, title: "AI Integration", desc: "Large language model applications and intelligent automation" },
      { icon: LineChart, title: "Data-Driven Insights", desc: "Business analytics, prediction, and forecasting" },
      { icon: Lightbulb, title: "Research & Innovation", desc: "Cutting-edge AI research for regional needs" },
      { icon: Zap, title: "Workflow Automation", desc: "End-to-end process automation" },
    ],
  },
  {
    id: "social",
    title: "Social Studies & Resource Mobilization",
    description: "Comprehensive research and impact measurement for meaningful change",
    icon: Users,
    color: "bg-blue-500/10 text-blue-600",
    items: [
      { icon: Users, title: "Impact Studies", desc: "Social, environmental, political, and health research" },
      { icon: HeartHandshake, title: "Outcome Measurement", desc: "Comprehensive impact and outcome assessments" },
      { icon: TrendingUp, title: "Fundraising Support", desc: "Resource mobilization for NGOs and enterprises" },
      { icon: Leaf, title: "Green Finance", desc: "Sustainable finance understanding and implementation" },
    ],
  },
  {
    id: "bss",
    title: "BSS Architecture & Modernization",
    description: "Comprehensive telecom business support system solutions",
    icon: Building,
    color: "bg-purple-500/10 text-purple-600",
    items: [
      { icon: Shield, title: "Revenue Assurance", desc: "Integration audits and fraud management" },
      { icon: Settings, title: "Operational Automation", desc: "Change management and compliance planning" },
      { icon: Network, title: "System Integration", desc: "Interconnect and roaming systems alignment" },
      { icon: Building, title: "Digital Transformation", desc: "Digital channel alignment and modernization" },
    ],
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              End-to-end services in intelligent creation tailored to low-resource 
              and regional needs. Customized, effective, scalable, research-backed 
              solutions with real-world impact.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, idx) => (
        <section 
          key={service.id} 
          id={service.id}
          className={`py-24 ${idx % 2 === 0 ? 'bg-background' : 'bg-secondary/30'}`}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content - alternating sides */}
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${service.color} text-sm font-medium mb-6`}>
                  <service.icon className="h-4 w-4" />
                  Service
                </div>
                <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {service.description}
                </p>
                <Button asChild variant="hero" size="lg">
                  <Link to="/contact">
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Features Grid */}
              <div className={`grid sm:grid-cols-2 gap-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                {service.items.map((item) => (
                  <div key={item.title} className="card-elevated p-6">
                    <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-background mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-background/70 mb-8 max-w-2xl mx-auto">
            Let's discuss how Enbat can help transform your ideas into impactful solutions.
          </p>
          <Button asChild variant="heroOutline" size="xl" className="border-background text-background hover:bg-background hover:text-foreground">
            <Link to="/contact">
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
