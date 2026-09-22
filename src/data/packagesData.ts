import { TourPackage } from "../types";

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "pkg-romantic-honeymoon",
    name: "Romantic Andaman Honeymoon Special",
    tagline: "Candlelight beach dinners, private cab, luxury beachfront resort & sunset cruise",
    duration: "5 Nights / 6 Days",
    nights: 5,
    days: 6,
    pricePerPerson: 27999,
    originalPrice: 34500,
    badge: "Most Popular Honeymoon",
    rating: 4.96,
    reviewsCount: 428,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    islands: ["Port Blair", "Havelock Island", "Neil Island"],
    category: "Honeymoon",
    hotelCategory: "4★ Beachfront Luxury Resort with Private Balcony",
    highlights: [
      "Romantic Candlelight Dinner on private beach under stars",
      "Special Honeymoon Suite floral bed setup & welcoming wine/cake",
      "Sunset photoshoot at Asia's Best Radhanagar Beach",
      "High-speed luxury catamaran cruise (Makruzz / Nautika)",
      "Elephant beach complimentary snorkelling session for two"
    ],
    inclusions: [
      "5 Nights accommodation in 4★ premium beach resorts",
      "Daily breakfast & romantic beachside candlelight dinner",
      "All inter-island transfers in AC Private Catamaran (Makruzz/Nautika)",
      "Private AC Sedan for all sightseeing & airport transfers",
      "Entry tickets & boat permits for Cellular Jail, Radhanagar, Elephant Beach & Neil Island",
      "Complimentary honeymoon cake & floral decor on arrival night",
      "24x7 local tour coordinator on standby in Port Blair & Havelock"
    ],
    exclusions: [
      "Airfare to/from Port Blair (IXZ)",
      "Lunches and non-specified dinners",
      "Scuba diving / Parasailing (can be discounted as add-ons)",
      "Personal expenses, camera permits and laundry"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Port Blair & Cellular Jail Light & Sound Show",
        island: "Port Blair",
        activities: [
          "Warm welcome at Veer Savarkar Airport (IXZ) & private transfer to hotel",
          "Check-in and leisure morning to relax after your flight",
          "Afternoon visit to historic Cellular Jail National Memorial",
          "Evening VIP seats for the moving Cellular Jail Light & Sound Show",
          "Romantic seaside dinner in Port Blair"
        ],
        meals: "Dinner Included"
      },
      {
        day: 2,
        title: "Cruise to Havelock Island & Radhanagar Beach Sunset",
        island: "Havelock Island",
        activities: [
          "Morning high-speed luxury catamaran ferry to Havelock Island (Swaraj Dweep)",
          "Scenic 90-minute voyage through Ritchie's Archipelago turquoise waters",
          "Check-in at premium beach resort nestled along coconut groves",
          "Late afternoon visit to world-famous Radhanagar Beach (Beach No. 7 - Blue Flag)",
          "Breathtaking Andaman sunset over the Bay of Bengal and beach stroll"
        ],
        meals: "Breakfast & Dinner Included"
      },
      {
        day: 3,
        title: "Elephant Beach Coral Reef Snorkelling & Candlelight Dinner",
        island: "Havelock Island",
        activities: [
          "Speedboat cruise to Elephant Beach, known for shallow alive coral reefs",
          "Guided snorkelling session with certified divemaster (included for couple)",
          "Optional underwater Sea Kart or Sea Walk adventure",
          "Evening romantic 4-course Candlelight Dinner on the private resort beach"
        ],
        meals: "Breakfast & Romantic Candlelight Dinner Included"
      },
      {
        day: 4,
        title: "Ferry to Neil Island (Shaheed Dweep) & Natural Rock Bridge",
        island: "Neil Island",
        activities: [
          "Morning catamaran ferry to the tranquil and rustic Neil Island",
          "Visit the natural geological wonder: Howrah Bridge (Natural Rock Formations)",
          "Relax at shallow crystal waters of Bharatpur Beach",
          "Golden hour sunset watching at Laxmanpur Beach"
        ],
        meals: "Breakfast & Dinner Included"
      },
      {
        day: 5,
        title: "Neil to Port Blair & Chidiyatapu Sunset Point",
        island: "Port Blair",
        activities: [
          "Morning ferry back to Port Blair",
          "Afternoon scenic drive to Chidiyatapu (Bird Island) through coastal rainforests",
          "Spectacular sunset viewing at Munda Pahar beach point",
          "Shopping at Sagarika Government Handicrafts Emporium for pearls & shells"
        ],
        meals: "Breakfast & Dinner Included"
      },
      {
        day: 6,
        title: "Farewell Andaman & Airport Drop",
        island: "Port Blair",
        activities: [
          "Delicious breakfast and check-out",
          "Private airport transfer with sweet Andaman souvenirs and unforgettable memories"
        ],
        meals: "Breakfast Included"
      }
    ]
  },
  {
    id: "pkg-classic-family",
    name: "Classic Andaman Island Trio",
    tagline: "Best family holiday covering Port Blair, Havelock & Neil Island with comfort",
    duration: "4 Nights / 5 Days",
    nights: 4,
    days: 5,
    pricePerPerson: 18999,
    originalPrice: 23999,
    badge: "Bestseller",
    rating: 4.92,
    reviewsCount: 654,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    islands: ["Port Blair", "Havelock Island", "Neil Island"],
    category: "Family",
    hotelCategory: "Comfort 3★/4★ Deluxe Resorts with Swimming Pool",
    highlights: [
      "Covers all 3 primary Andaman islands smoothly with zero travel stress",
      "Guaranteed premium Catamaran ferry tickets (Makruzz/Green Ocean)",
      "Visit Cellular Jail, Radhanagar Beach, Elephant Beach & Natural Bridge",
      "Private AC Ertiga/Innova throughout the trip for maximum family comfort",
      "Kids-friendly beach spots & shallow swimming waters"
    ],
    inclusions: [
      "4 Nights accommodation with daily buffet breakfast",
      "Private AC Vehicle for all pick & drops and tours",
      "All inter-island ferry tickets in Premium class",
      "Speed boat ticket to Elephant Beach with complimentary snorkelling",
      "Entry tickets & ferry port charges included"
    ],
    exclusions: [
      "Flight tickets",
      "Lunch and dinner expenses",
      "Optional water sports (Jet ski, Scuba, Parasailing)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Port Blair Arrival & Cellular Jail National Memorial",
        island: "Port Blair",
        activities: [
          "Airport pickup & hotel check-in",
          "Corbyn's Cove Beach scenic coastal drive",
          "Cellular Jail guided tour and historic Light & Sound show"
        ],
        meals: "Breakfast Included (Next Morning)"
      },
      {
        day: 2,
        title: "Port Blair to Havelock & Radhanagar Beach",
        island: "Havelock Island",
        activities: [
          "Ferry to Havelock Island (90 minutes)",
          "Check in at island resort",
          "Afternoon at Radhanagar Beach (sunset & swim)"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 3,
        title: "Elephant Beach Snorkelling & Ferry to Neil Island",
        island: "Havelock to Neil",
        activities: [
          "Speedboat to Elephant Beach for water activities and coral viewing",
          "Afternoon ferry to tranquil Neil Island",
          "Evening at Laxmanpur Beach sunset point"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 4,
        title: "Neil Island Natural Bridge & Return to Port Blair",
        island: "Neil to Port Blair",
        activities: [
          "Visit Natural Rock Bridge formation during low tide",
          "Bharatpur Beach glass-bottom coral viewing",
          "Afternoon luxury ferry return to Port Blair"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 5,
        title: "Departure with Cherished Memories",
        island: "Port Blair",
        activities: [
          "Breakfast & check-out",
          "Transfer to Port Blair airport for onward flight"
        ],
        meals: "Breakfast Included"
      }
    ]
  },
  {
    id: "pkg-adventure-explorer",
    name: "Andaman Watersports & Adventure Explorer",
    tagline: "Scuba diving, night bioluminescent kayaking, parasailing & sea kart",
    duration: "5 Nights / 6 Days",
    nights: 5,
    days: 6,
    pricePerPerson: 32500,
    originalPrice: 39000,
    badge: "Thrills & Action",
    rating: 4.95,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80",
    islands: ["Port Blair", "Havelock Island"],
    category: "Adventure",
    hotelCategory: "4★ Boutique Beach Resort close to Dive Centers",
    highlights: [
      "Discover Scuba Diving with PADI certified instructor + underwater video & photos",
      "Night Kayaking in bioluminescent glowing mangrove waters",
      "High-altitude Parasailing over turquoise ocean with dip",
      "Self-drive Sea Kart adventure at Corbyn's Cove",
      "Elephant Beach speedboat trek & reef snorkelling"
    ],
    inclusions: [
      "5 Nights 4★ Resort stay with buffet breakfast",
      "1 x Discover Scuba Diving session with equipment & HD footage",
      "1 x Parasailing experience at Elephant Beach",
      "1 x Night Kayaking expedition with certified marine naturalist",
      "All Makruzz Catamaran ferry tickets",
      "Private AC transport across all days"
    ],
    exclusions: [
      "Airfare",
      "Personal gear and meals not mentioned"
    ],
    itinerary: [
      {
        day: 1,
        title: "Port Blair Arrival & Sea Kart Thrill",
        island: "Port Blair",
        activities: [
          "Pickup and check-in",
          "Corbyn's Cove Beach Sea Kart self-driving session",
          "Cellular Jail visit"
        ],
        meals: "Breakfast (Day 2)"
      },
      {
        day: 2,
        title: "Havelock Cruise & Scuba Diving Briefing",
        island: "Havelock Island",
        activities: [
          "Cruise to Havelock via luxury Catamaran",
          "Check in & afternoon Scuba equipment fitting and pool briefing",
          "Sunset relaxation at Radhanagar Beach"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 3,
        title: "Scuba Diving in Coral Reefs & Night Bioluminescence Kayaking",
        island: "Havelock Island",
        activities: [
          "Morning boat dive to Nemo Reef / Dixon's Pinnacle with certified instructor",
          "Explore vibrant clownfish, sea turtles, and brain corals (underwater HD photos)",
          "Afternoon rest & beach chilling at Kalapathar Beach",
          "Night Kayaking in Havelock mangrove creek under starlight (witness glowing plankton)"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 4,
        title: "Elephant Beach Parasailing & Water Sports",
        island: "Havelock Island",
        activities: [
          "Speedboat to Elephant Beach",
          "Parasailing with panoramic 300ft aerial views of Ritchie's Archipelago",
          "Snorkelling and jet ski options"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 5,
        title: "Return to Port Blair & Chidiyatapu Trek",
        island: "Port Blair",
        activities: [
          "Ferry back to Port Blair",
          "Trek to Munda Pahar cliff point at Chidiyatapu for sunset"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 6,
        title: "Airport Departure",
        island: "Port Blair",
        activities: ["Breakfast and transfer to airport"],
        meals: "Breakfast Included"
      }
    ]
  },
  {
    id: "pkg-offbeat-north-andaman",
    name: "Baratang, Diglipur & Ross-Smith Island Expedition",
    tagline: "Limestone caves, mud volcano, active turtle nesting & twin island sandbar",
    duration: "7 Nights / 8 Days",
    nights: 7,
    days: 8,
    pricePerPerson: 36999,
    originalPrice: 44000,
    badge: "Unique & Offbeat",
    rating: 4.88,
    reviewsCount: 184,
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
    islands: ["Port Blair", "Baratang Island", "Rangat", "Diglipur", "Havelock Island"],
    category: "Explorer",
    hotelCategory: "Eco-Lodges, Pristine Beach Resorts & 3★ Hotels",
    highlights: [
      "Drive through Jarawa Tribal Reserve along Andaman Trunk Road (ATR)",
      "Fibre boat ride through dense mangrove creek to ancient Limestone Caves",
      "Witness the rare geological phenomenon of Baratang Mud Volcano",
      "Walk the virgin white sandbar connecting twin Ross & Smith Islands in Diglipur",
      "Dhani Nallah 713-meter longest wooden mangrove walkway & turtle nesting grounds",
      "Havelock Island world-class beaches"
    ],
    inclusions: [
      "7 Nights accommodation in curated hotels and eco-resorts",
      "Dedicated Private AC 4x4 / SUV for the entire North Andaman road expedition",
      "Baratang forest permits, boat tickets & local cave guide",
      "Speed boat permit for Ross & Smith Island",
      "Inter-island ferry tickets to Havelock",
      "All breakfasts included"
    ],
    exclusions: [
      "Airfare",
      "Lunches and dinners"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Port Blair & City Tour",
        island: "Port Blair",
        activities: ["Airport pickup, Cellular Jail, and evening light show"],
        meals: "Breakfast (Day 2)"
      },
      {
        day: 2,
        title: "Port Blair to Baratang Island & Rangat",
        island: "Baratang & Rangat",
        activities: [
          "Early morning convoy drive via ATR through indigenous forest",
          "Speedboat through mangrove canopy to breathtaking Limestone Caves",
          "Visit Baratang Mud Volcano",
          "Drive to Rangat and evening walk on Dhani Nallah wooden mangrove boardwalk"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 3,
        title: "Rangat to Diglipur & Kalipur Turtle Nesting Beach",
        island: "Diglipur",
        activities: [
          "Scenic drive across North Andaman bridge and lush hills",
          "Check in at Kalipur eco-resort with Saddle Peak backdrop",
          "Evening turtle nesting observation at Kalipur Beach (seasonal Oct-March)"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 4,
        title: "Twin Islands of Ross and Smith Island",
        island: "Ross & Smith",
        activities: [
          "Boat from Aerial Bay jetty to Ross and Smith Islands",
          "Walk across the natural crystal white sandbar connecting the two islands",
          "Swim in turquoise lagoon with unmatched marine clarity"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 5,
        title: "Diglipur to Port Blair Road Trip",
        island: "Port Blair",
        activities: [
          "Return drive through Middle Andaman scenic countryside",
          "Stop at Morich Dera eco-park and return to Port Blair for overnight stay"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 6,
        title: "Port Blair to Havelock Island",
        island: "Havelock Island",
        activities: [
          "Luxury ferry to Havelock",
          "Sunset at Radhanagar Beach"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 7,
        title: "Elephant Beach & Return to Port Blair",
        island: "Havelock to Port Blair",
        activities: [
          "Elephant beach coral snorkelling",
          "Afternoon ferry back to Port Blair"
        ],
        meals: "Breakfast Included"
      },
      {
        day: 8,
        title: "Departure",
        island: "Port Blair",
        activities: ["Airport transfer and farewell"],
        meals: "Breakfast Included"
      }
    ]
  },
  {
    id: "pkg-quick-getaway",
    name: "Pocket Island Escape: Port Blair & Havelock",
    tagline: "Short, affordable and action-packed 4-day island break",
    duration: "3 Nights / 4 Days",
    nights: 3,
    days: 4,
    pricePerPerson: 14499,
    originalPrice: 17999,
    badge: "Budget Friendly",
    rating: 4.89,
    reviewsCount: 512,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    islands: ["Port Blair", "Havelock Island"],
    category: "Budget",
    hotelCategory: "Comfort 3★ AC Deluxe Hotels with Breakfast",
    highlights: [
      "Maximum Andaman highlights packed into a brisk 4-day weekend",
      "Cellular Jail light & sound show + Radhanagar Beach",
      "Confirmed AC catamaran tickets & seamless transfers",
      "Budget-friendly pricing with zero hidden charges"
    ],
    inclusions: [
      "3 Nights stay with daily breakfast",
      "All private cab transfers",
      "Makruzz/Nautika ferry tickets",
      "Cellular jail entrance fees & show"
    ],
    exclusions: [
      "Airfare",
      "Water sports and lunches/dinners"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival Port Blair & Cellular Jail",
        island: "Port Blair",
        activities: ["Airport pickup, check-in, Cellular Jail visit and Light & Sound show"],
        meals: "Breakfast (Day 2)"
      },
      {
        day: 2,
        title: "Havelock Day Trip & Radhanagar Beach",
        island: "Havelock Island",
        activities: ["Catamaran to Havelock, afternoon at Radhanagar Beach, evening ferry back to Port Blair"],
        meals: "Breakfast Included"
      },
      {
        day: 3,
        title: "Ross Island & Chidiyatapu Sunset",
        island: "Port Blair",
        activities: ["Boat to historic Ross Island (British colonial ruins), evening sunset at Chidiyatapu"],
        meals: "Breakfast Included"
      },
      {
        day: 4,
        title: "Departure",
        island: "Port Blair",
        activities: ["Airport drop"],
        meals: "Breakfast Included"
      }
    ]
  }
];
