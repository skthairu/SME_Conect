import { Link } from "wouter";
import { ArrowUpRight, MessageCircle, PhoneCall } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 border-t bg-foreground py-16 text-background">
      <div className="app-shell">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2" data-testid="link-footer-home">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-black text-sm">
                BN
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-black text-base text-white">BNAK</span>
                <span className="text-[10px] text-white/60 font-medium leading-none">Biashara Ndogo Association of Kenya</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              The national voice for the entrepreneurs, traders and enterprises that keep Kenya moving. We represent millions of mSMEs across Kenya.
            </p>
            <p className="text-xs font-semibold text-primary italic">"Pamoja, Biashara Yetu, Maisha Yetu"</p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
             <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-about">About BNAK</Link></li>
               <li><Link href="/services" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-services">Services</Link></li>
               <li><Link href="/gallery" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-gallery">Gallery</Link></li>
               <li><Link href="/sectors" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-sectors">SME Sectors</Link></li>
               <li><Link href="/programs" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-programs">BNAK Programmes</Link></li>
               <li><Link href="/partners" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-partners">Partners</Link></li>
               <li><Link href="/soko" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-soko">Soko</Link></li>
              <li><Link href="/events" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-events">Upcoming Events</Link></li>
              <li><Link href="/donate" className="text-sm text-white/60 hover:text-primary transition-colors font-medium" data-testid="link-footer-donate">Donate</Link></li>
              <li><Link href="/membership" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-membership">Become a Member</Link></li>
              <li><Link href="/coordinators" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-coordinators">Coordinator Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Business Hub</h3>
            <ul className="space-y-2">
               <li><Link href="/ask-bnak" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-ask-bnak">Ask BNAK AI</Link></li>
               <li><Link href="/money-centre" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-money-centre">Money Centre</Link></li>
               <li><Link href="/business-health" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-business-health">Business Health Check</Link></li>
               <li><Link href="/alerts" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-alerts">SME Alerts</Link></li>
               <li><Link href="/recognition" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-recognition">Awards & Recognition</Link></li>
               <li><Link href="/e-mobility" className="text-sm text-white/60 hover:text-primary transition-colors" data-testid="link-footer-emobility">E-Mobility</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Resources & Contact</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Nairobi, Kenya</li>
              <li><a href="mailto:biasharandogoassociation@gmail.com" className="hover:text-primary transition-colors break-words" data-testid="link-footer-email">biasharandogoassociation@gmail.com</a></li>
              <li><a href="https://biasharandogo.co.ke" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" data-testid="link-footer-site">biasharandogo.co.ke</a></li>
              
              <li className="pt-2">
                <span className="block text-xs font-semibold text-white/80 mb-1">Call or WhatsApp:</span>
                <a href="tel:+254711422163" className="flex items-center gap-2 hover:text-primary transition-colors mb-2" data-testid="link-footer-call"><PhoneCall className="h-4 w-4" /> 0711422163</a>
                <a href="https://wa.me/254711422163" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors" data-testid="link-footer-whatsapp"><MessageCircle className="h-4 w-4" /> 0711422163</a>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2">Follow Us</p>
              <div className="flex gap-3">
                 {["Facebook", "X / Twitter", "Instagram", "LinkedIn", "TikTok"].map((s) => (
                    <a key={s} href="https://wa.me/254711422163" target="_blank" rel="noreferrer" className="text-xs text-white/50 hover:text-primary transition-colors" data-testid={`link-footer-social-${s.toLowerCase().replace(/\W+/g, "-")}`}>{s}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Biashara Ndogo Association of Kenya (BNAK). All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/40 hover:text-primary transition-colors text-sm" data-testid="link-footer-terms">Terms</a>
            <a href="#" className="text-white/40 hover:text-primary transition-colors text-sm" data-testid="link-footer-privacy">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
