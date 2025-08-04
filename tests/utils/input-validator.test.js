/**
 * @jest-environment jsdom
 */

describe('InputValidator', () => {
  describe('sanitizeHTML', () => {
    test('should sanitize script tags', () => {
      const malicious = '<script>alert("xss")</script>Hello';
      const sanitized = InputValidator.sanitizeHTML(malicious);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('Hello');
    });

    test('should handle non-string input', () => {
      expect(InputValidator.sanitizeHTML(null)).toBe('');
      expect(InputValidator.sanitizeHTML(123)).toBe('');
    });
  });

  describe('isValidEmail', () => {
    test('should validate correct email formats', () => {
      expect(InputValidator.isValidEmail('test@example.com')).toBe(true);
      expect(InputValidator.isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    test('should reject invalid email formats', () => {
      expect(InputValidator.isValidEmail('invalid-email')).toBe(false);
      expect(InputValidator.isValidEmail('@domain.com')).toBe(false);
      expect(InputValidator.isValidEmail('test@')).toBe(false);
    });
  });

  describe('isValidNumber', () => {
    test('should validate numbers within range', () => {
      expect(InputValidator.isValidNumber(25, 0, 100)).toBe(true);
      expect(InputValidator.isValidNumber('50', 0, 100)).toBe(true);
    });

    test('should reject numbers outside range', () => {
      expect(InputValidator.isValidNumber(150, 0, 100)).toBe(false);
      expect(InputValidator.isValidNumber(-5, 0, 100)).toBe(false);
    });
  });

  describe('isValidAge', () => {
    test('should validate reasonable ages', () => {
      expect(InputValidator.isValidAge(25)).toBe(true);
      expect(InputValidator.isValidAge('30')).toBe(true);
    });

    test('should reject invalid ages', () => {
      expect(InputValidator.isValidAge(10)).toBe(false);
      expect(InputValidator.isValidAge(150)).toBe(false);
    });
  });

  describe('isValidWeight', () => {
    test('should validate weights in kg', () => {
      expect(InputValidator.isValidWeight(70, 'kg')).toBe(true);
      expect(InputValidator.isValidWeight('80', 'kg')).toBe(true);
    });

    test('should validate weights in lbs', () => {
      expect(InputValidator.isValidWeight(150, 'lbs')).toBe(true);
      expect(InputValidator.isValidWeight('200', 'lbs')).toBe(true);
    });

    test('should reject invalid weights', () => {
      expect(InputValidator.isValidWeight(20, 'kg')).toBe(false);
      expect(InputValidator.isValidWeight(400, 'kg')).toBe(false);
    });
  });
});