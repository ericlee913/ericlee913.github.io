/* ════════════════════════════════════════
   NAVBAR — scroll class & active links
════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled style
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
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
  'Full-Stack Developer',
  'Problem Solver',
  'Open-Source Enthusiast',
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
type();

/* ════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ════════════════════════════════════════
   CONTACT FORM (static — Formspree ready)
════════════════════════════════════════ */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

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

/* ════════════════════════════════════════
   FOOTER YEAR
════════════════════════════════════════ */
document.getElementById('year').textContent = new Date().getFullYear();
