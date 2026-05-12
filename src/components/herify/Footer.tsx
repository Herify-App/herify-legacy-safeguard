import { Twitter, Github, Linkedin } from "lucide-react";
import logo from "@/assets/herify-logo.png";

const cols = [
  { title: "Product", links: ["Features", "Security", "Pricing", "Changelog"] },
  { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  { title: "Resources", links: ["Docs", "Whitepaper", "Blog", "Status"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-white/60 backdrop-blur">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Herify" className="h-10 w-10 object-contain" />
              <span className="text-xl font-semibold tracking-tight">Herify</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Herify is the decentralized inheritance layer for the on-chain era —
              ensuring your digital legacy reaches the people you love.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold">{c.title}</div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Herify. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
