# Cookie Management System - Usage Guide

## Overview
The Muscles & Balance project now includes a comprehensive cookie management system that allows you to store user preferences, form data, and session information locally in the browser.

## Features Implemented

### 1. Cookie Management (`cookies.js`)
- **CookieManager**: Basic cookie operations (set, get, delete, check if enabled)
- **UserPreferences**: Save and load user preferences (theme, settings)
- **WorkoutSession**: Store workout form data temporarily
- **FormMemory**: Remember form inputs across sessions

### 2. Integration Points

#### Authentication (`register.js`)
- Saves user session data when logged in
- Stores user preferences during registration
- Clears cookies on logout

#### Workout System (`script.js`)
- Saves workout preferences when generating plans
- Remembers fitness level, goals, equipment preferences

#### Nutrition Calculator (`calorie.js`)
- Saves nutrition form data
- Remembers user's dietary preferences and calculations

## How to Use

### Basic Cookie Operations
```javascript
// Set a cookie (expires in 30 days by default)
CookieManager.set('username', 'john_doe');

// Get a cookie
const username = CookieManager.get('username');

// Delete a cookie
CookieManager.delete('username');

// Check if cookies are enabled
if (CookieManager.isEnabled()) {
    // Proceed with cookie operations
}
```

### User Preferences
```javascript
// Save user preferences
UserPreferences.save({
    theme: 'dark',
    language: 'en',
    notifications: true
});

// Load all preferences
const prefs = UserPreferences.load();

// Update a specific preference
UserPreferences.update('theme', 'light');

// Get a specific preference
const theme = UserPreferences.get('theme');
```

### Workout Session Management
```javascript
// Save workout session data
WorkoutSession.save({
    fitnessLevel: 'intermediate',
    goal: 'muscle-gain',
    equipment: 'full-gym'
});

// Load workout session
const session = WorkoutSession.load();

// Clear workout session
WorkoutSession.clear();
```

### Form Memory
```javascript
// Save form data
FormMemory.save('nutrition', {
    age: 25,
    weight: 70,
    height: 175
});

// Load form data
const formData = FormMemory.load('nutrition');

// Clear form data
FormMemory.clear('nutrition');
```

## Auto-Save Features

### Workout Forms
- Automatically saves form data when users change inputs
- Restores data when users return to the workout page

### Nutrition Forms
- Saves calculator inputs for future reference
- Remembers user's dietary goals and preferences

### User Authentication
- Maintains login session across browser sessions
- Stores user profile information securely

## Privacy & Security

### Data Stored
- User preferences (theme, settings)
- Form data (temporarily, for user convenience)
- Session information (login status, user ID)
- Workout and nutrition preferences

### Data NOT Stored
- Passwords or sensitive authentication data
- Personal health information beyond basic metrics
- Payment or financial information

### Cookie Expiration
- Session cookies: 7 days
- User preferences: 365 days
- Form data: 30 days
- Workout sessions: 7 days

## Browser Compatibility
- Works with all modern browsers that support cookies
- Gracefully handles disabled cookies
- No external dependencies required

## Implementation Notes

### Adding to HTML Pages
Include the cookie script in your HTML:
```html
<script src="js/cookies.js"></script>
```

### Checking Cookie Support
The system automatically checks if cookies are enabled and provides fallback behavior.

### GDPR Compliance
Consider adding a cookie consent banner for European users if required by your use case.

## Troubleshooting

### Cookies Not Working
1. Check if cookies are enabled in the browser
2. Verify the script is loaded before other scripts that use it
3. Check browser console for any JavaScript errors

### Data Not Persisting
1. Ensure cookie expiration dates are set correctly
2. Check if the domain/path settings are appropriate
3. Verify that the data being stored is JSON-serializable

## Future Enhancements
- Cookie consent management
- Encrypted cookie storage for sensitive data
- Cross-domain cookie sharing
- Advanced user preference management