/**
 * Theme Toggle Script
 * Handles light/dark mode switching with localStorage persistence
 * and system preference detection.
 */

(function() {
  'use strict';

  // DOM Elements
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Constants
  const THEME_KEY = 'theme-preference';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  /**
   * Get the user's theme preference
   * Priority: localStorage > system preference > light (default)
   */
  function getThemePreference() {
    // Check localStorage first
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) {
      return storedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK_THEME;
    }

    // Default to light
    return LIGHT_THEME;
  }

  /**
   * Apply the theme to the document
   * @param {string} theme - 'dark' or 'light'
   */
  function applyTheme(theme) {
    if (theme === DARK_THEME) {
      htmlElement.setAttribute('data-theme', DARK_THEME);
    } else {
      htmlElement.removeAttribute('data-theme');
    }
    
    // Update aria-label for accessibility
    if (themeToggle) {
      const label = theme === DARK_THEME 
        ? 'Switch to light mode' 
        : 'Switch to dark mode';
      themeToggle.setAttribute('aria-label', label);
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    
    // Save preference
    localStorage.setItem(THEME_KEY, newTheme);
    
    // Apply theme
    applyTheme(newTheme);
  }

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    const preferredTheme = getThemePreference();
    applyTheme(preferredTheme);
  }

  /**
   * Listen for system theme changes
   */
  function watchSystemTheme() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't set a manual preference
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
        }
      });
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Apply theme immediately to prevent flash
    initTheme();
    
    // Attach click handler to toggle button
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Watch for system preference changes
    watchSystemTheme();
  }

  // Apply theme before DOM is fully loaded to prevent flash of wrong theme
  initTheme();
})();