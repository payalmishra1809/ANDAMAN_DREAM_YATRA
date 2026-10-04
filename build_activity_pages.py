#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generates blog-style 'Know More' detail pages for each activity."""
import os

OUT_DIR = "frontend/activities"
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
    return "".join(f'<li><a href="{href}" class="">{label}</a></li>' for href, label in NAV_ITEMS)

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
      <span class="brand-text"><strong>Andaman Dream Yatra</strong><span>Port Blair &middot; Andaman &amp; Nicobar</span></span>
    </a>
    <nav>
      <ul class="nav-links">
        __NAV__
      </ul>
    </nav>
    <div class="nav-cta">
      <a href="../contact.html" class="btn btn-ocean btn-sm">Book Now</a>
      <button class="nav-toggle" aria-label="Toggle menu">&#9776;</button>
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
    <div class="footer-trust">
      <span>Based in Sri Vijaya Puram, Andaman</span>
      <span>Mon - Sat, 9 AM - 7 PM IST</span>
      <span>WhatsApp support available</span>
      <span>Transparent, upfront pricing</span>
    </div>
    <div class="footer-grid">
      <div>
        <a href="../index.html" class="brand">
          <img src="../images/logo-transparent.png" alt="Andaman Dream Yatra logo" class="brand-logo">
          <span class="brand-text"><strong>Andaman Dream Yatra</strong><span>Travel Made Simple</span></span>
        </a>
        <p style="color:rgba(255,255,255,.65); font-size:.88rem; max-width:280px; margin-top:12px;">
          Curated island journeys across the Andaman &amp; Nicobar archipelago -
          from turquoise coves to coral gardens, we plan every tide of your trip.
        </p>
        <div class="footer-social">
          <a href="https://wa.me/919531918146" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5C10 9 9.4 7.6 9.1 7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.2-.4-4.5-1.3l-.3-.2-3 .8.8-3-.2-.3C4 14.9 3.6 13.5 3.6 12 3.6 7.4 7.4 3.6 12 3.6S20.4 7.4 20.4 12 16.6 20.2 12 20.2z"/></svg></a>
          <a href="mailto:andamandreamyatra@gmail.com" aria-label="Email us"><svg viewBox="0 0 24 24"><path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13zm2.2.5 7.3 5.5c.3.2.7.2 1 0L19.8 6H4.2zM20 7.8l-6.9 5.2c-.6.5-1.6.5-2.2 0L4 7.8v10.7h16V7.8z"/></svg></a>
          <a href="tel:+919531918146" aria-label="Call us"><svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.7 5.1 6.5 6.5l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1.1.5 1.1 1.1V20c0 .6-.5 1.1-1.1 1.1C10.5 21.1 2.9 13.5 2.9 4.1 2.9 3.5 3.4 3 4 3h3.5c.6 0 1.1.5 1.1 1.1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"/></svg></a>
        </div>
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
          <li>Royal Colony, Dollygunj, Sri Vijaya Puram - 744103</li>
          <li>Mon - Sat, 9 AM - 7 PM IST</li>
          <li><a href="mailto:andamandreamyatra@gmail.com" style="font-size:1rem; font-weight:600;">andamandreamyatra@gmail.com</a></li>
          <li><a href="tel:+919531918146" style="font-size:1rem; font-weight:600;">+91 95319 18146 / +91 96795 62303</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&#169; 2026 Andaman Dream Yatra. All rights reserved.</span>
      <span>Designed for the island life</span>
    </div>
  </div>
</footer>
<script src="../js/main.js"></script>
</body>
</html>
"""

def page(a):
    facts_html = "".join(f'<li><span>{k}</span><span>{v}</span></li>' for k, v in a["facts"].items())
    gallery_html = "".join(f'<img src="{src}" alt="{a["title"]} in Andaman Islands">' for src in a["gallery"])
    related_html = "".join(f'<a href="{slug}.html">{label}</a>' for slug, label in a["related"])

    html = HEADER.format(title=a["title"], description=a["description"])
    html += f"""
