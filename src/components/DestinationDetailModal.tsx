import { X, MapPin, Calendar, Lightbulb, Compass, ArrowRight } from "lucide-react";
import { Destination } from "../types";

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onFilterPackages: (islandName: string) => void;
}

export function DestinationDetailModal({ 
  destination, 
  onClose, 
  onFilterPackages 
}: DestinationDetailModalProps) {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="destination-detail-modal"
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col"
      >
        {/* Header banner */}
        <div className="relative h-60 w-full flex-shrink-0">
          <img 
            src={destination.image} 
            alt={destination.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />
          
          <button
            id="close-destination-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-500 text-slate-950 mb-2 inline-block">
              {destination.region}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              {destination.name} {destination.localName && <span className="text-teal-200 text-lg font-normal">({destination.localName})</span>}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-xl">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-800 text-xs sm:text-sm">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-teal-50/70 p-3.5 rounded-xl border border-teal-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <div>
                <div className="text-[11px] text-teal-800 font-semibold uppercase tracking-wider">Island Region</div>
                <div className="text-xs text-slate-700 font-medium">{destination.region}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <div>
                <div className="text-[11px] text-teal-800 font-semibold uppercase tracking-wider">Best Season</div>
                <div className="text-xs text-slate-700 font-medium">{destination.bestTime}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <div>
                <div className="text-[11px] text-teal-800 font-semibold uppercase tracking-wider">Suggested Stay</div>
                <div className="text-xs text-slate-700 font-medium">{destination.idealStay}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-heading mb-1.5">About this Destination</h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {destination.description}
            </p>
          </div>

          {/* Top Attractions list */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-heading mb-2.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>Iconic Sights & Attractions</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.topAttractions.map((att, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <h5 className="text-xs font-bold text-slate-900 text-teal-800">{att.name}</h5>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{att.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Local Travel Tips */}
          <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/70">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Local Island Advice & Tips</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-950">
              {destination.travelTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Close
          </button>
          <button
            id={`filter-packages-for-${destination.id}`}
            onClick={() => {
              onClose();
              onFilterPackages(destination.name);
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>View Packages for {destination.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
