import { useMemo, useState } from "react";
import React from "react";
import { 
  BadgeCheck, ChevronDown, MapPin, MessageCircle, PackageCheck, 
  Search, SlidersHorizontal, Store, X, Zap, ShieldCheck, CheckCircle2, 
  Phone, Info
} from "lucide-react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMarketplaceSellerApplication, useGetVerificationChallenge, useListMarketplacePackages } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const listings = [
  { id: "produce-basket", title: "Fresh Farm Produce Basket", seller: "Mama Njeri Fresh Foods", category: "Food & Grocery", county: "Kiambu", price: "KSh 1,500", image: "/images/hero-agribusiness.png", unit: "per basket", availability: "Ready this week", summary: "Seasonal vegetables, fruit and pantry staples packed for homes and small restaurants." },
  { id: "mitumba-bales", title: "Quality Mitumba Bales", seller: "Pamoja Fashion Traders", category: "Clothing & Fashion", county: "Nairobi", price: "KSh 18,000", image: "/images/hero-textile.png", unit: "per bale", availability: "Wholesale", summary: "Curated bale options for resellers, boutiques and market traders." },
  { id: "solar-kit", title: "Solar Phone Charging Kit", seller: "Mwangaza Digital Shop", category: "Electronics", county: "Kisumu", price: "KSh 4,500", image: "/images/hero-tech.png", unit: "per kit", availability: "In stock", summary: "A practical charging setup for shops, agents and off-grid customers." },
  { id: "beaded-baskets", title: "Handmade Beaded Baskets", seller: "Soko Creative Collective", category: "Crafts & Gifts", county: "Kajiado", price: "From KSh 800", image: "/images/hero-artisanal.png", unit: "per piece", availability: "Made to order", summary: "Hand-finished baskets for gifting, interiors, retail and corporate orders." },
  { id: "gas-accessories", title: "Wholesale Cooking Gas Accessories", seller: "Safe Gas Suppliers", category: "Fuel & Energy", county: "Mombasa", price: "KSh 2,200", image: "/images/hero-manufacturing.png", unit: "from", availability: "Wholesale", summary: "Reliable accessories for households, retailers and hospitality businesses." },
  { id: "cleaning-team", title: "Office & Home Cleaning Service", seller: "Jirani Clean Team", category: "Services", county: "Nakuru", price: "Request quote", image: "/images/hero-retail.png", unit: "per visit", availability: "Booking open", summary: "Scheduled cleaning support for offices, homes, shops and shared spaces." },
];

const phoneRegex = /^(?:\+254|0)7\d{8}$/;
const phoneMessage = "Use a valid Kenyan number (e.g. 0711422163)";

