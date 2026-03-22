  window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if(t) t.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });

  const stripAImgs = [1,2,3,4,5,6,7,8,9,10,11,12];
  const stripBImgs = [8,9,10,11,12,1,2,3,4,5,6,7];

  function buildStrip(id, imgs) {
    const el = document.getElementById(id);
    [...imgs, ...imgs].forEach(n => {
      const card = document.createElement('div');
      card.className = 'img-card';
      const img = document.createElement('img');
      img.src = `assets/${n}.png`;
      img.alt = `${n}`;
      img.loading = 'eager';
      card.appendChild(img);
      el.appendChild(card);
    });
  }

  buildStrip('stripA', stripAImgs);
  buildStrip('stripB', stripBImgs);

  const typeText = "Luna is an intelligent extension for browsers powered by advanced AI models that assists users directly within their browser environment. It can analyse complex webpages, summarize long PDF documents instantly, extract key insights, and answer contextual questions about the content currently being viewed. The goal of Luna is to transform passive browsing into an interactive and productive experience.";
  const typeEl = document.getElementById('typewriterText');
  const cursorEl = document.getElementById('typewriterCursor');
  let typed = false;

  const typeObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !typed) {
        typed = true;
        cursorEl.classList.add('active');
        let i = 0;
        const speed = 18;
        function tick() {
          if (i < typeText.length) {
            typeEl.textContent += typeText[i];
            i++;
            setTimeout(tick, speed);
          } else {
            setTimeout(() => cursorEl.classList.remove('active'), 1500);
          }
        }
        tick();
      }
    });
  }, { threshold: 0.3 });

  typeObserver.observe(document.getElementById('model'));

  const tlItems = document.querySelectorAll('.tl-reveal');
  const tlObserver = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.classList.add('tl-visible');
        }, 120);
        tlObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  tlItems.forEach(el => tlObserver.observe(el));

  function detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return { name: 'Firefox', label: 'Add to Firefox' };
    if (ua.includes('Edg/'))    return { name: 'Edge',    label: 'Add to Edge' };
    if (ua.includes('OPR') || ua.includes('Opera')) return { name: 'Opera', label: 'Add to Opera' };
    if (ua.includes('Brave') || navigator.brave)    return { name: 'Brave', label: 'Add to Brave' };
    if (ua.includes('Chrome'))  return { name: 'Chrome',  label: 'Add to Chrome' };
    if (ua.includes('Safari'))  return { name: 'Safari',  label: 'Add to Safari' };
    return { name: 'Browser', label: 'Add to Browser' };
  }
  const browser = detectBrowser();
  document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.trim().startsWith('Add to')) {
      btn.textContent = browser.label;
    }
  });