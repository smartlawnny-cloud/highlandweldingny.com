// ═══════════════════════════════════════════
// HIGHLAND WELDING — SHARED JS
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // NAV scroll shadow
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
  }

  // Floating CTA
  const floatCta = document.getElementById('floatCta');
  if (floatCta) {
    window.addEventListener('scroll', () => floatCta.classList.toggle('visible', window.scrollY > 300));
  }

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.faq-q').forEach(b => { b.classList.remove('open'); if (b.nextElementSibling) b.nextElementSibling.classList.remove('open'); });
      if (!isOpen) { btn.classList.add('open'); answer.classList.add('open'); }
    });
  });

  // Carousel
  const track = document.getElementById('carouselTrack');
  if (track) {
    const cards = track.querySelectorAll('.review-card');
    const dotsContainer = document.getElementById('carouselDots');
    let current = 0;
    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'cdot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
    function goTo(index) {
      current = Math.max(0, Math.min(index, cards.length - 1));
      const offset = Array.from(cards).slice(0, current).reduce((acc, c) => acc + c.offsetWidth + 2, 0);
      track.style.transform = `translateX(-${offset}px)`;
      document.querySelectorAll('.cdot').forEach((d, i) => d.classList.toggle('active', i === current));
    }
    document.getElementById('carouselPrev')?.addEventListener('click', () => goTo(current - 1));
    document.getElementById('carouselNext')?.addEventListener('click', () => goTo(current + 1));
    setInterval(() => goTo(current + 1 < cards.length ? current + 1 : 0), 5500);
  }

  // Contact form
  window.handleFormSubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('fname')?.value.trim();
    const phone = document.getElementById('fphone')?.value.trim();
    const service = document.getElementById('fservice')?.value || 'Not specified';
    const msg = document.getElementById('fmsg')?.value.trim();
    if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
    window.location.href = `mailto:highlandwelding@aol.com?subject=${encodeURIComponent('Website Inquiry from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nPhone: ' + phone + '\nService: ' + service + '\n\nMessage:\n' + msg)}`;
  };

});
