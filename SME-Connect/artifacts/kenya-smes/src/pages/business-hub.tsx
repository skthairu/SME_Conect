import { useState } from "react";
import { Link } from "wouter";
import { Bot, Calculator, HeartPulse, BellRing, Award, Zap, ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HUB_TOOLS = [
  {
    title: "Ask BNAK AI",
    description: "Your 24/7 intelligent business assistant. Ask questions in English or Kiswahili.",
    icon: Bot,
    href: "/ask-bnak",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    badge: "New"
  },
  {
    title: "Money Centre",
    description: "Essential business calculators: margins, pricing, loans, and cash flow planning.",
    icon: Calculator,
    href: "/money-centre",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Business Health Check",
    description: "Take a 10-question assessment to see where your biashara stands and how to improve.",
    icon: HeartPulse,
    href: "/business-health",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    title: "SME Alerts",
    description: "Trusted starter alerts on taxes, licences, safety, and business opportunities.",
    icon: BellRing,
    href: "/alerts",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Awards & Recognition",
    description: "Nominate outstanding businesses for the upcoming BNAK national awards.",
    icon: Award,
    href: "/recognition",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "E-Mobility Ecosystem",
    description: "Explore the future of clean transport: E-bodas, E-matatus, and green business.",
    icon: Zap,
    href: "/e-mobility",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    badge: "Featured"
  }
];

export default function BusinessHub() {
  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Header */}
      <section className="bg-foreground text-background py-16 flag-border-bottom relative overflow-hidden">
        <div className="absolute inset-0 soft-grid opacity-10" />
        <div className="app-shell relative z-10">
          <Badge className="bg-primary/20 text-primary border-0 font-semibold mb-4" data-testid="badge-hub">
            MEMBER TOOLS
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-white mb-4">
            BNAK Business Hub
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
            A suite of practical tools, intelligent assistants, and vital information to help you manage, scale, and protect your enterprise.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="app-shell py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HUB_TOOLS.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card key={index} className="flex flex-col border-border hover:border-primary/40 hover:shadow-md transition-all group overflow-hidden" data-testid={`card-hub-${tool.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.bgColor}`}>
                      <Icon className={`w-6 h-6 ${tool.color}`} />
                    </div>
                    {tool.badge && (
                      <Badge variant="secondary" className="bg-primary text-white border-0 font-bold text-xs uppercase tracking-wide">
                        {tool.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-sm mt-2 leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 mt-auto">
                  <Button variant="ghost" className="p-0 text-primary font-semibold hover:bg-transparent hover:text-primary/80 group-hover:underline" asChild data-testid={`link-hub-${tool.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Link href={tool.href}>
                      Open Tool <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Guidance Section */}
      <section className="app-shell">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-8 h-8 text-secondary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Need direct assistance?</h3>
            <p className="text-muted-foreground text-sm max-w-2xl">
              While our tools provide immediate guidance, complex legal, tax, and financial matters should always be discussed with an expert. Reach out to the BNAK support desk via WhatsApp for personalised member assistance.
            </p>
          </div>
          <Button asChild className="shrink-0" data-testid="button-hub-support">
            <a href="https://wa.me/254711422163" target="_blank" rel="noreferrer">
              Contact Support
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
