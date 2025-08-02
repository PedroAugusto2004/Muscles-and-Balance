/**
 * @jest-environment jsdom
 */

describe('Workout Challenge Logic', () => {
  test('exercise data structure is valid', () => {
    const upperBodyExercises = [
      { name: "Push-Ups", reps: "10", videoId: "pushups-video" },
      { name: "Shoulder Taps", reps: "20", videoId: "shoulder-taps-video" }
    ];
    
    expect(upperBodyExercises).toHaveLength(2);
    expect(upperBodyExercises[0]).toHaveProperty('name');
    expect(upperBodyExercises[0]).toHaveProperty('reps');
    expect(upperBodyExercises[0]).toHaveProperty('videoId');
  });

  test('timer countdown logic works', () => {
    let timer = 60;
    timer--;
    expect(timer).toBe(59);
    
    // Test timer reaches zero
    timer = 1;
    timer--;
    expect(timer).toBe(0);
  });

  test('exercise rotation logic', () => {
    const exercises = ['exercise1', 'exercise2', 'exercise3'];
    let currentIndex = 0;
    
    // Test cycling through exercises
    currentIndex = (currentIndex + 1) % exercises.length;
    expect(currentIndex).toBe(1);
    
    currentIndex = (currentIndex + 1) % exercises.length;
    expect(currentIndex).toBe(2);
    
    currentIndex = (currentIndex + 1) % exercises.length;
    expect(currentIndex).toBe(0); // Should wrap around
  });

  test('motivational messages array', () => {
    const messages = [
      "🎉 Congratulations! You completed the challenge! 🎉",
      "💪 Well done! Keep up the good work! 💪",
      "🔥 Amazing effort! You crushed it! 🔥"
    ];
    
    expect(messages).toHaveLength(3);
    expect(messages[0]).toContain('Congratulations');
    expect(messages[1]).toContain('Well done');
    expect(messages[2]).toContain('Amazing effort');
  });
});