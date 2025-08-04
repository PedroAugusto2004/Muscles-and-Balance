/**
 * @fileoverview Input validation and sanitization utility
 * @author Muscles & Balance Team
 * @version 1.0.0
 */

/**
 * Input validation and sanitization utility
 */
class InputValidator {
  /**
   * Sanitize HTML input to prevent XSS
   * @param {string} input - Raw input string
   * @returns {string} Sanitized string
   */
  static sanitizeHTML(input) {
    if (typeof input !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} Is valid email
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate numeric input within range
   * @param {string|number} value - Value to validate
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {boolean} Is valid number in range
   */
  static isValidNumber(value, min = 0, max = Infinity) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  }

  /**
   * Validate age input
   * @param {string|number} age - Age to validate
   * @returns {boolean} Is valid age
   */
  static isValidAge(age) {
    return this.isValidNumber(age, 14, 120);
  }

  /**
   * Validate weight input
   * @param {string|number} weight - Weight to validate
   * @param {string} unit - Weight unit (kg/lbs)
   * @returns {boolean} Is valid weight
   */
  static isValidWeight(weight, unit = 'kg') {
    const maxWeight = unit === 'kg' ? 300 : 660;
    return this.isValidNumber(weight, 30, maxWeight);
  }
}

// Export for global use
window.InputValidator = InputValidator;