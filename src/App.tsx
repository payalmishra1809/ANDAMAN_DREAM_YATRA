import { useState, useEffect } from "react";
import { 
  Compass, 
  Palmtree, 
  Waves, 
  Ship, 
  Calculator, 
  Sparkles, 
  BookOpen, 
  Search, 
  MessageCircle, 
  Phone, 
  Filter, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Star
} from "lucide-react";

import { TOUR_PACKAGES } from "./data/packagesData";
import { DESTINATIONS } from "./data/destinationsData";
import { ACTIVITIES } from "./data/activitiesData";
import { TourPackage, Destination, Activity, EnquirySubmission } from "./types";

import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { PackageCard } from "./components/PackageCard";
import { PackageDetailModal } from "./components/PackageDetailModal";
import { DestinationCard } from "./components/DestinationCard";
import { DestinationDetailModal } from "./components/DestinationDetailModal";
import { ActivityCard } from "./components/ActivityCard";
import { ActivityDetailModal } from "./components/ActivityDetailModal";
import { TripCostCalculator } from "./components/TripCostCalculator";
import { AiTravelAssistant } from "./components/AiTravelAssistant";
import { IslandGuideSection } from "./components/IslandGuideSection";
import { EnquiryModal } from "./components/EnquiryModal";
import { MyBookingsDrawer } from "./components/MyBookingsDrawer";
import { Footer } from "./components/Footer";
import { DidYouKnowModal } from "./components/DidYouKnowModal";
import { AiCustomerChatbot } from "./components/AiCustomerChatbot";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("packages");
  const [selectedIslandFilter, setSelectedIslandFilter] = useState<string>("All Islands");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All Styles");
  const [packageSearch, setPackageSearch] = useState<string>("");

  // Destination Region filter
  const [destinationRegionFilter, setDestinationRegionFilter] = useState<string>("All");

  // Activity filter
  const [activityCategoryFilter, setActivityCategoryFilter] = useState<string>("All");
  const [onlyNonSwimmer, setOnlyNonSwimmer] = useState<boolean>(false);

  // Modals & Drawers
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [enquiryPrefill, setEnquiryPrefill] = useState<Partial<EnquirySubmission> | undefined>(undefined);
  const [isBookingsDrawerOpen, setIsBookingsDrawerOpen] = useState<boolean>(false);
  const [bookings, setBookings] = useState<EnquirySubmission[]>([]);

  // Fetch initial enquiries from backend
  useEffect(() => {
    fetch("/api/enquiry")
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.enquiries)) {
          setBookings(data.enquiries);
        }
      })
      .catch(() => {
        // Fallback gracefully
      });
  }, []);

  const handleEnquirySuccess = (newEnquiry: EnquirySubmission) => {
    setBookings(prev => [newEnquiry, ...prev]);
  };

  const openEnquiryWithPrefill = (prefill?: Partial<EnquirySubmission>) => {
    setEnquiryPrefill(prefill);
    setIsEnquiryModalOpen(true);
  };

  // Quick book actions
  const handleBookPackage = (pkg: TourPackage) => {
    setSelectedPackage(null);
    openEnquiryWithPrefill({
      packageId: pkg.id,
      packageName: pkg.name,
      duration: pkg.duration,
      hotelCategory: pkg.hotelCategory,
      estimatedBudget: `₹${pkg.pricePerPerson.toLocaleString("en-IN")} / person`,
      specialRequests: `Interested in ${pkg.name} (${pkg.duration}). Looking forward to custom inclusions.`
    });
  };

  const handleBookActivity = (act: Activity) => {
    setSelectedActivity(null);
    openEnquiryWithPrefill({
      packageName: `Water Sport Booking: ${act.name}`,
      destination: act.location,
      estimatedBudget: `₹${act.price.toLocaleString("en-IN")} / person`,
      specialRequests: `Activity: ${act.name} at ${act.location}. Non-swimmer friendly: ${!act.swimmingRequired ? "Yes" : "No"}.`
    });
  };

  const handleCustomPlanBook = (customDetails: {
    duration: string;
    adults: number;
    children: number;
    hotelTier: string;
    islands: string[];
    activities: string[];
    estimatedTotal: number;
    estimatedPerPerson: number;
    tripType: string;
  }) => {
    openEnquiryWithPrefill({
      packageName: `Custom ${customDetails.tripType} Itinerary (${customDetails.duration})`,
      duration: customDetails.duration,
      adults: customDetails.adults,
      children: customDetails.children,
      hotelCategory: customDetails.hotelTier,
      tripType: customDetails.tripType,
      specialRequests: `Custom Plan Details:
- Islands: ${customDetails.islands.join(", ")}
- Hotel: ${customDetails.hotelTier}
- Water Sports: ${customDetails.activities.join(", ") || "None"}
- Estimated Total Budget: ₹${customDetails.estimatedTotal.toLocaleString("en-IN")} (~₹${customDetails.estimatedPerPerson.toLocaleString("en-IN")}/person).`
    });
  };

  const handleAiPlanBook = (planTitle: string, planSummary: string) => {
    openEnquiryWithPrefill({
      packageName: `AI Curated Tour: ${planTitle}`,
      specialRequests: `Summary: ${planSummary}`
    });
  };

  // Filtered packages
  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    if (selectedIslandFilter !== "All Islands") {
      const matchIsland = pkg.islands.some(i => i.toLowerCase().includes(selectedIslandFilter.toLowerCase().replace(" island", "")));
      if (!matchIsland) return false;
    }
    if (selectedCategoryFilter !== "All Styles" && pkg.category !== selectedCategoryFilter) {
      return false;
    }
    if (packageSearch.trim()) {
      const query = packageSearch.toLowerCase();
      const matchName = pkg.name.toLowerCase().includes(query);
      const matchTag = pkg.tagline.toLowerCase().includes(query);
      const matchIslands = pkg.islands.some(i => i.toLowerCase().includes(query));
      if (!matchName && !matchTag && !matchIslands) return false;
    }
    return true;
  });

  // Filtered destinations
  const filteredDestinations = DESTINATIONS.filter((dest) => {
    if (destinationRegionFilter === "All") return true;
    return dest.region === destinationRegionFilter;
  });

  // Filtered activities
  const filteredActivities = ACTIVITIES.filter((act) => {
    if (activityCategoryFilter !== "All" && act.category !== activityCategoryFilter) {
      return false;
    }
    if (onlyNonSwimmer && act.swimmingRequired) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-500 selection:text-white pb-14 sm:pb-0">
      
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        openEnquiryModal={openEnquiryWithPrefill}
        openBookingsDrawer={() => setIsBookingsDrawerOpen(true)}
        bookingsCount={bookings.length}
      />

      {/* Hero Banner with search/filters */}
      <HeroSection 
        selectedIslandFilter={selectedIslandFilter}
        setSelectedIslandFilter={setSelectedIslandFilter}
        selectedCategoryFilter={selectedCategoryFilter}
        setSelectedCategoryFilter={setSelectedCategoryFilter}
        onExploreClick={() => {
          const el = document.getElementById("packages");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onCalculatorClick={() => {
          const el = document.getElementById("calculator");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">

        {/* 1. TOUR PACKAGES SECTION */}
        <section id="packages" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2">
                <Compass className="w-3.5 h-3.5 text-teal-700" />
                <span>Handcrafted Andaman Holidays</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
                Featured Island Tour Packages
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl">
                All packages include verified beachfront hotel stays, private AC vehicle transfers, and personalized island sightseeing.
              </p>
            </div>

            {/* Package Search Bar */}
            <div className="w-full md:w-80 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="package-search-input"
                type="text"
                placeholder="Search package, island, or style..."
                value={packageSearch}
                onChange={(e) => setPackageSearch(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Packages Grid */}
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard 
                  key={pkg.id} 
                  pkg={pkg} 
                  onSelect={(p) => setSelectedPackage(p)}
                  onBook={(p) => handleBookPackage(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
              <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No packages match your filter</h3>
              <p className="text-xs text-slate-500 mt-1">Try resetting your island or holiday style filters above.</p>
              <button
                onClick={() => {
                  setSelectedIslandFilter("All Islands");
                  setSelectedCategoryFilter("All Styles");
                  setPackageSearch("");
                }}
                className="mt-4 px-4 py-2 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors border border-teal-200"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>


        {/* 2. ISLANDS & DESTINATIONS DIRECTORY */}
        <section id="destinations" className="py-16 bg-slate-100/70 border-t border-slate-200 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold mb-2">
                  <Palmtree className="w-3.5 h-3.5 text-cyan-700" />
                  <span>Island Exploration Guide</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
                  Explore Andaman's Pristine Islands
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl">
                  From the world-renowned white sands of Radhanagar to the natural rock bridges of Neil and prehistoric mangrove caves of Baratang.
                </p>
              </div>

              {/* Region Filter Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {["All", "South Andaman", "North & Middle Andaman"].map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setDestinationRegionFilter(reg)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      destinationRegionFilter === reg
                        ? "bg-teal-800 text-white shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredDestinations.map((dest) => (
                <DestinationCard 
                  key={dest.id}
                  destination={dest}
                  onSelect={(d) => setSelectedDestination(d)}
                />
              ))}
            </div>

          </div>
        </section>


        {/* 3. WATER SPORTS & ADVENTURE SECTION */}
        <section id="activities" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2">
                <Waves className="w-3.5 h-3.5 text-teal-700" />
                <span>Certified Adventure Desk</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
                Water Sports &amp; Marine Activities
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl">
                100% certified gear, certified PADI divemasters, and beginner-friendly sessions. No swimming skills required for discover scuba, parasailing, and sea walk!
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setOnlyNonSwimmer(!onlyNonSwimmer)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  onlyNonSwimmer
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Check className={`w-3.5 h-3.5 ${onlyNonSwimmer ? "text-white" : "text-transparent"}`} />
                <span>Non-Swimmers Only</span>
              </button>

              <select
                value={activityCategoryFilter}
                onChange={(e) => setActivityCategoryFilter(e.target.value)}
                className="bg-white border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="All">All Water Sports</option>
                <option value="Underwater Diving">Scuba &amp; Diving</option>
                <option value="Surface Watersports">Jet Ski &amp; Speedboat</option>
                <option value="Aerial Adventure">Parasailing</option>
                <option value="Night Adventure">Night Kayaking</option>
                <option value="Submarine & Coral">Coral Safari</option>
              </select>
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredActivities.map((act) => (
              <ActivityCard 
                key={act.id} 
                activity={act}
                onSelect={(a) => setSelectedActivity(a)}
                onBook={(a) => handleBookActivity(a)}
              />
            ))}
          </div>
        </section>


        {/* 4. CUSTOM TRIP COST ESTIMATOR */}
        <TripCostCalculator onPlanInquiry={handleCustomPlanBook} />


        {/* 5. AI TRAVEL ADVISOR */}
        <AiTravelAssistant onBookPlan={handleAiPlanBook} />


        {/* 6. ISLAND TRAVEL GUIDE, FAQS & CANCELLATION POLICY */}
        <IslandGuideSection />

      </main>

      {/* Floating WhatsApp Quick Connect Button (Desktop) */}
      <div className="fixed bottom-6 right-6 z-30 hidden sm:flex flex-col items-end gap-2.5">
        <a
          id="floating-whatsapp-btn"
          href="https://wa.me/919531918146?text=Hello%20Andaman%20Dream%20Yatra,%20I%20am%20planning%20an%20Andaman%20trip%20and%20need%20assistance."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-all duration-200 group hover:scale-105 border-2 border-white/50"
          title="Chat with Andaman Tour Specialist"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-white/20" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-300 animate-ping" />
          </div>
          <span className="text-xs font-bold font-sans tracking-wide hidden sm:inline-block">
            WhatsApp Desk
          </span>
        </a>
      </div>

      {/* Interactive Andaman Trivia Facts Component */}
      <DidYouKnowModal />

      {/* Floating AI Customer Bot */}
      <AiCustomerChatbot 
        onOpenEnquiry={(pkg) => openEnquiryWithPrefill({ packageName: pkg })} 
      />

      {/* Mobile-first bottom quick contact bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-3 flex items-center justify-between shadow-lg">
        <a 
          href="tel:+919531918146"
          className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl"
        >
          <Phone className="w-3.5 h-3.5 text-teal-700" />
          <span>Call Desk</span>
        </a>

        <a 
          href="https://wa.me/919531918146"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 px-3.5 py-2 rounded-xl shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button 
          onClick={() => openEnquiryWithPrefill()}
          className="flex items-center gap-1 text-xs font-bold text-white bg-teal-800 px-3.5 py-2 rounded-xl shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Free Quote</span>
        </button>
      </div>

      {/* Footer */}
      <Footer 
        onNavClick={(tab) => {
          setActiveTab(tab);
          const el = document.getElementById(tab);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        openEnquiryModal={() => openEnquiryWithPrefill()}
      />

      {/* Modals & Slide-outs */}
      <PackageDetailModal 
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBook={(p) => handleBookPackage(p)}
      />

      <DestinationDetailModal 
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onFilterPackages={(island) => {
          setSelectedIslandFilter(island);
          const el = document.getElementById("packages");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <ActivityDetailModal 
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onBook={(a) => handleBookActivity(a)}
      />

      <EnquiryModal 
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        prefillData={enquiryPrefill}
        onEnquirySuccess={handleEnquirySuccess}
      />

      <MyBookingsDrawer 
        isOpen={isBookingsDrawerOpen}
        onClose={() => setIsBookingsDrawerOpen(false)}
        enquiries={bookings}
      />

    </div>
  );
}
