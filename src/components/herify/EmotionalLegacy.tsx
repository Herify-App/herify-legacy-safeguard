import { motion } from "framer-motion";
import family from "@/assets/family-legacy.jpg";

export default function EmotionalLegacy() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="container relative mx-auto grid items-center gap-14 px-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Your legacy</p>
          <h2 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            Your story should <span className="text-gradient-brand">never disappear</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            The memories you've built, the wealth you've earned, the documents that prove
            who you are — they deserve to outlive you. Herify ensures continuity for the
            people you love most, in a world that's quickly moving on-chain.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {["Preserve memories for future generations", "Protect loved ones from access loss", "Ensure continuity in a digital era"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-gradient-brand" />
                <span className="text-foreground/80">{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-brand opacity-20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-glow">
            <img src={family} alt="Family legacy" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
