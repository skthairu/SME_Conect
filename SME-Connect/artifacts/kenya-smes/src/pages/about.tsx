import { Link } from "wouter";
import { useGetStats } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Megaphone, HandshakeIcon, TrendingUp, ShoppingBag, Users, Briefcase, Landmark, Building2, Globe } from "lucide-react";
import { KENYA_COUNTIES } from "@/lib/constants";

const CORE_FUNCTIONS = [
  {
    icon: Megaphone,
    title: "National SME Advocacy & Representation",
    color: "bg-primary/10 text-primary",
    items: [
      "Represent MSMEs at national and county levels",
      "Engage government and policy institutions",
      "Advocate for fair business policies and reforms",
      "Promote inclusion of small businesses in economic planning",
    ]
  },
  {
    icon: HandshakeIcon,
    title: "SME Ecosystem Coordination",
    color: "bg-secondary/10 text-secondary",
    items: [
      "Unite fragmented SME groups across Kenya",
      "Build structured national SME networks",
      "Strengthen collaboration across sectors",
      "Promote organized enterprise development",
    ]
  },
  {
    icon: TrendingUp,
    title: "Market Access & Trade Development",
    color: "bg-accent/20 text-accent-foreground",
    items: [
      "Connect SMEs to local and regional markets",
      "Promote business visibility and competitiveness",
      "Facilitate trade linkages and partnerships",
      "Strengthen value chain integration",
    ]
  },
  {
    icon: ShoppingBag,
    title: "Financial Inclusion & Investment",
    color: "bg-primary/10 text-primary",
    items: [
      "Promote access to finance for SMEs",
      "Engage banks, SACCOs, and investors",
      "Support investment readiness programs",
      "Advocate for inclusive financial systems",
    ]
  },
  {
    icon: Users,
    title: "Capacity Building & Entrepreneurship",
    color: "bg-secondary/10 text-secondary",
    items: [
      "Promote entrepreneurship training and skills",
      "Support youth and women enterprise growth",
      "Encourage innovation and productivity",
      "Strengthen business sustainability",
    ]
  },
  {
    icon: Briefcase,
    title: "Digital Transformation & SME Data",
    color: "bg-accent/20 text-accent-foreground",
    items: [
      "Support digital adoption among SMEs",
      "Promote SME data collection and mapping",
      "Strengthen research and policy intelligence",
      "Build a modern digital SME ecosystem",
    ]
  },
];

const SECTORS_REPRESENTED = [
  "Agriculture & Agribusiness", "Retail & Wholesale Trade", "Manufacturing & Industry",
  "Construction & Real Estate", "Transport & Logistics", "Technology & Digital Economy",
  "Hospitality & Tourism", "Creative Economy", "Professional Services",
  "Financial Services & Cooperatives", "Green Economy & Sustainability", "Online Retail (E-commerce)",
];

const NATIONAL_STRUCTURE = [
  { icon: Building2, label: "National Executive Leadership", desc: "Central governance and strategic direction" },
  { icon: MapPin, label: "County-Level Structures", desc: "Coordination rooted in local enterprise" },
  { icon: Globe, label: "Sectoral SME Networks", desc: "Organized networks across all industries" },
  { icon: HandshakeIcon, label: "Cooperative & SACCO Alliances", desc: "Partnerships with cooperative structures" },
  { icon: Landmark, label: "Development Partners", desc: "Government, investors, and NGO linkages" },
];

