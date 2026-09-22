import { useState, useEffect } from "react";
import { 
  Phone, 
  MessageCircle, 
  Compass, 
  Ship, 
  Waves, 
  Calculator, 
  BookOpen, 
  Menu, 
  X, 
  Sparkles,
  BookmarkCheck,
  Palmtree
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openEnquiryModal: (prefill?: { packageName?: string; activityName?: string }) => void;
  openBookingsDrawer: () => void;
  bookingsCount: number;
}

export function Navbar({ 
  activeTab, 
  setActiveTab, 
  openEnquiryModal, 
  openBookingsDrawer, 
  bookingsCount 
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Track scroll progress for animated top gradient bar
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((scrollY / height) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "packages", label: "Packages", icon: Compass },
    { id: "destinations", label: "Islands", icon: Palmtree },
    { id: "activities", label: "Activities", icon: Waves },
    { id: "calculator", label: "Calculator", icon: Calculator },
    { id: "ai-guide", label: "AI Advisor", icon: Sparkles },
    { id: "guide", label: "Island Guide", icon: BookOpen }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-teal-200/70 py-2" 
          : "bg-white/90 backdrop-blur-sm border-b border-slate-200/60 py-2.5 sm:py-3"
      }`}
    >
      {/* Scroll indicator bar on top */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-amber-400 via-teal-500 to-cyan-500 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick("packages")}
            className="cursor-pointer group select-none flex-shrink-0"
          >
            <BrandLogo variant="dark" size="sm" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-xl text-xs xl:text-[13px] font-bold transition-all duration-200 whitespace-nowrap group ${
                    isActive
                      ? "bg-teal-700 text-white shadow-sm scale-[1.02]"
                      : "text-slate-700 hover:text-teal-700 hover:bg-teal-50 hover:-translate-y-0.5 active:scale-95"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 transition-transform group-hover:scale-110 ${isActive ? "text-amber-300" : "text-teal-600"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            {/* Direct WhatsApp Button (Replaces raw phone number with branded button) */}
            <a
              id="nav-whatsapp-btn"
              href="https://wa.me/919531918146?text=Hello%20Andaman%20Dream%20Yatra,%20I%20would%20like%20to%20plan%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm active:scale-95"
              title="Chat with local travel desk on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
              <span>WhatsApp</span>
            </a>

            {/* My Bookings Tracker Drawer trigger */}
            <button
              id="nav-my-bookings-btn"
              onClick={openBookingsDrawer}
              className="relative p-2 text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-xl transition-all duration-200 hover:scale-105"
              title="My Bookings & Enquiries"
            >
              <BookmarkCheck className="w-5 h-5 text-teal-700" />
              {bookingsCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center shadow-sm animate-pulse">
                  {bookingsCount}
                </span>
              )}
            </button>

            {/* Get Quote CTA */}
            <button
              id="nav-quote-cta"
              onClick={() => openEnquiryModal()}
              className="px-3.5 py-2 text-xs xl:text-sm font-bold text-white bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-600 hover:to-cyan-600 rounded-xl shadow-md shadow-teal-700/20 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile Menu & Bookings Buttons */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={openBookingsDrawer}
              className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
              title="My Bookings"
            >
              <BookmarkCheck className="w-5 h-5 text-teal-700" />
              {bookingsCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {bookingsCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <BrandLogo variant="dark" size="sm" />
            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
              Port Blair
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                    isActive
                      ? "bg-teal-700 text-white"
                      : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-amber-300" : "text-teal-600"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiryModal();
              }}
              className="w-full py-3 text-center text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md"
            >
              Get Free Custom Tour Quote
            </button>

            <a
              href="https://wa.me/919531918146"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Chat with Us on WhatsApp (+91 95319 18146)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
