/**
 * @jest-environment jsdom
 */

// Extract and test the core calculation logic
function calculateBMR(age, gender, weight, height) {
  const weightInKg = weight;
  const heightInCm = height;
  
  return gender === "male"
    ? 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age)
    : 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
}

function calculateDailyCalories(bmr, activityLevel, goal) {
  let dailyCalories = bmr * activityLevel;
  dailyCalories += goal === "lose" ? -500 : goal === "gain" ? 500 : 0;
  return Math.round(dailyCalories);
}

function parseHeightFromFeet(heightStr) {
  const normalizedHeight = heightStr.replace(/[`,´.`]/g, "'");
  const heightParts = normalizedHeight.match(/^(\d+)'(\d+)?$/);
  if (heightParts) {
    const feet = parseInt(heightParts[1]);
    const inches = parseInt(heightParts[2] || 0);
    return (feet * 30.48) + (inches * 2.54);
  }
  return null;
}

describe('Calorie Calculation Utils', () => {
  test('calculates BMR correctly for male', () => {
    const bmr = calculateBMR(25, 'male', 70, 175);
    expect(bmr).toBeCloseTo(1724, 0);
  });

  test('calculates BMR correctly for female', () => {
    const bmr = calculateBMR(25, 'female', 60, 165);
    expect(bmr).toBeCloseTo(1405, 0);
  });

  test('calculates daily calories with weight loss goal', () => {
    const bmr = 1700;
    const calories = calculateDailyCalories(bmr, 1.5, 'lose');
    expect(calories).toBe(2050); // (1700 * 1.5) - 500
  });

  test('parses feet/inches height correctly', () => {
    expect(parseHeightFromFeet("5'11")).toBeCloseTo(180.34, 1);
    expect(parseHeightFromFeet("6'0")).toBeCloseTo(182.88, 1);
    expect(parseHeightFromFeet("5'6")).toBeCloseTo(167.64, 1);
  });

  test('handles invalid height format', () => {
    expect(parseHeightFromFeet("invalid")).toBeNull();
    expect(parseHeightFromFeet("")).toBeNull();
  });
});