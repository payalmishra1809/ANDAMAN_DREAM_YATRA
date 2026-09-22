import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory + file persistence for enquiries
interface EnquiryRecord {
  id: string;
  bookingReference: string;
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  duration?: string;
  adults: number;
  children: number;
  packageId?: string;
  packageName?: string;
  destination?: string;
  activities?: string[];
  hotelCategory?: string;
  estimatedBudget?: string;
  specialRequests?: string;
  tripType?: string;
  status: "Pending" | "Contacted" | "Confirmed";
  createdAt: string;
}

const dataDir = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataDir, "enquiries.json");

function ensureDataStorage(): EnquiryRecord[] {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
      const initialData: EnquiryRecord[] = [
        {
          id: "enq-sample-1",
          bookingReference: "ADY-2026-8492",
          name: "Dr. Vikram Sharma",
          email: "vikram.sharma@example.com",
          phone: "+91 98201 54321",
          travelDate: "2026-11-15",
          duration: "5 Nights / 6 Days",
          adults: 2,
          children: 0,
          packageName: "Romantic Andaman Honeymoon",
          hotelCategory: "Luxury Beachfront Resort",
          status: "Confirmed",
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        }
      ];
      fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const raw = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading data file:", err);
    return [];
  }
}

function saveEnquiries(records: EnquiryRecord[]) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(records, null, 2));
  } catch (err) {
    console.error("Error writing data file:", err);
  }
}

// Lazy Gemini client initialization
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey });
  }
  return genAIClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Andaman Dream Yatra Server",
    timestamp: new Date().toISOString()
  });
});

// GET all enquiries
app.get("/api/enquiry", (req, res) => {
  const records = ensureDataStorage();
  res.json({ success: true, enquiries: records });
});

// POST new enquiry / booking request
app.post("/api/enquiry", (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      travelDate,
      duration,
      adults = 2,
      children = 0,
      packageId,
      packageName,
      destination,
      activities,
      hotelCategory,
      estimatedBudget,
      specialRequests,
      tripType
    } = req.body;

    if (!name || (!email && !phone)) {
      res.status(400).json({
        success: false,
        error: "Name and at least one contact method (email or phone) are required."
      });
      return;
    }

    const records = ensureDataStorage();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingReference = `ADY-2026-${randomCode}`;

    const newRecord: EnquiryRecord = {
      id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      bookingReference,
      name: String(name).trim(),
      email: email ? String(email).trim() : "",
      phone: phone ? String(phone).trim() : "",
      travelDate: travelDate || new Date().toISOString().split("T")[0],
      duration: duration || "5 Nights / 6 Days",
      adults: Number(adults) || 2,
      children: Number(children) || 0,
      packageId,
      packageName: packageName || "Custom Island Itinerary",
      destination,
      activities: Array.isArray(activities) ? activities : [],
      hotelCategory: hotelCategory || "Standard 3-Star Deluxe",
      estimatedBudget,
      specialRequests: specialRequests ? String(specialRequests).trim() : "",
      tripType: tripType || "Leisure",
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    records.unshift(newRecord);
    saveEnquiries(records);

    res.status(201).json({
      success: true,
      message: "Your enquiry has been received! Our Andaman local travel specialist will contact you within 2 business hours.",
      bookingReference,
      enquiry: newRecord
    });
  } catch (error) {
    console.error("Failed to save enquiry:", error);
    res.status(500).json({ success: false, error: "Internal server error saving enquiry" });
  }
});

