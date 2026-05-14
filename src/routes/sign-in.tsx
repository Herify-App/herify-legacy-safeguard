import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock, ShieldCheck } from "lucide-react";
import logo from "@/assets/herify-logo.png";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in — Herify" },
      {
        name: "description",
        content: "Sign in to your Herify vault to manage your decentralized digital legacy.",
      },
      { property: "og:title", content: "Sign in — Herify" },
      { property: "og:description", content: "Access your encrypted Herify vault." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-brand-blue/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[460px] w-[460px] rounded-full bg-brand-green/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-4 py-10">
        <Link to="/" className="flex items-center gap-2 self-start">
          <img src={logo} alt="Herify" className="h-9 w-9 object-contain" />
          <span className="text-lg font-semibold tracking-tight">Herify</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-strong mt-12 rounded-3xl border border-border/60 p-8 shadow-glow"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              {mode === "signin" ? "Welcome back" : "Create your vault"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "signin"
                ? "Sign in to access your encrypted Herify vault."
                : "Start securing your digital legacy in minutes."}
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" type="text" placeholder="Ada Lovelace" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-9" required />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {mode === "signin" && (
                  <a href="#" className="text-xs font-medium text-primary hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-9" required />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full bg-gradient-brand text-white shadow-glow hover:opacity-95">
              {mode === "signin" ? "Sign in" : "Create account"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-white/70 backdrop-blur">Google</Button>
            <Button variant="outline" className="bg-white/70 backdrop-blur">Wallet</Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New to Herify?" : "Already have a vault?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-medium text-primary hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          End-to-end encrypted · Zero-knowledge privacy
        </div>
      </div>
    </div>
  );
}
