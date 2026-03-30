/* ============================================================
   SUMINISTROS MIRANDA 200 LLC — Main JavaScript
   ============================================================ */

/* ── Navbar scroll behaviour ── */
function handleNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Interior pages already have .solid; only animate on homepage
  if (navbar.classList.contains('solid')) return;

  const update = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── Mobile Menu ── */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    }
  });
}

/* ── Floating Particles (hero) ── */
function createParticles() {
  const container = document.getElementById('particles-js');
  if (!container) return;

  const colors = ['rgba(200,16,46,0.5)', 'rgba(255,255,255,0.3)', 'rgba(11,34,64,0.6)'];
  const count  = 28;

  for (let i = 0; i < count; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = [
      `left:${Math.random() * 100}%`,
      `width:${size}px`,
      `height:${size}px`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `animation-duration:${Math.random() * 15 + 10}s`,
      `animation-delay:${Math.random() * -18}s`,
    ].join(';');
    container.appendChild(p);
  }
}

/* ── Scroll-triggered fade-up animations ── */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.animate-fade-up').forEach(el => observer.observe(el));
}

/* ── Number counter animation ── */
function initCounters() {
  const counters = document.querySelectorAll('.number-value[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el       = entry.target;
      const target   = parseInt(el.dataset.target, 10);
      const prefix   = el.dataset.prefix || '';
      const duration = 1800;
      const start    = performance.now();

      const animate = (now) => {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const current  = Math.round(eased * target);
        el.textContent = prefix + current;
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = prefix + target;
      };

      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, { threshold: 0.35 });

  counters.forEach(el => observer.observe(el));
}

/* ── Contact Form ── */
function initContactForm() {
  const form       = document.getElementById('contactFormEl');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    form.querySelectorAll('.form-control').forEach(f => f.style.borderColor = '');

    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#C8102E';
        valid = false;
      }
    });

    const emailField = form.querySelector('#email');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.style.borderColor = '#C8102E';
      valid = false;
    }

    if (!valid) return;

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Enviando…';

    setTimeout(() => {
      if (successMsg) successMsg.style.display = 'block';
      submitBtn.disabled   = false;
      submitBtn.innerHTML  =
        '<svg viewBox="0 0 24 24" fill="currentColor" style="width:17px;height:17px;flex-shrink:0;"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> Enviar Mensaje';
      form.reset();
      form.querySelectorAll('.form-control').forEach(f => f.style.borderColor = '');
    }, 1800);
  });

  form.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('focus', () => { field.style.borderColor = ''; });
  });
}

/* ── Smooth Scroll for anchor links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href   = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── Image error fallback ── */
function initImageFallbacks() {
  document.querySelectorAll('img[onerror]').forEach(img => {
    img.addEventListener('error', () => {
      if (img.dataset.fallback) img.src = img.dataset.fallback;
    });
  });
}

/* ── Language Toggle ── */
function initTranslation() {
  const btn   = document.getElementById('langToggle');
  const label = document.getElementById('langLabel');
  if (!btn || !window.TRANSLATIONS_EN) return;

  // Save original Spanish content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.dataset.es = el.innerHTML;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.dataset.esPlaceholder = el.placeholder;
  });

  function applyLang(lang) {
    if (lang === 'en') {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (window.TRANSLATIONS_EN[key] !== undefined) el.innerHTML = window.TRANSLATIONS_EN[key];
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (window.TRANSLATIONS_EN[key] !== undefined) el.placeholder = window.TRANSLATIONS_EN[key];
      });
      document.documentElement.lang = 'en';
      label.textContent = 'ES';
    } else {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        if (el.dataset.es !== undefined) el.innerHTML = el.dataset.es;
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        if (el.dataset.esPlaceholder !== undefined) el.placeholder = el.dataset.esPlaceholder;
      });
      document.documentElement.lang = 'es';
      label.textContent = 'EN';
    }
    localStorage.setItem('sm200-lang', lang);
  }

  const saved = localStorage.getItem('sm200-lang') || 'en';
  applyLang(saved);

  btn.addEventListener('click', () => {
    const current = localStorage.getItem('sm200-lang') || 'en';
    applyLang(current === 'en' ? 'es' : 'en');
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  handleNavbar();
  initMobileMenu();
  createParticles();
  initScrollAnimations();
  initCounters();
  initContactForm();
  initSmoothScroll();
  initImageFallbacks();
  initTranslation();
});
