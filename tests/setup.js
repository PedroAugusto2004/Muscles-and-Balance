// Test setup file
global.$ = require('jquery');
global.jQuery = global.$;

// Mock external libraries
global.ScrollReveal = jest.fn(() => ({
  reveal: jest.fn(),
  clean: jest.fn()
}));

global.Quagga = {
  init: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  onDetected: jest.fn()
};

global.jsPDF = jest.fn(() => ({
  addImage: jest.fn(),
  setFontSize: jest.fn(),
  setFont: jest.fn(),
  text: jest.fn(),
  splitTextToSize: jest.fn(() => []),
  save: jest.fn(),
  internal: { pageSize: { height: 297 } }
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: ''
});

// Mock alert
global.alert = jest.fn();

// Mock utility classes for testing
global.InputValidator = {
  sanitizeHTML: jest.fn((input) => typeof input === 'string' ? input.replace(/<script.*?<\/script>/gi, '') : ''),
  isValidEmail: jest.fn((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
  isValidNumber: jest.fn((value, min = 0, max = Infinity) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  }),
  isValidAge: jest.fn((age) => {
    const num = parseFloat(age);
    return !isNaN(num) && num >= 14 && num <= 120;
  }),
  isValidWeight: jest.fn((weight, unit = 'kg') => {
    const num = parseFloat(weight);
    const maxWeight = unit === 'kg' ? 300 : 660;
    return !isNaN(num) && num >= 30 && num <= maxWeight;
  })
};

global.PerformanceOptimizer = {
  debounce: jest.fn((func, wait) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }),
  lazyLoadImages: jest.fn(),
  preloadResources: jest.fn()
};