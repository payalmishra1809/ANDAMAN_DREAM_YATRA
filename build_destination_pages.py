#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generates blog-style 'Know More' detail pages for each destination."""
import os

OUT_DIR = "frontend/destinations"
os.makedirs(OUT_DIR, exist_ok=True)

NAV_ITEMS = [
    ("../index.html", "Home"),
    ("../destinations.html", "Destinations"),
    ("../packages.html", "Packages"),
    ("../services.html", "Services"),
    ("../activities.html", "Activities"),
    ("../cancellation.html", "Cancellation & Refunds"),
    ("../contact.html", "Contact"),
]

def render_nav():
    lis = []
    for href, label in NAV_ITEMS:
        lis.append(f'<li><a href="{href}" class="">{label}</a></li>')
    return "".join(lis)

HEADER = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} | Andaman Dream Yatra</title>
<meta name="description" content="{description}">
<link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="../images/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="../images/favicon-180.png">
<link rel="stylesheet" href="../css/style.css">
</head>
<body>
<header class="site-header">
  <div class="container nav-wrap">
    <a href="../index.html" class="brand">
      <img src="../images/logo-transparent.png" alt="Andaman Dream Yatra logo" class="brand-logo">
      <span class="brand-text"><strong>Andaman Dream Yatra</strong><span>Port Blair · Andaman &amp; Nicobar</span></span>
    </a>
    <nav>
      <ul class="nav-links">
        __NAV__
      </ul>
    </nav>
    <div class="nav-cta">
      <a href="../contact.html" class="btn btn-ocean btn-sm">Book Now</a>
      <button class="nav-toggle" aria-label="Toggle menu">☰</button>
    </div>
  </div>
</header>
""".replace("__NAV__", render_nav())

FOOTER = """
<div class="wave-divider">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,32 C240,64 480,0 720,20 C960,40 1200,64 1440,28 L1440,60 L0,60 Z" fill="var(--cream)"></path>
  </svg>
</div>
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4>Andaman Dream Yatra</h4>
        <p style="color:rgba(255,255,255,.65); font-size:.88rem; max-width:280px;">
          Curated island journeys across the Andaman &amp; Nicobar archipelago -
          from turquoise coves to coral gardens, we plan every tide of your trip.
        </p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="../destinations.html">Destinations</a></li>
          <li><a href="../packages.html">Packages</a></li>
          <li><a href="../services.html">Services</a></li>
          <li><a href="../activities.html">Activities</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="../cancellation.html">Cancellation &amp; Refunds</a></li>
          <li><a href="../contact.html">Contact &amp; Enquiry</a></li>
          <li><a href="https://tourism.andamannicobar.gov.in/brochures.php" target="_blank" rel="noopener">Official Tourism Info</a></li>
        </ul>
      </div>
      <div>
        <h4>Reach us</h4>
        <ul>
          <li>Junglighat, Port Blair, Andaman &amp; Nicobar Islands, 744103</li>
          <li><a href="mailto:andamandreamyatra@gmail.com">andamandreamyatra@gmail.com</a></li>
          <li><a href="tel:+910000000000">+91-XXXXXXXXXX</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Andaman Dream Yatra. All rights reserved.</span>
      <span>Designed for the island life 🌊</span>
    </div>
  </div>
</footer>
<script src="../js/main.js"></script>
</body>
</html>
"""

def page(dest):
    facts_html = "".join(
        f'<li><span>{k}</span><span>{v}</span></li>' for k, v in dest["facts"].items()
    )
    gallery_html = "".join(
        f'<img src="{src}" alt="{dest["title"]} - Andaman Islands">' for src in dest["gallery"]
    )
    body_html = "".join(f"<p>{p}</p>" if not p.startswith("<h2>") else p for p in dest["body"])
    related_html = "".join(
        f'<a href="{slug}.html">{label}</a>' for slug, label in dest["related"]
    )
    html = HEADER.format(title=dest["title"], description=dest["description"])
    html += f"""
