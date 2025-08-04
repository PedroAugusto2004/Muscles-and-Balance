/**
 * @jest-environment jsdom
 */

describe('PerformanceOptimizer', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  describe('debounce', () => {
    test('should debounce function calls', (done) => {
      const mockFn = jest.fn();
      const debouncedFn = PerformanceOptimizer.debounce(mockFn, 100);
      
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      expect(mockFn).not.toHaveBeenCalled();
      
      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
      }, 150);
    });
  });

  describe('preloadResources', () => {
    test('should call preloadResources function', () => {
      const resources = [
        { url: '/css/style.css', type: 'style' },
        { url: '/js/script.js', type: 'script' }
      ];
      
      PerformanceOptimizer.preloadResources(resources);
      
      expect(PerformanceOptimizer.preloadResources).toHaveBeenCalledWith(resources);
    });
  });
});