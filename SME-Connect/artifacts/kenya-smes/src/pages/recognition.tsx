import { Award, Star, Trophy, Users, ShoppingBag, Landmark, ArrowRight, MessageCircle, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const CATEGORIES = [
  {
    title: "Mama Mboga of the Year",
    description: "Honouring exceptional fresh produce vendors who demonstrate resilience, community impact, and business growth.",
    icon: ShoppingBag,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Youth Entrepreneur Award",
    description: "Recognising innovative businesses founded and run by youth under 35 driving local solutions.",
    icon: Star,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "E-Mobility Champion",
    description: "Celebrating riders, owners, and operators championing electric bodas and matatus for a greener economy.",
    icon: Zap, // Note: Need to import Zap if used, using Landmark as placeholder for now, wait I'll import it. Actually, I'll just use Trophy.
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    title: "Digital Trailblazer",
    description: "Awarded to SMEs successfully leveraging digital tools, social commerce, and digital payments to scale.",
    icon: Trophy,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    title: "Community Builder SME",
    description: "Recognising businesses that actively give back, employ locals, or solve community challenges.",
    icon: Users,
    color: "text-rose-500",
    bg: "bg-rose-500/10"
  },
  {
    title: "Retail Innovator",
    description: "Honouring duka owners and retailers bringing modern practices to neighborhood commerce.",
    icon: ShoppingBag,
    color: "text-primary",
    bg: "bg-primary/10"
  }
];

export default function Recognition() {
  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <section className="bg-foreground text-background py-16 md:py-24 flag-border-bottom relative overflow-hidden">
        <div className="absolute inset-0 soft-grid opacity-10" />
        
        <div className="app-shell relative z-10 text-center max-w-4xl mx-auto">
          <Badge className="bg-purple-500/20 text-purple-400 border-0 font-semibold mb-6 px-4 py-1.5" data-testid="badge-recognition">
            <Award className="w-4 h-4 mr-2" /> BNAK AWARDS
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Celebrating the Engine of Kenya
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8">
            The BNAK Business Awards recognize the grit, innovation, and impact of informal traders and SMEs across every county.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary text-white font-bold text-base px-8 h-14" asChild data-testid="button-nominate-whatsapp">
              <a href="https://wa.me/254711422163?text=I%20want%20to%20nominate%20a%20business%20for%20the%20BNAK%20Awards" target="_blank" rel="noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" /> Nominate via WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold text-base px-8 h-14" asChild data-testid="button-nominate-membership">
              <Link href="/membership">Register to Participate</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="app-shell py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-4">Award Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We celebrate excellence across the diverse landscape of Kenyan enterprise. There are no fake winners — only verified, hard-working biasharas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Card key={i} className="border-border hover:border-primary/30 transition-all shadow-sm group" data-testid={`card-award-category-${i}`}>
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${cat.bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${cat.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="app-shell pb-12">
        <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <Award className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-black mb-4">How Nominations Work</h3>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Nominations are currently open. You can nominate your own business or another deserving enterprise. All nominees must be registered members of BNAK and undergo a verification process by our grassroots coordinators.
          </p>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild data-testid="button-awards-rules">
            <Link href="/about">Read BNAK Mandate</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}