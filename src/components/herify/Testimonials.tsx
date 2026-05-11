import { motion } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  { name: "Mira Okonkwo", role: "Crypto Investor", quote: "I finally sleep knowing my keys won't die with me. Herify made inheritance feel human again." },
  { name: "The Larsens", role: "Family of four", quote: "Setting up beneficiaries took ten minutes. Knowing our kids will have access — priceless." },
  { name: "Diego Alvarez", role: "Digital Entrepreneur", quote: "The zero-knowledge architecture was the dealbreaker. Nothing else came close." },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Loved by holders & families</p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">Trusted with what matters</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl border border-border/60 bg-white/70 p-7 shadow-soft backdrop-blur"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" style={{ color: "var(--brand-green)" }} />
                ))}
              </div>
              <p className="mt-4 text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-sm font-semibold text-white">
                  {t.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
