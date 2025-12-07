import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Lightbulb, Globe, Handshake } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Solutions that address real-world challenges and generate meaningful impact.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Cutting-edge AI and research for forward-thinking, scalable solutions.",
  },
  {
    icon: Globe,
    title: "Regional Focus",
    description: "Tailored solutions for low-resource and regional contexts.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description: "Lasting relationships through collaboration and shared success.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-semibold text-foreground mb-6">
                About <span className="text-gradient">Enbat</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                <span className="font-medium text-foreground">Enbat</span> is Arabic for 
                <span className="italic"> germination</span> — the development of a plant from a seed, 
                representing something beautiful coming into existence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We provide end-to-end services in intelligent creation, combining AI technology 
                with social impact expertise for regional needs.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-secondary flex items-center justify-center">
                <div className="text-center">
                  <span className="text-7xl font-display text-primary/30">إنبات</span>
                  <p className="text-lg font-medium text-foreground mt-4">Germination</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-background mb-4">Our Mission</h2>
            <p className="text-lg text-background/80 leading-relaxed font-display italic">
              "Delivering customized, scalable, research-backed solutions with real-world impact."
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card-elevated p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Expertise */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-8">
              Dual Expertise
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">AI & Technology</h3>
                <p className="text-sm text-muted-foreground">
                  Large language models, workflow automation, data analytics, and cutting-edge research
                </p>
              </div>
              <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
                <h3 className="font-semibold text-foreground mb-2">Social Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Research, fundraising, resource mobilization, and community development
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-background mb-4">
            Ready to Grow Together?
          </h2>
          <Button asChild variant="heroOutline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground">
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
