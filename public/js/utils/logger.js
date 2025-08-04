/**
 * @fileoverview Centralized logging utility for production-safe logging
 * @author Muscles & Balance Team
 * @version 1.0.0
 */

/**
 * Logger utility class for handling application logging
 * Provides production-safe logging with different levels
 */
class Logger {
  /**
   * @private
   * @static
   * @type {boolean}
   */
  static isDevelopment =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.search.includes('debug=true');

  /**
   * Log error messages (always logged)
   * @param {string} message - Error message
   * @param {Error|Object} [error] - Error object or additional data
   */
  static error(message, error = null) {
    if (error) {
      console.error(`[ERROR] ${message}`, error);
    } else {
      console.error(`[ERROR] ${message}`);
    }
  }

  /**
   * Log warning messages (only in development)
   * @param {string} message - Warning message
   * @param {*} [data] - Additional data
   */
  static warn(message, data = null) {
    if (this.isDevelopment) {
      if (data) {
        console.warn(`[WARN] ${message}`, data);
      } else {
        console.warn(`[WARN] ${message}`);
      }
    }
  }

  /**
   * Log info messages (only in development)
   * @param {string} message - Info message
   * @param {*} [data] - Additional data
   */
  static info(message, data = null) {
    if (this.isDevelopment) {
      if (data) {
        console.log(`[INFO] ${message}`, data);
      } else {
        console.log(`[INFO] ${message}`);
      }
    }
  }
}

// Export for global use
window.Logger = Logger;
