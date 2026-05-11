import { motion } from "framer-motion";
import wallet from "@/assets/feature-wallet.png";
import passwords from "@/assets/feature-passwords.png";
import documents from "@/assets/feature-documents.png";
import { Wallet, KeyRound, FileText, ShieldAlert, BrainCircuit, Link2 } from "lucide-react";

const rows = [
  {
    img: wallet,
    eyebrow: "Crypto Wallet Backup",
    title: "Every wallet, every chain — preserved",
    desc: "Seed phrases, private keys and hardware wallet recovery, encrypted and inheritable.",
    bullets: [
      { icon: Wallet, text: "Multi-wallet vaults" },
      { icon: Link2, text: "Cross-chain compatibility" },
    ],
  },
  {
    img: passwords,
    eyebrow: "Secure Password Storage",
    title: "Your digital identity, protected",
    desc: "Vault every account credential with zero-knowledge encryption and granular access.",
    bullets: [
      { icon: KeyRound, text: "Per-credential beneficiaries" },
      { icon: ShieldAlert, text: "Emergency Recovery Protocols" },
    ],
  },
  {
    img: documents,
    eyebrow: "Legal & Estate Documents",
    title: "Wills, deeds, instructions",
    desc: "Notarized PDFs, legal directives and personal letters released exactly when needed.",
    bullets: [
      { icon: FileText, text: "Versioned document history" },
      { icon: BrainCircuit, text: "AI-assisted inheritance setup" },
    ],
  },
];

export default function Showcase() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Features</p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            One vault. <span className="text-gradient-brand">Every part of your life.</span>
          </h2>
        </div>

        <div className="mt-20 space-y-28">
          {rows.map((r, i) => (
            <div
              key={r.title}
              className={`grid items-center gap-12 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-brand opacity-15 blur-3xl" />
                <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white/70 p-3 shadow-card backdrop-blur">
                  <img src={r.img} alt={r.title} loading="lazy" className="w-full rounded-2xl" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">{r.eyebrow}</p>
                <h3 className="mt-3 text-3xl font-bold md:text-4xl">{r.title}</h3>
                <p className="mt-4 text-muted-foreground">{r.desc}</p>
                <ul className="mt-6 space-y-3">
                  {r.bullets.map((b) => (
                    <li key={b.text} className="flex items-center gap-3 text-sm">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-soft">
                        <b.icon className="h-4 w-4 text-primary" />
                      </span>
                      {b.text}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