// AI Travel Planner endpoint
app.post("/api/ai-planner", async (req, res) => {
  try {
    const { prompt, days, travelers, budget, interests } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Fallback structured smart response when GEMINI_API_KEY is not configured
      const dayCount = days || 5;
      const fallbackPlan = {
        title: `${dayCount}-Day Curated Andaman Island Expedition`,
        summary: `Tailored for ${travelers || "2 travelers"} focusing on ${interests || "beaches, coral reefs, and water sports"}. Designed by Andaman Dream Yatra local experts.`,
        days: [
          {
            day: 1,
            title: "Arrival in Port Blair & Historic Cellular Jail",
            activities: [
              "Airport pickup in private AC cab by Andaman Dream Yatra chauffeur",
              "Check-in at sea-view Port Blair hotel & freshen up",
              "Afternoon visit to historic Cellular Jail National Memorial",
              "Witness the moving Sound & Light Show detailing Indian freedom fighters",
              "Evening walk at Marina Park and local seafood dinner"
            ],
            stay: "Port Blair"
          },
          {
            day: 2,
            title: "Private High-Speed Ferry to Havelock Island (Swaraj Dweep)",
            activities: [
              "Morning boarding on Makruzz / Nautika premium catamaran to Havelock",
              "Scenic 90-minute blue water cruise across Ritchie's Archipelago",
              "Check-in at beachside resort",
              "Afternoon visit to world-famous Radhanagar Beach (Asia's #1 Blue Flag Beach)",
              "Spectacular sunset photography & barefoot stroll along pristine white powder sands"
            ],
            stay: "Havelock Island"
          },
          {
            day: 3,
            title: "Elephant Beach Coral Reef Snorkelling & Water Sports",
            activities: [
              "Speedboat ride to Elephant Beach",
              "Complimentary guided snorkelling session over vibrant live coral beds",
              "Optional Sea Kart / Scuba Diving / Parasailing adventure",
              "Relaxation at Kalapathar Beach with turquoise waters and driftwood scenery",
              "Optional evening bioluminescence night kayaking through mangrove lagoons"
            ],
            stay: "Havelock Island"
          },
          {
            day: 4,
            title: "Inter-Island Ferry to Neil Island (Shaheed Dweep)",
            activities: [
              "Morning luxury ferry transfer to serene Neil Island",
              "Visit the natural geological wonder: Howrah Bridge (Natural Rock Formation)",
              "Explore Bharatpur Beach (best shallow waters for glass-bottom boat & reef walks)",
              "Sunset viewing at Laxmanpur Beach with vibrant evening sky"
            ],
            stay: "Neil Island"
          },
          {
            day: 5,
            title: "Return to Port Blair & Souvenir Shopping",
            activities: [
              "Morning ferry back to Port Blair",
              "Visit Sagarika Government Handicraft Emporium for authentic pearl and shell artifacts",
              "Chidiyatapu sunset point / Corbyn's Cove beach leisure",
              "Farewell dinner with fresh Andaman crab & seafood"
            ],
            stay: "Port Blair"
          }
        ],
        insiderTips: [
          "Always book morning ferry slots (8:00 AM - 9:30 AM) for calmer seas and full-day island exploration.",
          "Mobile networks: Airtel and BSNL have the most consistent 4G/5G coverage in Havelock and Neil.",
          "Keep physical government photo IDs handy for all jetty boarding and island checkpoints.",
          "Pre-book water sports slots during peak season (Oct-April) to avoid spot price surges."
        ],
        estimatedCostPerPerson: budget === "Luxury" ? "₹38,500 - ₹48,000" : budget === "Standard" ? "₹24,500 - ₹32,000" : "₹16,500 - ₹22,000"
      };

      res.json({ success: true, plan: fallbackPlan, source: "curated_expert" });
      return;
    }

    const systemInstruction = `You are the chief itinerary designer at Andaman Dream Yatra, the premier local tour operator in Port Blair, Andaman & Nicobar Islands.
Provide a high-quality, practical, realistic day-wise Andaman travel plan in valid JSON format.
Include realistic ferry travel logistics (Port Blair, Havelock, Neil, Baratang), timing, local attractions (Radhanagar, Elephant Beach, Cellular Jail, Natural Bridge, Limestone Caves), and safety tips.
Return only a JSON object matching this schema:
{
  "title": "string",
  "summary": "string",
  "days": [
    {
      "day": number,
      "title": "string",
      "activities": ["string"],
      "stay": "string"
    }
  ],
  "insiderTips": ["string"],
  "estimatedCostPerPerson": "string"
}`;

    const userPrompt = `Create an Andaman trip plan for ${days || 5} days, for ${travelers || 2} travelers.
Budget preference: ${budget || "Standard"}.
Interests: ${interests || "Beaches, snorkelling, history, relaxed pace"}.
Special requests or prompt: ${prompt || "First time in Andaman"}.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json"
      }
    });

    const text = response.text?.trim() || "{}";
    const parsed = JSON.parse(text);
    res.json({ success: true, plan: parsed, source: "gemini" });
  } catch (error) {
    console.error("AI Planner error, serving expert itinerary fallback:", error);
    const dayCount = req.body?.days || 5;
    const travelers = req.body?.travelers || 2;
    const interests = req.body?.interests || "beaches, coral reefs, and water sports";
    const budget = req.body?.budget || "Standard";

    const fallbackPlan = {
      title: `${dayCount}-Day Signature Andaman Island Explorer`,
      summary: `Carefully crafted for ${travelers} travelers focusing on ${interests}. Optimized by Andaman Dream Yatra local ground team for relaxed ferry transfers and top highlights.`,
      days: [
        {
          day: 1,
          title: "Arrival in Port Blair & Cellular Jail Memorial",
          activities: [
            "Veer Savarkar International Airport pickup by private AC cab",
            "Hotel check-in and sea-view refreshment",
            "Cellular Jail National Memorial guided tour",
            "Mesmerizing Sound & Light Show recounting the saga of freedom fighters",
            "Evening waterfront stroll at Aberdeen Marina Park"
          ],
          stay: "Port Blair"
        },
        {
          day: 2,
          title: "High-Speed Catamaran Cruise to Havelock Island",
          activities: [
            "Morning cruise on Makruzz or Nautika catamaran across open seas (90 mins)",
            "Check-in at beachfront resort",
            "Afternoon excursion to world-renowned Radhanagar Beach (Beach No. 7)",
            "Golden sunset over turquoise Andaman sea & calm swimming waters"
          ],
          stay: "Havelock Island"
        },
        {
          day: 3,
          title: "Elephant Beach Coral Reef Exploration & Water Thrills",
          activities: [
            "Speedboat journey to Elephant Beach coral reef zone",
            "Guided snorkelling over live corals with marine life sightings",
            "Optional Discover Scuba Diving session with certified PADI divemaster",
            "Visit Kalapathar Beach with black volcanic rocks and azure sea waters",
            "Optional night kayaking through mangrove channels with bioluminescence"
          ],
          stay: "Havelock Island"
        },
        {
          day: 4,
          title: "Ferry to Neil Island & Natural Rock Formations",
          activities: [
            "Scenic morning ferry transfer to peaceful Neil Island (Shaheed Dweep)",
            "Explore the iconic Howrah Bridge Natural Geological Rock Formation",
            "Reef exploration and glass-bottom boating at Bharatpur Beach",
            "Spectacular pastel sunset at Laxmanpur Beach"
          ],
          stay: "Neil Island"
        },
        {
          day: 5,
          title: "Return to Port Blair & Local Island Souvenirs",
          activities: [
            "Morning ferry sailing back to Port Blair",
            "Visit Sagarika Government Emporium for pearls, shells, and wooden artifacts",
            "Panoramic sunset view from Chidiyatapu (Bird Island)",
            "Farewell seafood dinner at an ocean-side deck"
          ],
          stay: "Port Blair"
        }
      ],
      insiderTips: [
        "Pre-book morning ferry departures (around 08:30 AM) to maximize daylight on the islands.",
        "Airtel and BSNL provide the strongest mobile network connectivity across Havelock and Neil.",
        "Always keep government-issued photo ID handy for jetty security check-ins.",
        "Advance booking for scuba diving and sea kart guarantees your preferred morning dive window."
      ],
      estimatedCostPerPerson: budget === "Luxury" ? "₹38,500 - ₹48,000" : budget === "Standard" ? "₹24,500 - ₹32,000" : "₹16,500 - ₹22,000"
    };

    res.json({ success: true, plan: fallbackPlan, source: "curated_expert" });
  }
});

// AI Chatbot endpoint for floating concierge assistant
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ success: false, error: "Message is required" });
      return;
    }

    const ai = getGenAI();
    if (ai) {
      const systemInstruction = `You are "Dweep AI", the friendly, knowledgeable local island concierge for "Andaman Dream Yatra", based in Port Blair, Andaman & Nicobar Islands.
Company Details:
- Contact Phone/WhatsApp: +91 95319 18146
- Email: andamandreamyatra@gmail.com
- Head Office: Mother Teressa Colony, Near DBRAIT, Dollygunj, Port Blair, 744103
- Core Offerings: Curated Andaman Tour Packages, High-Speed Luxury Catamaran Ferries (Makruzz & Nautika), PADI Scuba Diving (₹3,500), Sea Kart (₹3,500), Parasailing (₹3,200), Snorkelling (₹1,000), Candlelight dinners, and customized family/honeymoon holidays.

Instructions:
- Keep answers warm, practical, concise, and helpful (2-3 short paragraphs or bullet points).
- For Indian travelers: No passport/permit needed; standard Govt Photo ID (Aadhar/Voter ID) suffices.
- Best time to visit: October to May (calm azure waters, sunny skies).
- Encourage them to request a free quote or chat on WhatsApp (+91 95319 18146).`;

      const contents = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          contents.push({
            role: item.role === "assistant" ? "model" : "user",
            parts: [{ text: item.text }]
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction,
          maxOutputTokens: 500,
          temperature: 0.7
        }
      });

      const reply = response.text?.trim() || "I'm here to help you plan your ideal Andaman getaway! Feel free to ask about ferries, beaches, scuba diving, or tour packages.";
      res.json({ success: true, reply });
      return;
    }
  } catch (err) {
    console.error("AI Chatbot error, using local fallback response:", err);
  }

  // Smart local expert response engine
  const q = String(req.body?.message || "").toLowerCase();
  let reply = "Hello! I am your Andaman Dream Yatra local advisor. How can I help you plan your island holiday? Feel free to ask about packages, top sightseeing, scuba diving, or best seasons!";

  if (q.includes("scuba") || q.includes("dive") || q.includes("swim")) {
    reply = "🤿 Scuba Diving in Andaman is 100% beginner-friendly! You do NOT need to know swimming. We provide 1:1 certified PADI divemasters at Elephant Beach (Havelock) and Nemo Reef with underwater video/photo included (₹3,500 per person). Maximum depth is 8-12 meters with full safety gear.";
  } else if (q.includes("cruise") || q.includes("travel") || q.includes("reach havelock")) {
    reply = "🚢 Inter-island travel between Port Blair, Havelock, and Neil takes only 90 minutes. We provide confirmed tickets with pickup transfers. Morning departures (08:00 AM) are best for smooth sailing!";
  } else if (q.includes("honeymoon") || q.includes("romantic") || q.includes("couple")) {
    reply = "🏝️ Our Romantic Honeymoon package (6D/5N or 7D/6N) is our top pick! It includes beachfront resort stays, sunset walks at Radhanagar Beach, private candlelight beach dinners, decorated flowers, and sunset views at Neil Island. Message us on WhatsApp (+91 95319 18146) for custom couple packages.";
  } else if (q.includes("best time") || q.includes("weather") || q.includes("season") || q.includes("month")) {
    reply = "☀️ The peak season to visit Andaman is October to May when skies are crystal blue, waters are calm, and coral visibility reaches up to 25 meters! Monsoon (June-August) brings lush green forests and attractive hotel discounts.";
  } else if (q.includes("permit") || q.includes("passport") || q.includes("document") || q.includes("id")) {
    reply = "📋 For Indian citizens, NO passport or special permit is required to visit Andaman! Just bring a valid government photo ID (Aadhar Card, Driving License, or Voter ID). Foreign tourists receive complimentary entry permits on arrival at Port Blair airport.";
  } else if (q.includes("price") || q.includes("cost") || q.includes("budget") || q.includes("rate")) {
    reply = "💰 Our transparent all-inclusive tour packages start from ₹12,999/person (4D/3N Budget), ₹16,999/person (5D/4N Classic), and ₹22,500/person (6D/5N Island Trio). Every package covers verified beachfront AC hotels, private cabs, transfers, and island entry permits.";
  } else if (q.includes("contact") || q.includes("phone") || q.includes("whatsapp") || q.includes("call") || q.includes("number")) {
    reply = "📞 You can reach our Port Blair operations desk directly at +91 95319 18146 (call or WhatsApp) or email andamandreamyatra@gmail.com. Our office is located at Mother Teressa Colony, Near DBRAIT, Dollygunj, Port Blair!";
  }

  res.json({ success: true, reply });
});

// Vite middleware in dev or static files in prod
async function setupApp() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Andaman Dream Yatra server running at http://0.0.0.0:${PORT}`);
  });
}

setupApp();
