/* Mark body so CSS animations activate only when JS works */
document.body.classList.add('js-ready');
document.body.style.cursor = 'none';

/* ==================== CUSTOM CURSOR ==================== */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .btn, .quick-link-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width      = '16px';
    cursor.style.height     = '16px';
    cursor.style.background = 'var(--accent2)';
    cursorRing.style.width   = '50px';
    cursorRing.style.height  = '50px';
    cursorRing.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width      = '10px';
    cursor.style.height     = '10px';
    cursor.style.background = 'var(--accent)';
    cursorRing.style.width   = '36px';
    cursorRing.style.height  = '36px';
    cursorRing.style.opacity = '0.6';
  });
});

/* ==================== SCROLL PROGRESS ==================== */
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop    = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = (scrollTop / scrollHeight * 100) + '%';
}, { passive: true });

/* ==================== HEADER SHADOW ==================== */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ==================== SCROLL REVEAL ==================== */
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));