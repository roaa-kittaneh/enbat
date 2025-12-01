import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Globe, HeartPulse, Leaf, Users, Briefcase } from "lucide-react";

const caseStudies = [
  {
    icon: Building2,
    category: "AI Integration",
    title: "Ooredoo Partnership",
    client: "Ooredoo",
    description: "3-year framework agreement supporting AI integration, business analytics, and data science initiatives. Enhancing operational efficiency, regulatory compliance, risk mitigation, and customer-focused innovation.",
    impact: "Multi-year strategic partnership",
    color: "primary"
  },
  {
    icon: Leaf,
    category: "Social Impact",
    title: "Climate Action Network Strategy",
    client: "Palestinian Farmers' Union",
    description: "Led development of CAN Strategy for Palestine, creating a comprehensive national framework to address climate challenges. Coordinated consultations with government bodies, NGOs, academic experts, and private-sector partners.",
    impact: "National climate resilience framework",
    color: "accent"
  },
  {
    icon: Users,
    category: "Social Studies",
    title: "UNRWA Service Assessment",
    client: "Palestinian NGOs Network",
    description: "Conducted nationwide assessment of UNRWA service suspension, documenting social, institutional, and psychological impacts. Combined data analysis, interviews, and focus groups to provide actionable insights.",
    impact: "Evidence-based service continuity recommendations",
    color: "primary"
  },
  {
    icon: HeartPulse,
    category: "Healthcare Access",
    title: "Cancer Care Barriers Study",
    client: "Medical Aid for Palestine",
    description: "Comprehensive study examining patient pathways, institutional bottlenecks, and systemic gaps in Gaza and West Bank. Shaped advocacy and programming strategies for improved access to lifesaving treatment.",
    impact: "Enhanced cancer care accessibility",
    color: "accent"
  },
  {
    icon: Globe,
    category: "AI Innovation",
    title: "Job-Matching Platform",
    client: "Enabel",
    description: "Provided Senior Arabic Computational Linguistics Expert for AI-powered job-matching platform. Demonstrates capacity to manage complex, technology-driven projects across international contexts.",
    impact: "Cross-border AI implementation",
    color: "primary"
  },
  {
    icon: Briefcase,
    category: "Capacity Building",
    title: "Fundraising Training",
    client: "Mercy Corps",
    description: "4-month training program covering Theory of Change, Logical Framework, donor engagement, and MEAL (Monitoring, Evaluation, Accountability, and Learning) across West Bank and Gaza.",
    impact: "Strengthened NGO fundraising capacity",
    color: "accent"
  }
];

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
            <span className="text-gradient-primary">Case Studies</span> & Impact
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Real-world results from partnerships with leading organizations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            const isAccent = study.color === "accent";
            
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-medium animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative p-6 lg:p-8 space-y-4">
                  {/* Icon and category */}
                  <div className="flex items-start justify-between gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isAccent ? "bg-accent/10" : "bg-primary/10"
                    } group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${isAccent ? "text-accent" : "text-primary"}`} />
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      isAccent ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                    }`}>
                      {study.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {study.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      Client: {study.client}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {study.description}
                    </p>
                  </div>

                  {/* Impact badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${
                    isAccent ? "bg-accent/5 border border-accent/20" : "bg-primary/5 border border-primary/20"
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${isAccent ? "bg-accent" : "bg-primary"}`} />
                    <span className="text-xs font-medium text-foreground">{study.impact}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Success metrics */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary to-olive-dark rounded-3xl p-8 md:p-12 text-center shadow-strong">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
              Proven Track Record
            </h3>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              From AI integration with major telecommunications providers to grassroots social impact initiatives, 
              we deliver measurable results across diverse sectors.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              className="bg-background hover:bg-background/90 text-foreground font-medium px-8 py-6 text-lg rounded-xl shadow-medium"
              onClick={() => window.location.href = 'mailto:info@enbat.co'}
            >
              Discuss Your Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
