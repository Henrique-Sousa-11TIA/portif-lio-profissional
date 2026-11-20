document.querySelectorAll('.mobile-nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    link.closest('.mobile-nav').open = false;
  });
});
