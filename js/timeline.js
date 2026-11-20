const timeline = document.querySelector('.about-timeline');

if (timeline) {
  let animationFrame = 0;

  const updateTimelineProgress = () => {
    animationFrame = 0;

    const bounds = timeline.getBoundingClientRect();
    const lineStart = bounds.top + 20;
    const lineLength = Math.max(bounds.height - 40, 0);
    const progress = lineLength === 0
      ? 0
      : Math.min(Math.max((window.innerHeight * 0.55 - lineStart) / lineLength, 0), 1);
    const fillHeight = lineLength * progress;

    timeline.style.setProperty('--timeline-fill-height', `${fillHeight}px`);

    timeline.querySelectorAll('.timeline-item').forEach((item) => {
      const marker = item.querySelector('.timeline-marker');
      const markerPosition = marker.getBoundingClientRect().top - bounds.top + marker.offsetHeight / 2 - 20;

      item.classList.toggle('is-reached', fillHeight >= markerPosition);
    });
  };

  const scheduleTimelineUpdate = () => {
    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(updateTimelineProgress);
    }
  };

  window.addEventListener('scroll', scheduleTimelineUpdate, { passive: true });
  window.addEventListener('resize', scheduleTimelineUpdate);
  scheduleTimelineUpdate();
}