const formSchema = z.object({
  membershipNumber: z.string().trim().min(3, "Membership number is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().regex(phoneRegex, phoneMessage),
  packageName: z.enum(["Starter", "Growth", "Pro", "B2B", "Enterprise"], {
    required_error: "Please select a package",
  }),
  mpesaNumber: z.string().trim().regex(phoneRegex, phoneMessage),
  businessSummary: z.string().trim().min(20, "Business summary must be at least 20 characters").max(1000, "Too long"),
  verificationAnswer: z.string().trim().min(1, "Please answer the security question"),
  website: z.string().trim().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Marketplace() {
  const { toast } = useToast();
  
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [county, setCounty] = useState("All counties");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const categories = ["All", ...Array.from(new Set(listings.map((item) => item.category)))];
  const counties = ["All counties", ...Array.from(new Set(listings.map((item) => item.county)))];
  
  const filtered = useMemo(() => listings.filter((item) => {
    const matchesQuery = `${item.title} ${item.seller} ${item.county} ${item.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === "All" || item.category === category) && (county === "All counties" || item.county === county);
  }), [query, category, county]);

  const clearFilters = () => { setQuery(""); setCategory("All"); setCounty("All counties"); };

  // Seller Application State
  const [step, setStep] = useState(1);
  const [formStartedAt] = useState<number>(Date.now());
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: challenge, isLoading: challengeLoading } = useGetVerificationChallenge();
  const { data: packages, isLoading: packagesLoading } = useListMarketplacePackages();
  const createApplication = useCreateMarketplaceSellerApplication();
  
  const stepRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      membershipNumber: "",
      email: "",
      phone: "",
      packageName: undefined,
      mpesaNumber: "",
      businessSummary: "",
      verificationAnswer: "",
      website: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    if (!challenge) {
      toast({
        title: "Security Check Failed",
        description: "Could not load verification challenge. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }

    createApplication.mutate(
      {
        data: {
          membershipNumber: values.membershipNumber,
          email: values.email,
          phone: values.phone,
          packageName: values.packageName,
          mpesaNumber: values.mpesaNumber,
          businessSummary: values.businessSummary,
          verificationToken: challenge.token,
          verificationAnswer: values.verificationAnswer,
          formStartedAt,
          website: values.website,
        },
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          window.scrollTo(0, 0);
        },
        onError: (error: any) => {
          toast({
            title: "Application Failed",
            description: error.message || "Please check your eligibility or inputs and try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const selectedPackageName = form.watch("packageName");
  const selectedPackage = packages?.find(p => p.name === selectedPackageName);

  const scrollToStep = () => {
    setTimeout(() => {
      if (stepRef.current) {
        const y = stepRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await form.trigger(["membershipNumber", "email", "phone"]);
    } else if (step === 2) {
      isValid = await form.trigger(["packageName", "businessSummary", "mpesaNumber"]);
    }
    
    if (isValid) {
      setStep((s) => s + 1);
      scrollToStep();
    } else {
      toast({ title: "Incomplete section", description: "Please complete all fields before continuing.", variant: "destructive" });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      scrollToStep();
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-20 lg:pb-0">
      <section className="bg-foreground text-background">
        <div className="app-shell py-12 md:py-20">
          <div className="max-w-4xl">
            <Badge className="mb-5 border-0 bg-accent text-accent-foreground font-bold tracking-widest uppercase" data-testid="badge-soko">BNAK SOKO</Badge>
            <h1 className="text-balance text-5xl font-bold leading-[.95] md:text-7xl">The trusted marketplace.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/80">
              Discover products and services from Kenyan SMEs. Live seller listings will appear only after membership, package and listing review.
            </p>
          </div>
        </div>
      </section>

      <section className="app-shell py-8 md:py-12">
        <Tabs defaultValue="shop" className="w-full" data-testid="tabs-soko">
          <div className="flex justify-center mb-8 w-full sticky top-[72px] z-40 bg-muted/20 backdrop-blur-md py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="flex h-auto w-full max-w-md gap-1 border border-border/50 bg-background shadow-sm p-1.5 rounded-full overflow-x-auto overflow-y-hidden">
              <TabsTrigger value="shop" className="flex-1 whitespace-nowrap text-xs font-bold py-2.5 px-3 rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background" data-testid="tab-shop">Shop</TabsTrigger>
              <TabsTrigger value="sell" className="flex-1 whitespace-nowrap text-xs font-bold py-2.5 px-3 rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background" data-testid="tab-sell">Sell</TabsTrigger>
              <TabsTrigger value="packages" className="flex-1 whitespace-nowrap text-xs font-bold py-2.5 px-3 rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background" data-testid="tab-packages">Packages</TabsTrigger>
              <TabsTrigger value="safety" className="flex-1 whitespace-nowrap text-xs font-bold py-2.5 px-3 rounded-full data-[state=active]:bg-foreground data-[state=active]:text-background" data-testid="tab-safety">Safety</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="shop" className="space-y-8 animate-in fade-in duration-500">
            <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm md:p-5">
              <div className="flex flex-col gap-3 lg:flex-row">
                <label className="relative flex-1">
                  <span className="sr-only">Search Soko</span>
                  <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, services, sellers or counties" className="h-11 border-border bg-background pl-11" data-testid="input-soko-search" />
                </label>
                <Button type="button" variant="outline" className="justify-between lg:hidden" onClick={() => setFiltersOpen((current) => !current)} data-testid="button-soko-filters">
                  <span className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" /> Filters</span>
                  {filtersOpen ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <div className={`${filtersOpen ? "grid" : "hidden"} gap-3 sm:grid-cols-2 lg:flex lg:flex-1`}>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-11 bg-background lg:w-44" data-testid="select-soko-category">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={county} onValueChange={setCounty}>
                    <SelectTrigger className="h-11 bg-background lg:w-44" data-testid="select-soko-county">
                      <SelectValue placeholder="County" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <p className="text-muted-foreground" data-testid="text-soko-result-count">{filtered.length} listings shown</p>
                <button type="button" onClick={clearFilters} className="font-bold text-primary hover:underline" data-testid="button-soko-clear">Clear filters</button>
              </div>
            </div>
            
            <div className="mb-6">
              <Badge variant="outline" className="mb-3 border-amber-200 bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">Demo Content</Badge>
              <h2 className="text-2xl font-bold md:text-3xl">Starter Listings</h2>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground mt-2">These are demonstrative listings. Confirm details directly with the seller.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <Card key={item.id} className="group flex h-full flex-col overflow-hidden border-card-border bg-card transition-transform hover:-translate-y-1 hover:shadow-lg" data-testid={`card-listing-${item.id}`}>
                  <div className="relative h-52 overflow-hidden bg-muted">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
                      <Badge className="border-0 bg-background/90 text-foreground">{item.category}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-xl leading-tight">{item.title}</CardTitle>
                      <span className="whitespace-nowrap text-right text-sm font-bold text-primary">{item.price}<span className="block text-[10px] font-medium text-muted-foreground">{item.unit}</span></span>
                    </div>
                    <p className="pt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3">
                    <div className="flex items-center justify-between gap-3 rounded-xl bg-secondary/5 p-3 text-sm">
                      <span className="font-bold flex items-center gap-2"><Store className="h-4 w-4 text-muted-foreground" /> {item.seller}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {item.county}, Kenya</span>
                      <span className="flex items-center gap-1.5"><PackageCheck className="h-4 w-4 text-secondary" /> {item.availability}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline" asChild data-testid={`button-enquire-${item.id}`}>
                      <a href={`https://wa.me/254711422163?text=${encodeURIComponent(`Hello BNAK, I am interested in ${item.title} from ${item.seller}.`)}`} target="_blank" rel="noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" /> Enquire on WhatsApp
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filtered.length === 0 && (
              <div className="rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-20 text-center" data-testid="empty-soko">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold">No listings match those filters.</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">Try a broader search.</p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="outline" onClick={clearFilters} data-testid="button-soko-empty-clear">Clear filters</Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sell" className="space-y-8 animate-in fade-in duration-500 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Sell on Soko</h2>
              <p className="text-muted-foreground text-lg">
                Reach thousands of buyers across the BNAK network. Soko is an exclusive marketplace requiring an active BNAK membership.
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl p-5 mb-8 flex gap-3 text-sm">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-amber-800 dark:text-amber-200 leading-relaxed">
                <strong>Important:</strong> BNAK membership is required for eligibility, but Soko is a separate paid service. Your Soko subscription pays for platform listing, promotion, and seller tools. Membership and Soko billing remain separate.
              </div>
            </div>

            {isSuccess ? (
              <Card className="border-border overflow-hidden shadow-lg border-t-4 border-t-primary" data-testid="card-seller-success">
                <CardHeader className="text-center pb-8 pt-10">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-black mb-2">Application Received</CardTitle>
                  <CardDescription className="text-base text-foreground">
                    Your Soko seller application is pending review.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 max-w-md mx-auto">
                  <div className="bg-muted/50 rounded-xl p-5 border shadow-sm space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground text-sm font-medium">Application Status</span>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 border-amber-200" data-testid="badge-seller-status">Pending Review</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm font-medium">Payment Status</span>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 border-amber-200" data-testid="badge-seller-payment">Pending Verification</Badge>
                    </div>
                  </div>
                  <div className="text-sm text-center text-muted-foreground leading-relaxed">
                    No listing is published and no package is active until we verify your membership and confirm provider payment. We will contact you shortly.
                  </div>
                </CardContent>
                <CardFooter className="pt-6 pb-10 flex justify-center">
                  <Button variant="outline" onClick={() => setIsSuccess(false)} data-testid="button-seller-new">Submit Another</Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="border-border shadow-md" data-testid="card-seller-form" ref={stepRef}>
                <CardHeader className="bg-muted/30 border-b pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-foreground/60 mb-2">Step {step} of 3</p>
                      <CardTitle className="text-2xl font-bold flex items-center gap-2"><Store className="w-5 h-5 text-primary" /> {["Membership Match", "Package & Details", "Review & Submit"][step - 1]}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        Only active BNAK members can apply. Non-matches will be rejected.
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((item) => (
                        <span key={item} className={`h-2 w-10 rounded-full transition-colors ${item <= step ? "bg-primary" : "bg-primary/20"}`} data-testid={`progress-soko-${item}`} />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" data-testid="form-soko-seller" onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
                      {/* Honeypot */}
                      <div className="hidden" aria-hidden="true">
                        <FormField control={form.control} name="website" render={({ field }) => (
                          <FormItem><FormControl><Input {...field} tabIndex={-1} autoComplete="off" /></FormControl></FormItem>
                        )} />
                      </div>

                      {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="membershipNumber" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold">BNAK Membership Number</FormLabel>
                                <FormControl><Input placeholder="BN-XXXX-XXXX" {...field} data-testid="input-seller-membership" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold">Membership Email</FormLabel>
                                <FormControl><Input type="email" placeholder="registered@example.com" {...field} data-testid="input-seller-email" /></FormControl>
                                <FormDescription className="text-xs">Contact verification will be enabled when a delivery provider is connected.</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold">Membership Phone</FormLabel>
                                <FormControl><Input placeholder="07XX XXX XXX" {...field} data-testid="input-seller-phone" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <FormField control={form.control} name="packageName" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold">Select Soko Package</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-seller-package">
                                    <SelectValue placeholder="Choose a package" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {packagesLoading ? (
                                    <SelectItem value="loading" disabled>Loading packages...</SelectItem>
                                  ) : (
                                    packages?.map((pkg) => (
                                      <SelectItem key={pkg.name} value={pkg.name}>
                                        {pkg.name} - KSh {pkg.monthlyFee >= 5000 ? "5,000+" : pkg.monthlyFee.toLocaleString()}/month
                                      </SelectItem>
                                    ))
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )} />

                          <FormField control={form.control} name="businessSummary" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold">Business Summary (What will you sell?)</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Describe your main products or services..." className="min-h-24 resize-none" {...field} data-testid="input-seller-summary" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />

                          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-6 space-y-6">
                            <div className="flex gap-3">
                              <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                              <div>
                                <h3 className="font-bold text-lg text-primary mb-1">M-Pesa Payment Verification</h3>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                  Provide the M-Pesa number you will use to pay for the {selectedPackageName || "selected"} package{selectedPackage ? ` (KSh ${selectedPackage.monthlyFee >= 5000 ? "5,000+" : selectedPackage.monthlyFee.toLocaleString()})` : ""}.
                                </p>
                              </div>
                            </div>
                            <FormField control={form.control} name="mpesaNumber" render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center justify-between">
                                  <FormLabel className="font-semibold">M-Pesa Number for Payment</FormLabel>
                                  {form.getValues("phone") && (
                                    <button type="button" onClick={() => form.setValue("mpesaNumber", form.getValues("phone"), { shouldValidate: true })} className="text-xs font-bold text-primary hover:underline" data-testid="button-seller-use-contact">
                                      Use contact number
                                    </button>
                                  )}
                                </div>
                                <FormControl>
                                  <Input placeholder="07XX XXX XXX" className="bg-white dark:bg-black max-w-sm" {...field} data-testid="input-seller-mpesa" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          {selectedPackage && (
                            <div className="bg-muted/50 rounded-xl p-6 mb-6 text-center space-y-2 border">
                              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Selected Package</p>
                              <p className="text-2xl font-black">{selectedPackage.name}</p>
                              <p className="text-primary font-bold">KSh {selectedPackage.monthlyFee.toLocaleString()} / month</p>
                            </div>
                          )}

                          <div className="bg-muted/40 border rounded-xl p-6">
                            <div className="flex gap-3 mb-4">
                              <ShieldCheck className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                              <div>
                                <h3 className="font-semibold text-sm mb-1">Anti-Bot Check</h3>
                              </div>
                            </div>
                            {challengeLoading ? (
                              <div className="text-sm text-muted-foreground">Loading challenge...</div>
                            ) : challenge ? (
                              <FormField control={form.control} name="verificationAnswer" render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">{challenge.question}</FormLabel>
                                  <FormControl><Input placeholder="Your answer" className="max-w-sm" {...field} data-testid="input-seller-verification" /></FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} />
                            ) : (
                              <div className="text-sm text-destructive">Failed to load challenge.</div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between border-t pt-6 mt-8">
                        {step > 1 ? (
                          <Button type="button" variant="outline" onClick={prevStep} data-testid="button-seller-back">
                            Back
                          </Button>
                        ) : <span />}
                        
                        {step < 3 ? (
                          <Button type="button" onClick={nextStep} data-testid="button-seller-continue">
                            Continue
                          </Button>
                        ) : (
                          <Button type="submit" disabled={createApplication.isPending || !challenge} data-testid="button-submit-seller">
                            {createApplication.isPending ? "Submitting Application..." : "Submit Application"}
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="packages" className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Soko Subscriptions</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Choose the right package to promote your products. BNAK membership provides eligibility; Soko subscriptions provide the platform.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packagesLoading ? (
                <div className="col-span-full py-20 text-center text-muted-foreground">Loading packages...</div>
              ) : packages?.map((pkg) => (
                <Card key={pkg.name} className={`flex flex-col border-border shadow-sm ${pkg.name === "Growth" ? "border-primary/50 shadow-primary/10 relative" : ""}`} data-testid={`card-package-${pkg.name}`}>
                  {pkg.name === "Growth" && (
                    <div className="absolute top-0 inset-x-0 -translate-y-1/2 flex justify-center">
                      <Badge className="bg-primary text-primary-foreground font-bold tracking-wider uppercase text-[10px]">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4 pt-8">
                    <CardTitle className="text-xl font-bold mb-2">{pkg.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-sm font-semibold text-muted-foreground">KSh</span>
                      <span className="text-4xl font-black">{pkg.monthlyFee >= 5000 ? "5,000+" : pkg.monthlyFee.toLocaleString()}</span>
                      <span className="text-sm font-medium text-muted-foreground">/mo</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 text-center text-sm text-muted-foreground leading-relaxed pt-2 px-6">
                    {pkg.description}
                  </CardContent>
                  <CardFooter className="pt-4 pb-6">
                    <Button variant={pkg.name === "Growth" ? "default" : "outline"} className="w-full font-bold" onClick={() => {
                      const tabs = document.querySelector('[data-testid="tab-sell"]') as HTMLButtonElement;
                      tabs?.click();
                      form.setValue("packageName", pkg.name as any);
                    }} data-testid={`button-select-package-${pkg.name}`}>
                      Apply for {pkg.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="safety" className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
             <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Soko Safety & Trust</h2>
              <p className="text-muted-foreground text-lg">
                BNAK trust screening reduces risk, but it does not eliminate it entirely. Stay vigilant.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-border bg-card shadow-sm" data-testid="card-safety-buyer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl text-primary"><ShieldCheck className="w-5 h-5" /> Buyer Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed"><strong className="text-foreground block">Do not pay in advance.</strong> Confirm the seller, inspect the order, or use cash-on-delivery until trust is established.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed"><strong className="text-foreground block">Use documented communication.</strong> Keep communication on WhatsApp or email for a clear record.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed"><strong className="text-foreground block">Never share PIN/OTP.</strong> Legitimate sellers will never ask for your passwords or verification codes.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed"><strong className="text-foreground block">Confirm delivery/returns.</strong> Agree on delivery terms and return policies before completing the purchase.</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border bg-card shadow-sm" data-testid="card-safety-seller">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl text-primary"><Store className="w-5 h-5" /> Seller Safeguards</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed"><strong className="text-foreground block">Membership Match.</strong> We verify sellers against active BNAK membership databases.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed"><strong className="text-foreground block">Payment-Provider Verification.</strong> A subscription remains inactive until a provider-confirmed payment matches the seller application.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed"><strong className="text-foreground block">Prohibited Listings Check.</strong> All items undergo manual review for prohibited or scam content.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed"><strong className="text-foreground block">Provider Identity Display.</strong> Verified identity labels will be rolled out in future platform updates.</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/40 rounded-xl p-8 border text-center mt-10" data-testid="box-report-suspicious">
              <h3 className="font-bold text-lg mb-3">Report Suspicious Activity</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                If you encounter a suspicious listing, scam attempt, or abusive behavior, contact BNAK support immediately.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild data-testid="button-safety-call">
                  <a href="tel:+254711422163"><Phone className="w-4 h-4 mr-2" /> Call 0711422163</a>
                </Button>
                <Button variant="outline" asChild data-testid="button-safety-whatsapp">
                  <a href="https://wa.me/254711422163" target="_blank" rel="noreferrer"><MessageCircle className="w-4 h-4 mr-2" /> WhatsApp 0711422163</a>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}