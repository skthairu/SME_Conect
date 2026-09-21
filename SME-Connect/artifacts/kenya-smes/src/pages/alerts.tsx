import { BellRing, ShieldCheck, Scale, Lightbulb, MapPin, Briefcase, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ALERTS = [
  {
    id: 1,
    type: "tax",
    title: "eTIMS Onboarding Reminder",
    date: "Active Requirement",
    priority: "high",
    icon: FileText,
    content: "KRA requires businesses to onboard onto eTIMS for electronic tax invoicing. Ensure you have the appropriate solution (Lite, App, or System) to avoid penalties.",
    source: "Kenya Revenue Authority",
    action: "Visit KRA portal"
  },
  {
    id: 2,
    type: "policy",
    title: "County Single Business Permit Renewal",
    date: "Annual Requirement",
    priority: "medium",
    icon: Scale,
    content: "A reminder that Single Business Permits usually expire at the end of the calendar year. Check your county's revenue portal for renewal deadlines to avoid disruption.",
    source: "County Governments",
    action: "Check County Portal"
  },
  {
    id: 3,
    type: "opportunity",
    title: "Hustler Fund Eligibility",
    date: "Ongoing",
    priority: "medium",
    icon: Briefcase,
    content: "SMEs and Chamas can access group loans via the Hustler Fund. Ensure your group is officially registered with the relevant authorities to qualify.",
    source: "Financial Inclusion Fund",
    action: "Dial *254#"
  },
  {
    id: 4,
    type: "safety",
    title: "Digital Payment Fraud Alert",
    date: "Safety Advisory",
    priority: "high",
    icon: ShieldCheck,
    content: "Be vigilant against fake payment messages. Always verify incoming M-Pesa transactions through official statements, not just SMS screenshots shown by customers.",
    source: "BNAK Advisory",
    action: "Read Safety Guide"
  },
  {
    id: 5,
    type: "advocacy",
    title: "Market Infrastructure Taskforce",
    date: "BNAK Initiative",
    priority: "low",
    icon: MapPin,
    content: "BNAK is compiling a list of urgent market infrastructure needs (water, sanitation, lighting) to present to the Ministry. Submit your local market's needs.",
    source: "BNAK Secretariat",
    action: "Submit Report"
  }
];

export default function Alerts() {
  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <section className="bg-foreground text-background py-16 flag-border-bottom relative overflow-hidden">
        <div className="absolute inset-0 soft-grid opacity-10" />
        <div className="app-shell relative z-10 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="max-w-2xl">
            <Badge className="bg-amber-500/20 text-amber-400 border-0 font-semibold mb-4 flex items-center gap-2 w-max" data-testid="badge-alerts">
              <BellRing className="w-4 h-4" /> BNAK ALERTS
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              SME Starter Alerts
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Crucial updates on compliance, policy changes, and opportunities for Kenyan businesses.
            </p>
          </div>
        </div>
      </section>

      <section className="app-shell py-12 max-w-4xl mx-auto">
        <div className="bg-card border border-border text-foreground rounded-xl p-4 mb-8 text-sm flex gap-3 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Trust Notice:</strong> These are starter alerts curated by BNAK to keep you informed. We do not invent official dates or represent government bodies. Always verify deadlines and requirements with official sources like KRA, eCitizen, or your County Government.
          </p>
        </div>

        <div className="space-y-4">
          {ALERTS.map((alert) => {
            const Icon = alert.icon;
            return (
              <Card key={alert.id} className="border-border hover:border-primary/30 transition-colors shadow-sm overflow-hidden" data-testid={`card-alert-${alert.id}`}>
                <div className={`h-1.5 w-full ${alert.priority === 'high' ? 'bg-destructive' : alert.priority === 'medium' ? 'bg-amber-500' : 'bg-primary'}`} />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-1">
                    <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider border-border/50 text-muted-foreground">
                      {alert.type}
                    </Badge>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">{alert.date}</span>
                  </div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    {alert.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-foreground/90 mb-4">
                    {alert.content}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-border/50">
                    <span className="text-xs font-medium text-muted-foreground">
                      Source: <span className="text-foreground">{alert.source}</span>
                    </span>
                    <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-primary hover:text-primary hover:bg-primary/5" data-testid={`button-alert-action-${alert.id}`}>
                      {alert.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}