import { motion } from "framer-motion";
import { Database, Lock, Users, FileCheck2 } from "lucide-react";

const items = [
  {
    icon: Database,
    title: "Decentralized Vault Storage",
    desc: "Your assets live on IPFS & Arweave — censorship-resistant and forever-available.",
  },
  {
    icon: Lock,
    title: "Multi-Layer Encryption",
    desc: "AES-256 with zero-knowledge keys. Only you and your beneficiaries can decrypt.",
  },
  {
    icon: Users,
    title: "Trusted Beneficiary Access",
    desc: "Assign loved ones with role-based access. Time-locked or proof-of-life triggered.",
  },
  {
    icon: FileCheck2,
    title: "Smart Contract Recovery",
    desc: "On-chain inheritance triggers verified by oracles and multi-sig validators.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Trusted Security</p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Built for what matters <span className="text-gradient-brand">most</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A new standard for safeguarding what you'll one day pass on.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-white/70 p-6 shadow-soft backdrop-blur transition-shadow hover:shadow-glow"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-soft">
                  <it.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
