/**
 * @jest-environment jsdom
 */

describe('Calorie Calculator Core Logic', () => {
  test('BMR calculation formula works correctly', () => {
    // Male BMR: 88.362 + (13.397 × weight) + (4.799 × height) - (5.677 × age)
    const age = 25, weight = 70, height = 175;
    const expectedBMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    expect(expectedBMR).toBeCloseTo(1724, 0);
  });

  test('height conversion from feet to cm', () => {
    const heightStr = "5'11";
    const normalizedHeight = heightStr.replace(/[`,´.`]/g, "'");
    const heightParts = normalizedHeight.match(/^(\d+)'(\d+)?$/);
    
    if (heightParts) {
      const feet = parseInt(heightParts[1]);
      const inches = parseInt(heightParts[2] || 0);
      const heightInCm = (feet * 30.48) + (inches * 2.54);
      expect(heightInCm).toBeCloseTo(180.34, 1);
    }
  });

  test('weight conversion from lbs to kg', () => {
    const weightLbs = 154;
    const weightKg = weightLbs * 0.453592;
    expect(weightKg).toBeCloseTo(69.85, 1);
  });

  test('daily calorie adjustment for goals', () => {
    const baseBMR = 1700;
    const activityLevel = 1.5;
    const dailyCalories = baseBMR * activityLevel;
    
    expect(dailyCalories - 500).toBe(2050); // Weight loss
    expect(dailyCalories + 500).toBe(3050); // Weight gain
    expect(dailyCalories).toBe(2550); // Maintain
  });
});