<section style="padding-top:44px;">
  <div class="container">
    <div class="breadcrumb reveal">
      <a href="../destinations.html">Destinations</a> / <a href="../destinations.html#{dest['region']}">{dest['region_label']}</a> / {dest['title']}
    </div>
    <div class="detail-hero reveal">
      <img src="{dest['hero']}" alt="{dest['title']}, Andaman Islands">
      <div class="detail-hero-caption">
        <span class="eyebrow">{dest['region_label']}</span>
        <h1>{dest['title']}</h1>
      </div>
    </div>

    <div class="detail-layout">
      <article class="detail-article reveal">
        <p class="lead">{dest['lead']}</p>
        {body_html}
        <div class="gallery-strip">{gallery_html}</div>
        <h2>Worth knowing before you go</h2>
        <p>{dest['tip']}</p>
      </article>

      <aside class="fact-box reveal">
        <h3>📌 Quick Facts</h3>
        <ul class="fact-list">{facts_html}</ul>
        <a href="../contact.html?package={dest['title'].replace(' ', '+')}" class="btn btn-primary">Plan a Visit</a>
        <a href="../packages.html" class="btn btn-outline" style="border-color:var(--ocean-deep); color:var(--ocean-deep); margin-top:10px;">See Related Packages</a>
      </aside>
    </div>

    <div class="reveal" style="margin-top:50px;">
      <span class="eyebrow">More in {dest['region_label']}</span>
      <div class="related-strip">{related_html}
        <a href="../destinations.html">← All Destinations</a>
      </div>
    </div>
  </div>
