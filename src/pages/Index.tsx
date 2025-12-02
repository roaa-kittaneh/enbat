import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { AISection } from "@/components/home/AISection";
import { CTA } from "@/components/home/CTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <AISection />
      <CTA />
    </Layout>
  );
};

export default Index;
