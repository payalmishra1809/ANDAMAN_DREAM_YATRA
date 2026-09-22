import { useState, useMemo } from "react";
import { 
  Calculator, 
  Users, 
  Clock, 
  MapPin, 
  Hotel, 
  Waves, 
  ArrowRight, 
  Check, 
  Sparkles,
  Info
} from "lucide-react";

interface TripCostCalculatorProps {
  onPlanInquiry: (customDetails: {
    duration: string;
    adults: number;
    children: number;
    hotelTier: string;
    islands: string[];
    activities: string[];
    estimatedTotal: number;
    estimatedPerPerson: number;
    tripType: string;
  }) => void;
}

export function TripCostCalculator({ onPlanInquiry }: TripCostCalculatorProps) {
  const [nights, setNights] = useState<number>(5);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [tripType, setTripType] = useState<string>("Honeymoon");
  const [hotelTier, setHotelTier] = useState<string>("Deluxe");
  const [selectedIslands, setSelectedIslands] = useState<string[]>([
    "Port Blair", 
    "Havelock Island", 
    "Neil Island"
  ]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    "Scuba Diving",
    "Snorkelling"
  ]);

  const toggleIsland = (island: string) => {
    if (island === "Port Blair") return; // Port Blair is primary airport hub
    if (selectedIslands.includes(island)) {
      setSelectedIslands(selectedIslands.filter(i => i !== island));
    } else {
      setSelectedIslands([...selectedIslands, island]);
    }
  };

  const toggleActivity = (act: string) => {
    if (selectedActivities.includes(act)) {
      setSelectedActivities(selectedActivities.filter(a => a !== act));
    } else {
      setSelectedActivities([...selectedActivities, act]);
    }
  };

  // Calculation logic
  const calculation = useMemo(() => {
    const totalTravelers = adults + children * 0.7; // children 70% rate
    const totalRooms = Math.ceil(adults / 2);

    // Hotel rate per night per room
    const hotelRates: Record<string, number> = {
      Budget: 2400,
      Deluxe: 4800,
      Luxury: 9800
    };
    const roomRate = hotelRates[hotelTier] || 4800;
    const hotelCost = roomRate * totalRooms * nights;

    // Ferries & Transport
    let ferryPerPerson = 0;
    if (selectedIslands.includes("Havelock Island")) ferryPerPerson += 1850 * 2; // to and fro
    if (selectedIslands.includes("Neil Island")) ferryPerPerson += 1600;
    const totalFerryCost = ferryPerPerson * totalTravelers;

    // Road transport & private AC Cab
    const cabDailyCost = 2200;
    let extraRemoteCost = 0;
    if (selectedIslands.includes("Baratang Island")) extraRemoteCost += 4500;
    if (selectedIslands.includes("Diglipur")) extraRemoteCost += 9000;
    const transportCost = cabDailyCost * (nights + 1) + extraRemoteCost;

    // Activities cost
    const activityRates: Record<string, number> = {
      "Scuba Diving": 3500,
      "Parasailing": 3200,
      "Sea Kart": 3500,
      "Night Kayaking": 2500,
      "Semi-Submarine": 1850,
      "Snorkelling": 1000
    };
    let activityTotal = 0;
    selectedActivities.forEach(act => {
      activityTotal += (activityRates[act] || 0) * adults;
    });

    // Subtotal & taxes/permits
    const baseSubtotal = hotelCost + totalFerryCost + transportCost + activityTotal;
    const permitsAndAssistance = 1200 * totalTravelers;
    const total = Math.round(baseSubtotal + permitsAndAssistance);
    const perPerson = Math.round(total / (adults + (children > 0 ? children * 0.6 : 0)));

    return {
      hotelCost,
      totalFerryCost,
      transportCost,
      activityTotal,
      permitsAndAssistance,
      total,
      perPerson
    };
  }, [nights, adults, children, hotelTier, selectedIslands, selectedActivities]);

  const handleInquiry = () => {
    onPlanInquiry({
      duration: `${nights} Nights / ${nights + 1} Days`,
      adults,
      children,
      hotelTier: hotelTier === "Luxury" ? "5★ Luxury Resort" : hotelTier === "Deluxe" ? "4★ Beachfront Resort" : "3★ Standard Deluxe",
      islands: selectedIslands,
      activities: selectedActivities,
      estimatedTotal: calculation.total,
      estimatedPerPerson: calculation.perPerson,
      tripType
    });
  };

  const activityOptions = [
    { name: "Scuba Diving", price: 3500, desc: "PADI dive with underwater video" },
    { name: "Parasailing", price: 3200, desc: "300ft flight over Elephant Beach" },
    { name: "Sea Kart", price: 3500, desc: "Self-drive speed watercraft" },
    { name: "Night Kayaking", price: 2500, desc: "Glow in the dark bioluminescence" },
    { name: "Semi-Submarine", price: 1850, desc: "AC cabin reef observation" },
    { name: "Snorkelling", price: 1000, desc: "Guided coral reef swim" }
  ];

  return (
    <section id="calculator" className="py-14 bg-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Smart Trip Cost Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Design Your Custom Andaman Itinerary
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Configure your stay, island hops, hotel category, and water sports to see a realistic budget estimation in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Duration and Travelers */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>1. Duration & Travelers</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Duration */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Trip Duration</label>
                  <select
                    id="calc-duration-select"
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500"
                  >
                    <option value={3}>3 Nights / 4 Days (Quick)</option>
                    <option value={4}>4 Nights / 5 Days (Classic)</option>
                    <option value={5}>5 Nights / 6 Days (Popular)</option>
                    <option value={6}>6 Nights / 7 Days (Island Trio)</option>
                    <option value={7}>7 Nights / 8 Days (Explorer)</option>
                  </select>
                </div>

                {/* Adults */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Adults (12+ yrs)</label>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      min={1} 
                      max={20}
                      value={adults}
                      onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>

                {/* Children */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Kids (Below 12)</label>
                  <input 
                    type="number" 
                    min={0} 
                    max={10}
                    value={children}
                    onChange={(e) => setChildren(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Trip Archetype */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Holiday Archetype</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Honeymoon", "Family", "Adventure", "Friends / Solo"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTripType(type)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        tripType === type
                          ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hotel Tier */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Hotel className="w-4 h-4 text-teal-600" />
                <span>2. Hotel Accommodation Category</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: "Budget", title: "Standard 3★ Deluxe", desc: "Clean AC room, daily breakfast, prime central locations" },
                  { id: "Deluxe", title: "Beachfront 4★ Resort", desc: "Resort near beach, swimming pool, luxury buffet" },
                  { id: "Luxury", title: "5★ Premium / Villa", desc: "Private beach access, world-class spa, ocean view" }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setHotelTier(tier.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      hotelTier === tier.id
                        ? "bg-teal-50/80 border-teal-600 ring-2 ring-teal-500/20 text-teal-950 font-bold"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{tier.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-snug">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Island Selection */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>3. Select Islands to Include</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { name: "Port Blair", required: true, note: "Airport & Cellular Jail" },
                  { name: "Havelock Island", required: false, note: "Radhanagar & Scuba" },
                  { name: "Neil Island", required: false, note: "Natural Rock Bridge" },
                  { name: "Baratang Island", required: false, note: "Limestone Caves" },
                  { name: "Diglipur", required: false, note: "Ross & Smith Twin Island" }
                ].map((island) => {
                  const isChecked = selectedIslands.includes(island.name);
                  return (
                    <button
                      key={island.name}
                      type="button"
                      onClick={() => toggleIsland(island.name)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isChecked 
                          ? "bg-teal-50 border-teal-600 text-teal-900 font-bold ring-1 ring-teal-600" 
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs">{island.name}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-teal-600" />}
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal block">{island.note}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Water Sports Add-ons */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-teal-600" />
                <span>4. Optional Water Sports & Adventures</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activityOptions.map((act) => {
                  const isChecked = selectedActivities.includes(act.name);
                  return (
                    <button
                      key={act.name}
                      type="button"
                      onClick={() => toggleActivity(act.name)}
                      className={`p-2.5 rounded-xl border text-left flex items-start justify-between transition-all ${
                        isChecked 
                          ? "bg-teal-50 border-teal-600 text-teal-900 font-bold" 
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div>
                        <div className="text-xs">{act.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{act.desc}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-teal-700">+₹{act.price}</div>
                        {isChecked && <Check className="w-3.5 h-3.5 text-teal-600 ml-auto mt-0.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Pricing Summary Card (5 Cols Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-teal-400">
                    Live Cost Calculation
                  </span>
                  <h3 className="text-lg font-bold font-heading">Estimated Package Price</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <Calculator className="w-4 h-4" />
                </div>
              </div>

              {/* Breakdown */}
              <div className="py-4 space-y-2.5 text-xs border-b border-slate-800">
                <div className="flex justify-between text-slate-300">
                  <span>Hotel Stay ({nights} Nights, {Math.ceil(adults / 2)} Room(s)):</span>
                  <span className="font-semibold text-white">₹{calculation.hotelCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Inter-Island Transfers & Cruise:</span>
                  <span className="font-semibold text-white">₹{calculation.totalFerryCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Dedicated Private AC Vehicle & Transfers:</span>
                  <span className="font-semibold text-white">₹{calculation.transportCost.toLocaleString("en-IN")}</span>
                </div>
                {calculation.activityTotal > 0 && (
                  <div className="flex justify-between text-teal-300">
                    <span>Selected Water Sports ({selectedActivities.length}):</span>
                    <span className="font-semibold">₹{calculation.activityTotal.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>Port Permits, Entry Tickets & 24x7 Assistance:</span>
                  <span className="font-semibold text-white">₹{calculation.permitsAndAssistance.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Total Callout */}
              <div className="pt-4 pb-2">
                <div className="text-slate-400 text-xs">Estimated All-Inclusive Total</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-teal-300 font-heading">
                    ₹{calculation.total.toLocaleString("en-IN")}
                  </span>
                  <span className="text-slate-400 text-xs">
                    (approx ₹{calculation.perPerson.toLocaleString("en-IN")} / person)
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 flex items-start gap-1">
                  <Info className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>Includes GST, island permits, pickup/drops, and private catamaran tickets. Exact rates may vary based on seasonal peak dates.</span>
                </p>
              </div>

              {/* Submit CTA */}
              <button
                id="calc-submit-inquiry-btn"
                onClick={handleInquiry}
                className="w-full mt-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Request Detailed Quote for This Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 text-center">
                <span className="text-[11px] text-slate-500">
                  ✓ Free customization & no obligation quote within 2 hours
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
