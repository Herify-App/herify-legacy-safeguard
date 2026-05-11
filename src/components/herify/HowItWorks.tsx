import { motion } from "framer-motion";
import { UploadCloud, UsersRound, Sparkles } from "lucide-react";

const steps = [
  { icon: UploadCloud, title: "Upload & Encrypt Assets", desc: "Drag in crypto wallets, passwords, documents and files. Encrypted client-side before they ever leave your device." },
  { icon: UsersRound, title: "Assign Trusted Beneficiaries", desc: "Add loved ones, set conditions, and define how — and when — each asset becomes available." },
  { icon: Sparkles, title: "Automated Secure Access", desc: "Smart contracts and proof-of-life oracles trigger access exactly the way you intended." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">How it works</p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">Three steps to lasting peace of mind</h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block" />
          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-card">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-brand opacity-10" />
                  <s.icon className="h-9 w-9 text-primary" />
                  <span className="absolute -right-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-xs font-bold text-white shadow-soft">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
