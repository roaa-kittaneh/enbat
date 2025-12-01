import { Card } from "@/components/ui/card";
import { Sprout, Users, Globe, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  {
    icon: Sprout,
    title: "Germination",
    description: "Like seeds developing into plants, we nurture ideas into impactful solutions"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Deep roots in industry, academia, and global partnerships"
  },
  {
    icon: Globe,
    title: "Regional Focus",
    description: "Tailored solutions for low-resource and regional needs"
  },
  {
    icon: Award,
    title: "Research-Backed",
    description: "Evidence-based approaches with measurable real-world impact"
  }
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-gradient-to-b from-background via-olive-light/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-mustard/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Main content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sprout className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">About Enbat</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
              The <span className="text-gradient-primary">Meaning</span> Behind Our Name
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <span className="font-semibold text-foreground">Enbat</span> is an Arabic word that means germination—the 
              development of a plant from a seed. It represents the process of something beautiful coming into existence 
              and developing with care and expertise.
            </p>
          </motion.div>

          {/* Values grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group p-6 text-center border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-medium h-full">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Mission statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-8 md:p-12 border-border/50 bg-gradient-to-br from-card to-secondary/30 shadow-soft">
              <div className="max-w-4xl mx-auto space-y-6 text-center">
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                  Our Mission
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Through collaboration and understanding, Enbat delivers <span className="font-semibold text-foreground">customized, 
                  effective, scalable, research-backed solutions</span> with real-world impact. We bridge the gap between 
                  cutting-edge AI technology and meaningful social change, creating pathways for sustainable growth 
                  and development in communities that need it most.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-sm font-medium text-primary">Industry Expertise</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                    <span className="text-sm font-medium text-accent">Academic Foundation</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-sm font-medium text-primary">Global Collaboration</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
