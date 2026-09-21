import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Calendar, MapPin, Users, Briefcase, ChevronLeft, ShoppingBag, Megaphone, TrendingUp, HandshakeIcon } from "lucide-react";
import {
  useGetStats,
  useListSectors,
  useListEvents,
  getListEventsQueryKey
} from "@workspace/api-client-react";
import { format } from "date-fns";

const HERO_SLIDES = [
  {
    image: "/images/hero-retail.png",
    sector: "General Retail",
    title: "The Duka is the Heartbeat of Kenya",
    description: "From corner kiosks to mini-supermarkets — BNAK champions every shop owner keeping our communities running."
  },
  {
    image: "/images/hero-agribusiness.png",
    sector: "Food & Grocery",
    title: "Fresh Markets, Thriving Families",
    description: "Supporting the vegetable vendors, butcheries, cereal shops, and dairy traders who feed the nation."
  },
  {
    image: "/images/hero-textile.png",
    sector: "Clothing & Fashion",
    title: "Style Born in Kenya",
    description: "From mitumba sellers to boutique owners — we uplift fashion entrepreneurs across every county."
  },
  {
    image: "/images/hero-artisanal.png",
    sector: "Beauty & Personal Care",
    title: "Pamper, Glow, Thrive",
    description: "Cosmetics shops, skincare retailers, and beauty product businesses are a core part of our economy."
  },
  {
    image: "/images/hero-tech.png",
    sector: "Electronics & Mobile",
    title: "Powering the Digital Marketplace",
    description: "Mobile phone shops, cyber cafes, and electronics retailers form Kenya's fast-growing tech retail sector."
  },
  {
    image: "/images/hero-manufacturing.png",
    sector: "Household Goods",
    title: "Every Home Needs a Supplier",
    description: "Kitchenware, cleaning products, plastic goods — household retail SMEs serve millions of Kenyans daily."
  },
  {
    image: "/images/hero-tourism.png",
    sector: "Bakery & Food Takeaway",
    title: "Freshly Made, Proudly Kenyan",
    description: "From mandazi vendors to full bakeries — Kenya's street food and takeaway sector feeds the hustle."
  },
  {
    image: "/images/hero-finance.png",
    sector: "Online Retail",
    title: "Commerce is Going Digital",
    description: "Instagram shops, WhatsApp sellers, and Jumia vendors represent the future of Kenyan retail enterprise."
  },
  {
    image: "/images/e-mobility-boda.png",
    sector: "E-Mobility",
    title: "The Electric Revolution on Two Wheels",
    description: "E-Bodas are transforming transport with clean energy, lower running costs, and better margins for riders."
  },
  {
    image: "/images/e-mobility-matatu.png",
    sector: "Green Transport",
    title: "Pioneering the E-Matatu",
    description: "Clean, silent, and cost-effective — electric commercial vehicles are redefining Kenya's public transport."
  },
  {
    image: "/images/clean-business-market.png",
    sector: "Environment",
    title: "Clean Markets, Healthy Trade",
    description: "Promoting sanitation, waste management, and sustainable practices for safer, thriving business spaces."
  }
];

