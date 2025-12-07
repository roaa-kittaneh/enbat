import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Filter, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/database.types";

type ServiceType = Tables<"service_type">;
type Project = Tables<"projects"> & {
  service_type: ServiceType | null;
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const { toast } = useToast();

  const { data: serviceTypes = [], isPending: isLoadingTypes } = useQuery({
    queryKey: ["service_types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_type")
        .select("*")
        .order("id");
      if (error) throw error;
      return data as ServiceType[];
    },
  });

  const { data: projects = [], isPending: isLoadingProjects, refetch: refetchProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, service_type(*)")
        // .order("display_order", { ascending: true });
      if (error) throw error;
      return data as Project[];
    },
  });

  const filteredProjects = useMemo(() => {
    if (activeFilter === null) return projects;
    return projects.filter((p) => p.service_type?.id === activeFilter);
  }, [activeFilter, projects]);

  const isLoading = isLoadingTypes || isLoadingProjects;

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Our <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our track record of delivering impactful solutions across
              AI technology, BSS modernization, social research, and strategic fundraising.
            </p>
          </div>
        </div>
      </section>


      {/* Filter & Projects */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Button
              variant={activeFilter === null ? "hero" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(null)}
            >
              All Projects
            </Button>
            {serviceTypes.map((type) => (
              <Button
                key={type.id}
                variant={activeFilter === type.id ? "hero" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(type.id)}
              >
                {type.name}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-elevated p-6 animate-pulse">
                  <div className="h-12 w-12 bg-secondary rounded-xl mb-4" />
                  <div className="h-6 bg-secondary rounded w-3/4 mb-2" />
                  <div className="h-4 bg-secondary rounded w-1/2 mb-4" />
                  <div className="h-20 bg-secondary rounded" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No projects found for this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                return (
                  <article key={project.id} className="card-elevated p-6 flex flex-col relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        {project.logo_url ? (
                          <img src={project.logo_url} alt={project.title} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          <Bot className="h-6 w-6" />
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        {project.service_type && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {project.service_type.name}
                          </span>
                        )}
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          project.is_completed
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-amber-500/10 text-amber-600"
                        }`}>
                          {project.is_completed ? "Completed" : "In Progress"}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>

                    {project.subtitle && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {project.subtitle}
                      </p>
                    )}

                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {project.description}
                    </p>

                    {project.year && (
                      <div className="text-xs text-muted-foreground">
                        Year: {project.year}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your goals with our proven expertise.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/contact">
              Start a Conversation
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
