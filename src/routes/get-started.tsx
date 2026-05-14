import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, KeyRound, Users, FileLock2, Wallet, Sparkles } from "lucide-react";
import Navbar from "@/components/herify/Navbar";
import Footer from "@/components/herify/Footer";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Get Started — Herify" },
      {
        name: "description",
        content:
          "Set up your Herify vault in minutes. Secure crypto, passwords and important documents — and decide who inherits them.",
      },
      { property: "og:title", content: "Get Started — Herify" },
      {
        property: "og:description",
        content: "Create your decentralized inheritance vault in 4 simple steps.",
      },
    ],
  }),
  component: GetStartedPage,
});

const steps = [
  {
    icon: Wallet,
    title: "Create your account",
    desc: "Sign up with your email or connect a wallet. No paperwork, no waiting.",
  },
  {
    icon: FileLock2,
    title: "Add what matters",
    desc: "Upload crypto keys, passwords, legal documents and personal files into your encrypted vault.",
  },
  {
    icon: Users,
    title: "Choose your heirs",
    desc: "Assign trusted loved ones and define exactly what each of them can access.",
  },
  {
    icon: ShieldCheck,
    title: "Set inheritance rules",
    desc: "Configure check-ins and release conditions. Herify activates only when the time is right.",
  },
];

const benefits = [
  { icon: KeyRound, title: "You hold the keys", desc: "Zero-knowledge encryption — only you and your heirs can decrypt." },
  { icon: ShieldCheck, title: "Decentralized storage", desc: "Your vault lives on resilient decentralized infrastructure, not a single server." },
  { icon: Sparkles, title: "Built for peace of mind", desc: "Smart inheritance access ensures nothing important is ever lost." },
];

function GetStartedPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="container relative mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/60 px-3 py-1 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Get started in minutes
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Build your <span className="text-gradient-brand">digital legacy</span> today
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground md:text-lg">
                Four simple steps to secure your crypto, passwords and important documents —
                and ensure your loved ones can access them when it matters most.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" className="bg-gradient-brand text-white shadow-glow hover:opacity-95" asChild>
                  <Link to="/sign-in">Create your vault <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/70 backdrop-blur" asChild>
                  <Link to="/sign-in">I already have an account</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="container mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass-strong relative overflow-hidden rounded-3xl border border-border/60 p-6 shadow-soft"
                >
                  <div className="absolute right-4 top-4 text-5xl font-bold text-muted-foreground/10">
                    0{i + 1}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Why people trust Herify</h2>
              <p className="mt-3 text-muted-foreground">
                Privacy-first by design. Built so your legacy outlives any single company or platform.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-3xl border border-border/60 bg-white/60 p-6 backdrop-blur">
                  <b.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <Button size="lg" className="bg-gradient-brand text-white shadow-glow hover:opacity-95" asChild>
                <Link to="/sign-in">Get started now <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
