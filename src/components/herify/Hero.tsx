import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Network, KeyRound, EyeOff } from "lucide-react";
import dashboard from "@/assets/hero-dashboard.png";

const trust = [
  { icon: ShieldCheck, label: "End-to-end encrypted" },
  { icon: Network, label: "Decentralized storage" },
  { icon: KeyRound, label: "Smart inheritance access" },
  { icon: EyeOff, label: "Zero-knowledge privacy" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24">
      {/* Animated gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-brand-blue/30 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -right-32 h-[460px] w-[460px] rounded-full bg-brand-green/30 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
          >
            Secure Your Digital{" "}
            <span className="text-gradient-brand">Legacy On-Chain</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl"
          >
            Herify allows you to securely store crypto assets, passwords, legal documents,
            and important digital files in decentralized storage — ensuring trusted loved
            ones can access them when it matters most.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              size="lg"
              className="bg-gradient-brand text-white shadow-glow hover:opacity-95"
              asChild
            >
              <Link to="/get-started">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/70 backdrop-blur">
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute inset-x-12 -top-8 -bottom-8 rounded-[2rem] bg-gradient-brand opacity-20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white/60 p-3 shadow-glow backdrop-blur">
            <img
              src={dashboard}
              alt="Herify dashboard preview"
              className="w-full rounded-2xl"
              width={1280}
              height={960}
            />
          </div>

          {/* Floating trust chips */}
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            {trust.slice(0, 2).map((t, i) => (
              <motion.div
                key={t.label}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute ${i === 0 ? "left-2 top-10" : "right-2 top-32"} glass-strong flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium shadow-soft`}
              >
                <t.icon className="h-3.5 w-3.5 text-primary" /> {t.label}
              </motion.div>
            ))}
            {trust.slice(2).map((t, i) => (
              <motion.div
                key={t.label}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute ${i === 0 ? "left-4 bottom-12" : "right-6 bottom-24"} glass-strong flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium shadow-soft`}
              >
                <t.icon className="h-3.5 w-3.5" style={{ color: "var(--brand-green)" }} /> {t.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust row mobile */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:hidden">
          {trust.map((t) => (
            <div key={t.label} className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium">
              <t.icon className="h-4 w-4 text-primary" /> {t.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
