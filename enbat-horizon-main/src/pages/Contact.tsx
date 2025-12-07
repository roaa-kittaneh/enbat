import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const contactInfo = [
  { icon: Mail, title: "Email", value: "info@enbat.co", href: "mailto:info@enbat.co" },
  { icon: Phone, title: "UAE", value: "+971 52 998 1952", href: "tel:+971529981952" },
  { icon: Phone, title: "Palestine", value: "+972 597 605 631", href: "tel:+972597605631" },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Message Sent",
      description: "We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-foreground mb-4">
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="text-muted-foreground">
              Ready to start your project? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-4 mb-8">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.title}</p>
                      <a href={item.href} className="text-foreground font-medium hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Locations */}
              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Our Offices</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">UAE</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Palestine</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="card-elevated p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : <><Send className="h-5 w-5" /> Send Message</>}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
