import { MapPin, Clock, ArrowRight, Compass, Calendar } from "lucide-react";
import { Destination } from "../types";

interface DestinationCardProps {
  destination: Destination;
  onSelect: (dest: Destination) => void;
}

export function DestinationCard({ destination, onSelect }: DestinationCardProps) {
  return (
    <div 
      id={`destination-card-${destination.id}`}
      onClick={() => onSelect(destination)}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer group text-slate-800"
    >
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img 
          src={destination.image} 
          alt={destination.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Region Badge */}
        <div className="absolute top-3.5 left-3.5 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-teal-300 backdrop-blur-md border border-white/10 shadow-sm">
            {destination.region}
          </span>
        </div>

        {/* Title on Image (Full Width - Zero Overlap) */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-white">
          <h3 className="text-lg sm:text-xl font-black font-heading leading-tight group-hover:text-teal-200 transition-colors">
            {destination.name}
          </h3>
          {destination.localName && (
            <p className="text-xs text-teal-300/90 font-medium mt-1 line-clamp-1">
              ({destination.localName})
            </p>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Suggested Stay Pill (Spacious & Clean Layout) */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-semibold mb-3 max-w-full">
            <Clock className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
            <span className="truncate">Suggested Stay: {destination.idealStay}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {destination.tagline}
          </p>

          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2 text-teal-900 font-medium">
              <Calendar className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <span className="line-clamp-1">Best Season: {destination.bestTime}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span className="line-clamp-1 font-medium">{destination.highlights[0]}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
          <span className="font-bold text-teal-700 group-hover:text-teal-900 flex items-center gap-1.5 transition-colors">
            <span>Explore Island Sights</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
            {destination.topAttractions.length} Top Sights
          </span>
        </div>
      </div>
    </div>
  );
}
