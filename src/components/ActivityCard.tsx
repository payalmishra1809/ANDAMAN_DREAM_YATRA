import { Waves, Clock, MapPin, Shield, Check, ArrowRight, Sparkles } from "lucide-react";
import { Activity } from "../types";

interface ActivityCardProps {
  activity: Activity;
  onSelect: (act: Activity) => void;
  onBook: (act: Activity) => void;
}

export function ActivityCard({ activity, onSelect, onBook }: ActivityCardProps) {
  return (
    <div 
      id={`activity-card-${activity.id}`}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group text-slate-800"
    >
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img 
          src={activity.image} 
          alt={activity.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent" />
        
        {/* Top Badges Bar - Flex layout prevents collision */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-white backdrop-blur-md border border-white/10 shadow-sm truncate">
            {activity.category}
          </span>

          {!activity.swimmingRequired && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-600 text-white shadow-md whitespace-nowrap flex-shrink-0">
              No Swimming Needed
            </span>
          )}
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 text-xs text-amber-200 font-bold bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          <span>{activity.duration}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-teal-800 font-bold mb-1">
            <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
            <span className="line-clamp-1">{activity.location}</span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading group-hover:text-teal-700 transition-colors line-clamp-1">
            {activity.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {activity.tagline}
          </p>

          <div className="mt-3.5 space-y-1.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
              <span className="line-clamp-1 font-medium">{activity.inclusions[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
              <span className="font-medium">Min. Age: {activity.minAge} Years • PADI / Certified Masters</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3.5 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 block">Rate / Person</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-teal-800 font-heading">
                  ₹{activity.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-slate-400 font-medium">all-incl.</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id={`act-view-${activity.id}`}
                onClick={() => onSelect(activity)}
                className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-teal-800 hover:bg-slate-100 rounded-xl transition-all"
              >
                Info
              </button>
              <button
                id={`act-book-${activity.id}`}
                onClick={() => onBook(activity)}
                className="px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm hover:scale-105 transition-all flex items-center gap-1"
              >
                <span>Enquire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
