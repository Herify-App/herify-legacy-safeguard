import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/herify-logo.png";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${
            scrolled ? "glass-strong shadow-soft" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2">
            <img src={logo} alt="Herify" className="h-9 w-9 object-contain" />
            <span className="text-lg font-semibold tracking-tight">Herify</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex" asChild>
              <Link to="/sign-in">Sign in</Link>
            </Button>
            <Button className="bg-gradient-brand text-white shadow-soft hover:opacity-95" asChild>
              <Link to="/get-started">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
