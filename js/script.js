/* ========================================
   WURKO PADEL - JAVASCRIPT PRINCIPAL
   ======================================== */

const WurkoApp = {

  // Inicialización principal
  init() {
    this.setupMenu();
    this.setupProgressBar();
    this.setupScrollAnimations();
    this.setupSmoothScroll();
    this.setupParallax();
    this.setupBackToTop();
    this.setupCookieBanner();
    this.setupReviewsCarousel();
    this.setupGalleryTouch();
  },

  /* ========================================
     MENÚ DE NAVEGACIÓN
     ======================================== */
  setupMenu() {
    const menu = document.getElementById('navMenu');
    const toggle = document.getElementById('mobileMenuToggle');
    if (!menu || !toggle) return;

    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
      const isExpanded = menu.classList.contains('active');
      toggle.setAttribute('aria-expanded', isExpanded);
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (menu.classList.contains('active') &&
          !menu.contains(e.target) &&
          !toggle.contains(e.target)) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  },

  /* ========================================
     BARRA DE PROGRESO
     ======================================== */
  setupProgressBar() {
    window.addEventListener('scroll', () => {
      const documentElement = document.documentElement;
      const scrollTop = documentElement.scrollTop;
      const scrollHeight = documentElement.scrollHeight;
      const clientHeight = documentElement.clientHeight;
      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
      }
    });
  },

  /* ========================================
     ANIMACIONES AL HACER SCROLL
     ======================================== */
  setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const delay = entry.target.dataset.delay || 0;
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
              entry.target.style.transitionDelay = delay + 'ms';
            }, delay);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  },

  /* ========================================
     SCROLL SUAVE CON OFFSET DEL HEADER
     ======================================== */
  setupSmoothScroll() {
    const headerOffset = 70;

    const smoothScrollTo = (element) => {
      if (!element) return;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        smoothScrollTo(targetElement);
      });
    });
  },

  /* ========================================
     EFECTO PARALLAX EN HERO
     ======================================== */
  setupParallax() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const hero = document.querySelector('.hero');
          if (hero) {
            const scrollY = window.scrollY;
            hero.style.backgroundPositionY = -(scrollY * 0.3) + 'px';
            hero.style.transform = `scale(${1 + scrollY / 10000})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  },

  /* ========================================
     BOTÓN VOLVER ARRIBA
     ======================================== */
  setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  /* ========================================
     BANNER DE COOKIES
     ======================================== */
  setupCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    if (!banner) return;

    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setTimeout(() => {
        banner.classList.add('show');
      }, 1000);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.classList.remove('show');
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        banner.classList.remove('show');
      });
    }
  },

  /* ========================================
     CARRUSEL DE RESEÑAS DE GOOGLE
     ======================================== */
  setupReviewsCarousel() {
    const carousel = document.getElementById('reviewsCarousel');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    const indicators = document.querySelectorAll('#carouselIndicators .indicator');

    if (!carousel || !prevBtn || !nextBtn) return;

    const slides = carousel.querySelectorAll('.review-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    let autoPlayInterval = null;

    const goToSlide = (index) => {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(ind => ind.classList.remove('active'));

      slides[index].classList.add('active');
      if (indicators[index]) indicators[index].classList.add('active');

      currentSlide = index;
    };

    prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoPlay(); });
    nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoPlay(); });

    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        goToSlide(parseInt(indicator.dataset.slide));
        resetAutoPlay();
      });
    });

    // Swipe táctil
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
        resetAutoPlay();
      }
    }, { passive: true });

    const startAutoPlay = () => {
      autoPlayInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
    };
    const resetAutoPlay = () => {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    };

    startAutoPlay();
  },

  /* ========================================
     GALERÍA - AUTO-SCROLL + DRAG
     ======================================== */
  setupGalleryTouch() {
    const wrapper = document.querySelector('.gallery-carousel-wrapper');
    const track = wrapper ? wrapper.querySelector('.gallery-track') : null;
    if (!wrapper || !track) return;

    track.style.animation = 'none';
    track.style.transform = 'none';
    wrapper.style.overflowX = 'auto';
    wrapper.style.WebkitOverflowScrolling = 'touch';
    wrapper.style.scrollbarWidth = 'none';
    wrapper.style.msOverflowStyle = 'none';

    let isInteracting = false;
    let autoScrollId = null;
    let resumeTimeout = null;
    const speed = window.innerWidth <= 1024 ? 0.6 : 0.35;
    let accumulated = 0;

    const startAutoScroll = () => {
      if (autoScrollId) cancelAnimationFrame(autoScrollId);
      const step = () => {
        if (isInteracting) return;
        accumulated += speed;
        if (accumulated >= 1) {
          const px = Math.floor(accumulated);
          accumulated -= px;
          wrapper.scrollLeft += px;
        }
        const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
        if (wrapper.scrollLeft >= maxScroll - 1) wrapper.scrollLeft = 0;
        autoScrollId = requestAnimationFrame(step);
      };
      autoScrollId = requestAnimationFrame(step);
    };

    const stopAutoScroll = () => {
      if (autoScrollId) { cancelAnimationFrame(autoScrollId); autoScrollId = null; }
    };

    const pauseAndResume = () => {
      isInteracting = true;
      stopAutoScroll();
      if (resumeTimeout) clearTimeout(resumeTimeout);
    };

    const scheduleResume = () => {
      isInteracting = false;
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => startAutoScroll(), 2500);
    };

    wrapper.addEventListener('touchstart', pauseAndResume, { passive: true });
    wrapper.addEventListener('touchend', scheduleResume, { passive: true });

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    wrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      pauseAndResume();
      startX = e.pageX;
      scrollLeft = wrapper.scrollLeft;
      wrapper.style.cursor = 'grabbing';
      wrapper.style.userSelect = 'none';
    });

    wrapper.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      wrapper.scrollLeft = scrollLeft + (startX - e.pageX) * 1.5;
    });

    wrapper.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      wrapper.style.cursor = 'grab';
      wrapper.style.userSelect = '';
      scheduleResume();
    });

    const isDesktopHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    wrapper.addEventListener('mouseenter', () => { if (isDesktopHover()) pauseAndResume(); });
    wrapper.addEventListener('mouseleave', () => {
      if (isDragging) { isDragging = false; wrapper.style.cursor = 'grab'; wrapper.style.userSelect = ''; }
      if (isDesktopHover()) scheduleResume();
    });

    wrapper.style.cursor = 'grab';
    startAutoScroll();
  }
};

/* ========================================
   INICIALIZACIÓN
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  WurkoApp.init();
  document.body.style.overflowX = 'hidden';
  document.documentElement.style.overflowX = 'hidden';
});

/* ========================================
   TELÉFONO - SOLO ACTIVO EN MÓVIL Y TABLET
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  const isDesktop = () => window.innerWidth > 1024;

  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    if (isDesktop()) {
      link.addEventListener('click', e => e.preventDefault());
      link.style.cursor = 'default';
      link.style.pointerEvents = 'none';
    }
  });
});

/* ========================================
   FORMULARIO DE RESERVAS - FORMSPREE
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        btn.textContent = '✓ Reserva enviada';
        btn.style.background = '#28a745';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Error en el envío');
      }
    } catch (err) {
      btn.textContent = '✗ Error, inténtalo de nuevo';
      btn.style.background = '#dc3545';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }
  });
});
