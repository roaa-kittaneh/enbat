import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import * as Icons from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { toKebabCase } from "@/lib/utils";

export default function Services() {
  const { data: typesWithServices, isPending: loading, error } = useQuery({
    queryKey: ["service_types_with_services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_type")
        .select("id, name, description, created_at, services(id, title, description, icon, service_type, created_at)")
        .order('id')
      if (error) throw error
      return data ?? []
    },
  })

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
      {loading ? (
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-lg text-muted-foreground">Loading services...</p>
          </div>
        </section>
      ) : error ? (
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-lg text-destructive">Failed to load services.</p>
          </div>
        </section>
      ) : ((typesWithServices ?? []).length === 0 ? (
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-lg text-muted-foreground">No services available.</p>
          </div>
        </section>
      ) : (
        (typesWithServices ?? []).map((service, idx) => (
          <section
            key={service.id}
            id={service.id?.toString() ?? ''}
            className={`py-24 ${idx % 2 === 0 ? 'bg-background' : 'bg-secondary/30'}`}
          >
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Content - alternating sides */}
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                    <Icons.Building className="h-4 w-4" />
                    Service
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
                    {service.name}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {service.description}
                  </p>
                  <Button asChild variant="hero" size="lg">
                    <Link to="/contact">
                      Get Started
                      <Icons.ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                {/* Features Grid */}
                <div className={`grid sm:grid-cols-2 gap-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {(service.services ?? []).map((item: any) => {
                    const iconKebab = item.icon ? toKebabCase(item.icon) : 'activity';
                    return (
                    <div key={item.id} className="card-elevated p-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                        <DynamicIcon name={iconKebab as any} className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  
                  );
                })}
                </div>
              </div>
            </div>
          </section>
        ))
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
              <Icons.ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
    </Layout>
  );
}
