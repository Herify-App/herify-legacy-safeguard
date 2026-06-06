import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, ShieldCheck, KeyRound, Mail, Lock, User } from "lucide-react";
import logo from "@/assets/herify-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);
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
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const name = String(fd.get("name") || "");
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name },
          },
        });
        if (error) throw error;
        setPendingEmail(email);
        toast.success("We sent a 6-digit code to your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/dashboard", replace: true });
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (mode === "signup" && pendingEmail) {
    return (
      <VerifyOtpForm
        email={pendingEmail}
        onBack={() => setPendingEmail(null)}
        onVerified={() => navigate({ to: "/dashboard", replace: true })}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="name" name="name" placeholder="Jane Doe" className="pl-9" required />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
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
            name="password"
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

function VerifyOtpForm({
  email,
  onBack,
  onVerified,
}: {
  email: string;
  onBack: () => void;
  onVerified: () => void;
}) {
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verify = async (otpCode: string) => {
    setSubmitting(true);
    setError(null);
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: "signup",
      });
      if (verifyError) throw verifyError;
      toast.success("Email verified!");
      onVerified();
    } catch (err: any) {
      const msg = err?.message?.toLowerCase() ?? "";
      if (msg.includes("expired")) {
        setError("This code has expired. Please request a new one.");
      } else if (msg.includes("invalid") || msg.includes("incorrect") || msg.includes("token")) {
        setError("Invalid code. Please check and try again.");
      } else {
        setError(err?.message ?? "Verification failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (code.length === 6 && !submitting) {
      verify(code);
    }
  }, [code]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    await verify(code);
  };

  const handleResend = async () => {
    setResending(true);
    setError(null);
    try {
      const { error: resendError } = await supabase.auth.resend({ type: "signup", email });
      if (resendError) throw resendError;
      toast.success("New code sent.");
      setCode("");
    } catch (err: any) {
      setError(err?.message ?? "Could not resend code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-5">
      <div className="space-y-1 text-center">
        <h3 className="text-lg font-semibold">Enter verification code</h3>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit code to <span className="text-foreground">{email}</span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <InputOTP
          maxLength={6}
          value={code}
          onChange={(val) => {
            setCode(val);
            if (error) setError(null);
          }}
          autoFocus
          disabled={submitting}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {error && (
          <p className="text-xs text-destructive" role="alert" aria-live="polite">
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting || code.length !== 6}
        className="w-full bg-gradient-brand text-white shadow-glow hover:opacity-95"
      >
        {submitting ? "Verifying…" : "Verify & continue"}
      </Button>

      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          ← Use different email
        </button>
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="text-muted-foreground hover:text-foreground disabled:opacity-50"
        >
          {resending ? "Sending…" : "Resend code"}
        </button>
      </div>
    </form>
  );
}