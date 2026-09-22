import { X, Calendar, User, Phone, MapPin, CheckCircle, Clock, MessageCircle } from "lucide-react";
import { EnquirySubmission } from "../types";

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  enquiries: EnquirySubmission[];
}

export function MyBookingsDrawer({ isOpen, onClose, enquiries }: MyBookingsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="my-bookings-drawer"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              My Tour Enquiries & Bookings
            </h3>
            <p className="text-xs text-slate-500">
              Track your submitted Andaman travel requests
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
          {enquiries.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <Clock className="w-10 h-10 mx-auto text-slate-300" />
              <p className="font-semibold text-slate-600">No active bookings found</p>
              <p className="text-[11px] max-w-xs mx-auto">
                Explore our packages, water sports, or custom calculator to submit your first tour enquiry!
              </p>
            </div>
          ) : (
            enquiries.map((item, idx) => (
              <div 
                key={item.id || idx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {item.bookingReference || `ADY-2026-${1000 + idx}`}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.status === "Confirmed" 
                      ? "bg-emerald-100 text-emerald-800" 
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {item.status || "Pending Review"}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {item.packageName || "Custom Island Tour"}
                  </h4>
                  <div className="flex items-center gap-3 text-slate-600 mt-1 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-teal-600" />
                      <span>{item.travelDate}</span>
                    </span>
                    <span>•</span>
                    <span>{item.adults} Adults {item.children ? `, ${item.children} Kids` : ""}</span>
                  </div>
                </div>

                {item.hotelCategory && (
                  <div className="text-[11px] text-slate-500">
                    Hotel Preference: <strong className="text-slate-700">{item.hotelCategory}</strong>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Coordinator assigned
                  </span>
                  <a
                    href={`https://wa.me/919474288888?text=Hello%20Andaman%20Dream%20Yatra,%20I%20am%20following%20up%20on%20my%20booking%20reference%20${item.bookingReference}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px] hover:underline"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
          <p className="text-[11px] text-slate-500 mb-2">
            Need urgent changes? Call our Port Blair desk directly:
          </p>
          <a
            href="tel:+919474288888"
            className="text-xs font-bold text-teal-700 hover:underline flex items-center justify-center gap-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 94742 88888 (24x7 Helpline)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
