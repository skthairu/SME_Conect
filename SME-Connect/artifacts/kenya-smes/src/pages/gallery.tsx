import { useMemo, useState } from "react";
import { ArrowUpRight, Camera, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const moments = [
  { image: "/images/hero-retail.png", category: "Enterprise", title: "The everyday economy, in motion", caption: "Retail businesses keep neighbourhoods supplied, connected and open for opportunity." },
  { image: "/images/hero-agribusiness.png", category: "Enterprise", title: "From harvest to household", caption: "A look at the traders and producers who carry food from Kenyan farms to local tables." },
  { image: "/images/hero-textile.png", category: "Enterprise", title: "Trade with a point of view", caption: "Independent fashion businesses are building style, income and identity on their own terms." },
  { image: "/images/hero-artisanal.png", category: "Community", title: "Made by hand, made to travel", caption: "Craft enterprises turn local knowledge into products that belong in markets near and far." },
  { image: "/images/hero-tech.png", category: "Digital", title: "Small business, bigger reach", caption: "Digital tools help entrepreneurs meet customers wherever they are." },
  { image: "/images/hero-finance.png", category: "Digital", title: "Commerce on the move", caption: "Mobile-first enterprise is changing how Kenyan businesses discover, sell and serve." },
  { image: "/images/hero-manufacturing.png", category: "Enterprise", title: "The supply chain starts here", caption: "Manufacturers and suppliers make the essentials of everyday business possible." },
  { image: "/images/hero-tourism.png", category: "Community", title: "A table with room for more", caption: "Food businesses create places to gather, employ and grow local economies." },
];

const filters = ["All", "Enterprise", "Community", "Digital"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const visible = useMemo(() => moments.filter((moment) => filter === "All" || moment.category === filter), [filter]);
  return <div className="min-h-[100dvh]">
    <section className="app-shell grid gap-10 py-16 md:grid-cols-[1fr_auto] md:items-end md:py-24">
      <div className="max-w-3xl"><Badge className="mb-6 border-0 bg-primary text-white" data-testid="badge-gallery">BNAK IN THE FIELD</Badge><h1 className="text-balance text-5xl font-bold leading-[.95] md:text-7xl">The people, places and enterprise behind the network.</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">A visual index of Kenyan enterprise — assembled from the stories and sectors BNAK exists to champion.</p></div>
      <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground"><Camera className="h-5 w-5 text-primary" /> Stories from across Kenya</div>
    </section>
    <section className="app-shell pb-20">
      <div className="mb-8 flex flex-col gap-5 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 text-sm font-bold"><Filter className="h-4 w-4 text-primary" /> Browse by story</div><div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery"><span className="sr-only">Gallery filters</span>{filters.map((item) => <button type="button" role="tab" aria-selected={filter === item} key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${filter === item ? "bg-foreground text-background" : "border border-border bg-card hover:border-primary hover:text-primary"}`} data-testid={`filter-gallery-${item.toLowerCase()}`}>{item}</button>)}</div></div>
      <div className="grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((moment, index) => <article key={moment.title} className={`group relative overflow-hidden rounded-2xl bg-foreground ${index % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`} data-testid={`card-gallery-${index}`}>
          <img src={moment.image} alt={moment.title} className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-background"><div className="mb-2 flex items-center justify-between gap-3"><Badge className="border-0 bg-accent text-accent-foreground">{moment.category}</Badge><ArrowUpRight className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" /></div><h2 className="text-xl font-bold">{moment.title}</h2><p className="mt-2 max-w-md text-sm leading-relaxed text-background/75">{moment.caption}</p></div>
        </article>)}
      </div>
      {visible.length === 0 && <div className="rounded-2xl border border-dashed border-border py-20 text-center" data-testid="empty-gallery"><p className="font-bold">No stories in this view yet.</p><Button variant="link" onClick={() => setFilter("All")} data-testid="button-gallery-reset">Show all stories</Button></div>}
    </section>
  </div>;
}