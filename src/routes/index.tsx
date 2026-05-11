import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/herify/Navbar";
import Hero from "@/components/herify/Hero";
import Features from "@/components/herify/Features";
import HowItWorks from "@/components/herify/HowItWorks";
import EmotionalLegacy from "@/components/herify/EmotionalLegacy";
import Showcase from "@/components/herify/Showcase";
import Architecture from "@/components/herify/Architecture";
import FAQ from "@/components/herify/FAQ";
import CTA from "@/components/herify/CTA";
import Footer from "@/components/herify/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <EmotionalLegacy />
        <Showcase />
        <Architecture />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
