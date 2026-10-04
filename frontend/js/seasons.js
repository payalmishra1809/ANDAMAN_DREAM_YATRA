// Click a month card in "Best time to visit" and its seasonal effect falls over the page.
(function(){
  const script = document.currentScript;
  const base = script.src.replace(/js\/seasons\.js.*$/, '');
  const css = document.createElement('link');
  css.rel = 'stylesheet'; css.href = base + 'css/seasons.css';
  document.head.appendChild(css);

  // type: fall (default), rain, rise
  const MONTHS = [
    {m:'Jan', icon:'❄️', chars:['❄','❅','❆'], count:45, size:[14,26], dur:[8,14], note:'Peak season - cool, calm and clear. Snowflakes for the mood, sunshine for real.'},
    {m:'Feb', icon:'💖', chars:['💗','💖','🌸'], count:30, size:[16,26], dur:[8,13], note:'Dry, sunny and romantic - honeymoon season on the islands.'},
    {m:'Mar', icon:'🎨', chars:['🟣','🟠','🟢','🔴','🟡'], count:50, size:[10,18], dur:[7,12], note:'Holi colours. Warm days, great diving visibility.'},
    {m:'Apr', icon:'☀️', chars:['✨','⭐'], count:30, size:[12,22], dur:[6,10], type:'rise', note:'Hot and bright - ideal for snorkelling and glass-bottom boats.'},
    {m:'May', icon:'⛅', chars:['☁️'], count:10, size:[30,50], dur:[14,22], note:'Pre-monsoon - the last of the dry-season bargains.'},
    {m:'Jun', icon:'🌧️', type:'rain', count:90, dur:[.7,1.2], note:'Monsoon begins. Fewer crowds and lower prices; some sea activities pause.'},
    {m:'Jul', icon:'🌦️', type:'rain', count:110, dur:[.6,1.0], note:'Heavy monsoon. Lush green islands, rough seas.'},
    {m:'Aug', icon:'🍂', chars:['🍂','🍂','🍁'], count:40, size:[18,30], dur:[8,14], note:'Dried leaves drift down. Monsoon lull - peaceful, budget-friendly.'},
    {m:'Sep', icon:'🍃', chars:['🍃','🍂'], count:30, size:[16,26], dur:[8,13], note:'Rains ease. A quiet shoulder month before the season opens.'},
    {m:'Oct', icon:'🏵️', chars:['🏵️','🌼','🧡'], count:30, size:[14,24], dur:[8,13], note:'The season reopens. Seas settle and bookings start to pick up.'},
    {m:'Nov', icon:'🪔', chars:['🪔','✨','🎇'], count:30, size:[14,24], dur:[7,12], type:'rise', note:'Festive lights and calm blue seas - one of the best months to go.'},
    {m:'Dec', icon:'🎄', chars:['❄','❅','⭐'], count:45, size:[14,26], dur:[8,14], note:'Holiday peak. Book early; snow is just for the screen.'}
  ];

  const rnd = (a,b) => a + Math.random()*(b-a);
  let layer = null;

  function stop(){ if(layer){ layer.remove(); layer = null; } }

  function start(cfg){
    stop();
    layer = document.createElement('div'); layer.className = 'fx-layer'; layer.setAttribute('aria-hidden','true');
    for(let i=0;i<cfg.count;i++){
      const p = document.createElement('span');
      p.className = 'fx-p';
      p.style.left = rnd(0,100) + 'vw';
      const d = rnd(cfg.dur[0], cfg.dur[1]);
      p.style.animationDuration = d + 's';
      p.style.animationDelay = (-rnd(0,d)) + 's';
      if(cfg.type === 'rain'){
        p.classList.add('fx-rain');
      } else {
        p.textContent = cfg.chars[Math.floor(Math.random()*cfg.chars.length)];
        p.style.fontSize = rnd(cfg.size[0], cfg.size[1]) + 'px';
        p.style.setProperty('--sway', rnd(-60,60) + 'px');
        p.style.setProperty('--spin', rnd(-540,540) + 'deg');
        p.style.setProperty('--o', rnd(.55,.95));
        if(cfg.type === 'rise') p.classList.add('fx-rise');
      }
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
  }

  function init(){
    const cards = document.querySelectorAll('.month-card');
    if(!cards.length) return;
    const grid = document.querySelector('.month-grid');
    if(grid){
      const hint = document.createElement('p'); hint.className = 'month-hint';
      hint.textContent = 'Tap a month to feel the season. Tap again to stop.';
      grid.parentNode.insertBefore(hint, grid);
    }
    cards.forEach(card => {
      const h4 = card.querySelector('h4'); if(!h4) return;
      const cfg = MONTHS.find(x => h4.textContent.trim().toLowerCase().startsWith(x.m.toLowerCase()));
      if(!cfg) return;
      card.setAttribute('data-fx','1'); card.tabIndex = 0; card.setAttribute('role','button');
      const ic = document.createElement('span'); ic.className = 'fx-icon'; ic.textContent = cfg.icon; h4.appendChild(ic);
      const toggle = () => {
        const was = card.classList.contains('fx-active');
        cards.forEach(c => c.classList.remove('fx-active'));
        if(was){ stop(); } else { card.classList.add('fx-active'); start(cfg); }
      };
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); } });
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
