import { Activity } from "../types";

export const ACTIVITIES: Activity[] = [
  {
    id: "scuba-diving",
    name: "Scuba Diving (Boat & Shore Dive)",
    slug: "scuba-diving",
    tagline: "Explore vibrant coral kingdoms, swim with sea turtles & clownfish with certified PADI/SSI divemasters",
    category: "Underwater",
    price: 3500,
    originalPrice: 4500,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    duration: "45 - 60 minutes underwater (approx 2 hrs total)",
    location: "Havelock Island (Nemo Reef) / Port Blair (North Bay) / Neil Island",
    depth: "8 to 12 meters",
    swimmingRequired: false,
    minAge: 10,
    badge: "Most Iconic Experience",
    description: "Discover Scuba Diving is Andaman's top-rated adventure. You do NOT need to know swimming! A dedicated 1-on-1 certified PADI/SSI instructor holds your hand throughout the entire underwater dive, guiding you safely through coral gardens, lionfish, sea anemones, and clownfish ('Nemo'). Includes high-definition underwater video and photos to take home.",
    inclusions: [
      "1-on-1 certified PADI / SSI Divemaster guidance",
      "Full dive equipment (Scuba tank, regulator, BCD, mask, fins & wetsuit)",
      "Shallow water breathing practice & safety briefing",
      "Complimentary HD underwater photos & video clip on your phone",
      "Comprehensive dive insurance coverage"
    ],
    safetyGuidelines: [
      "No prior swimming skills required for Discover Scuba (DSD).",
      "Minimum age is 10 years; physically fit individuals only.",
      "Must not fly in an aircraft within 18 hours after scuba diving.",
      "Individuals with asthma, recent cardiac conditions or pregnancy are not permitted to dive."
    ]
  },
  {
    id: "sea-kart",
    name: "Sea Kart Adventure (Exclusive in India)",
    slug: "sea-kart",
    tagline: "Self-drive your own high-speed watercraft across the open Andaman ocean",
    category: "Adventure",
    price: 3500,
    originalPrice: 4200,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
    duration: "30 minutes driving session",
    location: "Corbyn's Cove Beach, Port Blair",
    swimmingRequired: false,
    minAge: 18,
    badge: "India's 1st & Only",
    description: "Experience the adrenaline of piloting a Sea Kart — an innovative hybrid watercraft combining the speed of a jet ski with the safety and stability of an inflatable speed boat. Steer the wheel, throttle up to exhilarating speeds, and slice through ocean swells off Corbyn's Cove Beach.",
    inclusions: [
      "Self-drive Sea Kart session for 1 or 2 riders",
      "Certified ocean safety boat escort with rescue marshal",
      "Life jackets and safety helmets",
      "Pre-ride steering simulator instruction",
      "Action action photography"
    ],
    safetyGuidelines: [
      "Drivers must be 18+ years of age; passengers can be 6+ years accompanied by adult.",
      "Follow designated safety zone marked by buoys.",
      "Life jacket must be worn at all times."
    ]
  },
  {
    id: "parasailing",
    name: "High-Altitude Parasailing",
    slug: "parasailing",
    tagline: "Soar 300 feet above emerald blue waters with a panoramic bird's-eye view of islands",
    category: "Adventure",
    price: 3200,
    originalPrice: 3800,
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80",
    duration: "10 - 12 minutes in the air (30 mins boat time)",
    location: "Elephant Beach (Havelock) & Corbyn's Cove (Port Blair)",
    swimmingRequired: false,
    minAge: 8,
    badge: "High-Adrenaline",
    description: "Strap into a vibrant parachute harnessed to a state-of-the-art high-powered winch boat. As the boat accelerates across turquoise Andaman waters, you are lifted smoothly 300 feet into the tropical sky for an unforgettable 360-degree aerial perspective of the shoreline and coral beds. Features an optional gentle ocean dip!",
    inclusions: [
      "Modern winch boat launch and gentle deck retrieval",
      "US Coast Guard approved harnesses and life vests",
      "Optional refreshing ocean dip before returning to boat deck",
      "Action video recording option available"
    ],
    safetyGuidelines: [
      "Maximum combined weight limit per flight is 160 kg.",
      "Subject to wind speed and marine weather clearances.",
      "Safe and suitable for beginners and non-swimmers."
    ]
  },
  {
    id: "kayaking",
    name: "Night Bioluminescent & Mangrove Kayaking",
    slug: "kayaking",
    tagline: "Paddle through glowing bioluminescent sea waters or peaceful mangrove creeks",
    category: "Boating & Eco",
    price: 2500,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    duration: "90 minutes guided paddling tour",
    location: "Havelock Island (Mangrove Creeks)",
    swimmingRequired: false,
    minAge: 6,
    badge: "Magical Night Experience",
    description: "Paddle your tandem sea kayak under starlit tropical skies as each paddle stroke illuminates the water with thousands of shimmering, bioluminescent marine plankton. Alternatively, take the morning tour through calm, cathedral-like mangrove creek tunnels alive with tropical kingfishers and mudskippers.",
    inclusions: [
      "Tandem / Single Sit-on-Top recreational kayak & lightweight paddle",
      "Certified marine ecologist / kayak guide",
      "Waterproof dry bag for phone & keys",
      "High-grade buoyancy aids and headlamps"
    ],
    safetyGuidelines: [
      "Night tours operate during low moon phases for optimal bioluminescence visibility.",
      "Suitable for families and couples; completely calm and sheltered waters."
    ]
  },
  {
    id: "coral-safari-semi-submarine",
    name: "Coral Safari Semi-Submarine",
    slug: "coral-safari-semi-submarine",
    tagline: "Underwater coral reef exploration in a 100-seater air-conditioned viewing cabin",
    category: "Underwater",
    price: 1850,
    originalPrice: 2200,
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
    duration: "60 minutes voyage",
    location: "Port Blair (North Bay / Ross Island Reefs)",
    swimmingRequired: false,
    minAge: 2,
    badge: "Perfect for Families & Seniors",
    description: "Designed for all age groups, the Coral Safari Semi-Submarine lets you enter a spacious, fully air-conditioned underwater observation deck surrounded by giant 45-degree angled glass windows submerged deep in the sea. Watch hundreds of exotic fish, sea turtles, and living coral walls without getting a drop of water on your clothes!",
    inclusions: [
      "60-minute cruise in AC submerged observation chamber",
      "Expert marine biologist commentary explaining coral ecosystems",
      "Panoramic views of North Bay coral gardens",
      "Safe and accessible for toddlers and elderly family members"
    ],
    safetyGuidelines: [
      "No water contact; 100% dry and comfortable.",
      "Accessible for senior citizens and young kids.",
      "Safe boarding jetty with assistance."
    ]
  },
  {
    id: "submersible-scooter",
    name: "Underwater Submersible Scooter Dive",
    slug: "submersible-scooter",
    tagline: "Drive your own underwater electric scooter with a 360° clear dome helmet",
    category: "Underwater",
    price: 3500,
    originalPrice: 4200,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    duration: "20 minutes underwater ride",
    location: "North Bay Island, Port Blair",
    depth: "3 to 5 meters",
    swimmingRequired: false,
    minAge: 12,
    badge: "Futuristic Dive",
    description: "Sit comfortably on a motorized underwater scooter equipped with a large, dry clear dome helmet supplied with continuous fresh air. Your head and shoulders stay completely dry, allowing you to wear prescription glasses or makeup while steering effortlessly among colorful reef fish!",
    inclusions: [
      "Self-steered underwater scooter ride",
      "Continuous surface-supplied fresh oxygen dome",
      "Accompanying safety scuba diver holding your vehicle",
      "Digital photos of your underwater ride"
    ],
    safetyGuidelines: [
      "Non-swimmers can easily participate.",
      "Minimum height requirement is 4 feet (120 cm).",
      "Easy equalizing technique taught prior to descent."
    ]
  },
  {
    id: "snorkelling",
    name: "Guided Coral Snorkelling",
    slug: "snorkelling",
    tagline: "Float effortlessly over shallow vibrant reef gardens and spot tropical marine fauna",
    category: "Underwater",
    price: 1000,
    originalPrice: 1500,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    duration: "30 minutes guided snorkelling",
    location: "Elephant Beach (Havelock), Bharatpur Beach (Neil), North Bay (Port Blair)",
    swimmingRequired: false,
    minAge: 5,
    badge: "Classic Must-Do",
    description: "Equipped with a sanitized snorkel mask and life jacket, float above crystal shallow coral gardens with a dedicated guide holding your life ring. Gaze down into an astonishing underwater world of parrotfish, butterflyfish, brain corals, and sea stars.",
    inclusions: [
      "Sanitized silicone snorkel mask, breathing tube and fins",
      "High-buoyancy life vest",
      "Personal safety escort holding safety ring",
      "Guidance to the best live coral spots"
    ],
    safetyGuidelines: [
      "Never touch or step on living corals to protect fragile reefs.",
      "100% safe for first-time non-swimmers."
    ]
  }
];