</section>
"""
    html += FOOTER
    with open(os.path.join(OUT_DIR, dest["slug"] + ".html"), "w", encoding="utf-8") as f:
        f.write(html)


DESTINATIONS = [
    dict(
        slug="neil-island",
        region="south", region_label="South Andaman",
        title="Neil Island (Shaheed Dweep)",
        description="History, geology and travel tips for Neil Island (Shaheed Dweep) - Andaman's laid-back coral island with Natural Bridge and Bharatpur Beach.",
        hero="https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?q=80&w=1600&auto=format&fit=crop",
        lead="Smaller and quieter than its neighbour Havelock, Neil Island trades big resorts for coconut groves, vegetable fields and some of the most easily accessible coral reefs in the archipelago.",
        body=[
            "Neil Island was renamed Shaheed Dweep (\"Martyr's Island\") in 2018, alongside Havelock's renaming to Swaraj Dweep, as part of a government initiative to honour freedom fighters connected to the islands' colonial-era penal history. Locally, though, the older name Neil - after Brigadier General James Neill, a British officer from the 1857 uprising era - is still what most maps, ferries and hotel signage use.",
            "The island's landscape is defined by soft coral rubble beaches (numbered rather than named - Bharatpur, Laxmanpur I and Laxmanpur II are the most visited) and a low, flat interior of farmland that supplies much of Port Blair's vegetables. Its most photographed feature is the Natural Bridge, or Howrah Bridge, at Laxmanpur - a coral rock formation carved by centuries of tidal erosion into a bridge-like arch, best seen at low tide.",
            "Because the surrounding reef sits close to shore, Neil is a favourite for first-time snorkellers: Bharatpur Beach offers calm, shallow water over living coral just a short swim from the sand, without needing a boat.",
        ],
        gallery=[
            "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Also known as": "Shaheed Dweep",
            "Best time to visit": "Oct – May",
            "How to reach": "Ferry from Port Blair or Havelock (1–1.5 hrs)",
            "Known for": "Natural Bridge, Bharatpur reef",
            "Ideal stay": "1–2 nights",
        },
        tip="The Natural Bridge is only fully exposed at low tide - check the day's tide table before heading out, and wear reef-safe footwear on the rocks. Sunset at Laxmanpur II is one of the calmest, least crowded on the islands.",
        related=[("havelock-island", "Havelock Island"), ("barren-island", "Barren Island")],
    ),
    dict(
        slug="havelock-island",
        region="south", region_label="South Andaman",
        title="Havelock Island (Swaraj Dweep)",
        description="History and travel guide to Havelock Island (Swaraj Dweep), home to Radhanagar Beach and the Andamans' main scuba diving hub.",
        hero="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1600&auto=format&fit=crop",
        lead="Havelock - officially renamed Swaraj Dweep in 2018 - is the Andamans' best-known island, built almost entirely around one extraordinary stretch of sand: Radhanagar Beach.",
        body=[
            "Like Neil, Havelock's original name honoured a British general, Sir Henry Havelock, from the colonial period. Swaraj Dweep, meaning \"self-rule island\", was chosen to instead commemorate India's independence movement. Most travel bookings, ferry tickets and older maps still use Havelock, so both names are common on the ground.",
            "Radhanagar Beach (also called Beach No. 7) has repeatedly featured in international \"best beaches in Asia\" rankings for its wide arc of white sand, shallow turquoise water and dense forest backdrop - it's the reason most South Andaman itineraries build in at least one Havelock sunset.",
            "Beyond the beach, Havelock is the diving capital of the Andamans. Its reefs - Aquarium, Lighthouse, Nemo Reef and Barracuda City among them - are shallow and clear enough for beginner-friendly dives, while deeper sites cater to certified divers chasing reef sharks and mantas. Elephant Beach, a short boat or forest-trail ride from the jetty, is the main hub for snorkelling and water sports.",
        ],
        gallery=[
            "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Also known as": "Swaraj Dweep",
            "Best time to visit": "Nov – Apr (calmest seas)",
            "How to reach": "Ferry from Port Blair (2–2.5 hrs)",
            "Known for": "Radhanagar Beach, scuba diving",
            "Ideal stay": "2–3 nights",
        },
        tip="Book Radhanagar Beach sunset viewing separately from your diving day - the beach gets busy near dusk. If you want to dive, arrive with at least one buffer day in case of weather-related reschedules.",
        related=[("neil-island", "Neil Island"), ("barren-island", "Barren Island")],
    ),
    dict(
        slug="barren-island",
        region="south", region_label="South Andaman",
        title="Barren Island (Mud Volcano)",
        description="Facts about Barren Island, South Asia's only confirmed active volcano, and how to visit it on a day cruise from Port Blair.",
        hero="https://images.unsplash.com/photo-1621789098261-cf28a8ef2892?q=80&w=1600&auto=format&fit=crop",
        lead="Roughly 140 km northeast of Port Blair sits South Asia's only confirmed active volcano - a stark, black cone rising straight out of the Andaman Sea.",
        body=[
            "Barren Island has erupted multiple times in recorded history, most notably in 1991 after a dormant period of over a century, and again in subsequent years through the 2000s and 2010s. The island remains largely uninhabited (aside from a small population of feral goats) and is administered as a protected area - landing on the island itself is generally restricted, and visits are made by boat that circles offshore.",
            "The appeal is less about setting foot on land and more about the scenery: a nearly symmetrical volcanic cone streaked with old lava flows, set against open ocean, unlike anything else in the archipelago. Because of the distance and open-sea conditions, trips run as full-day cruises, often combined with snorkelling stops en route depending on sea conditions.",
            "Sea conditions dictate whether trips run at all - cruises are cancelled at short notice during rough weather, so it's worth keeping your Andaman schedule flexible if Barren Island is on your list.",
        ],
        gallery=[
            "https://images.unsplash.com/photo-1621789098261-cf28a8ef2892?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Distance from Port Blair": "~140 km",
            "Best time to visit": "Nov – Apr (calmer seas)",
            "How to reach": "Full-day cruise (weather dependent)",
            "Known for": "South Asia's only active volcano",
            "Ideal stay": "Day trip only",
        },
        tip="This is a long open-sea crossing - carry motion sickness medication if you're prone to it, and expect trips to be rescheduled or cancelled on short notice if the sea is rough.",
        related=[("neil-island", "Neil Island"), ("havelock-island", "Havelock Island")],
    ),
    dict(
        slug="port-blair-museums-sunset-points",
        region="south", region_label="South Andaman",
        title="Cellular Jail, Museums & Sunset Points",
        description="History of Cellular Jail and a guide to Port Blair's museums and Chidiya Tapu's sunset viewpoint.",
        hero="https://images.unsplash.com/photo-1591825381318-e2e01a4a4bda?q=80&w=1600&auto=format&fit=crop",
        lead="Port Blair holds the archipelago's darkest and most important chapter of history - and, at its southern tip, one of its gentlest evenings.",
        body=[
            "Cellular Jail was built by the British colonial government between 1896 and 1906 as a high-security prison for political prisoners, primarily freedom fighters exiled from mainland India. Its name comes from its design: seven wings radiating from a central watchtower, originally holding 698 solitary cells, each built so no prisoner could communicate with another. Revolutionaries including Vinayak Damodar Savarkar were held here, and conditions - including forced labour and harsh punishment - made it infamous as \"Kala Pani\" (black water), a term also used for the broader practice of penal transportation to the islands.",
            "Today three of the original seven wings remain, preserved as a national memorial. A sound-and-light show held most evenings narrates the jail's history using the site itself as a backdrop, and is one of the most-recommended things to do on a first evening in Port Blair.",
            "Nearby, the Anthropological Museum and Samudrika Naval Marine Museum cover the islands' indigenous tribes and marine biodiversity respectively - useful context before heading out to the islands themselves. To end the day, Chidiya Tapu, about 25 km south of the city, is Port Blair's best-known sunset point: a quiet beach and forested headland where the Andaman Sea turns gold each evening, also popular with birdwatchers.",
        ],
        gallery=[
            "https://images.unsplash.com/photo-1591825381318-e2e01a4a4bda?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Built": "1896 – 1906",
            "Status": "National Memorial",
            "Don't miss": "Evening sound-and-light show",
            "Sunset point": "Chidiya Tapu (~45 min drive)",
            "Ideal duration": "Half-day in the city",
        },
        tip="Book Cellular Jail's sound-and-light show a day ahead where possible - timings shift seasonally and shows can sell out during peak season (Dec–Jan).",
        related=[("neil-island", "Neil Island"), ("havelock-island", "Havelock Island")],
    ),
    dict(
        slug="baratang-island",
        region="middle", region_label="Middle Andaman",
        title="Baratang Island",
        description="Guide to Baratang Island's limestone caves, mud volcanoes and mangrove creek boat ride.",
        hero="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
        lead="Baratang is the Andamans' odd-one-out - a single day trip that packs in a mangrove boat safari, a limestone cave system and an active mud volcano.",
        body=[
            "The journey itself is part of the experience: reaching Baratang from Port Blair means a road trip along the Andaman Trunk Road, which cuts through the Jarawa Tribal Reserve. Convoys are escorted and regulated by the local administration, with strict rules against photography or contact with the Jarawa community, one of the islands' indigenous groups who have largely lived in voluntary isolation.",
            "From the jetty at Nilambur, a narrow motorboat ride winds through dense mangrove creeks - root systems arching over the water on both sides - to reach the limestone caves, formed over thousands of years by mineral-rich water dripping through the rock into stalactite and stalagmite formations.",
            "A short distance away, Baratang's mud volcanoes are a rarer geological feature: cold mud, pushed up by underground gas pressure rather than magma, bubbling gently through vents in the earth. They're low-key compared to Barren Island's volcano, but among the few places in India where you can see the phenomenon at all.",
        ],
        gallery=[
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Distance from Port Blair": "~100 km (road + boat)",
            "Best time to visit": "Nov – Apr",
            "Known for": "Limestone caves, mud volcanoes",
            "Note": "Convoy timings are fixed by the administration",
            "Ideal duration": "Full-day trip",
        },
        tip="Convoys through the Jarawa Reserve run at fixed times only, so departure from Port Blair is early morning - plan for a long day and confirm pickup time in advance.",
        related=[("parrot-island", "Parrot Island"), ("dhani-nallah-beach", "Dhani Nallah Beach")],
    ),
    dict(
        slug="parrot-island",
        region="middle", region_label="Middle Andaman",
        title="Parrot Island",
        description="When and how to see the parakeet roosting spectacle at Parrot Island near Baratang.",
        hero="https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?q=80&w=1600&auto=format&fit=crop",
        lead="A small mangrove islet near Baratang turns into a natural spectacle every evening, as thousands of parakeets return home to roost.",
        body=[
            "Parrot Island isn't large enough to walk on - it's essentially a dense stand of mangroves surrounded by water, visited entirely by boat. What draws visitors is timing: as dusk approaches, huge flocks of parakeets (locally understood to be a mix of resident and migratory species) converge on the island from across the surrounding creeks and forest, filling the sky before settling in for the night.",
            "The experience is brief but memorable - boats idle offshore for twenty to thirty minutes as the birds arrive in waves, their calls building to a crescendo just as the light fades. It's usually combined with a Baratang day trip, timed as the final stop before heading back.",
        ],
        gallery=[
            "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Best time": "Just before sunset",
            "How to reach": "Boat, combined with Baratang trip",
            "Known for": "Evening parakeet roosting",
            "Duration": "20–30 minutes on the water",
            "Good for": "Birdwatchers, photographers",
        },
        tip="Arrive at least 20 minutes before sunset - the birds arrive in a short, concentrated window and boats can't linger long after dark.",
        related=[("baratang-island", "Baratang Island"), ("dhani-nallah-beach", "Dhani Nallah Beach")],
    ),
    dict(
        slug="dhani-nallah-beach",
        region="middle", region_label="Middle Andaman",
        title="Dhani Nallah Beach",
        description="A quiet, lesser-visited beach in Middle Andaman ideal for travellers who want to skip the crowds.",
        hero="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1600&auto=format&fit=crop",
        lead="Middle Andaman's coastline sees a fraction of the visitors South Andaman does, and Dhani Nallah is a good example of what that quiet looks like.",
        body=[
            "There's no major attraction or activity built around this beach - no water sports counters, no rows of shacks - just a stretch of casuarina-lined sand facing open water, used mostly by travellers passing through Middle Andaman between Baratang and Rangat or further north.",
            "It works best as a stop rather than a destination: a place to break a long road journey, walk the shoreline, or have a picnic away from the more organised beaches further south. For travellers who've already ticked off Havelock and Neil and want a sense of what the islands feel like without the tourist infrastructure, it's a worthwhile detour.",
        ],
        gallery=[
            "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Region": "Middle Andaman, near Rangat",
            "Best time": "Nov – Apr",
            "Known for": "Quiet, uncrowded shoreline",
            "Facilities": "Minimal - carry water & snacks",
            "Ideal for": "A roadside break, picnics",
        },
        tip="Facilities are basic to none - this is a stop for travellers already road-tripping through Middle Andaman, best combined with Baratang or Rangat sightseeing rather than visited on its own.",
        related=[("baratang-island", "Baratang Island"), ("morice-dera-beach", "Morice Dera Beach")],
    ),
    dict(
        slug="morice-dera-beach",
        region="middle", region_label="Middle Andaman",
        title="Morice Dera Beach",
        description="Untouched coastline near Rangat, Middle Andaman - a road-less-travelled beach stop.",
        hero="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
        lead="Near Rangat - Middle Andaman's main town - Morice Dera is one of the region's least developed stretches of coast.",
        body=[
            "Rangat itself grew as a settlement point during post-independence resettlement of the islands and today functions mainly as a transit town for travellers heading further north to Mayabunder and Diglipur. Morice Dera, a short distance from the town centre, offers an unspoiled, mostly empty beach with forest running close to the shoreline.",
            "There isn't much organised activity here - it's a place for a walk, a swim if conditions allow, or simply a quiet break from travel. Visitors going all the way to North Andaman for Saddle Peak or Ross & Smith Island often stop through Rangat overnight, making Morice Dera a convenient add-on.",
        ],
        gallery=[
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Region": "Near Rangat, Middle Andaman",
            "Best time": "Nov – Apr",
            "Known for": "Untouched, quiet coastline",
            "Facilities": "Minimal",
            "Ideal for": "A Rangat stopover",
        },
        tip="Combine this with an overnight stop in Rangat if you're travelling overland to Mayabunder or Diglipur - it breaks up a long drive well.",
        related=[("dhani-nallah-beach", "Dhani Nallah Beach"), ("saddle-peak", "Saddle Peak")],
    ),
    dict(
        slug="saddle-peak",
        region="north", region_label="North Andaman",
        title="Saddle Peak",
        description="Trekking guide to Saddle Peak, the highest point in the Andaman Islands, near Diglipur.",
        hero="https://images.unsplash.com/photo-1500759285222-a95626b934cb?q=80&w=1600&auto=format&fit=crop",
        lead="At 732 metres, Saddle Peak is the highest point anywhere in the Andaman & Nicobar Islands - and the centrepiece of the archipelago's only real trekking destination.",
        body=[
            "The peak sits inside Saddle Peak National Park, near Diglipur in North Andaman, and is named for its distinctive saddle-shaped double summit, visible from ships approaching the islands from the north. The park protects one of the last substantial tracts of primary tropical rainforest left in the Andamans, home to endemic birds, the Andaman wild pig, and dense stands of hardwood forest.",
            "The trek to the top is a full-day round trip, roughly 7–8 km one way through progressively steeper forest trail, gaining most of its elevation in the final stretch. It's not technical, but the humidity and terrain make it a genuine hike rather than a stroll - a local guide and forest department permit are required, both usually arranged through your operator or the forest checkpoint at the trailhead.",
            "The reward at the top is a sweeping view over North Andaman's coastline and, on a clear day, out toward the open sea - a genuinely different Andaman experience from the beach-and-boat itinerary most visitors stick to.",
        ],
        gallery=[
            "https://images.unsplash.com/photo-1500759285222-a95626b934cb?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Elevation": "732 m - highest in the Andamans",
            "Trek distance": "~7–8 km one way",
            "Best time": "Nov – Feb (cooler, drier)",
            "Permit": "Forest dept. permit + guide required",
            "Duration": "Full day",
        },
        tip="Start at first light - the trail is entirely under forest canopy so shade isn't an issue, but humidity builds through the day. Carry more water than you think you'll need, and wear proper trekking shoes.",
        related=[("kalipur-beach", "Kalipur Beach"), ("ramnagar-beach", "Ramnagar Beach")],
    ),
    dict(
        slug="ramnagar-beach",
        region="north", region_label="North Andaman",
        title="Ramnagar Beach",
        description="Guide to Ramnagar Beach near Diglipur, a wide and calm base for exploring North Andaman.",
        hero="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1600&auto=format&fit=crop",
        lead="Diglipur, the main town of North Andaman, sits inland from a handful of quiet beaches - Ramnagar being the most accessible base for the region.",
        body=[
            "North Andaman developed later and more slowly than the south, with Diglipur growing around agriculture - the area is known for its areca nut and rubber plantations. Ramnagar Beach, a short ride from town, offers wide, walkable sand and calmer water than the more turtle-focused beach at Kalipur nearby.",
            "It works well as a base for exploring the wider region - Saddle Peak's trailhead, Kalipur's turtle nesting beach, and Ross & Smith Island's sandbar are all reachable within a day from here, making Ramnagar a practical place to stay for two or three nights while covering North Andaman.",
        ],
        gallery=[
            "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500759285222-a95626b934cb?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Region": "Near Diglipur, North Andaman",
            "Best time": "Nov – Feb",
            "Known for": "Calm, wide sands; base for North Andaman",
            "Nearby": "Saddle Peak, Kalipur, Ross & Smith",
            "Ideal stay": "2–3 nights",
        },
        tip="Stay here rather than day-tripping from Port Blair - North Andaman's sights are spread out enough that a proper base saves hours of backtracking.",
        related=[("kalipur-beach", "Kalipur Beach"), ("saddle-peak", "Saddle Peak")],
    ),
    dict(
        slug="kalipur-beach",
        region="north", region_label="North Andaman",
        title="Kalipur Beach",
        description="Turtle nesting season and travel guide for Kalipur Beach, North Andaman.",
        hero="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop",
        lead="Backed by coconut groves and facing the open Andaman Sea, Kalipur is best known as one of the islands' key nesting grounds for olive ridley sea turtles.",
        body=[
            "Between roughly December and March, female olive ridley turtles come ashore at Kalipur at night to lay eggs, digging nests above the tide line before returning to the sea. The Forest Department monitors the beach during this window, and organised, low-impact turtle walks are sometimes possible with proper permission - a genuinely rare wildlife encounter for a beach holiday.",
            "Outside nesting season, Kalipur is simply a peaceful, uncrowded beach - a good sunset spot and an easy stop when exploring North Andaman from a Ramnagar or Diglipur base.",
        ],
        gallery=[
            "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Region": "Near Diglipur, North Andaman",
            "Turtle nesting season": "Dec – Mar (approx.)",
            "Known for": "Olive ridley turtle nesting",
            "Best time to visit": "Nov – Feb",
            "Note": "Turtle walks need Forest Dept. permission",
        },
        tip="If visiting during nesting season, never use white light or flash near nesting turtles - it can disorient them. Any turtle walk should be arranged through an authorised local guide.",
        related=[("ramnagar-beach", "Ramnagar Beach"), ("saddle-peak", "Saddle Peak")],
    ),
    dict(
        slug="ross-and-smith-island",
        region="north", region_label="North Andaman",
        title="Ross & Smith Island",
        description="Guide to Ross & Smith Island near Diglipur, twin islands joined by a natural sandbar.",
        hero="https://images.unsplash.com/photo-1520454974749-611b7248ffdb?q=80&w=1600&auto=format&fit=crop",
        lead="Two small islands off Diglipur, joined by a narrow strip of white sand - Ross & Smith is one of the Andamans' most unusual walks.",
        body=[
            "At low tide, a natural sandbar connects what are technically two separate islands, letting visitors walk from one beach to the other across open water on either side. The effect is striking: a thin ribbon of sand with the sea on both sides, framed by casuarina trees on each island.",
            "Reaching Ross & Smith involves a boat ride from Aerial Bay jetty near Diglipur, and the sandbar is only walkable when tides allow, so trips are timed accordingly. It's less visited than the southern islands simply because of the distance from Port Blair, which keeps it considerably quieter.",
        ],
        gallery=[
            "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Region": "Near Diglipur, North Andaman",
            "Best time": "Nov – Feb",
            "How to reach": "Boat from Aerial Bay jetty",
            "Known for": "Natural sandbar between twin islands",
            "Note": "Sandbar walkable at low tide only",
        },
        tip="Check tide timings before booking your boat slot - the sandbar walk is the entire point of the trip, and it disappears underwater at high tide.",
        related=[("kalipur-beach", "Kalipur Beach"), ("ramnagar-beach", "Ramnagar Beach")],
    ),
]

for d in DESTINATIONS:
    page(d)

print(f"Generated {len(DESTINATIONS)} destination pages.")
