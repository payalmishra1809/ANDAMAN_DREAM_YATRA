import { 
  X, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Utensils
} from "lucide-react";
import { TourPackage } from "../types";

interface PackageDetailModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onBook: (pkg: TourPackage) => void;
}

export function PackageDetailModal({ pkg, onClose, onBook }: PackageDetailModalProps) {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="package-detail-modal"
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col"
      >
        {/* Header with image */}
        <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
          <img 
            src={pkg.image} 
            alt={pkg.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />
          
          <button
            id="close-package-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-900">
                {pkg.category} Package
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-800/90 text-teal-100 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{pkg.duration} ({pkg.nights}N / {pkg.days}D)</span>
              </span>
              <div className="flex items-center gap-1 text-amber-300 text-xs font-bold ml-auto">
                <Star className="w-4 h-4 fill-amber-300" />
                <span>{pkg.rating} ({pkg.reviewsCount} reviews)</span>
              </div>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-white">
              {pkg.name}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-2xl">
              {pkg.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Quick info strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-500 block font-medium">Islands Covered</span>
              <span className="font-bold text-slate-800">{pkg.islands.join(", ")}</span>
            </div>
            <div>
              <span className="text-slate-500 block font-medium">Hotel Category</span>
              <span className="font-bold text-slate-800">{pkg.hotelCategory}</span>
            </div>
            <div>
              <span className="text-slate-500 block font-medium">Island Transfers</span>
              <span className="font-bold text-teal-700">AC Private Cab & Cruise</span>
            </div>
            <div>
              <span className="text-slate-500 block font-medium">Starting Price</span>
              <span className="text-base font-extrabold text-teal-700 font-heading">
                ₹{pkg.pricePerPerson.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Day-by-Day Itinerary */}
          <div>
            <h4 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Day-by-Day Tour Itinerary</span>
            </h4>
            
            <div className="space-y-4 border-l-2 border-teal-200 ml-3 pl-4">
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="relative group">
                  <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-teal-600 border-2 border-white ring-2 ring-teal-200" />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                        Day {day.day}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-teal-600" />
                        <span>{day.island}</span>
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 mt-1">
                      {day.title}
                    </h5>
                    <ul className="mt-2 space-y-1 text-xs text-slate-600">
                      {day.activities.map((act, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold">•</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 text-[11px] text-amber-800 font-medium flex items-center gap-1 bg-amber-50 px-2 py-1 rounded inline-flex">
                      <Utensils className="w-3 h-3 text-amber-600" />
                      <span>{day.meals}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-200">
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Package Inclusions</span>
              </h5>
              <ul className="space-y-2 text-xs text-emerald-950">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
              <h5 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5 mb-2.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Exclusions</span>
              </h5>
              <ul className="space-y-2 text-xs text-rose-950">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Guarantee badge */}
          <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-200/80 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-teal-700 flex-shrink-0" />
            <p className="text-xs text-teal-900 leading-relaxed">
              <strong className="font-semibold">Andaman Dream Yatra Guarantee:</strong> Transparent island pricing with zero hidden convenience fees, seamless inter-island travel, and 24x7 local support on the ground.
            </p>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-500 font-medium">All-Inclusive Price / Person</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-teal-700 font-heading">
                ₹{pkg.pricePerPerson.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{pkg.originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
                Save ₹{(pkg.originalPrice - pkg.pricePerPerson).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              id="modal-book-now-btn"
              onClick={() => {
                onClose();
                onBook(pkg);
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Book / Request Customization</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
