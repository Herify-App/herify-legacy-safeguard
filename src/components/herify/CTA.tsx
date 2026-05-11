import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="container mx-auto"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-cta animate-gradient-x p-12 text-center shadow-glow md:p-20">
          <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-tight text-white md:text-6xl">
              Protect what matters beyond lifetime
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/90">
              Set up your decentralized vault in minutes. Give the people you love the keys
              to your digital world — only when the time is right.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="bg-white text-primary shadow-soft hover:bg-white/90">
                Start Securing Your Legacy <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/60 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
                Book Demo
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
