import { useState, useEffect } from "react";
import { 
  X, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Users, 
  Sparkles,
  Loader2,
  Copy,
  Check
} from "lucide-react";
import confetti from "canvas-confetti";
import { EnquirySubmission } from "../types";
import { BrandLogo } from "./BrandLogo";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillData?: Partial<EnquirySubmission>;
  onEnquirySuccess: (newEnquiry: any) => void;
}

export function EnquiryModal({ 
  isOpen, 
  onClose, 
  prefillData, 
  onEnquirySuccess 
}: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [duration, setDuration] = useState("5 Nights / 6 Days");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [packageName, setPackageName] = useState("");
  const [hotelCategory, setHotelCategory] = useState("Deluxe Beachfront Resort");
  const [specialRequests, setSpecialRequests] = useState("");
  const [tripType, setTripType] = useState("Family / Vacation");
  
  const [submitting, setSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    reference: string;
    message: string;
  } | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    if (prefillData) {
      if (prefillData.packageName) setPackageName(prefillData.packageName);
      if (prefillData.duration) setDuration(prefillData.duration);
      if (prefillData.adults) setAdults(prefillData.adults);
      if (prefillData.children !== undefined) setChildren(prefillData.children);
      if (prefillData.hotelCategory) setHotelCategory(prefillData.hotelCategory);
      if (prefillData.specialRequests) setSpecialRequests(prefillData.specialRequests);
      if (prefillData.tripType) setTripType(prefillData.tripType);
    }
  }, [prefillData, isOpen]);

  // Set default travel date to 30 days from now if not set
  useEffect(() => {
    if (!travelDate) {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      setTravelDate(d.toISOString().split("T")[0]);
    }
  }, [travelDate]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || (!email && !phone)) {
      alert("Please provide your name and either phone or email address.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        email,
        phone,
        travelDate,
        duration,
        adults,
        children,
        packageName: packageName || "Custom Andaman Tour Inquiry",
        hotelCategory,
        specialRequests,
        tripType
      };

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success) {
        setSubmittedBooking({
          reference: data.bookingReference,
          message: data.message
        });

        // Trigger celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore if canvas unavailable
        }

        if (data.enquiry) {
          onEnquirySuccess(data.enquiry);
        }
      } else {
        alert(data.error || "Failed to submit enquiry. Please check your inputs.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Network error. Please try again or reach out on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (submittedBooking?.reference) {
      navigator.clipboard.writeText(submittedBooking.reference);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const whatsappMessage = submittedBooking
    ? encodeURIComponent(
        `Hello Andaman Dream Yatra! I just submitted an enquiry on your app.\n\nBooking Ref: ${submittedBooking.reference}\nName: ${name}\nTravel Date: ${travelDate}\nDuration: ${duration}\nTravelers: ${adults} Adults, ${children} Kids\nPackage: ${packageName || "Custom Itinerary"}\n\nPlease share the detailed quote & available hotel/trip options.`
      )
    : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="enquiry-modal"
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[95vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-cyan-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center justify-between gap-4 mb-3 pr-8">
            <BrandLogo variant="light" size="sm" showTagline={false} />
            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Port Blair Desk</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-heading">
            {submittedBooking ? "Enquiry Received!" : "Plan Your Dream Andaman Trip"}
          </h3>
          <p className="text-xs sm:text-sm text-teal-100/80 mt-1">
            {submittedBooking 
              ? "Your request has been logged directly with our Port Blair tour operations desk." 
              : "Tell us your travel plans and receive a customized day-wise quote within 2 hours."}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {submittedBooking ? (
            /* Success State */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 font-heading">
                  Thank You, {name}!
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  {submittedBooking.message}
                </p>
              </div>

              {/* Reference Box */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl inline-flex items-center gap-3">
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Your Booking Reference</div>
                  <div className="text-base font-extrabold text-teal-700 tracking-wider font-mono">
                    {submittedBooking.reference}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg text-xs flex items-center gap-1"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRef ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* WhatsApp Fast Track Button */}
              <div className="pt-2">
                <a
                  id="whatsapp-booking-cta"
                  href={`https://wa.me/919531918146?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/25 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send to WhatsApp for Fast Confirmation (+91 95319 18146)</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
                >
                  Close and Continue Exploring
                </button>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Selected Package Banner if pre-filled */}
              {packageName && (
                <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-teal-700 font-bold uppercase tracking-wider block">
                      Inquiring for:
                    </span>
                    <span className="text-xs font-bold text-slate-900">{packageName}</span>
                  </div>
                  <span className="text-[11px] text-teal-800 font-medium bg-teal-100 px-2 py-0.5 rounded">
                    {duration}
                  </span>
                </div>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-teal-600" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    id="enquiry-name-input"
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>Mobile / WhatsApp Number *</span>
                  </label>
                  <input
                    id="enquiry-phone-input"
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-teal-600" />
                  <span>Email Address (for official quote PDF)</span>
                </label>
                <input
                  id="enquiry-email-input"
                  type="email"
                  placeholder="e.g. ananya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              {/* Trip Logistics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    <span>Travel Date</span>
                  </label>
                  <input
                    id="enquiry-date-input"
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Adults (12+)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Kids (&lt;12)</label>
                  <input
                    type="number"
                    min={0}
                    max={15}
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Hotel & Style Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Hotel Category</label>
                  <select
                    value={hotelCategory}
                    onChange={(e) => setHotelCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium"
                  >
                    <option value="Deluxe Beachfront Resort">4★ Deluxe Beach Resort</option>
                    <option value="Luxury 5★ Resort / Villa">5★ Luxury Resort (Taj / Symphony)</option>
                    <option value="Standard 3★ Deluxe Hotel">3★ Standard Deluxe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Travel Type</label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium"
                  >
                    <option value="Honeymoon">Honeymoon / Couple</option>
                    <option value="Family / Vacation">Family Holiday</option>
                    <option value="Adventure / Diving">Water Sports & Adventure</option>
                    <option value="Friends / Group">Friends / Group Tour</option>
                    <option value="Offbeat / Explorer">Offbeat & North Andaman</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Special Wishes or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Honeymoon bed decoration, airport pickup flight numbers, scuba diving slots, vegetarian food preference..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              {/* Submit CTA */}
              <button
                id="submit-enquiry-btn"
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting to Operations Team...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit & Get Free Custom Quote</span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-400">
                🔒 We respect your privacy. No spam. Instant quote on WhatsApp & Email.
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
