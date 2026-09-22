import { useState, useEffect } from "react";
import { Sparkles, X, ChevronRight, Lightbulb, Share2, Compass, Check } from "lucide-react";

export const ANDAMAN_FACTS = [
  {
    id: 1,
    category: "Currency & History",
    title: "The ₹20 Indian Note Landmark",
    fact: "The picturesque tropical lighthouse and palm-fringed coast illustrated on the reverse side of the classic Indian ₹20 currency note is the North Bay Lighthouse near Port Blair!",
    tag: "Port Blair • North Bay",
    highlight: "Featured on millions of wallets across India"
  },
  {
    id: 2,
    category: "Natural Marvel",
    title: "South Asia's Only Active Volcano",
    fact: "Barren Island, situated 138 km northeast of Port Blair in the Andaman Sea, is the only confirmed active volcano in South Asia. Its caldera rises from an oceanic depth of 2,250 meters!",
    tag: "Barren Island • Scuba Hotspot",
    highlight: "Pristine black volcanic sand underwater"
  },
  {
    id: 3,
    category: "State Animal",
    title: "The Gentle Sea Cow (Dugong)",
    fact: "The state animal of Andaman & Nicobar is the Dugong (Sea Cow)—a gentle, peaceful herbivorous marine mammal that grazes on underwater sea-grass meadows around Ritchie's Archipelago.",
    tag: "Neil & Havelock Waters",
    highlight: "Strictly protected marine reserve species"
  },
  {
    id: 4,
    category: "Marine Wildlife",
    title: "Giant Leatherback Turtle Sanctuary",
    fact: "Kalipur Beach & Ramnagar Beach in North Andaman (Diglipur) form one of the rarest nesting havens in the world where 4 distinct species of sea turtles nest, including the 700 kg Giant Leatherback!",
    tag: "Diglipur • Kalipur Beach",
    highlight: "Mass hatching witnessed Dec to March"
  },
  {
    id: 5,
    category: "Geography",
    title: "572 Tropical Islands, Only 38 Inhabited",
    fact: "The Andaman and Nicobar archipelago comprises 572 emerald islands, islets, and rocky outcrops spanning over 800 km in the Bay of Bengal. However, only 38 of these islands are inhabited by humans!",
    tag: "800 km Archipelago",
    highlight: "90% virgin protected tropical rainforest"
  },
  {
    id: 6,
    category: "Global Fame",
    title: "Asia's #1 Ranked Beach",
    fact: "Radhanagar Beach (Beach No. 7) on Havelock Island was voted 'Asia's Best Beach' by TIME Magazine and is celebrated worldwide for its powdery white sand, turquoise waters, and Blue Flag eco-certification.",
    tag: "Havelock (Swaraj Dweep)",
    highlight: "Zero coral rocks on barefoot entry"
  },
  {
    id: 7,
    category: "Night Wonder",
    title: "Glowing Electric-Blue Waters",
    fact: "During moonless nights in Havelock's mangrove lagoons, moving your kayak paddle triggers millions of bioluminescent phytoplankton that flash with luminous neon-blue fairy dust in the water!",
    tag: "Havelock Island Kayaking",
    highlight: "Best experienced Oct to April"
  },
  {
    id: 8,
    category: "Wildlife Giant",
    title: "The Coconut-Cracking Robber Crab",
    fact: "The Coconut Crab (Birgus latro), the largest land-living arthropod on planet Earth weighing up to 4 kg, inhabits the remote South Sentinel island. They can climb tall palm trees and crack open fresh coconuts!",
    tag: "Sentinel Wildlife Sanctuary",
    highlight: "Can live over 60 years"
  }
];

export function DidYouKnowModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasShared, setHasShared] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  // Keep minimized by default to prevent overlapping user content

  const currentFact = ANDAMAN_FACTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANDAMAN_FACTS.length);
    setHasShared(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ANDAMAN_FACTS.length) % ANDAMAN_FACTS.length);
    setHasShared(false);
  };

  const handleShare = () => {
    const text = `Did you know this about Andaman? 🏝️\n\n"${currentFact.title}"\n${currentFact.fact}\n\nDiscovered via Andaman Dream Yatra!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setHasShared(true);
      setTimeout(() => setHasShared(false), 2000);
    }
  };

  return (
    <>
      {/* Minimized Floating Pill on bottom left */}
      {isMinimized && (
        <button
          id="did-you-know-pill"
          onClick={() => {
            setIsMinimized(false);
            setIsOpen(true);
          }}
          className="hidden md:flex fixed bottom-6 left-6 z-30 bg-white/95 hover:bg-white text-slate-900 px-3.5 py-2 rounded-full shadow-lg border border-teal-200/80 backdrop-blur-md transition-all duration-300 items-center gap-2 group hover:scale-105 hover:border-teal-500"
        >
          <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-sm">
            💡
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block leading-none">
              Did You Know?
            </span>
            <span className="text-xs font-semibold text-slate-800 line-clamp-1 max-w-[170px] sm:max-w-[200px]">
              {currentFact.title}
            </span>
          </div>
          <span className="text-[10px] bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded font-bold border border-teal-200">
            Fact #{currentFact.id}
          </span>
        </button>
      )}

      {/* Floating Popup Card (Non-blocking or full modal) */}
      {!isMinimized && (
        <div className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 max-w-sm sm:max-w-md w-[calc(100vw-32px)] sm:w-full animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border-2 border-teal-500/30 overflow-hidden relative text-slate-800">
            
            {/* Top decorative gradient strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-teal-500 to-cyan-500" />
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-sm shadow-sm">
                  💡
                </span>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-800 font-heading">
                    Did You Know? • Andaman Trivia
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Fact {currentIndex + 1} of {ANDAMAN_FACTS.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="w-7 h-7 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
                  title="Minimize"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Fact Body */}
            <div className="py-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {currentFact.category}
                </span>
                <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                  <Compass className="w-3 h-3 text-teal-600" />
                  <span>{currentFact.tag}</span>
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading leading-snug">
                {currentFact.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {currentFact.fact}
              </p>

              <div className="p-2 bg-teal-50/70 border border-teal-200/80 rounded-xl text-[11px] text-teal-900 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                <span>{currentFact.highlight}</span>
              </div>
            </div>

            {/* Footer Navigation Controls */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleShare}
                className="text-xs font-semibold text-slate-600 hover:text-teal-700 flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-50 transition-colors"
                title="Copy fact"
              >
                {hasShared ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 text-[11px]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Copy Fact</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-3 py-1 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-all flex items-center gap-1"
                >
                  <span>Next Fact</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
