/* ===========================
   Clove Dental — final script.js
   - nav toggle
   - smooth anchors
   - mini + consult forms (demo)
   - reviews carousel
   - faq accordion
   - captcha box alignment
   - back to top button
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Footer Year ----------
  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // ---------- Mobile nav toggle ----------
  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('primary-nav');
  if (ham && nav) {
    ham.addEventListener('click', () => {
      const expanded = ham.getAttribute('aria-expanded') === 'true';
      ham.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) {
        nav.style.display = 'block';
        nav.style.position = 'absolute';
        nav.style.right = '18px';
        nav.style.top = '62px';
        nav.style.background = 'white';
        nav.style.padding = '12px';
        nav.style.borderRadius = '8px';
        nav.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
      } else {
        nav.style.display = '';
        nav.style.position = '';
        nav.style.right = '';
        nav.style.top = '';
        nav.style.background = '';
        nav.style.padding = '';
        nav.style.borderRadius = '';
        nav.style.boxShadow = '';
      }
    });
  }

  // ---------- Smooth anchor scrolling ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        if (window.innerWidth <= 768 && nav && ham) {
          nav.style.display = '';
          ham.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // ---------- Mini form (hero) demo submit ----------
  const miniForm = document.getElementById('miniForm');
  if (miniForm) {
    miniForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('miniPhone');
      if (!phone || !phone.value.trim() || !/^\d{10}$/.test(phone.value.trim())) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }
      alert('Thanks! We will call you shortly (demo).');
      miniForm.reset();
    });
  }

  // ---------- Consult form validation (demo) ----------
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name');
      const phone = document.getElementById('phone');
      const consent = document.getElementById('consent');

      if (!name.value.trim() || !phone.value.trim()) {
        alert('Please fill all required fields.');
        return;
      }
      if (!/^\d{10}$/.test(phone.value.trim())) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }
      if (!consent.checked) {
        alert('Please accept the terms and privacy policy.');
        return;
      }

      // Replace with your API call
      alert('Thanks! A representative will contact you soon. (Demo submission)');
      leadForm.reset();
    });
  }

  // ---------- Reviews carousel (manual card scroll) ----------
  const revCards = document.getElementById('reviewCards');
  const revPrev = document.getElementById('revPrev');
  const revNext = document.getElementById('revNext');

  if (revCards && revPrev && revNext) {
    const revItems = Array.from(revCards.children);
    let rIndex = 0;

    function showReview(i) {
      const card = revItems[0];
      if (!card) return;
      const style = window.getComputedStyle(card);
      const gap = parseInt(style.marginRight || 8);
      const w = card.offsetWidth + gap;
      revCards.style.transform = `translateX(-${i * w}px)`;
      revCards.style.transition = 'transform 380ms cubic-bezier(.2,.9,.2,1)';
    }

    window.addEventListener('resize', () => showReview(rIndex));

    revPrev.addEventListener('click', () => {
      rIndex = (rIndex - 1 + revItems.length) % revItems.length;
      showReview(rIndex);
    });
    revNext.addEventListener('click', () => {
      rIndex = (rIndex + 1) % revItems.length;
      showReview(rIndex);
    });
  }

  // ---------- Transformations: static gallery (no JS movement) ----------
  // intentionally no JS required; CSS handles layout and wrapping.

  // ---------- FAQ accordion (single open, keyboard support) ----------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      faqItems.forEach(i => {
        if (i !== item) {
          i.classList.remove('active');
          const b = i.querySelector('.faq-question');
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });
      const isActive = item.classList.toggle('active');
      btn.setAttribute('aria-expanded', String(isActive));
    });

    // keyboard open/close via Enter/Space
    btn.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        btn.click();
      }
    });
  });

  // ---------- Align captcha box height to input (optional) ----------
  const captchaBox = document.getElementById('captchaBox');
  const captchaInput = document.querySelector('.captcha-input');
  if (captchaBox && captchaInput) {
    const setCaptchaHeight = () => {
      captchaBox.style.height = `${captchaInput.offsetHeight}px`;
      captchaBox.style.lineHeight = `${captchaInput.offsetHeight - 2}px`;
    };
    setCaptchaHeight();
    window.addEventListener('resize', setCaptchaHeight);
  }

  // ---------- Back-to-top button ----------
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const toggleBack = () => {
      if (window.scrollY > 600) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    };
    window.addEventListener('scroll', toggleBack);
    // initial toggle on load
    toggleBack();

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

}); // DOMContentLoaded
