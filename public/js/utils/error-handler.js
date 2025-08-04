/**
 * @fileoverview Centralized error handling utility
 * @author Muscles & Balance Team
 * @version 1.0.0
 */

/**
 * Standardized error handling utility
 */
class ErrorHandler {
  /**
   * Handle API errors consistently
   * @param {Error} error - The error object
   * @param {string} context - Context where error occurred
   * @param {Function} [fallback] - Optional fallback function
   * @returns {Object} Standardized error response
   */
  static handleApiError(error, context, fallback = null) {
    const errorResponse = {
      success: false,
      message: 'An error occurred. Please try again.',
      context,
      timestamp: new Date().toISOString(),
    };

    if (error.response) {
      errorResponse.status = error.response.status;
      errorResponse.message =
        error.response.status === 404
          ? 'Resource not found'
          : 'Server error occurred';
    } else if (error.request) {
      errorResponse.message = 'Network error. Please check your connection.';
    }

    Logger.error(`API Error in ${context}`, error);

    if (fallback) fallback(errorResponse);
    return errorResponse;
  }

  /**
   * Handle form validation errors
   * @param {Object} formData - Form data object
   * @param {Array} requiredFields - Array of required field names
   * @returns {Object} Validation result
   */
  static validateForm(formData, requiredFields) {
    const errors = [];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        errors.push(`${field} is required`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      message:
        errors.length > 0 ? 'Please fill in all required fields' : 'Valid',
    };
  }

  /**
   * Show user-friendly error message
   * @param {string} message - Error message to display
   * @param {string} [type='error'] - Message type
   */
  static showUserMessage(message, type = 'error') {
    const alertElement =
      document.getElementById('custom-alert') ||
      document.getElementById('alert-message');

    if (alertElement) {
      alertElement.textContent = message;
      alertElement.className = `alert ${type}`;
      alertElement.style.display = 'block';

      setTimeout(() => {
        alertElement.style.display = 'none';
      }, 5000);
    } else {
      alert(message);
    }
  }
}

// Export for global use
window.ErrorHandler = ErrorHandler;
