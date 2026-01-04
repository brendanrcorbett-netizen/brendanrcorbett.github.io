(function() {
    'use strict';

    // Configuration
    const BUSINESS_HOURS = {
        start: 8,  // 8 AM
        end: 18    // 6 PM
    };

    // Check if current time is within business hours
    function isBusinessHours() {
        const now = new Date();
        const hour = now.getHours();
        return hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end;
    }

    // Update call button text based on business hours
    function updateCallButtons() {
        const isOpen = isBusinessHours();
        const buttonText = isOpen 
            ? '📞 Call Now – We\'re Open' 
            : '📞 Call Now – Leave a Voicemail';

        const heroButton = document.getElementById('heroButton');
        const footerButton = document.getElementById('footerButton');

        if (heroButton) {
            heroButton.textContent = buttonText;
        }
        if (footerButton) {
            // Footer button keeps phone number visible
            const phoneMatch = footerButton.textContent.match(/[§!§0-9\s\-\.]+/);
            if (phoneMatch) {
                const phoneNumber = phoneMatch[0].trim();
                footerButton.textContent = isOpen 
                    ? '📞 Call ' + phoneNumber + ' – We\'re Open'
                    : '📞 Call ' + phoneNumber;
            }
        }
    }

    // Update availability text
    function updateAvailabilityText() {
        const availabilityText = document.getElementById('availabilityText');
        if (!availabilityText) return;

        const isOpen = isBusinessHours();
        availabilityText.textContent = isOpen 
            ? 'Currently accepting calls' 
            : 'After-hours emergency service available';
    }

    // Update mobile call bar text based on business hours
    function updateMobileCallBar() {
        const mobileCallLink = document.querySelector('.mobile-call-link');
        if (!mobileCallLink) return;

        const isOpen = isBusinessHours();
        const phoneMatch = mobileCallLink.textContent.match(/[§!§0-9\s\-\.]+/);
        
        if (phoneMatch) {
            const phoneNumber = phoneMatch[0].trim();
            mobileCallLink.textContent = isOpen 
                ? '📞 Call Now – We\'re Open'
                : '📞 Call Now – After Hours';
            
            // Preserve the tel: link functionality
            const href = mobileCallLink.getAttribute('href');
            if (!href || !href.startsWith('tel:')) {
                mobileCallLink.setAttribute('href', 'tel:' + phoneNumber.replace(/[\s\-§!§\.]/g, ''));
            }
        }
    }

    // Initialize all updates
    function init() {
        updateCallButtons();
        updateAvailabilityText();
        updateMobileCallBar();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
