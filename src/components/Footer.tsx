import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

interface FooterProps {
  onNavClick: (tab: string) => void;
  openEnquiryModal: () => void;
}

export function Footer({ onNavClick, openEnquiryModal }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-20 sm:pb-12 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" />

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              Directly based in Port Blair. We curate unforgettable journeys across Havelock, Neil, Baratang, and Diglipur with verified beachfront resorts, private AC cab transfers, and certified divemasters.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="https://wa.me/919531918146?text=Hi%20Andaman%20Dream%20Yatra"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center gap-1.5 transition-all text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +91 95319 18146</span>
              </a>
              <button
                onClick={() => openEnquiryModal()}
                className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold transition-all text-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Get Free Quote</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs font-heading">
              Popular Islands
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <button onClick={() => onNavClick("destinations")} className="hover:text-teal-300 transition-colors">
                  Havelock (Radhanagar Beach)
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("destinations")} className="hover:text-teal-300 transition-colors">
                  Neil Island (Natural Bridge)
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("destinations")} className="hover:text-teal-300 transition-colors">
                  Port Blair (Cellular Jail)
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("destinations")} className="hover:text-teal-300 transition-colors">
                  Baratang (Limestone Caves)
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("destinations")} className="hover:text-teal-300 transition-colors">
                  Ross &amp; Smith Twin Islands
                </button>
              </li>
            </ul>
          </div>

          {/* Tour Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs font-heading">
              Holiday Styles
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <button onClick={() => onNavClick("packages")} className="hover:text-teal-300 transition-colors">
                  Honeymoon &amp; Couple Specials
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("packages")} className="hover:text-teal-300 transition-colors">
                  Family Leisure Tours
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("activities")} className="hover:text-teal-300 transition-colors">
                  PADI Scuba Diving (₹3,500)
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("ai-guide")} className="hover:text-teal-300 transition-colors">
                  AI Travel Advisor
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick("calculator")} className="hover:text-teal-300 transition-colors">
                  Custom Cost Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Official Contact Info */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs font-heading">
              Port Blair Head Office
            </h4>
            <div className="space-y-2.5 text-slate-300 font-medium text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Mother Teressa Colony, Near DBRAIT, Dollygunj, Port Blair - 744103, Andaman &amp; Nicobar Islands
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>+91 95319 18146</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>andamandreamyatra@gmail.com</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-teal-300 flex items-center gap-1.5 mt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Locally registered Andaman tour company</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div>
            &copy; {new Date().getFullYear()} Andaman Dream Yatra. All Rights Reserved. Port Blair, Andaman &amp; Nicobar Islands.
          </div>
          <div className="flex items-center gap-4">
            <span>GST &amp; Tourism Registered</span>
            <span>&bull;</span>
            <span>Direct Island Bookings</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