<section style="padding-top:44px;">
  <div class="container">
    <div class="breadcrumb reveal">
      <a href="../activities.html">Activities</a> / {a['title']}
    </div>
    <div class="detail-hero reveal">
      <img src="{a['hero']}" alt="{a['title']} in Andaman Islands">
      <div class="detail-hero-caption">
        <span class="eyebrow">Water Activity</span>
        <h1>{a['title']}</h1>
      </div>
    </div>

    <div class="detail-layout">
      <article class="detail-article reveal">
        <p class="lead">{a['lead']}</p>

        <h2>Why choose {a['short']}?</h2>
        <p>{a['why']}</p>

        <h2>Best spot for {a['short']} in Andaman</h2>
        <p>{a['best_spot']}</p>

        <div class="gallery-strip">{gallery_html}</div>

        <h2>What to bring</h2>
        <p>{a['what_to_bring']}</p>

        <h2>Experience overview</h2>
        <p>{a['experience']}</p>
      </article>

      <aside class="fact-box reveal">
        <h3>Quick Facts</h3>
        <ul class="fact-list">{facts_html}</ul>
        <a href="../contact.html?activity={a['title'].replace(' ', '+')}" class="btn btn-primary">Add to My Itinerary</a>
        <a href="../activities.html" class="btn btn-outline" style="border-color:var(--ocean-deep); color:var(--ocean-deep); margin-top:10px;">See All Activities</a>
      </aside>
    </div>

    <div class="reveal" style="margin-top:50px;">
      <span class="eyebrow">Pair it with</span>
      <div class="related-strip">{related_html}
        <a href="../activities.html">All Activities</a>
      </div>
    </div>
  </div>
