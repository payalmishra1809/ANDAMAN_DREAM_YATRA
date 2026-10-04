#!/usr/bin/env python3
import glob
import re

FOOTER_TEMPLATE = """<footer class="site-footer">
  <div class="container">
    <div class="footer-trust">
      <span>Based in Sri Vijaya Puram, Andaman</span>
      <span>Mon - Sat, 9 AM - 7 PM IST</span>
      <span>WhatsApp support available</span>
      <span>Transparent, upfront pricing</span>
    </div>
    <div class="footer-grid">
      <div>
        <a href="{P}index.html" class="brand">
          <img src="{P}images/logo-transparent.png" alt="Andaman Dream Yatra logo" class="brand-logo">
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
          <li><a href="{P}destinations.html">Destinations</a></li>
          <li><a href="{P}packages.html">Packages</a></li>
          <li><a href="{P}services.html">Services</a></li>
          <li><a href="{P}activities.html">Activities</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="{P}cancellation.html">Cancellation &amp; Refunds</a></li>
          <li><a href="{P}contact.html">Contact &amp; Enquiry</a></li>
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
"""

pattern = re.compile(r'<footer class="site-footer">.*?</footer>\s*', re.S)

files = glob.glob("frontend/*.html") + glob.glob("frontend/destinations/*.html") + glob.glob("frontend/activities/*.html")
count = 0
for fp in files:
    with open(fp, encoding="utf-8") as f:
        s = f.read()
    prefix = "../" if ("/destinations/" in fp or "/activities/" in fp) else ""
    new_footer = FOOTER_TEMPLATE.format(P=prefix)
    s2, n = pattern.subn(new_footer, s)
    if n != 1:
        print(f"WARNING: {fp} had {n} footer matches")
    else:
        count += 1
    with open(fp, "w", encoding="utf-8") as f:
        f.write(s2)

print(f"Updated footer in {count} files")
