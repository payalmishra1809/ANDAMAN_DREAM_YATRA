import { useState } from "react";
import { BookOpen, ShieldAlert, HelpCircle, CheckSquare, Sun, ChevronDown, ChevronUp } from "lucide-react";
import { CANCELLATION_POLICY, ESSENTIAL_FAQS, PACKING_CHECKLIST } from "../data/guideData";

export function IslandGuideSection() {
  const [activeTab, setActiveTab] = useState<"cancellation" | "faqs" | "packing" | "weather">("cancellation");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="guide" className="py-14 bg-slate-50 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-2.5">
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>Essential Island Handbook</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Andaman Travel Guidelines & Policies
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Clear, transparent policies and insider tips to ensure an effortless tropical holiday.
          </p>

          {/* Guide Subtabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              id="guide-tab-cancellation"
              onClick={() => setActiveTab("cancellation")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "cancellation"
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Cancellation & Refunds</span>
            </button>

            <button
              id="guide-tab-faqs"
              onClick={() => setActiveTab("faqs")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "faqs"
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </button>

            <button
              id="guide-tab-packing"
              onClick={() => setActiveTab("packing")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "packing"
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Packing Checklist</span>
            </button>

            <button
              id="guide-tab-weather"
              onClick={() => setActiveTab("weather")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "weather"
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Best Season & Weather</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 text-slate-800 text-xs sm:text-sm">
          
          {/* 1. Cancellation Policy Panel */}
          {activeTab === "cancellation" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {CANCELLATION_POLICY.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {CANCELLATION_POLICY.subtitle}
                </p>
              </div>

              <div className="overflow-hidden border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                    <tr>
                      <th className="p-3">Notice Given Before Travel</th>
                      <th className="p-3">Cancellation Deduction</th>
                      <th className="p-3">Refund Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {CANCELLATION_POLICY.rules.map((rule, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="p-3 font-semibold text-slate-800">{rule.period}</td>
                        <td className="p-3 text-rose-700 font-medium">{rule.charge}</td>
                        <td className="p-3 text-emerald-700 font-medium">{rule.refund}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Weather Clause Callout */}
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-1">
                <h4 className="font-bold text-teal-900 text-xs flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-teal-600" />
                  <span>Weather & Cyclonic Disruption Guarantee</span>
                </h4>
                <p className="text-xs text-teal-950 leading-relaxed">
                  {CANCELLATION_POLICY.weatherClause}
                </p>
              </div>
            </div>
          )}

          {/* 2. FAQs Panel */}
          {activeTab === "faqs" && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-4">
                Andaman Travel Frequently Asked Questions
              </h3>
              {ESSENTIAL_FAQS.map((faq, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <div 
                    key={i} 
                    className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(i)}
                      className="w-full p-4 text-left flex items-center justify-between font-bold text-slate-900 hover:bg-slate-50 text-xs sm:text-sm"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-600 border-t border-slate-100 pt-3 leading-relaxed bg-slate-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 3. Packing Checklist Panel */}
          {activeTab === "packing" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  What to Pack for Your Andaman Island Vacation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Ensure a comfortable trip with this essential tropical island checklist
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PACKING_CHECKLIST.map((item, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-xs text-slate-700 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Weather Panel */}
          {activeTab === "weather" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Andaman Weather & Season Calendar
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Average temperatures range between 23°C to 31°C year-round with tropical breezes
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-xl">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-200 text-teal-900 uppercase">
                    Peak Season
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">October to May</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Sunny clear skies, calm sea conditions, 25m underwater coral visibility. Prime time for Scuba diving, island exploration, and beaches.
                  </p>
                </div>

                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 uppercase">
                    Monsoon Green
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">June to August</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Lush tropical vegetation and waterfalls at their peak. Budget travelers receive up to 40% hotel discounts. Water sports open conditionally.
                  </p>
                </div>

                <div className="p-4 bg-sky-50/80 border border-sky-200 rounded-xl">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-200 text-sky-900 uppercase">
                    Festive & Post-Monsoon
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">September</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Transition period with cooling breezes, fewer crowds, and pleasant early winter tropical sunshine.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
