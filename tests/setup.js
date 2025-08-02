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