</section>
"""
    html += FOOTER
    with open(os.path.join(OUT_DIR, a["slug"] + ".html"), "w", encoding="utf-8") as f:
        f.write(html)


ACTIVITIES = [
    dict(
        slug="coral-safari-semi-submarine",
        title="Coral Safari (Semi-Submarine)",
        short="the coral safari",
        description="Ride a semi-submersible glass-hulled boat over Andaman's reefs and see the coral garden without getting wet.",
        hero="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
        lead="A semi-submarine is exactly what it sounds like: a boat with a glass-walled lower deck that sits below the waterline, letting you look straight out at the reef while staying completely dry.",
        why="It's the easiest way to see Andaman's coral without swimming, diving certification, or even getting your feet wet - which makes it the go-to choice for young children, older travellers, non-swimmers, or anyone who wants the reef experience without the effort of snorkelling gear.",
        best_spot="North Bay Island, just off Port Blair, runs the most regular semi-submarine trips and is easily combined with a Ross Island visit on the same boat outing. Havelock also runs coral safari trips over its shallower reef patches for those basing themselves there instead.",
        what_to_bring="Nothing specific is required since you stay dry throughout - just sun protection (hat, sunglasses, sunscreen) for the open-boat ride out, and a camera or phone for photos through the glass viewing panels.",
        experience="Trips run in small batches, motoring out to a reef patch before slowing to a crawl over the coral for 20-30 minutes of viewing time through the glass hull, with a guide pointing out fish and coral formations along the way, before heading back to the jetty.",
        gallery=[
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Duration": "30-45 minutes",
            "Best for": "Non-swimmers, families, kids",
            "Where": "North Bay Island, Havelock",
            "Gets you wet": "No",
        },
        related=[("scuba-diving", "Scuba Diving"), ("snorkelling", "Snorkelling")],
    ),
    dict(
        slug="scuba-diving",
        title="Scuba Diving",
        short="scuba diving",
        description="Beginner and certified scuba diving in Andaman's coral reefs at Havelock and Neil Island.",
        hero="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=1600&auto=format&fit=crop",
        lead="Andaman is India's best-known scuba diving destination, with warm, clear water and reef systems shallow enough for complete beginners and deep enough to hold certified divers' attention for a week of dives.",
        why="Visibility regularly exceeds 15-20 metres in season, the water stays warm year-round, and the reefs sit close enough to shore that even a first-timer's introductory dive can reach genuinely healthy coral - not just a training pool.",
        best_spot="Havelock Island is the undisputed centre of Andaman diving, with dive schools running trips to sites like Aquarium, Lighthouse, Nemo Reef and Barracuda City. Neil Island and North Bay offer calmer, shallower alternatives better suited to nervous first-timers.",
        what_to_bring="A swimsuit, a change of clothes, and a towel - dive schools supply all equipment (mask, fins, tank, regulator, wetsuit). If you wear contact lenses, bring a spare pair; motion sickness tablets are worth carrying if you're prone to seasickness on the boat ride out.",
        experience="A Discover Scuba (introductory) dive starts with a short briefing and confined water practice near the boat, followed by a guided dive to around 6-12 metres depth for 30-40 minutes. Certified divers can book multi-tank days or full certification courses (PADI/SSI) run over 3-4 days.",
        gallery=[
            "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Duration": "Half-day (intro), 3-4 days (certification)",
            "Best for": "First-timers to certified divers",
            "Where": "Havelock, Neil Island",
            "Certification": "PADI / SSI available",
        },
        related=[("snorkelling", "Snorkelling"), ("submersible-scooter", "Submersible Scooter")],
    ),
    dict(
        slug="snorkelling",
        title="Snorkelling",
        short="snorkelling",
        description="Shallow-reef snorkelling at Elephant Beach and Bharatpur Beach, ideal for beginners.",
        hero="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
        lead="No certification, no equipment ownership, no experience required - snorkelling is the simplest way into Andaman's underwater world, and the islands have some of the shallowest, most accessible reefs in the country for it.",
        why="Several beaches have living coral just a short swim from the shore in water shallow enough to stand up in, meaning you can see a genuinely healthy reef on your first attempt, with a guide nearby the whole time.",
        best_spot="Elephant Beach on Havelock is the most popular spot, reachable by boat or a forest trail, with calm, clear water over a wide coral patch. Bharatpur Beach on Neil Island is an easier, even more sheltered alternative for nervous swimmers.",
        what_to_bring="Swimwear, a rash guard or t-shirt if you burn easily, reef-safe sunscreen, and water shoes for walking over the coral rubble near shore. Mask, snorkel and fins are provided by the operator.",
        experience="A typical session runs 45 minutes to an hour, starting with a briefing on reef etiquette (no touching or standing on coral), followed by guided time in the water pointing out clownfish, parrotfish and coral formations.",
        gallery=[
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Duration": "45-60 minutes",
            "Best for": "Complete beginners",
            "Where": "Elephant Beach, Bharatpur Beach",
            "Certification": "None required",
        },
        related=[("scuba-diving", "Scuba Diving"), ("coral-safari-semi-submarine", "Coral Safari")],
    ),
    dict(
        slug="submersible-scooter",
        title="Submersible Scooter",
        short="the submersible scooter",
        description="Ride a motorised underwater scooter over Andaman's reefs without a scuba certification.",
        hero="https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=1600&auto=format&fit=crop",
        lead="Somewhere between snorkelling and scuba diving sits the submersible scooter - a motorised, handheld device that pulls you just below the surface over the reef, no swimming effort or certification required.",
        why="It covers more reef than a swimmer could manage unaided, without requiring the training or comfort-with-depth that scuba diving does - a good middle option for travellers who want more than snorkelling but aren't ready to commit to a full dive course.",
        best_spot="Havelock and North Bay Island run submersible scooter sessions over their shallow reef patches, usually as an add-on alongside snorkelling or coral safari bookings on the same boat trip.",
        what_to_bring="Swimwear and a basic comfort in water - operators provide the scooter, a snorkel mask, and a life jacket. A GoPro or waterproof phone case is worth bringing if you want your own footage.",
        experience="After a short briefing on the scooter's controls, you're guided out over the reef holding onto the device's handles while it pulls you along just below the surface, with a guide swimming alongside for the full 20-30 minute session.",
        gallery=[
            "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Duration": "20-30 minutes",
            "Best for": "Comfortable swimmers, no cert needed",
            "Where": "Havelock, North Bay Island",
            "Gets you wet": "Yes",
        },
        related=[("scuba-diving", "Scuba Diving"), ("snorkelling", "Snorkelling")],
    ),
    dict(
        slug="parasailing",
        title="Parasailing",
        short="parasailing",
        description="Parasail over Andaman's coastline for aerial views of the bay - no experience needed.",
        hero="https://images.unsplash.com/photo-1530866495561-451f0e8f9375?q=80&w=1600&auto=format&fit=crop",
        lead="Strapped into a parachute and towed behind a speedboat, parasailing lifts you 50-100 metres above the bay for a few minutes of aerial views over the coastline - one of the shortest, most accessible adventure activities on offer.",
        why="It requires zero experience or fitness, lasts just long enough to enjoy without becoming tiring, and gives a genuinely different perspective on the coast than any boat trip or beach can - popular with first-time adventure-seekers and families with older kids.",
        best_spot="Corbyn's Cove Beach near Port Blair and Havelock's main beach stretch both run regular parasailing sessions, usually operating in calm morning conditions before the afternoon winds pick up.",
        what_to_bring="Swimwear or clothes you don't mind getting a little wet at takeoff/landing, and secured footwear or none at all - operators provide the harness and life jacket. Sunglasses with a strap are handy given the height and wind.",
        experience="After a quick harness fitting and safety briefing, the boat accelerates and the parachute lifts you off the platform or beach for a 5-10 minute glide before a controlled descent back down, either onto the boat deck or a landing platform.",
        gallery=[
            "https://images.unsplash.com/photo-1530866495561-451f0e8f9375?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Duration": "5-10 minutes in air",
            "Best for": "First-time adventure seekers",
            "Where": "Corbyn's Cove, Havelock",
            "Certification": "None required",
        },
        related=[("sea-kart", "Sea Kart"), ("kayaking", "Kayaking")],
    ),
    dict(
        slug="kayaking",
        title="Kayaking",
        short="kayaking",
        description="Kayak through Andaman's mangrove creeks and calm bays, solo or in a two-seater.",
        hero="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1600&auto=format&fit=crop",
        lead="Kayaking is the quietest way to explore Andaman's coastline - paddling yourself through still mangrove creeks or along a calm bay at whatever pace you like, with nothing but the sound of the paddle and the birds.",
        why="It's low-impact, needs no prior experience, and gets you into places motorboats can't reach - narrow mangrove channels, shallow bays, and quiet coves that stay completely undisturbed.",
        best_spot="The mangrove creeks around Havelock and the backwaters near Baratang are the most rewarding kayaking routes, with dense mangrove canopy overhead and the occasional kingfisher or heron along the banks. Calmer bay routes near Port Blair suit total beginners.",
        what_to_bring="Quick-dry clothing, a hat, sunscreen and water shoes; a dry bag for your phone is worth carrying if you want photos along the way. Life jackets are provided by the operator.",
        experience="Guided sessions typically run 1-2 hours, starting with a quick paddling briefing before heading out in single or double kayaks along a set creek or bay route, usually timed around the tide so the mangrove channels stay navigable.",
        gallery=[
            "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Duration": "1-2 hours",
            "Best for": "All fitness levels",
            "Where": "Havelock mangroves, Baratang backwaters",
            "Certification": "None required",
        },
        related=[("parasailing", "Parasailing"), ("sea-kart", "Sea Kart")],
    ),
    dict(
        slug="sea-kart",
        title="Sea Kart",
        short="the sea kart",
        description="Drive a motorised ride-on water kart along the Andaman coastline - fast, easy, and family-friendly.",
        hero="https://images.unsplash.com/photo-1530053969600-caed2596d242?q=80&w=1600&auto=format&fit=crop",
        lead="A sea kart is a small, motorised ride-on watercraft you drive yourself - part jet ski, part go-kart - built to be quick to learn and genuinely fun for a short, fast loop along the coastline.",
        why="Unlike a jet ski, a sea kart's low, stable seating position makes it easy to control from the first ride, so it works well for teenagers and less confident riders while still delivering a proper adrenaline hit for everyone else.",
        best_spot="Corbyn's Cove Beach near Port Blair and Havelock's activity beach both run sea kart sessions in short, supervised loops close to shore.",
        what_to_bring="Swimwear, a change of clothes, and a strap for glasses/sunglasses if you wear them - the operator provides a life jacket and a quick driving briefing before you head out.",
        experience="After a short briefing on the throttle and steering, you take the kart out in a supervised loop close to the beach for around 15-20 minutes, usually with an instructor watching from a nearby boat or jet ski.",
        gallery=[
            "https://images.unsplash.com/photo-1530053969600-caed2596d242?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1530866495561-451f0e8f9375?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop",
        ],
        facts={
            "Duration": "15-20 minutes",
            "Best for": "Teens, families, adrenaline seekers",
            "Where": "Corbyn's Cove, Havelock",
            "Certification": "None required",
        },
        related=[("parasailing", "Parasailing"), ("kayaking", "Kayaking")],
    ),
]

for a in ACTIVITIES:
    page(a)

print(f"Generated {len(ACTIVITIES)} activity pages.")
