import { X, Clock, MapPin, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";
import { Activity } from "../types";

interface ActivityDetailModalProps {
  activity: Activity | null;
  onClose: () => void;
  onBook: (act: Activity) => void;
}

export function ActivityDetailModal({ activity, onClose, onBook }: ActivityDetailModalProps) {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="activity-detail-modal"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col"
      >
        <div className="relative h-56 w-full flex-shrink-0">
          <img 
            src={activity.image} 
            alt={activity.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400 text-slate-950">
                {activity.category}
              </span>
              {!activity.swimmingRequired && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500 text-white">
                  No Swimming Required
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {activity.name}
            </h2>
          </div>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-800 text-xs sm:text-sm">
          
          {/* Quick Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Duration</span>
              <span className="font-bold text-slate-800">{activity.duration}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Location</span>
              <span className="font-bold text-slate-800">{activity.location}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Min Age</span>
              <span className="font-bold text-slate-800">{activity.minAge} Years</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Fee</span>
              <span className="font-extrabold text-teal-700 text-sm font-heading">
                ₹{activity.price.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 font-heading mb-1.5">Activity Overview</h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {activity.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              What's Included in Your Booking
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {activity.inclusions.map((inc, i) => (
                <div key={i} className="flex items-start gap-2 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>Safety & Medical Guidelines</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-950">
              {activity.safetyGuidelines.map((guide, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>{guide}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500">Per Person Rate</span>
            <div className="text-xl font-bold text-teal-700 font-heading">
              ₹{activity.price.toLocaleString("en-IN")}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(activity);
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm flex items-center gap-1"
            >
              <span>Reserve Activity Slot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
