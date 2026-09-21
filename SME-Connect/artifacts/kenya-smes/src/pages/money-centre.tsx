import { useState } from "react";
import { Calculator, Percent, Tag, Coins, Scale, TrendingUp, PiggyBank, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MoneyCentre() {
  // Margin Calculator State
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  // Loan Repayment State
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [months, setMonths] = useState("");

  // Break-even State
  const [fixedCosts, setFixedCosts] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState("");

  // Savings Target State
  const [targetAmount, setTargetAmount] = useState("");
  const [targetMonths, setTargetMonths] = useState("");

  // Helpers
  const n = (val: string) => Number(val) || 0;
  const fmt = (num: number) => Math.max(0, num).toLocaleString(undefined, { maximumFractionDigits: 2 });

  // Margin Calcs
  const profit = n(sellingPrice) - n(costPrice);
  const margin = n(sellingPrice) > 0 ? (profit / n(sellingPrice)) * 100 : 0;
  const markup = n(costPrice) > 0 ? (profit / n(costPrice)) * 100 : 0;

  // Loan Calcs (Simple flat interest for informal sector ease, standard for many local lenders)
  const totalInterest = (n(loanAmount) * n(interestRate) * n(months)) / 100 / 12;
  const totalRepayment = n(loanAmount) + totalInterest;
  const monthlyRepayment = n(months) > 0 ? totalRepayment / n(months) : 0;

  // Break-even Calcs
  const contributionMargin = n(pricePerUnit) - n(variableCostPerUnit);
  const breakEvenUnits = contributionMargin > 0 ? n(fixedCosts) / contributionMargin : 0;

  // Savings Calcs
  const monthlySavings = n(targetMonths) > 0 ? n(targetAmount) / n(targetMonths) : 0;
  const dailySavings = monthlySavings / 30;

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <section className="bg-foreground text-background py-12 md:py-16 flag-border-bottom relative overflow-hidden">
        <div className="absolute inset-0 soft-grid opacity-10" />
        <div className="app-shell relative z-10">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-0 font-semibold mb-4" data-testid="badge-money-centre">
            FINANCIAL TOOLS
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            Money Centre
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Quick, reliable calculators designed for Kenyan small businesses. Check your margins, plan a loan, or set a savings target.
          </p>
        </div>
      </section>

      <section className="app-shell py-8 md:py-12 max-w-5xl mx-auto">
        
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 mb-8 text-sm flex gap-3">
          <Scale className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            <strong>Educational Note:</strong> These calculators provide estimates for planning purposes. They do not account for compound interest variations, KRA taxes, or hidden fees. Always verify final figures with your lender or accountant.
          </p>
        </div>

        <Tabs defaultValue="margin" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto gap-2 bg-transparent p-0 mb-8" data-testid="tabs-money-centre">
            <TabsTrigger value="margin" className="data-[state=active]:bg-card data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-border py-3 rounded-xl flex items-center gap-2">
              <Percent className="w-4 h-4" /> Margins
            </TabsTrigger>
            <TabsTrigger value="loan" className="data-[state=active]:bg-card data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-border py-3 rounded-xl flex items-center gap-2">
              <Coins className="w-4 h-4" /> Loan Planner
            </TabsTrigger>
            <TabsTrigger value="breakeven" className="data-[state=active]:bg-card data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-border py-3 rounded-xl flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Break-even
            </TabsTrigger>
            <TabsTrigger value="savings" className="data-[state=active]:bg-card data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-border py-3 rounded-xl flex items-center gap-2">
              <PiggyBank className="w-4 h-4" /> Savings Target
            </TabsTrigger>
          </TabsList>

          <TabsContent value="margin" className="mt-0 focus-visible:outline-none">
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="flex items-center gap-2 text-xl"><Percent className="w-5 h-5 text-emerald-600" /> Profit Margin & Markup</CardTitle>
                <CardDescription>Know exactly how much profit is in your selling price.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Cost Price (KSh)</label>
                      <Input type="number" placeholder="What you paid..." value={costPrice} onChange={(e) => setCostPrice(e.target.value)} data-testid="input-cost-price" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Selling Price (KSh)</label>
                      <Input type="number" placeholder="What you sell it for..." value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} data-testid="input-selling-price" />
                    </div>
                  </div>
                  <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex flex-col justify-center">
                    <p className="text-sm text-emerald-800 font-bold uppercase tracking-wider mb-2">Results</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-emerald-600 font-medium">Gross Profit</p>
                        <p className="text-3xl font-black text-emerald-900" data-testid="result-profit">KSh {fmt(profit)}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-t border-emerald-200 pt-4">
                        <div>
                          <p className="text-xs text-emerald-600 font-medium">Margin</p>
                          <p className="text-xl font-bold text-emerald-800" data-testid="result-margin">{fmt(margin)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-emerald-600 font-medium">Markup</p>
                          <p className="text-xl font-bold text-emerald-800" data-testid="result-markup">{fmt(markup)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loan" className="mt-0 focus-visible:outline-none">
             <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="flex items-center gap-2 text-xl"><Coins className="w-5 h-5 text-blue-600" /> Simple Loan Planner</CardTitle>
                <CardDescription>Estimate flat-rate interest and monthly repayments.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Loan Amount (KSh)</label>
                      <Input type="number" placeholder="e.g. 50000" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} data-testid="input-loan-amount" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Annual Interest Rate (%)</label>
                      <Input type="number" placeholder="e.g. 14" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} data-testid="input-interest-rate" />
                    </div>
                     <div className="space-y-2">
                      <label className="text-sm font-bold">Duration (Months)</label>
                      <Input type="number" placeholder="e.g. 12" value={months} onChange={(e) => setMonths(e.target.value)} data-testid="input-loan-months" />
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex flex-col justify-center">
                    <p className="text-sm text-blue-800 font-bold uppercase tracking-wider mb-2">Estimated Payments</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Monthly Repayment</p>
                        <p className="text-3xl font-black text-blue-900" data-testid="result-monthly-repayment">KSh {fmt(monthlyRepayment)}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-t border-blue-200 pt-4">
                        <div>
                          <p className="text-xs text-blue-600 font-medium">Total Interest</p>
                          <p className="text-lg font-bold text-blue-800" data-testid="result-total-interest">KSh {fmt(totalInterest)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-600 font-medium">Total to Repay</p>
                          <p className="text-lg font-bold text-blue-800" data-testid="result-total-repayment">KSh {fmt(totalRepayment)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakeven" className="mt-0 focus-visible:outline-none">
             <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="flex items-center gap-2 text-xl"><TrendingUp className="w-5 h-5 text-amber-600" /> Break-even Calculator</CardTitle>
                <CardDescription>Find out how many units you need to sell to cover your costs.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Total Fixed Costs (KSh)</label>
                      <p className="text-xs text-muted-foreground">Rent, salaries, licenses — costs that don't change.</p>
                      <Input type="number" placeholder="e.g. 20000" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} data-testid="input-fixed-costs" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Selling Price Per Unit (KSh)</label>
                      <Input type="number" placeholder="e.g. 1500" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} data-testid="input-price-per-unit" />
                    </div>
                     <div className="space-y-2">
                      <label className="text-sm font-bold">Variable Cost Per Unit (KSh)</label>
                       <p className="text-xs text-muted-foreground">Stock cost, packaging per item.</p>
                      <Input type="number" placeholder="e.g. 800" value={variableCostPerUnit} onChange={(e) => setVariableCostPerUnit(e.target.value)} data-testid="input-variable-cost" />
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex flex-col justify-center">
                    <p className="text-sm text-amber-800 font-bold uppercase tracking-wider mb-2">Sales Target</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-amber-600 font-medium">To Break Even You Must Sell</p>
                        <p className="text-3xl font-black text-amber-900" data-testid="result-breakeven-units">{Math.ceil(breakEvenUnits)} <span className="text-xl font-bold">units</span></p>
                        <p className="text-xs text-amber-700 mt-2">Revenue needed: KSh {fmt(Math.ceil(breakEvenUnits) * n(pricePerUnit))}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

           <TabsContent value="savings" className="mt-0 focus-visible:outline-none">
             <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="flex items-center gap-2 text-xl"><PiggyBank className="w-5 h-5 text-purple-600" /> Savings Target</CardTitle>
                <CardDescription>Plan for an expansion, new stock, or an emergency fund.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Target Amount (KSh)</label>
                      <Input type="number" placeholder="e.g. 100000" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} data-testid="input-target-amount" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Timeframe (Months)</label>
                      <Input type="number" placeholder="e.g. 6" value={targetMonths} onChange={(e) => setTargetMonths(e.target.value)} data-testid="input-target-months" />
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 flex flex-col justify-center">
                    <p className="text-sm text-purple-800 font-bold uppercase tracking-wider mb-2">Required Savings</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-purple-600 font-medium">Monthly Target</p>
                        <p className="text-3xl font-black text-purple-900" data-testid="result-monthly-savings">KSh {fmt(monthlySavings)}</p>
                      </div>
                      <div className="border-t border-purple-200 pt-4">
                        <p className="text-xs text-purple-600 font-medium">Daily Target (Approx)</p>
                        <p className="text-xl font-bold text-purple-800" data-testid="result-daily-savings">KSh {fmt(dailySavings)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </section>
    </div>
  );
}