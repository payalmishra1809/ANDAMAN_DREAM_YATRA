import { Destination } from "../types";

export const DESTINATIONS: Destination[] = [
  {
    id: "havelock-island",
    name: "Havelock Island",
    localName: "Swaraj Dweep",
    tagline: "Home to Radhanagar Beach, turquoise lagoons and world-class scuba diving",
    description: "The crown jewel of Andaman tourism. Havelock Island is internationally renowned for Radhanagar Beach (voted Asia's best beach by TIME magazine and Blue Flag certified), Elephant Beach coral reefs, and vibrant marine biodiversity.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    region: "South Andaman",
    ferryFromPortBlair: "90 minutes via Luxury Catamaran (Makruzz / Nautika)",
    bestTime: "October to May (crystal clear water & calm seas)",
    idealStay: "2 to 3 Nights",
    highlights: [
      "Radhanagar Beach (Beach No. 7) - White sand & turquoise sunset",
      "Elephant Beach - Accessible by speedboat or rainforest trek, hub for watersports",
      "Kalapathar Beach - Black volcanic rocks juxtaposed against turquoise waters",
      "Nemo Reef - Ideal for beginners scuba diving and snorkelling"
    ],
    topAttractions: [
      {
        name: "Radhanagar Beach",
        description: "Ranked amongst the world's most breathtaking beaches. Pure powdery white sand, lush mahua tree fringes, and gentle turquoise waves perfect for swimming."
      },
      {
        name: "Elephant Beach",
        description: "The action center for water sports in Havelock. Renowned for rich live coral formations, sea turtles, snorkelling, parasailing, and sea walks."
      },
      {
        name: "Kalapathar Beach",
        description: "A serene, non-commercial stretch with dark rock boulders and tranquil emerald waters. Best visited during morning golden hour."
      }
    ],
    activities: ["Scuba Diving", "Snorkelling", "Night Kayaking", "Parasailing", "Sea Walk"],
    travelTips: [
      "Advance resort booking is recommended during peak season (November - February).",
      "Rent a scooter (approx ₹500/day) to easily explore the island at your own pace.",
      "Water sports at Elephant Beach typically close around 3:00 PM due to high tide."
    ]
  },
  {
    id: "port-blair",
    name: "Port Blair",
    localName: "Capital of Andaman & Nicobar",
    tagline: "Historic Cellular Jail, colonial Ross Island, museums and sunset view points",
    description: "The vibrant gateway and capital of the archipelago. Port Blair weaves together poignant colonial and Indian freedom struggle history, naval museums, coral reefs at North Bay, and stunning sunset points like Chidiyatapu.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
    region: "South Andaman",
    ferryFromPortBlair: "Starting point for all inter-island ferries & flights",
    bestTime: "Year-round (Best: October to May)",
    idealStay: "2 Nights",
    highlights: [
      "Cellular Jail National Memorial & Sound and Light Show",
      "Netaji Subhash Chandra Bose Dweep (Ross Island) ruins",
      "Chidiyatapu (Bird Island) panoramic sunset cliff",
      "Corbyn's Cove Beach & India's exclusive Sea Kart",
      "Samudrika Naval Marine Museum & Anthropological Museum"
    ],
    topAttractions: [
      {
        name: "Cellular Jail National Memorial",
        description: "The historic seven-winged prison where brave Indian freedom fighters like Veer Savarkar were held. The evening Light & Sound show brings history alive."
      },
      {
        name: "Ross Island (Netaji Subhash Chandra Bose Dweep)",
        description: "A short 15-minute boat ride from Port Blair. Preserves colonial British administrative headquarters ruins entwined in massive banyan tree roots, with friendly spotted deer roaming free."
      },
      {
        name: "Chidiyatapu (Sunset Point)",
        description: "Located 30 km south of Port Blair. Known for dense mangrove forests, rich birdlife, and the most spectacular sunset over the Bay of Bengal."
      }
    ],
    activities: ["Sea Kart", "Semi-Submarine Coral Safari", "History Walking Tour", "North Bay Snorkelling"],
    travelTips: [
      "Cellular Jail is closed on Mondays and national holidays.",
      "Light and Sound show tickets should be pre-booked along with your tour package.",
      "Airport is located just 15 minutes from most central Port Blair hotels."
    ]
  },
  {
    id: "neil-island",
    name: "Neil Island",
    localName: "Shaheed Dweep",
    tagline: "The vegetable bowl of Andaman with natural rock bridges and serene rustic charm",
    description: "Neil Island offers an unhurried, peaceful escape with laid-back vibes, lush agricultural patches, unexplored coral reefs, and the famous geological natural rock bridge shaped by ocean currents.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    region: "South Andaman",
    ferryFromPortBlair: "120 mins from Port Blair / 60 mins from Havelock",
    bestTime: "October to April",
    idealStay: "1 to 2 Nights",
    highlights: [
      "Howrah Bridge - Natural rock arch formation accessible during low tide",
      "Bharatpur Beach - Pristine coral reef, shallow swimming waters & glass bottom boats",
      "Laxmanpur Beach 1 & 2 - Spectacular sunsets and seashell beaches",
      "Sitapur Beach - Uninterrupted golden sunrise point"
    ],
    topAttractions: [
      {
        name: "Natural Rock Bridge (Howrah Bridge)",
        description: "A living marvel of natural marine erosion formed over centuries. Accessible during low tide over a rocky reef filled with sea anemones, starfish, and corals."
      },
      {
        name: "Bharatpur Beach",
        description: "Renowned for its expansive shallow water that stays knee-deep for hundreds of meters into the sea, making it exceptionally safe for children and coral viewing."
      },
      {
        name: "Laxmanpur Beach",
        description: "Famous for triangular white sand spit that disappears into the ocean, providing 360-degree twilight vistas."
      }
    ],
    activities: ["Glass Bottom Boat", "Scuba Diving", "Bicycle Island Tour", "Snorkelling"],
    travelTips: [
      "Natural Bridge visit is tide-dependent; our tour guide coordinates low-tide time slots.",
      "Wear sturdy non-slip water shoes when walking to the Natural Bridge reef.",
      "Neil is small enough to be easily explored by rented bicycle or electric scooter."
    ]
  },
  {
    id: "baratang-island",
    name: "Baratang Island",
    localName: "Mangrove & Cave Wonderland",
    tagline: "Limestone caves, mangrove safari, active mud volcano and tribal forest crossing",
    description: "Situated between South and Middle Andaman, Baratang is an adventure into prehistoric landscapes: dense mangrove creeks traversed by high-speed fiber boats, million-year-old stalactite and stalagmite limestone caves, and natural bubbling mud volcanoes.",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
    region: "North & Middle Andaman",
    ferryFromPortBlair: "100 km by road via Andaman Trunk Road convoy (approx 3 hrs)",
    bestTime: "October to May",
    idealStay: "Full Day Trip from Port Blair or 1 Night enroute to North Andaman",
    highlights: [
      "Limestone Caves formed over millions of years",
      "High-speed fiber boat safari through dense mangrove tunnels",
      "Active Mud Volcano - Rare geological gas vent phenomenon",
      "Andaman Trunk Road (ATR) forest transit"
    ],
    topAttractions: [
      {
        name: "Baratang Limestone Caves",
        description: "Fascinating geological caverns featuring giant stalactite needles hanging from ceilings and rising stalagmites, reached via an exhilarating boat ride through mangrove canopies."
      },
      {
        name: "Mud Volcano",
        description: "One of the few active mud volcanoes in South Asia, where natural subterranean gas forces mineral mud slurry to erupt continuously onto the surface."
      }
    ],
    activities: ["Mangrove Boat Safari", "Cave Exploration", "Wildlife Photography"],
    travelTips: [
      "Early morning departure (3:30 AM to 5:00 AM) from Port Blair to catch the first ATR forest gate convoy.",
      "Photography is strictly prohibited in tribal reserve zones by law.",
      "Carry water and comfortable walking shoes for the cave trail."
    ]
  },
  {
    id: "ross-and-smith-island",
    name: "Ross & Smith Islands",
    localName: "The Twin Islands of Diglipur",
    tagline: "Two virgin islands connected by a natural white sandbar that emerges at low tide",
    description: "Located in the far north of Andaman near Diglipur, Ross and Smith are two sister islands linked by an incredible 50-meter-wide natural crescent sandbar. At high tide, the sandbar submerges; at low tide, it surfaces, allowing travelers to stroll from one island to the other amidst crystal turquoise lagoons.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    region: "North & Middle Andaman",
    ferryFromPortBlair: "Reached via Diglipur (8 hrs drive or government ferry) + 20 min boat from Aerial Bay Jetty",
    bestTime: "November to April",
    idealStay: "Part of 2-Night Diglipur Package",
    highlights: [
      "Natural pristine sandbar linking Ross Island to Smith Island",
      "Emerald shallow lagoons with coral gardens on both sides of the sandbar",
      "Forest trail on Smith Island with eco-huts and coconut groves",
      "Uncrowded, untouched tropical paradise"
    ],
    topAttractions: [
      {
        name: "The Connecting Sandbar",
        description: "A surreal walkway of gleaming white coral sand with turquoise sea on both sides. Swim or paddle in both the eastern and western lagoons simultaneously."
      },
      {
        name: "Smith Island Marine Sanctuary",
        description: "Home to untouched coral reefs, sea turtles, and rich marine fauna protected under local forestry regulations."
      }
    ],
    activities: ["Sandbar Walk", "Lagoon Swimming", "Reef Snorkelling", "Birdwatching"],
    travelTips: [
      "Forest department permit is required and arranged in advance by Andaman Dream Yatra.",
      "Bring packed snacks and plenty of water as there are no commercial shops on the islands."
    ]
  },
  {
    id: "barren-island",
    name: "Barren Island",
    localName: "South Asia's Only Active Volcano",
    tagline: "Exclusive charter cruise to witness an active volcanic cone rising out of the deep ocean",
    description: "Barren Island is an extraordinary geological wonder situated 135 km northeast of Port Blair. It features the only confirmed active volcano in South Asia. Private charter boats circle the uninhabited island, offering mesmerizing views of volcanic smoke, jet-black ash beaches, and world-class scuba diving along underwater volcanic drop-offs with manta rays and hammerheads.",
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80",
    region: "Special Islands",
    ferryFromPortBlair: "Private Charter Cruise from Havelock or Port Blair (4 to 5 hours sail)",
    bestTime: "November to April (requires calm sea conditions)",
    idealStay: "Day Cruise / Charter Expedition",
    highlights: [
      "Witness South Asia's active smoking volcanic caldera",
      "Deep sea scuba diving along black sand volcanic walls",
      "Spot pelagic marine life: Oceanic manta rays, dolphins & reef sharks",
      "Sport fishing and luxury yacht day cruise"
    ],
    topAttractions: [
      {
        name: "The Active Volcanic Caldera",
        description: "The 354m volcanic cone rising dramatically from the Andaman Sea, with sulfur streaks and steam plumes."
      },
      {
        name: "Black Sand Underwater Drop-off",
        description: "Renowned among international advanced divers for crystal 40-meter visibility, crystal clear deep drops, and encounters with manta rays."
      }
    ],
    activities: ["Private Charter Cruise", "Advanced Scuba Diving", "Big Game Fishing"],
    travelTips: [
      "No visitors are permitted to land ashore due to volcanic activity and safety regulations; viewing is conducted from boats.",
      "Special coast guard and port authority permits are handled entirely by Andaman Dream Yatra."
    ]
  },
  {
    id: "saddle-peak",
    name: "Saddle Peak National Park",
    localName: "Highest Peak in Bay of Bengal",
    tagline: "732-meter summit offering breathtaking panoramic views of Andaman sea and rainforest",
    description: "Towering at 732 meters above sea level near Diglipur, Saddle Peak is the highest point in the entire Andaman & Nicobar archipelago. The national park protects rare tropical evergreen rainforests, endemic birds, and freshwater streams.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    region: "North & Middle Andaman",
    ferryFromPortBlair: "Located in Diglipur, North Andaman (300 km from Port Blair)",
    bestTime: "November to March",
    idealStay: "1 Day Trek from Diglipur / Kalipur",
    highlights: [
      "Challenging 8 km rainforest trek to the summit",
      "Unique dwarf stunted vegetation and red-blooming orchids near peak",
      "360-degree aerial panorama of North Andaman coastline and coral reefs",
      "Kalpong River - The only perennial river in the Andaman islands"
    ],
    topAttractions: [
      {
        name: "Saddle Peak Summit Lookout",
        description: "Spectacular sweeping views across the Bay of Bengal, mangrove waterways, and rolling green mountain ranges."
      },
      {
        name: "Kalipur Base Trail",
        description: "Trailhead starting right from Kalipur Beach, moving through thick tropical forest teeming with endemic butterflies and hill mynas."
      }
    ],
    activities: ["Mountain Trekking", "Nature Photography", "Bird Watching"],
    travelTips: [
      "Start the trek early morning (6:00 AM) to avoid midday heat and return before dusk.",
      "Hire an authorized local forest guide through our team.",
      "Carry at least 2 liters of water, electrolyte packets, and hiking boots."
    ]
  },
  {
    id: "parrot-island",
    name: "Parrot Island",
    localName: "Sunset Parakeet Sanctuary",
    tagline: "An evening natural phenomenon where thousands of parakeets return to roost",
    description: "An uninhabited island near Baratang. As the sun begins to set, thousands of wild green parakeets and parakeet flocks swoop down in synchronized aerial acrobatics to settle on mangrove trees for the night.",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1200&q=80",
    region: "North & Middle Andaman",
    ferryFromPortBlair: "Accessed via boat from Baratang Jetty (30 min cruise)",
    bestTime: "October to April (Sunset hours 4:30 PM - 6:00 PM)",
    idealStay: "Evening excursion during Baratang stay",
    highlights: [
      "Thousands of wild parakeets gathering at sunset",
      "Mangrove water reflection photography in golden light",
      "Completely serene boat cruise through undisturbed backwaters"
    ],
    topAttractions: [
      {
        name: "Sunset Roosting Spectacle",
        description: "A choir of parakeet calls echoing over serene mangrove waters as the sky turns crimson and violet."
      }
    ],
    activities: ["Boat Cruise", "Birdwatching", "Sunset Photography"],
    travelTips: [
      "Requires overnight stay at Baratang Island as evening boats return after dark.",
      "Maintain silence on the boat so as not to disturb the birds."
    ]
  },
  {
    id: "dhani-nallah-beach",
    name: "Dhani Nallah Beach & Mangrove Walkway",
    localName: "India's Longest Mangrove Boardwalk",
    tagline: "713-meter wooden walkway traversing lush mangrove forests to a turtle beach",
    description: "Located at Rangat in Middle Andaman, Dhani Nallah is celebrated for its 713-meter-long nature walkway made of local Andaman padauk wood that winds through pristine mangrove canopies directly onto a sprawling golden-sand beach.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    region: "North & Middle Andaman",
    ferryFromPortBlair: "170 km north of Port Blair in Rangat (Middle Andaman)",
    bestTime: "October to April (Turtle breeding: Dec to Feb)",
    idealStay: "Day stopover enroute between Baratang and Diglipur",
    highlights: [
      "713m longest mangrove nature walkway in India",
      "Official Olive Ridley Sea Turtle nesting and hatchery site",
      "Peaceful uncrowded beach fringed by casuarina trees",
      "Ideal spot for marine ecology enthusiasts"
    ],
    topAttractions: [
      {
        name: "The Wooden Boardwalk",
        description: "An architectural eco-walkway allowing visitors to inspect mangrove root systems, mudskippers, and fiddle crabs without stepping on delicate marshland."
      },
      {
        name: "Turtle Hatchery Center",
        description: "Forest department conservation initiative where sea turtle hatchlings are safely monitored and released into the ocean."
      }
    ],
    activities: ["Mangrove Nature Walk", "Turtle Nesting Observation", "Beach Walks"],
    travelTips: [
      "Visit during morning or late afternoon for cool temperatures and vibrant bird activity.",
      "Do not use flash photography near nesting sea turtles."
    ]
  },
  {
    id: "kalipur-beach",
    name: "Kalipur Beach",
    localName: "Turtle Nesting Hub with Saddle Peak Backdrop",
    tagline: "Volcanic grey sands, dramatic waves and all four species of sea turtles",
    description: "Situated in Diglipur, Kalipur Beach is one of the rare places on the planet where four species of sea turtles (Olive Ridley, Leatherback, Hawksbill, and Green Sea Turtles) come ashore to lay their eggs under starlit skies.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    region: "North & Middle Andaman",
    ferryFromPortBlair: "Diglipur, North Andaman (320 km from Port Blair)",
    bestTime: "November to March (Turtle nesting peak: Dec-Jan)",
    idealStay: "1 to 2 Nights in Diglipur",
    highlights: [
      "Night turtle nesting observation with forest conservationists",
      "Majestic views of Saddle Peak mountain backdrop directly behind the sea",
      "Snorkelling around Craggy Island located just 20 minutes offshore"
    ],
    topAttractions: [
      {
        name: "Craggy Island Offshore Reef",
        description: "An uninhabited islet right opposite Kalipur beach, offering some of the best untouched coral reefs and reef fish in North Andaman."
      }
    ],
    activities: ["Turtle Watching", "Snorkelling", "Trekking to Saddle Peak base"],
    travelTips: [
      "Turtle nesting takes place at night; wear warm layers and follow the forest guard's instructions."
    ]
  },
  {
    id: "ramnagar-beach",
    name: "Ramnagar Beach",
    localName: "Diglipur Eco-Beach",
    tagline: "Quiet yellow sand beach with eco-huts and vibrant coral beds",
    description: "A tranquil paradise located 35 km from Diglipur. Ramnagar Beach features sweeping yellow sand shores, calm blue waters, and an extensive reef that is home to colorful tropical fish and sea anemones.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    region: "North & Middle Andaman",
    ferryFromPortBlair: "Diglipur (North Andaman)",
    bestTime: "November to April",
    idealStay: "Half-day excursion in Diglipur",
    highlights: [
      "Olive Ridley sea turtle nesting beach",
      "Eco-friendly bamboo sit-outs and treehouses built by the forest department",
      "Gentle reef drop perfect for seasoned snorkellers"
    ],
    topAttractions: [
      {
        name: "Ramnagar Marine Reef",
        description: "Shallow reef extending far offshore with table corals and schools of blue damselfish."
      }
    ],
    activities: ["Snorkelling", "Swimming", "Beachcombing"],
    travelTips: ["Carry your own snorkelling gear as rental stalls are limited in this peaceful eco-zone."]
  },
  {
    id: "morich-dera-beach",
    name: "Morich Dera Beach",
    localName: "Middle Andaman Eco-Viewpoint",
    tagline: "Spectacular natural rock formations overlooking the open sea with sea-walk paths",
    description: "Located in Rangat near Betapur, Morich Dera is a scenic coastal viewpoint with rugged coastal rock structures, eco-friendly wooden viewpoints, and a fresh water stream meeting the sea.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    region: "North & Middle Andaman",
    ferryFromPortBlair: "Middle Andaman (near Rangat)",
    bestTime: "October to April",
    idealStay: "1 to 2 Hours scenic break during road journey",
    highlights: [
      "Natural rocky sea-view pavilion built high above crashing waves",
      "Freshwater stream merging into sea",
      "Perfect photographic stopover on the Andaman Trunk Road"
    ],
    topAttractions: [
      {
        name: "The Rock Outcrop Lookout",
        description: "Elevated vantage point offering panoramic photography of the churning blue Bay of Bengal."
      }
    ],
    activities: ["Photography", "Nature Rest Stop", "Picnicking"],
    travelTips: ["Great refreshment stop while traveling between Baratang and Rangat."]
  }
];