export default function About() {
  const { data: stats } = useGetStats();

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero */}
      <div className="bg-primary py-20 md:py-28 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.4)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Badge className="bg-white/20 text-white border-0 font-semibold mb-6">Organization Profile</Badge>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Biashara Ndogo Association of Kenya
            </h1>
            <p className="text-2xl font-bold text-white/80 mb-4">THE NATIONAL APEX VOICE OF MSMEs IN KENYA</p>
            <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
              BNAK is a national apex body and unified institutional voice representing Micro, Small and Medium Enterprises, entrepreneurs, cooperatives, and the informal sector economy across Kenya.
            </p>
            <p className="mt-6 text-lg font-semibold italic text-white/80">"Pamoja, Biashara Yetu, Maisha Yetu"</p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <Card className="border-l-4 border-l-primary shadow-sm">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-black mb-4 text-foreground">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading national apex institution representing and transforming Kenya's MSME sector into a unified, competitive, and globally recognized engine of economic growth.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary shadow-sm">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                  <Megaphone className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-black mb-4 text-foreground">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower, represent, and strengthen MSMEs in Kenya through advocacy, coordination, capacity building, and strategic partnerships that promote sustainable economic transformation and inclusive prosperity.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 p-8 md:p-12 bg-muted/40 rounded-3xl border">
            <h2 className="text-2xl font-black mb-3 text-foreground text-center">Strategic Mandate</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">BNAK is mandated to serve every entrepreneur across Kenya's economy.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Serve as the national voice of MSMEs in Kenya",
                "Advocate for SME-friendly policies and reforms",
                "Strengthen coordination of the SME ecosystem",
                "Promote access to markets, finance, and opportunities",
                "Support entrepreneurship development nationwide",
                "Facilitate integration of informal businesses into the economy",
                "Drive inclusive economic growth and job creation",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-background rounded-xl p-4 border">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Functions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <Badge className="bg-primary/10 text-primary border-0 font-semibold mb-3">Core Functions</Badge>
            <h2 className="text-3xl font-black mb-3">What BNAK Does</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Six core pillars that define how BNAK serves Kenya's MSME ecosystem.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_FUNCTIONS.map((fn, i) => (
              <Card key={i} className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-xl ${fn.color} flex items-center justify-center mb-4`}>
                    <fn.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-3">{fn.title}</h3>
                  <ul className="space-y-1.5">
                    {fn.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Represented */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Badge className="bg-secondary/10 text-secondary border-0 font-semibold mb-4">Economic Sectors</Badge>
              <h2 className="text-3xl font-black mb-4">Key Sectors BNAK Represents</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                BNAK represents SMEs across all major economic sectors in Kenya — ensuring every type of enterprise has advocacy, coordination, and support.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SECTORS_REPRESENTED.map((sector, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border bg-muted/30 hover:bg-primary/5 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground">{sector}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Badge className="bg-accent/20 text-accent-foreground border-0 font-semibold mb-4">National Structure</Badge>
              <h2 className="text-3xl font-black mb-4">How BNAK is Organized</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                BNAK operates as a coordinated national apex system ensuring strong grassroots representation and effective national coordination.
              </p>
              <div className="space-y-4">
                {NATIONAL_STRUCTURE.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl border shadow-sm bg-background hover:border-primary/30 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm">{item.label}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Coverage */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Badge className="bg-primary/10 text-primary border-0 font-semibold mb-4">National Coverage</Badge>
              <h2 className="text-3xl font-black mb-4">National Reach, Grassroots Impact</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                BNAK operates across Kenya, connecting urban and rural enterprise with practical support and a stronger collective voice. Our network of coordinators helps programmes reach the local market.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                From urban SMEs in Nairobi and Mombasa to rural enterprises in agricultural communities and informal sector businesses in estate markets — every entrepreneur is included.
              </p>
              <div className="space-y-5">
                {[
                   { value: "Nationwide", label: "County connections", sub: "Enterprise support across Kenya", color: "bg-primary/10 text-primary" },
                   { value: "Local", label: "Grassroots representation", sub: "Built around the markets businesses know", color: "bg-secondary/10 text-secondary" },
                   { value: "Together", label: "Sector networks", sub: "A shared voice across everyday enterprise", color: "bg-accent/20 text-accent-foreground" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className={`w-20 h-16 rounded-2xl ${item.color} flex items-center justify-center font-black text-2xl shrink-0`}>
                      {item.value}
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-foreground">{item.label}</h4>
                      <p className="text-sm text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t">
                <Button asChild size="lg" className="bg-primary text-white font-bold">
                  <Link href="/coordinators">Become a Local Coordinator</Link>
                </Button>
              </div>
            </div>

            <div className="bg-background rounded-3xl p-8 border shadow-sm">
              <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                <MapPin className="text-primary" /> Our national footprint
              </h3>
              <div className="flex flex-wrap gap-2 max-h-[420px] overflow-y-auto pr-2">
                {KENYA_COUNTIES.map((county) => (
                  <span key={county} className="px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-xs font-semibold text-foreground hover:bg-primary hover:text-white transition-colors cursor-default">
                    {county}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Impact */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.5)_0%,transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <Badge className="bg-white/20 text-white border-0 font-semibold mb-4">National Impact</Badge>
            <h2 className="text-3xl font-black mb-3">How BNAK Transforms Kenya</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Our impact spans the entire Kenya economic ecosystem.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "Strengthening SME competitiveness nationwide",
              "Promoting entrepreneurship and job creation",
              "Supporting financial inclusion across all counties",
              "Enhancing business survival and growth rates",
              "Driving rural and urban economic integration",
              "Formalizing and strengthening informal businesses",
              "Building a unified national SME ecosystem",
            ].map((impact, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-sm font-medium leading-snug">{impact}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-xl font-black italic mb-6">"Pamoja, Biashara Yetu, Maisha Yetu"</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold" asChild>
                <Link href="/membership">Join BNAK</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold" asChild>
                <Link href="/coordinators">Become a Coordinator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
