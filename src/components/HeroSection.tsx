import { 
  Compass, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Users, 
  Ship, 
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
  Clock
} from "lucide-react";

interface HeroSectionProps {
  selectedIslandFilter: string;
  setSelectedIslandFilter: (island: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  onExploreClick: () => void;
  onCalculatorClick: () => void;
}

export function HeroSection({
  selectedIslandFilter,
  setSelectedIslandFilter,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  onExploreClick,
  onCalculatorClick
}: HeroSectionProps) {
  const islands = ["All Islands", "Port Blair", "Havelock Island", "Neil Island", "Baratang Island", "Diglipur"];
  const categories = ["All Styles", "Honeymoon", "Family", "Adventure", "Explorer", "Budget"];

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-teal-950 via-slate-950 to-slate-900 text-white">
      {/* Background ambient lighting and high-definition Andaman photo */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500 via-cyan-700 to-transparent pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-luminosity pointer-events-none" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-teal-950/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-200 text-xs sm:text-sm font-bold backdrop-blur-md shadow-inner mb-6 animate-in fade-in duration-300">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Port Blair Registered Local Tour Operator • Direct Island Bookings</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-5xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white font-heading leading-tight">
            Discover Your Dream{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-amber-300">
              Andaman Holiday
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            Handcrafted island tour packages, certified scuba diving, and private AC island transfers organized by Port Blair locals.
          </p>
        </div>

        {/* Interactive Search & Quick Match Bar */}
        <div className="mt-10 max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/40 text-slate-900 transition-all hover:shadow-teal-900/20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
            
            {/* Island Selector */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-700" />
                <span>Select Island Destination</span>
              </label>
              <select
                id="hero-island-select"
                value={selectedIslandFilter}
                onChange={(e) => setSelectedIslandFilter(e.target.value)}
                className="w-full bg-slate-100 hover:bg-slate-200/70 border border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
              >
                {islands.map((island) => (
                  <option key={island} value={island}>
                    {island}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Category Selector */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-teal-700" />
                <span>Holiday Style</span>
              </label>
              <select
                id="hero-category-select"
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full bg-slate-100 hover:bg-slate-200/70 border border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Action CTA */}
            <div>
              <button
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-600 hover:to-cyan-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-teal-700/25 transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-300" />
                <span>Find Matching Tours</span>
              </button>
            </div>

          </div>

          {/* Quick Shortcuts */}
          <div className="mt-4 pt-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5 text-teal-800">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Instant Confirmation on WhatsApp &bull; +91 95319 18146</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onCalculatorClick}
                className="hover:text-teal-700 underline font-bold transition-colors"
              >
                Custom Cost Calculator &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Real Trust Credentials */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-slate-300 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3 hover:border-teal-400/40 transition-colors">
            <ShieldCheck className="w-6 h-6 text-teal-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-white">100% Port Blair Team</div>
              <div className="text-[11px] text-slate-400">Direct ground operations</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3 hover:border-teal-400/40 transition-colors">
            <Compass className="w-6 h-6 text-cyan-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-white">Custom Itineraries</div>
              <div className="text-[11px] text-slate-400">Tailored to your dates</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3 hover:border-teal-400/40 transition-colors">
            <Star className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-white">4.9/5 Rating</div>
              <div className="text-[11px] text-slate-400">From verified guests</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3 hover:border-teal-400/40 transition-colors">
            <MessageCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-white">24x7 Assistance</div>
              <div className="text-[11px] text-slate-400">+91 95319 18146</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
