import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Users, HeartHandshake, Building, Filter, Pencil, Trash2, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  service_type: string;
  client: string | null;
  year: string | null;
  is_featured: boolean | null;
}

const serviceTypes = [
  { id: "all", label: "All Projects" },
  { id: "AI Automation", label: "AI & Automation" },
  { id: "BSS Architecture", label: "BSS Architecture" },
  { id: "Social Studies", label: "Social Studies" },
  { id: "Fundraising", label: "Fundraising" },
  { id: "Training", label: "Training Programs" },
];

const getServiceIcon = (type: string) => {
  switch (type) {
    case "AI Automation":
      return Bot;
    case "BSS Architecture":
      return Building;
    case "Fundraising":
      return HeartHandshake;
    case "Training":
      return GraduationCap;
    default:
      return Users;
  }
};

const getServiceColor = (type: string) => {
  switch (type) {
    case "AI Automation":
      return "bg-primary/10 text-primary";
    case "BSS Architecture":
      return "bg-purple-500/10 text-purple-600";
    case "Fundraising":
      return "bg-emerald-500/10 text-emerald-600";
    case "Training":
      return "bg-amber-500/10 text-amber-600";
    default:
      return "bg-blue-500/10 text-blue-600";
  }
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Project deleted" });
      fetchProjects();
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.service_type === activeFilter));
    }
  }, [activeFilter, projects]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) {
      setProjects(data);
      setFilteredProjects(data);
    }
    setIsLoading(false);
  };

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
            {serviceTypes.map((type) => (
              <Button
                key={type.id}
                variant={activeFilter === type.id ? "hero" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(type.id)}
              >
                {type.label}
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
                const Icon = getServiceIcon(project.service_type);
                const colorClass = getServiceColor(project.service_type);

                return (
                  <article key={project.id} className="card-elevated p-6 flex flex-col relative">
                    {isAdmin && (
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${colorClass}`}>
                        {project.service_type}
                      </span>
                    </div>

                    {project.is_featured && (
                      <span className="text-xs font-medium text-primary mb-2">Featured Project</span>
                    )}

                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    
                    {project.client && (
                      <p className="text-sm text-primary font-medium mb-2">
                        {project.client}
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
