(function () {
  'use strict';

  const BUSINESS_HOURS = { start: 8, end: 18 };

  const body = document.body;
  const availabilityText = document.getElementById('availabilityText');
  const heroButton = document.getElementById('heroButton');

  function isBusinessHours() {
    const hour = new Date().getHours();
    return hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end;
  }

  function updateBusinessState() {
    const open = isBusinessHours();

    body.classList.toggle('is-open', open);
    body.classList.toggle('is-closed', !open);

    if (availabilityText) {
      availabilityText.textContent = open
        ? 'Currently accepting calls'
        : 'After-hours emergency service available';
    }

    if (heroButton) {
      heroButton.querySelector('.cta-status').textContent = open
        ? 'We’re Open'
        : 'After Hours';
    }
  }

  document.addEventListener('DOMContentLoaded', updateBusinessState);
})();
