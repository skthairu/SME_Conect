import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, HeartHandshake, House, Menu, MessageCircle, PhoneCall, Store, UserPlus, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/soko", label: "Soko" },
    { href: "/business-hub", label: "Business Hub" },
    { href: "/e-mobility", label: "E-Mobility" },
    { href: "/services", label: "Services" },
    { href: "/programs", label: "Programmes" },
    { href: "/contact", label: "Contact" },
    { href: "/donate", label: "Donate" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70" data-testid="navigation-main">
      <div className="app-shell">
        <div className="flex min-h-18 items-center justify-between gap-6 py-3">
          <div className="flex shrink-0 items-center gap-2">
            <Link href="/" className="flex items-center gap-2" data-testid="link-nav-home">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-base font-black leading-none text-primary-foreground shadow-sm">
                BN
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-bold tracking-tight text-foreground">BNAK</span>
                <span className="text-[10px] font-medium leading-none tracking-wide text-muted-foreground">Biashara Ndogo Association of Kenya</span>
              </div>
              <span className="font-black text-base tracking-tight text-foreground sm:hidden">BNAK</span>
            </Link>
          </div>

          <div className="hidden min-w-0 items-center gap-3 lg:flex">
            <div className="flex items-center gap-1 rounded-full border border-border/70 bg-card/60 p-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`rounded-full px-2.5 py-2 text-sm font-semibold transition-colors hover:text-primary ${
                    location === link.href ? "bg-foreground text-background shadow-sm" : link.href === "/donate" ? "text-primary bg-primary/5 hover:bg-primary/10" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="hidden font-semibold border-primary text-primary hover:bg-primary hover:text-white 2xl:inline-flex" data-testid="button-nav-coordinator">
                <Link href="/coordinators">Be a Coordinator</Link>
              </Button>
              <Button asChild variant="default" className="font-semibold shadow-sm" data-testid="button-nav-join">
                <Link href="/membership">Join BNAK</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-nav-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t bg-background lg:hidden" data-testid="mobile-navigation">
          <div className="app-shell space-y-2 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`block rounded-xl px-3 py-3 text-base font-semibold ${
                  location === link.href ? "bg-foreground text-background" : "text-muted-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t space-y-2">
              <div className="py-2 text-sm text-center">
                <p className="font-semibold text-foreground mb-2">Reach BNAK directly</p>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <a href="tel:+254711422163" className="flex items-center gap-2 font-bold text-secondary" data-testid="link-mobile-call"><PhoneCall className="h-4 w-4" /> Call 0711422163</a>
                  <a href="https://wa.me/254711422163" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-secondary" data-testid="link-mobile-whatsapp"><MessageCircle className="h-4 w-4" /> WhatsApp 0711422163</a>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full justify-center border-primary text-primary" data-testid="button-mobile-coordinator">
                <Link href="/coordinators" onClick={() => setIsMobileMenuOpen(false)}>
                  Be a Coordinator
                </Link>
              </Button>
              <Button asChild variant="default" className="w-full justify-center" data-testid="button-mobile-join">
                <Link href="/membership" onClick={() => setIsMobileMenuOpen(false)}>
                  Join BNAK
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-border/80 bg-background/95 px-2 pb-[max(.45rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_36px_rgba(16,35,27,0.12)] backdrop-blur-xl lg:hidden" data-testid="navigation-mobile-dock">
        <div className="mx-auto grid max-w-md grid-cols-5">
          {[
            { href: "/", label: "Home", icon: House },
            { href: "/soko", label: "Soko", icon: Store },
            { href: "/business-hub", label: "Hub", icon: BriefcaseBusiness },
            { href: "/donate", label: "Donate", icon: HeartHandshake },
            { href: "/membership", label: "Join", icon: UserPlus },
          ].map((item) => {
            const Icon = item.icon;
            const active = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold transition-colors ${active ? "bg-foreground text-background" : "text-muted-foreground"}`}
                data-testid={`link-mobile-dock-${item.label.toLowerCase()}`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
