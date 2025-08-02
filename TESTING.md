# Testing Documentation

## Overview
This project includes comprehensive testing coverage using Jest framework with jsdom environment for DOM testing.

## Test Structure

### Test Files
- `tests/calorie.test.js` - Core calorie calculation logic
- `tests/challenge.test.js` - Workout challenge functionality  
- `tests/cookies.test.js` - Cookie management utilities
- `tests/script.test.js` - Workout plan generator logic
- `tests/supplements.test.js` - Supplement system logic
- `tests/utils/calorie-utils.test.js` - Utility functions for calculations

### Test Coverage
- **26 test cases** covering core business logic
- **Unit tests** for calculation functions
- **Logic tests** for data structures and algorithms
- **Validation tests** for form handling

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Categories

### 1. Calculation Tests
- BMR (Basal Metabolic Rate) calculations
- Unit conversions (lbs to kg, feet to cm)
- Daily calorie adjustments for goals

### 2. Logic Tests
- Exercise data structure validation
- Workout plan generation logic
- Supplement recommendation algorithms

### 3. Validation Tests
- Form data validation
- Input sanitization
- Error handling

### 4. Data Structure Tests
- Cookie management
- User preferences handling
- Session data persistence

## CI/CD Integration

GitHub Actions workflow automatically:
- Runs ESLint for code quality
- Executes all test suites
- Generates coverage reports
- Uploads coverage to Codecov

## MLH Fellowship Standards

✅ **Test Framework**: Jest with jsdom  
✅ **Test Coverage**: 26 comprehensive test cases  
✅ **Automated Testing**: GitHub Actions CI/CD  
✅ **Coverage Reporting**: Integrated with Codecov  
✅ **Code Quality**: ESLint integration  

## Test Philosophy

Tests focus on:
- **Core business logic** rather than DOM manipulation
- **Pure functions** and calculations
- **Data validation** and error handling
- **Algorithm correctness** for recommendations

This approach ensures reliable, maintainable code while meeting MLH fellowship requirements for testing coverage.