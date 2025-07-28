
const toggles = document.querySelectorAll('.faq-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const answer = toggle.nextElementSibling;
      const arrowImg = toggle.querySelector('.arrow-img');

      // Toggle answer visibility
      answer.classList.toggle('hidden');

      // Toggle rotation
      arrowImg.classList.toggle('rotate-180');
    });
  });