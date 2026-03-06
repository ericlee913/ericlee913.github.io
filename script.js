/* ════════════════════════════════════════
   NAVBAR — scroll class & active links
════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');

// Highlight the nav link that matches the current page
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(a => {
  const linkFile = a.getAttribute('href').split('/').pop();
  a.classList.toggle('active', linkFile === currentFile);
});

// Scrolled navbar style
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ════════════════════════════════════════
   HAMBURGER MENU
════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinksList = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksList.classList.toggle('open');
});

// Close on link click
navLinksList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksList.classList.remove('open');
  });
});

/* ════════════════════════════════════════
   TYPING EFFECT
════════════════════════════════════════ */
const titles = [
  'Software Engineer',
  'Cybersecurity Enthusiast',
  'Tutor & Mentor',
  'Problem Solver',
  'Full-Stack Developer',
  'Lifelong Learner',
  'Open-Source Contributor',
];

const target = document.getElementById('typing-target');
let titleIdx = 0, charIdx = 0, isDeleting = false;

function type() {
  const current = titles[titleIdx];
  const display = isDeleting
    ? current.slice(0, charIdx - 1)
    : current.slice(0, charIdx + 1);

  target.innerHTML = display + '<span class="cursor"></span>';

  isDeleting ? charIdx-- : charIdx++;

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIdx === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    titleIdx = (titleIdx + 1) % titles.length;
    delay = 400;
  }

  setTimeout(type, delay);
}
if (target) type();

/* ════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════ */
// Add js-animate to body BEFORE paint so elements start hidden for animation
document.body.classList.add('js-animate');

function revealVisible() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 20 && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
}

// Run immediately, on scroll, and on load (covers every timing edge case)
revealVisible();
window.addEventListener('scroll', revealVisible, { passive: true });
window.addEventListener('load', revealVisible);

/* ════════════════════════════════════════
   EXPERIENCE DETAIL PANELS
════════════════════════════════════════ */
function openPanel(id) {
  const panel = document.getElementById(id);
  if (!panel) return;
  panel.classList.add('is-active');
  document.body.style.overflow = 'hidden';
  panel.scrollTop = 0;
}

function closeAllPanels() {
  document.querySelectorAll('.exp-panel.is-active').forEach(p => p.classList.remove('is-active'));
  document.body.style.overflow = '';
}

document.querySelectorAll('.exp-card').forEach(card => {
  card.addEventListener('click', () => openPanel(card.dataset.panel));
});
document.querySelectorAll('.exp-panel-back').forEach(btn => {
  btn.addEventListener('click', closeAllPanels);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllPanels(); });

/* ════════════════════════════════════════
   CONTACT FORM (static — Formspree ready)
════════════════════════════════════════ */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // ── To use Formspree, replace the action URL below and remove the setTimeout mock ──
    // const res = await fetch('https://formspree.io/f/YOUR_ID', {
    //   method: 'POST',
    //   headers: { 'Accept': 'application/json' },
    //   body: new FormData(form),
    // });
    // if (res.ok) { ... }

    // Static mock response (remove when wired to Formspree)
    await new Promise(r => setTimeout(r, 1000));
    status.textContent = '✓ Message sent! I\'ll get back to you soon.';
    form.reset();
    btn.disabled = false;
    btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    setTimeout(() => (status.textContent = ''), 6000);
  });
}

/* ════════════════════════════════════════
   FOOTER YEAR
════════════════════════════════════════ */
document.getElementById('year').textContent = new Date().getFullYear();
