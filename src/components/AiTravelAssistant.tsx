import { useState } from "react";
import { Sparkles, Send, Loader2, Calendar, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

interface AiTravelAssistantProps {
  onBookPlan: (planTitle: string, planSummary: string) => void;
}

export function AiTravelAssistant({ onBookPlan }: AiTravelAssistantProps) {
  const [prompt, setPrompt] = useState("");
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState("Standard");
  const [travelers, setTravelers] = useState(2);
  const [loading, setLoading] = useState(false);
  const [resultPlan, setResultPlan] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const samplePrompts = [
    "5-day romantic honeymoon with candlelight dinner & best sunset beach",
    "Family trip with kids and senior citizens who cannot swim",
    "Adventure-focused 6-day itinerary with scuba diving & night kayaking",
    "Baratang limestone caves & offbeat North Andaman road trip"
  ];

  const handleGenerate = async (customPrompt?: string) => {
    const textToUse = customPrompt || prompt;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToUse,
          days,
          travelers,
          budget,
          interests: textToUse || "Beaches, coral reefs, and relaxing vibes"
        })
      });

      const data = await response.json();
      if (data.success && data.plan) {
        setResultPlan(data.plan);
      } else {
        setError(data.error || "Unable to generate itinerary right now. Please try again.");
      }
    } catch (err) {
      console.error("AI Planner error:", err);
      setError("Network error while connecting to travel planner service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-guide" className="py-14 bg-gradient-to-b from-teal-50/50 to-white border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-semibold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>AI-Powered Local Itinerary Creator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Andaman Smart Travel Advisor
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Ask for a custom day-wise island schedule based on your travel dates, companion group, and specific dream activities.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-5 sm:p-7 shadow-lg border border-slate-200">
          
          {/* Quick Select Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5 pb-5 border-b border-slate-100 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Total Days</label>
              <select
                id="ai-days-select"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800"
              >
                <option value={3}>3 Days (Weekend Break)</option>
                <option value={4}>4 Days (Quick Escape)</option>
                <option value={5}>5 Days (Classic Island Trio)</option>
                <option value={6}>6 Days (Popular Vacation)</option>
                <option value={7}>7 Days (Deep Exploration)</option>
                <option value={8}>8 Days (Full Archipelago)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Travelers</label>
              <select
                id="ai-travelers-select"
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800"
              >
                <option value={1}>1 Traveler (Solo)</option>
                <option value={2}>2 Travelers (Couple / Honeymoon)</option>
                <option value={4}>4 Travelers (Family / Friends)</option>
                <option value={6}>6+ Travelers (Group)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Budget Preference</label>
              <select
                id="ai-budget-select"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800"
              >
                <option value="Budget">Standard (3★ Comfort)</option>
                <option value="Standard">Deluxe (4★ Beachfront)</option>
                <option value="Luxury">Luxury (5★ Premium Resort)</option>
              </select>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Tell us your preferences, special wishes, or questions:
            </label>
            <div className="flex gap-2">
              <input
                id="ai-prompt-input"
                type="text"
                placeholder="e.g., Honeymoon trip with scuba diving for non-swimmers and private candlelight dinner..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                id="ai-generate-btn"
                onClick={() => handleGenerate()}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-teal-600/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Planning...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Ideas Chips */}
          <div className="mt-3 flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] text-slate-400 font-medium mr-1">Try:</span>
            {samplePrompts.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(s);
                  handleGenerate(s);
                }}
                className="text-[11px] text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 px-2.5 py-1 rounded-lg transition-colors text-left"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Error display */}
          {error && (
            <div className="mt-4 p-3 bg-rose-50 text-rose-800 rounded-xl text-xs border border-rose-200">
              {error}
            </div>
          )}

          {/* AI Result Card */}
          {resultPlan && (
            <div className="mt-6 p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-teal-100 text-teal-900 mb-1">
                    <Sparkles className="w-3 h-3 text-teal-600" />
                    <span>Custom Generated Itinerary</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {resultPlan.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-xl">
                    {resultPlan.summary}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-400 font-medium">Estimated Budget</div>
                  <div className="text-lg font-extrabold text-teal-700 font-heading">
                    {resultPlan.estimatedCostPerPerson}
                  </div>
                  <span className="text-[10px] text-slate-400">/ person (approx)</span>
                </div>
              </div>

              {/* Day-by-day plan */}
              <div className="mt-5 space-y-4">
                {resultPlan.days?.map((d: any) => (
                  <div key={d.day} className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                          Day {d.day}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{d.title}</h4>
                      </div>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-teal-600" />
                        <span>Stay: {d.stay}</span>
                      </span>
                    </div>

                    <ul className="mt-2 space-y-1 text-xs text-slate-600">
                      {d.activities?.map((act: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Insider Tips */}
              {resultPlan.insiderTips && resultPlan.insiderTips.length > 0 && (
                <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200/70 text-xs">
                  <h5 className="font-bold text-amber-900 mb-1.5">Local Island Specialist Tips:</h5>
                  <ul className="space-y-1 text-amber-950 text-[11px]">
                    {resultPlan.insiderTips.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-end">
                <button
                  id="book-ai-plan-btn"
                  onClick={() => onBookPlan(resultPlan.title, resultPlan.summary)}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
                >
                  <span>Inquire with Andaman Dream Yatra for this Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
