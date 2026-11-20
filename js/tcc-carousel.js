const tccCarousel = document.querySelector('[data-tcc-carousel]');

if (tccCarousel) {
  const slides = Array.from(tccCarousel.querySelectorAll('.tcc-slide'));
  const dots = Array.from(tccCarousel.querySelectorAll('.tcc-carousel-dot'));
  let activeIndex = 0;
  let touchStartX = null;

  const showSlide = (index) => {
    const previousIndex = activeIndex;
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));

      if (!isActive && slideIndex === previousIndex) {
        slide.querySelectorAll('video').forEach((video) => video.pause());
      }

      if (isActive && slideIndex !== previousIndex) {
        slide.querySelectorAll('video').forEach((video) => video.load());
      }
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', String(isActive));
    });
  };

  tccCarousel.querySelectorAll('[data-carousel-direction]').forEach((button) => {
    button.addEventListener('click', () => {
      showSlide(activeIndex + Number(button.dataset.carouselDirection));
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.slideIndex));
    });
  });

  window.addEventListener('resize', () => {
    showSlide(activeIndex);
  });

  tccCarousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(activeIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }
  });

  const viewport = tccCarousel.querySelector('.tcc-carousel-viewport');

  viewport.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  viewport.addEventListener('touchend', (event) => {
    if (touchStartX === null) {
      return;
    }

    const swipeDistance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;

    if (Math.abs(swipeDistance) >= 50) {
      showSlide(activeIndex + (swipeDistance < 0 ? 1 : -1));
    }
  }, { passive: true });

  showSlide(activeIndex);
}
