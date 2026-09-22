import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  X, 
  Send, 
  Loader2, 
  MessageCircle, 
  Sparkles, 
  Phone, 
  Compass, 
  Check, 
  ChevronDown,
  Minimize2
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
  time: string;
}

interface AiCustomerChatbotProps {
  onOpenEnquiry: (packagePrefill?: string) => void;
}

export function AiCustomerChatbot({ onOpenEnquiry }: AiCustomerChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      text: "Namaste! 🙏 I am **Dweep AI**, your personal island travel assistant from **Andaman Dream Yatra**, Port Blair.\n\nAsk me anything about catamaran ferries, scuba diving, honeymoon plans, weather seasons, or customized itineraries!",
      time: "Just now"
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    "🤿 Can non-swimmers do scuba diving?",
    "🏖️ What are the top sights in Havelock & Neil?",
    "🏝️ Which is the best 5-day package?",
    "📋 Do Indians need a passport/permit?",
    "☀️ What is the best month to visit?"
  ];

  const handleSend = async (messageToSend?: string) => {
    const text = (messageToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      const data = await response.json();
      const botReply = data.reply || "I'm having trouble fetching that island detail right now. Please reach out to our Port Blair travel desk directly on WhatsApp at +91 95319 18146!";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "assistant",
          text: "I could not connect to the island guide network. You can speak directly with our tour managers at **+91 95319 18146**!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Bot Launcher Button */}
      {!isOpen && (
        <button
          id="open-ai-concierge-btn"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-16 sm:bottom-20 right-3 sm:right-6 z-40 bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-600 hover:to-cyan-600 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-full shadow-xl flex items-center gap-2 group transition-all duration-300 hover:scale-105 border-2 border-white/40"
          title="Ask Dweep AI Island Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-teal-900" />
          </div>
          <span className="text-xs font-bold hidden sm:inline-block font-sans tracking-wide">
            Ask Island AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          id="ai-chatbot-window"
          className="fixed bottom-14 sm:bottom-6 right-2 sm:right-6 z-50 w-[calc(100vw-16px)] sm:w-[390px] h-[520px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-cyan-800 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm font-heading tracking-wide">
                    Dweep AI Assistant
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-[10px] text-teal-200 font-medium block">
                  Andaman Dream Yatra • Port Blair Local Desk
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Info bar */}
          <div className="bg-teal-50 px-3.5 py-1.5 border-b border-teal-100 flex items-center justify-between text-[11px] text-teal-900 font-medium">
            <span>Direct Desk: +91 95319 18146</span>
            <a 
              href="https://wa.me/919531918146" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline font-bold flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/70 text-xs sm:text-[13px]">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed ${
                      isUser
                        ? "bg-teal-700 text-white rounded-br-none"
                        : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.text}</div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 bg-white border border-slate-200 px-3 py-2 rounded-2xl w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" />
                <span className="text-[11px] text-slate-600 font-medium">Thinking with island knowledge...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="text-[11px] bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-medium px-2.5 py-1 rounded-full whitespace-nowrap transition-colors flex-shrink-0 border border-slate-200"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about Andaman..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white disabled:opacity-40 transition-colors shadow-sm"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
