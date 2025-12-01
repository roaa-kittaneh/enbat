import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
              Let's <span className="text-gradient-accent">Collaborate</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your ideas into impactful solutions? Get in touch with our team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card className="p-8 lg:p-10 border-border/50 shadow-soft space-y-8">
              <div>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-6">
                  Get In Touch
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're looking to integrate AI solutions, develop social impact strategies, 
                  or need expert consultancy, we're here to help.
                </p>
              </div>

              <div className="space-y-6">
                <a 
                  href="mailto:info@enbat.co"
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium mb-1">Email</div>
                    <div className="text-foreground font-medium">info@enbat.co</div>
                  </div>
                </a>

                <a 
                  href="tel:+971529981952"
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium mb-1">UAE</div>
                    <div className="text-foreground font-medium">+971 52 998 1952</div>
                  </div>
                </a>

                <a 
                  href="tel:+972597605631"
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium mb-1">Palestine</div>
                    <div className="text-foreground font-medium">+972 597 605 631</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium mb-1">Locations</div>
                    <div className="text-foreground font-medium">UAE • Palestine</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* CTA Card */}
            <Card className="p-8 lg:p-10 border-border/50 shadow-soft bg-gradient-to-br from-primary/5 to-accent/5 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-semibold text-foreground">
                    Ready to Start?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    From prototype to production, we provide end-to-end support for your AI and social impact initiatives.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground mb-1">Strategic Consultation</div>
                      <div className="text-sm text-muted-foreground">Expert guidance tailored to your needs</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground mb-1">Custom Solutions</div>
                      <div className="text-sm text-muted-foreground">Built specifically for your context</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground mb-1">Ongoing Support</div>
                      <div className="text-sm text-muted-foreground">Long-term partnership and growth</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-primary hover:bg-olive-dark text-primary-foreground font-medium py-6 text-lg rounded-xl shadow-medium mt-8"
                onClick={() => window.location.href = 'mailto:info@enbat.co'}
              >
                Send Us a Message
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
