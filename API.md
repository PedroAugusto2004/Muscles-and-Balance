# Muscles & Balance API Documentation

## Overview
Muscles & Balance provides a comprehensive JavaScript API for fitness, nutrition, and supplement management. All APIs are client-side JavaScript functions designed for web applications.

## Base URL
```
https://muscles-and-balance-7.web.app
```

## Authentication
No authentication required for public APIs. User data is managed through Firebase Authentication.

---

## Workout API

### Generate Workout Plan
**Function:** `getWorkoutPlan()`  
**Description:** Generates personalized workout plans based on user preferences  
**Parameters:** None (reads from DOM form)  
**Returns:** void (updates DOM with results)

**Form Fields Required:**
- `fitness-level`: beginner | intermediate | advanced
- `goal`: weight-loss | muscle-gain | endurance | flexibility
- `preference`: cardio | strength | yoga
- `age`: number (optional)
- `gender`: male | female (optional)
- `equipment`: none | basic | full-gym (optional)
- `days`: 1-7 (optional)

**Example Usage:**
```html
<select id="fitness-level">
  <option value="beginner">Beginner</option>
</select>
<button onclick="getWorkoutPlan()">Generate Plan</button>
```

**Response Format:**
Updates DOM elements with workout plan including:
- Plan name and description
- Duration and frequency
- Exercise list with video demonstrations
- Weekly split schedule

---

## Nutrition API

### Calculate Calories & Macros
**Function:** `calculateCaloriesAndMacros()`  
**Description:** Calculates daily calorie and macronutrient requirements  
**Parameters:** None (reads from DOM form)  
**Returns:** void (updates DOM with results)

**Form Fields Required:**
- `age`: number (14+)
- `gender`: male | female
- `weight`: number
- `height`: number or feet'inches format
- `weightUnit`: kg | lbs
- `heightUnit`: cm | ft
- `activityLevel`: 1.2 | 1.375 | 1.55 | 1.725 | 1.9
- `goal`: lose | maintain | gain

**Example Usage:**
```html
<input id="age" type="number" value="25">
<select id="gender">
  <option value="male">Male</option>
</select>
<button onclick="calculateCaloriesAndMacros()">Calculate</button>
```

**Response Format:**
Updates DOM with:
- Daily calorie requirements
- Macronutrient breakdown (protein, carbs, fats)
- Goal-specific recommendations

### Export Nutrition PDF
**Function:** `exportToPDF()`  
**Description:** Exports nutrition calculations to PDF  
**Parameters:** None  
**Returns:** void (downloads PDF file)  
**Dependencies:** jsPDF library required

---

## Supplements API

### Get Supplement Recommendations
**Function:** `calculateRecommendation()`  
**Description:** Provides personalized supplement recommendations  
**Parameters:** None (reads from DOM form)  
**Returns:** void (updates DOM with results)

**Form Fields Required:**
- `goal`: muscleGain | weightLoss | energyBoost | generalHealth
- `activityLevel`: low | moderate | high
- `dietType`: omnivore | vegetarian | vegan

**Example Usage:**
```html
<select id="goal">
  <option value="muscleGain">Muscle Gain</option>
</select>
<button onclick="calculateRecommendation()">Get Recommendations</button>
```

**Response Format:**
Updates DOM with:
- Personalized supplement list
- Dosage recommendations
- Purchase links
- Diet-specific modifications

---

## Utility APIs

### Navigation
**Function:** `redirectToSection(button)`  
**Description:** Redirects to specific sections  
**Parameters:** 
- `button`: HTMLElement with data-target attribute
**Returns:** void

### Social Sharing
**Function:** `share(platform)`  
**Description:** Share content on social media  
**Parameters:**
- `platform`: 'facebook' | 'twitter' | 'whatsapp' | 'linkedin'
**Returns:** void

**Function:** `openModal()` / `closeModal()`  
**Description:** Control share modal visibility  
**Parameters:** None  
**Returns:** void

**Function:** `copyLink()`  
**Description:** Copy share link to clipboard  
**Parameters:** None  
**Returns:** void

---

## Data Types

### WorkoutPlan
```typescript
interface WorkoutPlan {
  name: string;
  duration: string;
  frequency: string;
  description: string;
  exercises: Exercise[];
}
```

### Exercise
```typescript
interface Exercise {
  name: string;
  video: string;
  reps?: string;
  duration?: string;
}
```

### NutritionData
```typescript
interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}
```

---

## Error Handling

All APIs use the centralized `ErrorHandler` utility:

```javascript
// Form validation
const validation = ErrorHandler.validateForm(formData, requiredFields);

// User messages
ErrorHandler.showUserMessage('Error message', 'error');

// API errors
ErrorHandler.handleApiError(error, 'context');
```

---

## Rate Limits
No rate limits for client-side APIs. External API calls (nutrition data, barcode scanning) may have provider-specific limits.

---

## Support
- **Documentation:** [GitHub Repository](https://github.com/username/muscles-and-balance)
- **Issues:** [GitHub Issues](https://github.com/username/muscles-and-balance/issues)
- **Email:** mailto:musclesbalance@gmail.com
