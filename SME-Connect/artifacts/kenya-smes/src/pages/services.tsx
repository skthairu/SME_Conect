import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, BookOpen, BriefcaseBusiness, Coins, Laptop, Landmark, Network, Scale, ShieldCheck, UsersRound } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  { title: "Market linkage", category: "Growth", icon: Network, body: "Find buyers, suppliers and trade opportunities that move your business beyond its immediate neighbourhood.", detail: "Buyer introductions, trade fairs and value-chain connections." },
  { title: "Financial literacy", category: "Capability", icon: Coins, body: "Build practical confidence with pricing, cash flow, records and day-to-day money decisions.", detail: "Simple tools for healthier business decisions." },
  { title: "Business training", category: "Capability", icon: BookOpen, body: "Learn with other entrepreneurs through focused sessions designed around how Kenyan businesses actually operate.", detail: "Workshops, clinics and peer learning." },
  { title: "Digital adoption", category: "Growth", icon: Laptop, body: "Make digital tools useful, from mobile selling and payments to customer records and online discovery.", detail: "Practical, low-friction digital skills." },
  { title: "Access to finance", category: "Finance", icon: Landmark, body: "Get better prepared for conversations with banks, SACCOs, funds and other finance partners.", detail: "Readiness guidance, referrals and opportunity alerts." },
  { title: "Policy advocacy", category: "Representation", icon: Scale, body: "Bring the realities of micro and small businesses into the rooms where business policy is shaped.", detail: "A clearer collective voice from the grassroots up." },
  { title: "Formalisation & KYC support", category: "Foundation", icon: ShieldCheck, body: "Understand the next step for your enterprise, from responsible KYC to registration and compliance pathways.", detail: "Guidance without judgement or unnecessary jargon." },
  { title: "Mentorship", category: "Growth", icon: UsersRound, body: "Learn from people who have navigated the same hard turns, and share what you know with the next business.", detail: "Peer circles and experienced business voices." },
  { title: "Procurement readiness", category: "Growth", icon: BriefcaseBusiness, body: "Prepare your business to respond to opportunities with clearer profiles, records and delivery confidence.", detail: "Practical support for larger buyers and tenders." },
];

const categories = ["All", "Growth", "Capability", "Finance", "Representation", "Foundation"];

export default function Services() {
  const [category, setCategory] = useState("All");
  const visible = useMemo(() => services.filter((service) => category === "All" || service.category === category), [category]);

  return (
    <div className="min-h-[100dvh]">
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 soft-grid opacity-20" />
        <div className="app-shell relative py-20 md:py-28">
          <div className="max-w-4xl">
            <Badge className="mb-6 border-0 bg-accent text-accent-foreground" data-testid="badge-services">WHAT WE DO</Badge>
            <h1 className="text-balance text-5xl font-bold leading-[.95] tracking-tight md:text-7xl">Useful support for the work behind every biashara.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-background/70 md:text-xl">BNAK turns a national network into practical next steps — helping entrepreneurs trade, learn, formalise and speak with a stronger collective voice.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90" data-testid="button-services-join"><Link href="/membership">Join the network <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:bg-background/10" data-testid="button-services-market"><Link href="/marketplace">Explore the market</Link></Button>
            </div>
          </div>
        </div>
      </section>
      <section className="app-shell py-14 md:py-20">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.2em] text-primary">A working menu</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Choose the support your business needs now.</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter services">
            {categories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${category === item ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-primary hover:text-primary"}`} data-testid={`filter-service-${item.toLowerCase()}`}>{item}</button>)}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((service, index) => {
            const Icon = service.icon;
            return <Card key={service.title} className="group border-card-border bg-card transition-transform hover:-translate-y-1 hover:shadow-lg" data-testid={`card-service-${index}`}>
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-7 flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="h-6 w-6" /></div><Badge variant="outline" className="border-secondary/30 text-secondary">{service.category}</Badge></div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
                <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs font-semibold text-secondary"><BadgeCheck className="h-4 w-4" /> {service.detail}</div>
              </CardContent>
            </Card>;
          })}
        </div>
      </section>
      <section className="bg-secondary text-secondary-foreground">
        <div className="app-shell grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-20">
          <div><p className="text-sm font-bold uppercase tracking-[.2em] text-secondary-foreground/60">Need a starting point?</p><h2 className="mt-3 text-3xl font-bold">Tell us what your business is working through.</h2><p className="mt-3 max-w-2xl text-secondary-foreground/75">A membership application helps us understand your enterprise and route you towards relevant BNAK opportunities.</p></div>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid="button-services-cta"><Link href="/membership">Start membership <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
      </section>
    </div>
  );
}