/**
 * @fileoverview Performance optimization utilities
 * @author Muscles & Balance Team
 * @version 1.0.0
 */

/**
 * Performance optimization utility
 */
class PerformanceOptimizer {
  /**
   * Lazy load images when they enter viewport
   * @param {string} selector - CSS selector for images
   */
  static lazyLoadImages(selector = 'img[data-src]') {
    const images = document.querySelectorAll(selector);
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      });
    }
  }

  /**
   * Debounce function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Preload critical resources
   * @param {Array} resources - Array of resource URLs
   */
  static preloadResources(resources) {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.url;
      link.as = resource.type || 'fetch';
      document.head.appendChild(link);
    });
  }
}

// Export for global use
window.PerformanceOptimizer = PerformanceOptimizer;