import { motion } from "framer-motion";
import network from "@/assets/blockchain-network.png";
import { Boxes, FileSignature, EyeOff, KeyRound } from "lucide-react";

const pillars = [
  { icon: Boxes, title: "IPFS & Arweave", desc: "Permanent decentralized storage." },
  { icon: FileSignature, title: "Smart Contracts", desc: "Inheritance triggers on-chain." },
  { icon: EyeOff, title: "Zero-Knowledge", desc: "Encrypted before it leaves you." },
  { icon: KeyRound, title: "Multi-Signature", desc: "Quorum-based recovery flow." },
];

export default function Architecture() {
  return (
    <section id="security" className="relative overflow-hidden py-28 bg-gradient-soft">
      <div className="container relative mx-auto grid items-center gap-14 px-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative order-2 md:order-1"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-full bg-gradient-brand opacity-25 blur-3xl" />
            <img src={network} alt="Decentralized network" loading="lazy" className="relative mx-auto w-full max-w-lg" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-1 md:order-2"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Architecture</p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Bank-grade security, <span className="text-gradient-brand">blockchain-native trust</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every layer of Herify is engineered for permanence, privacy, and verifiable
            access — from storage to smart contract triggers.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="glass-strong rounded-2xl p-4 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{p.title}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
