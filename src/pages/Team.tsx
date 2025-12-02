import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Mail, GraduationCap, Briefcase } from "lucide-react";

const team = [
  {
    id: 1,
    name: "Dr. Ahmad Al-Khalil",
    role: "Co-Founder & Director",
    bio: "Expert in AI and computational linguistics with over 15 years of experience in technology leadership.",
    education: ["Ph.D. in Computer Science", "M.Sc. in Artificial Intelligence"],
    experience: ["Former Head of AI Research", "Published researcher in NLP"],
    linkedin: "#",
    email: "ahmad@enbat.co",
  },
  {
    id: 2,
    name: "Dr. Sarah Hassan",
    role: "Co-Founder & Director",
    bio: "Specialist in social impact research with extensive experience in NGO management and fundraising.",
    education: ["Ph.D. in Development Studies", "M.A. in International Relations"],
    experience: ["15+ years in development", "Former UN consultant"],
    linkedin: "#",
    email: "sarah@enbat.co",
  },
  {
    id: 3,
    name: "Eng. Mohammed Nasser",
    role: "Director of Technology",
    bio: "BSS architecture specialist with deep expertise in telecom systems and digital transformation.",
    education: ["M.Sc. in Telecommunications", "B.Sc. in Computer Engineering"],
    experience: ["20+ years in telecom", "Enterprise architect"],
    linkedin: "#",
    email: "mohammed@enbat.co",
  },
];

export default function Team() {
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <article key={member.id} className="card-elevated overflow-hidden">
                {/* Avatar */}
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl font-semibold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>

                  {/* Education */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-foreground mb-1">
                      <GraduationCap className="h-3 w-3 text-primary" />
                      Education
                    </div>
                    <ul className="space-y-0.5">
                      {member.education.map((edu) => (
                        <li key={edu} className="text-xs text-muted-foreground">{edu}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Experience */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-foreground mb-1">
                      <Briefcase className="h-3 w-3 text-primary" />
                      Experience
                    </div>
                    <ul className="space-y-0.5">
                      {member.experience.map((exp) => (
                        <li key={exp} className="text-xs text-muted-foreground">{exp}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-2 pt-4 border-t border-border">
                    <a href={member.linkedin} className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
                      <Linkedin className="h-4 w-4 text-muted-foreground" />
                    </a>
                    <a href={`mailto:${member.email}`} className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
