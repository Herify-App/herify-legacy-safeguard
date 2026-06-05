import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, ShieldCheck, KeyRound, Mail, Lock, User } from "lucide-react";
import logo from "@/assets/herify-logo.png";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Launch Herify — Sign in or Create Account" },
      {
        name: "description",
        content:
          "Access the Herify dApp. Sign in or create an account to securely manage your on-chain digital legacy.",
      },
      { property: "og:title", content: "Launch Herify — Sign in or Create Account" },
      {
        property: "og:description",
        content: "Access the Herify dApp to manage your on-chain digital legacy.",
      },
    ],
  }),
  component: AppAuthPage,
});

function AppAuthPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-gradient-hero" />
      <motion.div
        aria-hidden
        className="absolute -top-40 -left-40 h-[460px] w-[460px] rounded-full bg-brand-blue/30 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-green/30 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>

      <div className="relative z-10 container mx-auto grid min-h-[calc(100vh-6rem)] grid-cols-1 items-center gap-12 px-4 pb-16 lg:grid-cols-2">
        {/* Brand / hero side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="flex items-center gap-3">
            <img src={logo} alt="Herify" className="h-12 w-12 object-contain" />
            <span className="text-2xl font-semibold tracking-tight">Herify</span>
          </div>
          <h1 className="mt-8 text-5xl font-bold leading-[1.05] tracking-tight">
            Welcome to the <span className="text-gradient-brand">Herify dApp</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Sign in or create an account to securely manage your digital legacy
            on-chain — assets, passwords, documents, and trusted recipients.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              { Icon: ShieldCheck, label: "End-to-end encrypted by default" },
              { Icon: KeyRound, label: "You hold the keys — always" },
              { Icon: User, label: "Designate trusted heirs in minutes" },
            ].map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full glass-strong">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
                <span className="text-muted-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Auth card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="glass-strong rounded-3xl border border-border/60 p-8 shadow-glow backdrop-blur">
            <div className="mb-6 flex items-center gap-2 lg:hidden">
              <img src={logo} alt="Herify" className="h-9 w-9 object-contain" />
              <span className="text-lg font-semibold tracking-tight">Herify</span>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Log in</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6">
                <AuthForm mode="login" />
              </TabsContent>
              <TabsContent value="signup" className="mt-6">
                <AuthForm mode="signup" />
              </TabsContent>
            </Tabs>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing you agree to Herify&apos;s Terms & Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 800);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="name" placeholder="Jane Doe" className="pl-9" required />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@herify.app"
            className="pl-9"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          {mode === "login" && (
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Forgot password?
            </a>
          )}
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="pl-9"
            minLength={8}
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full bg-gradient-brand text-white shadow-glow hover:opacity-95"
      >
        {submitting ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
      </Button>
    </form>
  );
}