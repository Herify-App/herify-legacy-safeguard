import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How does beneficiary access work?", a: "You assign trusted beneficiaries to specific assets. Access is granted via smart contract triggers — proof-of-life inactivity, multi-sig confirmation, or certified events." },
  { q: "Is my data encrypted?", a: "Yes. All data is encrypted client-side using AES-256 with zero-knowledge keys before being stored on IPFS or Arweave. We never have access to your unencrypted data." },
  { q: "What happens if I lose access?", a: "Built-in recovery protocols allow you to restore access via multi-signature validators or designated recovery beneficiaries — without compromising your privacy." },
  { q: "Which blockchains are supported?", a: "Herify is cross-chain. Ethereum, Polygon, Arbitrum, Optimism, Base and Solana are supported today, with more rolling out monthly." },
  { q: "Can documents be updated anytime?", a: "Absolutely. Update, revoke or rotate any asset at any time. Beneficiaries always receive the latest version when access is triggered." },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-gradient-soft">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">FAQ</p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">Questions, answered</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-border/60 bg-white/80 px-5 shadow-soft backdrop-blur"
            >
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
