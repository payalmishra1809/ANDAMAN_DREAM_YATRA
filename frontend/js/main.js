// =========================================================
// ANDAMAN DREAM YATRA - shared front-end behaviour
// =========================================================

// ---- API base: change if backend runs on a different host ----
const API_BASE = window.ADY_API_BASE || 'http://localhost:5000';

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initScrollReveal();
  initRegionTabs();
  initCarousel();
  initPaxCounters();
  initEnquiryForm();
  markActiveNav();
});

// ---------- Mobile nav ----------
function initNavToggle(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.textContent = '☰';
  }));
}

function markActiveNav(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });
}

// ---------- Scroll reveal ----------
function initScrollReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, { threshold: .15 });
  items.forEach(i => io.observe(i));
}

// ---------- Destinations region tabs ----------
function initRegionTabs(){
  const tabs = document.querySelectorAll('.region-tab');
  if(!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.region;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.region-panel').forEach(p => {
        p.classList.toggle('active', p.dataset.region === target);
      });
    });
  });
}

// ---------- Packages carousel ----------
function initCarousel(){
  const track = document.querySelector('.carousel-track');
  const prev = document.querySelector('[data-carousel="prev"]');
  const next = document.querySelector('[data-carousel="next"]');
  if(!track) return;
  const scrollAmount = () => (track.querySelector('.package-card')?.offsetWidth || 340) + 26;
  next?.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior:'smooth' }));
  prev?.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior:'smooth' }));
}

// ---------- Passenger counters ----------
function initPaxCounters(){
  document.querySelectorAll('.pax-counter').forEach(counter => {
    const display = counter.querySelector('span');
    const minus = counter.querySelector('[data-action="minus"]');
    const plus = counter.querySelector('[data-action="plus"]');
    const min = Number(counter.dataset.min || 0);
    const max = Number(counter.dataset.max || 20);
    let value = Number(display.textContent);
    const update = () => { display.textContent = value; };
    minus?.addEventListener('click', () => { if(value > min){ value--; update(); }});
    plus?.addEventListener('click', () => { if(value < max){ value++; update(); }});
  });
}

// ---------- Enquiry form submission ----------
function initEnquiryForm(){
  const form = document.getElementById('enquiry-form');
  if(!form) return;
  const msg = document.getElementById('form-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.className = 'form-msg';

    const adults = document.querySelector('[data-pax="adult"] span')?.textContent || '0';
    const children = document.querySelector('[data-pax="child"] span')?.textContent || '0';
    const infants = document.querySelector('[data-pax="infant"] span')?.textContent || '0';

    const payload = {
      fullName: form.fullName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      adults: Number(adults),
      children: Number(children),
      infants: Number(infants),
      message: form.message.value.trim(),
      package: form.dataset.package || form.querySelector('[name="packageName"]')?.value || 'General enquiry',
    };

    if(!payload.fullName || !payload.email || !payload.phone){
      msg.textContent = 'Please fill in your name, email and phone number.';
      msg.classList.add('error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try{
      const res = await fetch(`${API_BASE}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if(!res.ok) throw new Error('Request failed');
      msg.textContent = "Thank you! Your enquiry has been sent - our team will reach out within 24 hours.";
      msg.classList.add('success');
      form.reset();
      document.querySelectorAll('.pax-counter span').forEach(s => s.textContent = '0');
    }catch(err){
      msg.textContent = "We couldn't send your enquiry automatically. Please WhatsApp us at +91 95319 18146 or email andamandreamyatra@gmail.com directly.";
      msg.classList.add('error');
    }finally{
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}

// ---------- Helper: pre-fill enquiry form from a package "Book Now" ----------
function bookPackage(name){
  const target = document.getElementById('enquiry-form');
  if(target){
    const hidden = target.querySelector('[name="packageName"]');
    if(hidden) hidden.value = name;
    const msgField = target.querySelector('[name="message"]');
    if(msgField && !msgField.value) msgField.value = `Hi, I'm interested in the "${name}" package. Please share availability and details.`;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }else{
    window.location.href = `contact.html?package=${encodeURIComponent(name)}`;
  }
}