const MANDATE_ITEMS = [
  { icon: Megaphone, label: "National SME Advocacy", color: "bg-primary/10 text-primary" },
  { icon: HandshakeIcon, label: "Ecosystem Coordination", color: "bg-secondary/10 text-secondary" },
  { icon: TrendingUp, label: "Market Access & Trade", color: "bg-accent/20 text-accent-foreground" },
  { icon: ShoppingBag, label: "Financial Inclusion", color: "bg-primary/10 text-primary" },
  { icon: Users, label: "Capacity Building", color: "bg-secondary/10 text-secondary" },
  { icon: Briefcase, label: "Digital Transformation", color: "bg-accent/20 text-accent-foreground" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { data: sectors, isLoading: sectorsLoading } = useListSectors();
  const { data: events, isLoading: eventsLoading } = useListEvents(
    { upcoming: true, limit: 3 },
    { query: { enabled: true, queryKey: getListEventsQueryKey({ upcoming: true, limit: 3 }) } }
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Banner */}
      <section className="relative h-[620px] md:h-[720px] w-full overflow-hidden bg-black">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10" />
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex flex-col justify-center container mx-auto px-4 md:px-6">
              <div className="max-w-2xl space-y-5">
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary text-white border-0 font-semibold px-3 py-1">
                    {slide.sector}
                  </Badge>
                  <Badge variant="outline" className="text-white border-white/40 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-semibold">
                    BNAK — Biashara Ndogo Association of Kenya
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                  {slide.description}
                </p>
                <p className="text-sm text-primary font-semibold italic">"Pamoja, Biashara Yetu, Maisha Yetu"</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-0 font-bold shadow-lg" asChild>
                    <Link href="/membership">Join BNAK Today</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white hover:text-black font-bold backdrop-blur-sm" asChild>
                    <Link href="/about">Our Story</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 text-white border border-white/20 hover:bg-white hover:text-black transition-all flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 text-white border border-white/20 hover:bg-white hover:text-black transition-all flex items-center justify-center"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 items-center">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              className={`rounded-full transition-all ${index === currentSlide ? "bg-primary w-6 h-3" : "bg-white/50 hover:bg-white/80 w-3 h-3"}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="bg-primary text-white py-2 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-sm font-semibold">
          {["General Retail Shops", "Food & Grocery", "Clothing & Fashion", "Beauty & Personal Care", "Electronics & Mobile", "Household Goods", "Fuel & Energy", "Bakery & Takeaway", "Beverages & Drinks", "Children & Baby Products", "Wholesale-Retail Hybrid", "Online Retail (E-commerce)"].map((s, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white/60 inline-block"></span>
              {s}
            </span>
          ))}
          {["General Retail Shops", "Food & Grocery", "Clothing & Fashion", "Beauty & Personal Care", "Electronics & Mobile", "Household Goods", "Fuel & Energy", "Bakery & Takeaway", "Beverages & Drinks", "Children & Baby Products", "Wholesale-Retail Hybrid", "Online Retail (E-commerce)"].map((s, i) => (
            <span key={`r-${i}`} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white/60 inline-block"></span>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Who We Are */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-0 font-semibold">The National Apex Body</Badge>
               <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                 We represent millions of mSMEs across Kenya.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Biashara Ndogo Association of Kenya (BNAK) is the national apex body representing Micro, Small and Medium Enterprises, entrepreneurs, cooperatives, and the informal sector economy across Kenya.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We bring together farmers, traders, manufacturers, service providers, transport operators, youth and women entrepreneurs, cooperatives, and informal sector businesses into one structured national ecosystem — ensuring every entrepreneur, regardless of location, is included in Kenya's economic framework.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {MANDATE_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                 { label: "Member businesses in the network", value: statsLoading ? null : stats?.totalMembers?.toLocaleString() || "0", bg: "bg-primary", text: "text-white" },
                 { label: "County-connected", value: statsLoading ? null : "Nationwide", bg: "bg-secondary", text: "text-white" },
                 { label: "Grassroots-rooted", value: statsLoading ? null : "Local", bg: "bg-accent", text: "text-accent-foreground" },
                 { label: "Built for enterprise", value: statsLoading ? null : "Everyday", bg: "bg-card border shadow-sm", text: "text-foreground" },
              ].map((card, i) => (
                <Card key={i} className={`${card.bg} border-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-4xl font-black ${card.text}`}>
                      {card.value === null ? <Skeleton className="h-10 w-20 bg-white/20" /> : card.value}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`font-semibold text-sm ${card.text} opacity-90`}>{card.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SME Sectors Market Grid */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div className="max-w-2xl">
              <Badge className="bg-secondary/10 text-secondary border-0 font-semibold mb-3">Retail-Based Sectors</Badge>
              <h2 className="text-3xl font-black text-foreground mb-3">Kenya's Retail Market, Sector by Sector</h2>
              <p className="text-muted-foreground">BNAK represents SMEs across all retail-based sectors — the engine of Kenya's everyday economy.</p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-white">
              <Link href="/sectors">All 12 Sectors <ChevronRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {sectorsLoading ? (
              Array(4).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))
            ) : (
              sectors?.slice(0, 4).map((sector) => (
                <Link href="/sectors" key={sector.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-border hover:border-primary/30 hover:-translate-y-1">
                    <div className="h-48 overflow-hidden relative bg-muted">
                      {sector.imageUrl ? (
                        <img src={sector.imageUrl} alt={sector.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/5">
                          <ShoppingBag className="w-12 h-12 text-primary/20" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-white font-bold text-base leading-tight">{sector.name}</h3>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-primary text-white border-0 text-xs font-bold">
                          {sector.totalSMEs.toLocaleString()} SMEs
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{sector.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {sector.keyProducts?.slice(0, 2).map((p, i) => (
                          <span key={i} className="text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded-full font-medium border border-primary/10">{p}</span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>

          <Button variant="outline" asChild className="w-full mt-6 md:hidden border-primary text-primary">
            <Link href="/sectors">View All 12 Sectors</Link>
          </Button>
        </div>
      </section>

      {/* Strategic Mandate Banner */}
      <section className="py-16 bg-background border-y">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-accent/20 text-accent-foreground border-0 font-semibold mb-3">Strategic Mandate</Badge>
            <h2 className="text-3xl font-black text-foreground mb-3">What BNAK Delivers for You</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A structured national ecosystem built for every entrepreneur — from ward level to national platforms.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "National SME Advocacy", body: "We represent MSMEs at national and county levels, engage government and policy institutions, and advocate for fair business policies and reforms.", icon: Megaphone },
              { title: "Market Access & Trade", body: "We connect SMEs to local, regional, and international markets — facilitating trade linkages, value chain integration, and business visibility.", icon: TrendingUp },
              { title: "Financial Inclusion", body: "We promote access to finance for SMEs, engage banks, SACCOs, and investors, and support investment readiness programs across all counties.", icon: ShoppingBag },
              { title: "Capacity Building", body: "We promote entrepreneurship training and skills development, support youth and women enterprise growth, and encourage innovation and productivity.", icon: Users },
              { title: "SME Ecosystem Coordination", body: "We unite fragmented SME groups across Kenya, build structured national networks, and strengthen collaboration across all sectors.", icon: HandshakeIcon },
              { title: "Digital Transformation", body: "We support digital adoption among SMEs, promote SME data collection and mapping, and build a modern digital SME ecosystem.", icon: Briefcase },
            ].map((item, i) => (
              <Card key={i} className="border shadow-sm hover:shadow-md transition-shadow group">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${i % 3 === 0 ? "bg-primary/10" : i % 3 === 1 ? "bg-secondary/10" : "bg-accent/20"}`}>
                    <item.icon className={`w-6 h-6 ${i % 3 === 0 ? "text-primary" : i % 3 === 1 ? "text-secondary" : "text-accent-foreground"}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Badge className="bg-primary/10 text-primary border-0 font-semibold mb-3">BNAK Events</Badge>
              <h2 className="text-3xl font-black text-foreground mb-3">Upcoming Events & Trade Fairs</h2>
              <p className="text-muted-foreground">Network, learn, and grow with fellow entrepreneurs across Kenya.</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex text-primary hover:text-primary hover:bg-primary/5">
              <Link href="/events">Full Calendar <ChevronRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {eventsLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i}>
                  <CardHeader><Skeleton className="h-6 w-3/4 mb-2" /><Skeleton className="h-4 w-1/2" /></CardHeader>
                  <CardContent><Skeleton className="h-24 w-full" /></CardContent>
                </Card>
              ))
            ) : events?.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">No upcoming events. Check back soon.</p>
              </div>
            ) : (
              events?.map((event) => (
                <Card key={event.id} className="flex flex-col hover:shadow-md transition-shadow border-border hover:border-primary/20">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none capitalize">
                        {event.eventType}
                      </Badge>
                      {event.isFeatured && <Badge className="bg-accent text-accent-foreground border-none">Featured</Badge>}
                    </div>
                    <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary shrink-0" />
                        <span>{format(new Date(event.eventDate), "MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span>{event.venue}, {event.county}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary shrink-0" />
                        <span>{event.currentAttendees} registered</span>
                      </div>
                    </div>
                    <p className="text-sm line-clamp-2 text-muted-foreground">{event.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white" asChild>
                      <Link href={`/events`}>Register Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA — Join the Movement */}
      <section className="py-20 relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.3)_0%,transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-white/70 font-semibold italic text-lg">"Pamoja, Biashara Yetu, Maisha Yetu"</p>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">Join the BNAK Movement</h2>
              <p className="text-lg opacity-90 leading-relaxed">
                Whether you run a kiosk in Kibera, a boutique in Mombasa, or an online shop from your phone — your business matters. BNAK is your national voice, your network, your platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold shadow-lg" asChild>
                  <Link href="/membership">Register Your SME</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold" asChild>
                  <Link href="/coordinators">Become a Coordinator (KES 500)</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              {[
                 { title: "Network Nationwide", body: "Connect with SME peers and opportunities across Kenya." },
                { title: "Grow Your Business", body: "Access specialized training, mentorship, and capacity building." },
                 { title: "Shape Policy", body: "Bring the realities of enterprise into policy forums." },
                { title: "Access Finance", body: "Grants, low-interest loans, and investment opportunities." },
              ].map((item, i) => (
                <div key={i} className={`bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/20 ${i === 1 ? "mt-6" : i === 3 ? "mt-6" : ""}`}>
                  <h3 className="font-bold text-base mb-1">{item.title}</h3>
                  <p className="text-sm opacity-75">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
