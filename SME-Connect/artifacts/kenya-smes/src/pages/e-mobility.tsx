import React, { useState } from "react";
import { Link } from "wouter";
import { Zap, MapPin, BatteryCharging, Leaf, Briefcase, ChevronRight, CheckCircle2, Calculator, HelpCircle, Car, Lightbulb, Wallet, Wrench, Sprout, Network, ShieldCheck, Scale, FileText, Battery, Users, ArrowRight, BookOpen, Search, Gauge, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function EMobility() {
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-black flex items-center flag-border-bottom">
        <div className="absolute inset-0 z-0">
          <img src="/images/e-mobility-boda.png" alt="E-Boda" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>
        
        <div className="app-shell relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-emerald-500 text-white border-0 font-bold mb-4 px-3 py-1 flex w-max items-center gap-2" data-testid="badge-emobility">
              <Zap className="w-4 h-4" /> BNAK E-MOBILITY HUB
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
              OWN • FINANCE • CHARGE • EARN • SERVICE • GROW
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              The Future of Transport is Clean & Electric. Lower running costs, better margins, and a cleaner environment. BNAK connects operators, owners, and SMEs to the evolving electric mobility network in Kenya.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-2">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 px-8" asChild data-testid="button-emobility-join">
                  <Link href="/e-mobility/register">Register as an Operator</Link>
                </Button>
                <span className="text-xs font-semibold text-white/70 text-center tracking-wide uppercase">KSh 150 Registration</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold h-12 px-8" asChild data-testid="button-emobility-contact">
                  <Link href="/contact">Contact Hub Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Notice */}
      <section className="app-shell py-8">
        <div className="bg-card border border-border rounded-xl p-4 flex gap-3 text-sm shadow-sm max-w-4xl mx-auto">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Platform Notice:</strong> BNAK acts as a connector, advocate, and information platform for the informal sector. We are not a direct lender, manufacturer, or vehicle provider. We connect our members to verified partners.
          </p>
        </div>
      </section>

      {/* Main Hub Tabs */}
      <section className="app-shell pb-24">
        <Tabs defaultValue="vehicles" className="w-full" data-testid="tabs-emobility-hub">
          <div className="flex justify-center mb-8 w-full">
            <TabsList className="grid h-auto w-full grid-cols-2 gap-1 border bg-card p-1.5 sm:flex sm:w-auto">
              <TabsTrigger value="vehicles" className="text-xs sm:text-sm font-bold py-2 px-3 rounded-md" data-testid="tab-vehicles"><Car className="w-4 h-4 mr-2 hidden sm:block" /> Vehicles</TabsTrigger>
              <TabsTrigger value="tools" className="text-xs sm:text-sm font-bold py-2 px-3 rounded-md" data-testid="tab-tools"><Calculator className="w-4 h-4 mr-2 hidden sm:block" /> Tools & Calc</TabsTrigger>
              <TabsTrigger value="finance" className="text-xs sm:text-sm font-bold py-2 px-3 rounded-md" data-testid="tab-finance"><Wallet className="w-4 h-4 mr-2 hidden sm:block" /> Finance & Fleet</TabsTrigger>
              <TabsTrigger value="ecosystem" className="text-xs sm:text-sm font-bold py-2 px-3 rounded-md" data-testid="tab-ecosystem"><Network className="w-4 h-4 mr-2 hidden sm:block" /> Ecosystem</TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: Vehicles */}
          <TabsContent value="vehicles" className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-4">The E-Mobility Ecosystem</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Exploring the segments transforming the transport industry across Kenyan roads.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="overflow-hidden border-border group hover:border-emerald-500/30 transition-all shadow-sm" data-testid="card-emobility-boda">
                <div className="h-48 overflow-hidden relative">
                  <img src="/images/e-mobility-boda.png" alt="Electric Boda" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-emerald-500" /> E-Boda (Motorcycles)</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    The fastest-growing segment. Electric bodas offer up to 40% lower operating costs, saving riders money on fuel and maintenance through battery-swapping networks.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-border group hover:border-emerald-500/30 transition-all shadow-sm" data-testid="card-emobility-matatu">
                <div className="h-48 overflow-hidden relative">
                  <img src="/images/e-mobility-matatu.png" alt="Electric Matatu" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-emerald-500" /> E-Matatu & E-Bus</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Pioneering public transport. Silent, emission-free commutes with structured charging depots designed to keep fleets moving profitably.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-border group hover:border-emerald-500/30 transition-all shadow-sm" data-testid="card-emobility-commercial">
                <div className="h-48 bg-muted flex items-center justify-center relative overflow-hidden">
                  <img src="/images/clean-business-market.png" alt="Clean Market" className="w-full h-full object-cover opacity-60" />
                  <Briefcase className="w-16 h-16 text-emerald-900/40 absolute" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-emerald-500" /> E-Tuktuk & Commercial</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Last-mile delivery and localized transit. Electric 3-wheelers and light trucks lower logistics costs for SMEs delivering goods.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="max-w-4xl mx-auto mt-12 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-2xl p-8 text-center">
              <Sprout className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-black mb-3 text-emerald-900 dark:text-emerald-100">Soko Marketplace Pathway</h3>
              <p className="text-emerald-700 dark:text-emerald-300 mb-6">
                Looking to buy, sell, or rent an electric vehicle? BNAK ensures all listed E-Mobility partners and sellers pass a rigorous verification process.
              </p>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 font-bold" data-testid="button-verified-marketplace">
                <Link href="/soko">Browse E-Mobility Marketplace</Link>
              </Button>
            </div>
          </TabsContent>

          {/* TAB 2: Interactive Tools */}
          <TabsContent value="tools" className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-4">Planning & Calculations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Make informed decisions before transitioning to electric mobility.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <EvCalculator />
              <EvRecommender />
            </div>

            <div className="max-w-6xl mx-auto mt-12">
              <BusinessWizard />
            </div>
          </TabsContent>

          {/* TAB 3: Finance & Fleet */}
          <TabsContent value="finance" className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-4">Finance & Fleet Management</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Access capital and manage your electric assets.</p>
            </div>

            <div className="max-w-6xl mx-auto space-y-12">
              {/* Starter Finance Compare */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Wallet className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl font-black">Starter Finance Options</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">* Illustrative placeholders pending verified provider onboarding. BNAK does not directly provide loans.</p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "Asset-finance model", deposit: "Provider to confirm", term: "Provider to confirm", eligible: "Eligibility to be verified", docs: "Provider document list required" },
                    { name: "Lease-to-own model", deposit: "Provider to confirm", term: "Provider to confirm", eligible: "Eligibility to be verified", docs: "Provider document list required" },
                    { name: "Pay-as-you-drive model", deposit: "Provider to confirm", term: "Provider to confirm", eligible: "Eligibility to be verified", docs: "Provider document list required" }
                  ].map((f, i) => (
                    <Card key={i} className="border-border shadow-sm flex flex-col" data-testid={`card-finance-${i}`}>
                      <CardHeader className="bg-muted/30 pb-4 border-b">
                        <Badge variant="outline" className="w-max mb-2">Illustrative Model</Badge>
                        <CardTitle className="text-lg">{f.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 flex-1">
                        <ul className="space-y-3 text-sm">
                          <li className="flex justify-between border-b pb-1">
                            <span className="text-muted-foreground">Deposit:</span>
                            <span className="font-semibold">{f.deposit}</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span className="text-muted-foreground">Term:</span>
                            <span className="font-semibold">{f.term}</span>
                          </li>
                          <li className="flex justify-between border-b pb-1">
                            <span className="text-muted-foreground">Eligibility:</span>
                            <span className="font-medium text-right">{f.eligible}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Docs:</span>
                            <span className="font-medium text-right text-xs">{f.docs}</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" disabled data-testid={`button-finance-apply-${i}`}>Apply (Coming Soon)</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Tracker */}
                <Card className="border-border shadow-sm" data-testid="card-app-tracker">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-emerald-600" /> Application Tracker</CardTitle>
                    <CardDescription>Track your external EV finance applications.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="font-medium">No active applications</p>
                      <p className="text-sm mt-1">When you apply through a BNAK partner, track status here.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Fleet Manager */}
                <Card className="border-border shadow-sm bg-gradient-to-br from-card to-emerald-50 dark:to-emerald-950/20" data-testid="card-fleet-manager">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Gauge className="w-5 h-5 text-emerald-600" /> Fleet Manager (Preview)</CardTitle>
                    <CardDescription>Planned capability for SMEs managing 2+ vehicles.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border shadow-sm opacity-70">
                        <div className="flex items-center gap-3">
                          <Car className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-bold text-sm">Vehicles</p>
                            <p className="text-xs text-muted-foreground">Track utilization</p>
                          </div>
                        </div>
                        <span className="font-black text-lg">--</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg border shadow-sm opacity-70">
                        <div className="flex items-center gap-3">
                          <Battery className="w-5 h-5 text-emerald-500" />
                          <div>
                            <p className="font-bold text-sm">Battery Health</p>
                            <p className="text-xs text-muted-foreground">Monitor swaps</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 bg-muted rounded">Coming Soon</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: Ecosystem */}
          <TabsContent value="ecosystem" className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-4">Infrastructure & Policy Ecosystem</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Beyond the vehicles: batteries, charging, skills, and policy.</p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
              {/* Left Column: Network & Battery */}
              <div className="md:col-span-8 space-y-8">
                <Card className="border-border shadow-sm" data-testid="card-battery-centre">
                  <CardHeader className="border-b bg-muted/20">
                    <CardTitle className="flex items-center gap-2 text-xl"><Battery className="w-5 h-5 text-emerald-600" /> Battery Centre</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="models">
                        <AccordionTrigger className="font-bold">Ownership vs. Subscription Models</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          Battery-as-a-Service can separate vehicle ownership from battery access. Depending on the provider, an operator may own, lease or subscribe to a battery and pay per period or per swap. Compare the full contract, replacement responsibility and exit terms before committing.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="swapping">
                        <AccordionTrigger className="font-bold">How Battery Swapping Works</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          Battery swapping allows a compatible depleted battery to be exchanged for a charged one at an approved station. Availability, exchange time, compatibility and pricing depend on the provider and must be confirmed directly.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="health">
                        <AccordionTrigger className="font-bold">Health, Safety & Warranty</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          Follow the manufacturer’s handling, charging and storage instructions. Before signing, confirm the written warranty period, replacement process, health checks, service contacts and who is responsible for battery damage.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card className="border-border shadow-sm" data-testid="card-charging-network">
                  <CardHeader className="border-b bg-muted/20">
                    <CardTitle className="flex items-center gap-2 text-xl"><MapPin className="w-5 h-5 text-emerald-600" /> Charging & Swap Network</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="bg-muted p-4 rounded-lg flex items-center justify-between flex-wrap gap-4 mb-6">
                      <div className="flex-1 min-w-[200px]">
                        <Label htmlFor="county-search" className="sr-only">Search Location</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="county-search" placeholder="Type county or town..." className="pl-9" />
                        </div>
                      </div>
                      <Button variant="secondary" data-testid="button-search-network">Check Readiness</Button>
                    </div>
                    <div className="text-center py-6">
                      <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                      <p className="font-semibold text-foreground">Live station data integration planned.</p>
                      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                        Verified station locations, operating hours, compatibility, services and official prices will appear here after approved network providers are onboarded.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border shadow-sm" data-testid="card-community">
                  <CardHeader className="border-b bg-muted/20">
                    <CardTitle className="flex items-center gap-2 text-xl"><Users className="w-5 h-5 text-emerald-600" /> E-Mobility Community</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground mb-4">Join moderated discussions with other riders and owners. Share tips, report issues, and avoid scams.</p>
                    <Button variant="outline" className="gap-2"><MessageCircle className="w-4 h-4" /> Join Discussion Group</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Policy & Skills */}
              <div className="md:col-span-4 space-y-8">
                <Card className="border-border shadow-sm bg-card" data-testid="card-policy">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg"><Scale className="w-4 h-4 text-emerald-600" /> Government & Policy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-2 border-emerald-500 pl-3">
                        <p className="font-semibold text-sm">Verified policy updates</p>
                        <p className="text-xs text-muted-foreground mt-1">Regulations, standards, incentives, licensing requirements and public consultations will only be published after checking an official source.</p>
                        <Badge variant="secondary" className="text-[10px] mt-2">Source required • Date updated required</Badge>
                      </div>
                      <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                        No verified policy item is currently published. Confirm current requirements with the responsible government institution.
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border shadow-sm bg-card" data-testid="card-jobs">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg"><Wrench className="w-4 h-4 text-emerald-600" /> Jobs & Skills</CardTitle>
                    <CardDescription className="text-xs">Connected to Youth Biashara</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>EV Mechanic Training</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Battery Swap Station Attendant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Fleet Telematics Officer</span>
                      </li>
                    </ul>
                    <Button variant="link" className="px-0 mt-2 text-emerald-600 h-auto text-xs" asChild>
                      <Link href="/programs">View Youth Programmes <ArrowRight className="w-3 h-3 ml-1" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// Sub-components
// -------------------------------------------------------------

function EvCalculator() {
  const [dailyFuel, setDailyFuel] = useState<number>(1000);
  const [dailyElectricity, setDailyElectricity] = useState<number>(300);
  const [maintenanceFuel, setMaintenanceFuel] = useState<number>(3000);
  const [maintenanceEv, setMaintenanceEv] = useState<number>(1000);
  const [financeRepayment, setFinanceRepayment] = useState<number>(12000);
  const [upfrontCost, setUpfrontCost] = useState<number>(150000);
  
  const daysPerMonth = 26;
  const monthlyFuelCost = (dailyFuel * daysPerMonth) + maintenanceFuel;
  const monthlyEvCost = (dailyElectricity * daysPerMonth) + maintenanceEv + financeRepayment;
  const monthlySavings = monthlyFuelCost - monthlyEvCost;

  return (
    <Card className="border-border shadow-sm flex flex-col" data-testid="card-ev-calculator">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5 text-emerald-600" /> Cost Calculator</CardTitle>
        <CardDescription>Estimate monthly operational savings.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Current Daily Fuel (KES)</Label>
              <span className="font-bold text-sm">{dailyFuel.toLocaleString()}</span>
            </div>
            <Slider max={3000} step={50} value={[dailyFuel]} onValueChange={(v) => setDailyFuel(v[0])} data-testid="slider-fuel" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Expected Daily Electricity/Swap (KES)</Label>
              <span className="font-bold text-sm">{dailyElectricity.toLocaleString()}</span>
            </div>
            <Slider max={1000} step={20} value={[dailyElectricity]} onValueChange={(v) => setDailyElectricity(v[0])} data-testid="slider-electricity" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs">ICE Maint. /mo</Label>
              <Input type="number" value={maintenanceFuel} onChange={(e) => setMaintenanceFuel(Number(e.target.value))} className="h-8 text-sm" data-testid="input-maint-fuel" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">EV Maint. /mo</Label>
              <Input type="number" value={maintenanceEv} onChange={(e) => setMaintenanceEv(Number(e.target.value))} className="h-8 text-sm" data-testid="input-maint-ev" />
            </div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-xs">EV Finance Repayment /mo (if applicable)</Label>
            <Input type="number" value={financeRepayment} onChange={(e) => setFinanceRepayment(Number(e.target.value))} className="h-8 text-sm" data-testid="input-finance" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Upfront Cost / Deposit (KES)</Label>
            <Input type="number" value={upfrontCost} onChange={(e) => setUpfrontCost(Number(e.target.value))} className="h-8 text-sm" data-testid="input-upfront" />
          </div>
        </div>

        <div className="bg-muted p-4 rounded-xl border border-border mt-4">
          <div className="grid grid-cols-2 gap-4 text-center mb-4">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Current ICE</p>
              <p className="text-lg font-bold text-foreground">KES {monthlyFuelCost.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-1">Electric (EV)</p>
              <p className="text-lg font-bold text-emerald-600">KES {monthlyEvCost.toLocaleString()}</p>
            </div>
          </div>
          <div className={`p-3 rounded-lg text-center font-bold mb-2 ${monthlySavings > 0 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"}`}>
            Est. Monthly {monthlySavings > 0 ? "Savings" : "Loss"}: KES {Math.abs(monthlySavings).toLocaleString()}
          </div>
          {monthlySavings > 0 && upfrontCost > 0 && (
            <div className="text-center text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              Est. Break-Even on Upfront: {Math.ceil(upfrontCost / monthlySavings)} months
            </div>
          )}
          <p className="text-[10px] text-center text-muted-foreground mt-3">* All results are estimates assuming 26 working days/month. Actual costs depend on vehicle type and usage.</p>
        </div>
      </CardContent>
    </Card>
  );
}

function EvRecommender() {
  const [distance, setDistance] = useState("medium");
  const [useCase, setUseCase] = useState("passenger");
  const [charging, setCharging] = useState("swap");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [currentVehicle, setCurrentVehicle] = useState("");
  const [income, setIncome] = useState("");
  const [businessNeed, setBusinessNeed] = useState("");

  const getRecommendation = () => {
    if (useCase === "passenger" && distance === "low") return { type: "E-Boda", reason: "Perfect for short trips. Low upfront cost and quick swapping.", img: "/images/e-mobility-boda.png" };
    if (useCase === "passenger") return { type: "E-Boda / E-Matatu", reason: "For higher mileage passenger transit, E-Bodas with swap subscriptions or Depot-charged E-Matatus are ideal.", img: "/images/e-mobility-matatu.png" };
    if (useCase === "cargo") return { type: "E-TukTuk / Light Truck", reason: "High torque at low speeds makes electric 3-wheelers perfect for urban deliveries.", img: "/images/clean-business-market.png" };
    return { type: "E-Boda", reason: "The most versatile and accessible entry point to E-Mobility.", img: "/images/e-mobility-boda.png" };
  };

  const rec = getRecommendation();

  return (
    <Card className="border-border shadow-sm flex flex-col" data-testid="card-ev-recommender">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><HelpCircle className="w-5 h-5 text-emerald-600" /> Which EV is Right For Me?</CardTitle>
        <CardDescription>Answer a few questions to get a tailored recommendation.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label>Primary Use Case</Label>
              <RadioGroup defaultValue="passenger" value={useCase} onValueChange={setUseCase} className="flex gap-4" data-testid="radio-usecase">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="passenger" id="r-pass" />
                  <Label htmlFor="r-pass" className="font-normal cursor-pointer text-xs">Passenger Transit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cargo" id="r-cargo" />
                  <Label htmlFor="r-cargo" className="font-normal cursor-pointer text-xs">Goods / Cargo</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Daily Distance</Label>
              <Select value={distance} onValueChange={setDistance}>
                <SelectTrigger data-testid="select-distance" className="h-8 text-xs">
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Under 50 km</SelectItem>
                  <SelectItem value="medium">50 - 100 km</SelectItem>
                  <SelectItem value="high">Over 100 km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Charging Access</Label>
              <Select value={charging} onValueChange={setCharging}>
                <SelectTrigger data-testid="select-charging" className="h-8 text-xs">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="swap">Battery Swap</SelectItem>
                  <SelectItem value="home">Home / Depot</SelectItem>
                  <SelectItem value="fast">Fast Charging</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Location (County)</Label>
              <Input placeholder="e.g. Nairobi" value={location} onChange={e => setLocation(e.target.value)} className="h-8 text-xs" data-testid="input-location" />
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Current Vehicle</Label>
              <Input placeholder="e.g. Boxer 150" value={currentVehicle} onChange={e => setCurrentVehicle(e.target.value)} className="h-8 text-xs" data-testid="input-current-vehicle" />
            </div>
            
            <div className="space-y-1">
              <Label className="text-xs">Est. Daily Income (KES)</Label>
              <Input type="number" placeholder="e.g. 1500" value={income} onChange={e => setIncome(e.target.value)} className="h-8 text-xs" data-testid="input-income" />
            </div>
            
            <div className="space-y-1">
              <Label className="text-xs">Available Budget</Label>
              <Input type="number" placeholder="e.g. 15000" value={budget} onChange={e => setBudget(e.target.value)} className="h-8 text-xs" data-testid="input-budget" />
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900 mt-6 flex gap-4 items-center">
          <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-background">
            <img src={rec.img} alt={rec.type} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Recommended</p>
            <p className="text-lg font-black text-foreground mb-1">{rec.type}</p>
            <p className="text-xs text-muted-foreground leading-tight">{rec.reason}</p>
          </div>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-2">* Recommendation is deterministic and illustrative.</p>
      </CardContent>
    </Card>
  );
}

function BusinessWizard() {
  const [capital, setCapital] = useState("low");
  const [role, setRole] = useState("rider");
  const [county, setCounty] = useState("");
  const [idea, setIdea] = useState("");
  const [transportNeed, setTransportNeed] = useState("");

  const getPathway = () => {
    if (role === "investor" && capital === "high") return { title: "Swap Station Franchise / Fleet Owner", text: "Invest in battery swap infrastructure or purchase a fleet of 5+ E-Bodas to lease to verified riders.", reqs: ["Business Reg", "High Capital", "Commercial Space"] };
    if (role === "mechanic") return { title: "Specialized EV Technician", text: "Upskill to service EVs. Open a certified repair center for controllers, motors, and brakes.", reqs: ["Technical Cert", "Tools", "BNAK Training"] };
    return { title: "Independent EV Operator", text: "Acquire an E-Boda via asset finance. Operate on ride-hailing apps or establish local clientele.", reqs: ["Valid License", "Deposit", "Guarantor"] };
  };

  const path = getPathway();

  return (
    <Card className="border-border shadow-sm" data-testid="card-business-wizard">
      <CardHeader className="bg-muted/30 border-b">
        <CardTitle className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-emerald-600" /> Start an E-Mobility Business</CardTitle>
        <CardDescription>Find your place in the value chain.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 grid md:grid-cols-2">
        <div className="p-6 md:p-8 space-y-6 md:border-r border-border">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3 col-span-2">
              <Label>I want to be a...</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger data-testid="select-biz-role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rider">Rider / Driver</SelectItem>
                  <SelectItem value="investor">Investor / Fleet Owner</SelectItem>
                  <SelectItem value="mechanic">Mechanic / Technician</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <Label>Starting Capital</Label>
              <Select value={capital} onValueChange={setCapital}>
                <SelectTrigger data-testid="select-biz-capital">
                  <SelectValue placeholder="Select capital" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Under KES 30k</SelectItem>
                  <SelectItem value="medium">KES 50k - 200k</SelectItem>
                  <SelectItem value="high">Over KES 500k</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <Label>County</Label>
              <Input placeholder="e.g. Mombasa" value={county} onChange={e => setCounty(e.target.value)} data-testid="input-biz-county" />
            </div>

            <div className="space-y-3 col-span-2">
              <Label>Brief Idea / Need</Label>
              <Input placeholder="e.g. Delivery for my hardware store" value={idea} onChange={e => setIdea(e.target.value)} data-testid="input-biz-idea" />
            </div>
            
            <div className="space-y-3 col-span-2">
              <Label>Daily Transport Need (km)</Label>
              <Input type="number" placeholder="e.g. 80" value={transportNeed} onChange={e => setTransportNeed(e.target.value)} data-testid="input-biz-transport" />
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-card flex flex-col justify-center">
          <div className="mb-4">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-3">Suggested Pathway</Badge>
            <h4 className="text-xl font-black mb-2">{path.title}</h4>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{path.text}</p>
            
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Indicative Requirements:</p>
              <div className="flex flex-wrap gap-2">
                {path.reqs.map(r => (
                  <Badge key={r} variant="outline" className="text-xs bg-background">{r}</Badge>
                ))}
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 font-bold" data-testid="button-biz-pathway">
            Explore this Pathway
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
