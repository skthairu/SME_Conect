import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const programmes = [
  ["BIASHARA BORA", "Business growth, skills, opportunities, finance, markets and enterprise development."],
  ["JENGA KWAKO", "Affordable and transparent land ownership opportunities, education and connections to legitimate land partners."],
  ["BODA BIASHARA", "Supporting the bodaboda business economy through business development, finance, safety, savings, markets and opportunities."],
  ["KILIMO PESA", "Turning agriculture into business through markets, finance, inputs, value addition and agribusiness opportunities."],
  ["GAS SAFI", "CLEAN GAS • LEGAL GAS • SAFE GAS — LPG safety, legal trade, vendor education and consumer awareness."],
  ["SOKO KWA SOKO", "Connecting businesses market by market through grassroots engagement, market access, digital commerce and business connections."],
  ["NGANI HALALI", "JUA HALALI • NUNUA HALALI • KUNWA SALAMA — promoting legitimate products, consumer awareness and protection."],
  ["HAKI KARIBU NA BIZ", "Business information, rights, regulatory awareness, dispute information and access-to-justice support."],
  ["USHURU NI TEGEEMO", "Tax education, taxpayer awareness, rights and responsibilities, compliance, import and customs education."],
  ["BIASHARA NI AMANI", "PEACE • COHESION • PROSPERITY — peaceful, safe and stable business environments and community cohesion."],
];

export default function Programs() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6"><Badge className="bg-white/15 text-white border-white/20 mb-4">OUR PROGRAMMES</Badge><h1 className="text-4xl md:text-6xl font-black max-w-4xl">Ten practical programmes for the people behind Kenya's daily economy.</h1><p className="mt-5 max-w-2xl text-white/80 text-lg">From the market stall to the growing enterprise, BNAK turns representation into action.</p></div>
      </section>
      <section className="py-16 container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-5">
          {programmes.map(([title, body], index) => <Card key={title} className="group overflow-hidden hover:shadow-lg transition-shadow"><CardHeader className="flex-row items-start justify-between gap-4"><div><span className="text-xs font-black text-primary">0{index + 1}</span><CardTitle className="mt-2 text-xl">{title}</CardTitle></div><ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" /></CardHeader><CardContent><p className="text-muted-foreground leading-relaxed">{body}</p><div className="mt-5 flex items-center gap-2 text-xs font-semibold text-secondary"><CheckCircle2 className="h-4 w-4" /> Open to eligible BNAK members and partners</div></CardContent></Card>)}
        </div>
        <div className="mt-12 rounded-3xl bg-muted p-8 md:p-12 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"><div><h2 className="text-2xl font-black">Start with the programme that fits your biashara</h2><p className="text-muted-foreground mt-2">Register once and discover opportunities across the BNAK network.</p></div><Button asChild size="lg"><Link href="/membership">Join BNAK <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button></div>
      </section>
    </div>
  );
}