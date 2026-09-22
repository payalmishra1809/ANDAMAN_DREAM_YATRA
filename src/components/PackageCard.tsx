import { Star, Clock, MapPin, Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { TourPackage } from "../types";

interface PackageCardProps {
  pkg: TourPackage;
  onSelect: (pkg: TourPackage) => void;
  onBook: (pkg: TourPackage) => void;
}

export function PackageCard({ pkg, onSelect, onBook }: PackageCardProps) {
  return (
    <div 
      id={`package-card-${pkg.id}`}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group text-slate-800"
    >
      {/* Thumbnail image with badges */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
        <img 
          src={pkg.image} 
          alt={pkg.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
          {pkg.badge && (
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-md">
              {pkg.badge}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-900/90 text-white backdrop-blur-sm border border-teal-500/30">
            {pkg.category}
          </span>
        </div>

        {/* Bottom Badges Row - Flex layout to guarantee zero overlap */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 text-white text-xs font-bold bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>{pkg.rating}</span>
            <span className="text-white/80 text-[11px] hidden sm:inline">({pkg.reviewsCount})</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 text-teal-200 text-xs font-bold backdrop-blur-sm border border-white/10">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>{pkg.duration}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Island Pills */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {pkg.islands.map((island) => (
              <span 
                key={island} 
                className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-900 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-200"
              >
                <MapPin className="w-3 h-3 text-teal-600" />
                <span>{island}</span>
              </span>
            ))}
          </div>

          <h3 className="text-lg sm:text-xl font-black text-slate-900 font-heading group-hover:text-teal-700 transition-colors line-clamp-1">
            {pkg.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
            {pkg.tagline}
          </p>

          {/* Highlights checklist */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
            {pkg.highlights.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <Check className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing and Action Section */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-teal-800 font-heading">
                ₹{pkg.pricePerPerson.toLocaleString("en-IN")}
              </span>
              {pkg.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{pkg.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Per Person (Min 2 Pax)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id={`pkg-view-${pkg.id}`}
              onClick={() => onSelect(pkg)}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-teal-800 hover:bg-slate-100 rounded-xl transition-all"
            >
              Details
            </button>
            <button
              id={`pkg-enquire-${pkg.id}`}
              onClick={() => onBook(pkg)}
              className="px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm hover:scale-105 transition-all flex items-center gap-1"
            >
              <span>Enquire</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
