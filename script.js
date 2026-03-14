// ========================================
// SCROLL ANIMATIONS
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  var animatedElements = document.querySelectorAll('.animate-on-scroll');

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });

  // ========================================
  // STAGGERED CARD ANIMATIONS
  // ========================================
  var staggerCards = document.querySelectorAll('.problema-card, .audience-card-v2');
  var cardObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = getComputedStyle(entry.target).getPropertyValue('--delay') || '0s';
          var ms = parseFloat(delay) * 1000;
          setTimeout(function () {
            entry.target.classList.add('card-visible');
          }, ms);
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  staggerCards.forEach(function (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    cardObserver.observe(card);
  });

  // Add card-visible class styles
  var style = document.createElement('style');
  style.textContent = '.card-visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ========================================
  // TILT EFFECT ON PREMIUM CARDS
  // ========================================
  var tiltCards = document.querySelectorAll('.problema-card, .audience-card-v2');
  tiltCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = ((y - centerY) / centerY) * -3;
      var rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ========================================
  // FAQ ACCORDION
  // ========================================
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    btn.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      faqItems.forEach(function (i) {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ========================================
  // COUNTDOWN TIMER
  // ========================================
  var workshopDate = new Date('2025-04-09T19:30:00-03:00');

  var daysEl = document.getElementById('days');
  var hoursEl = document.getElementById('hours');
  var minutesEl = document.getElementById('minutes');
  var secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    var now = new Date().getTime();
    var distance = workshopDate.getTime() - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ========================================
  // SMOOTH SCROLL FOR CTA BUTTONS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========================================
  // BUTTON RIPPLE EFFECT
  // ========================================
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var ripple = document.createElement('span');
      ripple.classList.add('ripple');
      var rect = this.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(ripple);
      setTimeout(function () {
        ripple.remove();
      }, 600);
    });
  });

});
