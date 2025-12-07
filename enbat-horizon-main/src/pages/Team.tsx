import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/database.types";

type Member = Tables<"members">;

export default function Team() {
  const { data: team = [], isPending: isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as Member[];
    },
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-foreground mb-4">
              Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-muted-foreground">
              Industry expertise, academic excellence, and a passion for impact.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : team && team.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <article key={member.id} className="card-elevated overflow-hidden">
                  {/* Avatar */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name || "Team member"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-4xl font-semibold text-primary">
                          {member.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                    {member.description && (
                      <p className="text-sm text-muted-foreground">{member.description}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <p>No team members added yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-background mb-4">
            Want to Work With Us?
          </h2>
          <Button asChild variant="heroOutline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground">
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
