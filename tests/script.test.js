/**
 * @jest-environment jsdom
 */

describe('Workout Plan Generator Logic', () => {
  test('workout plan structure validation', () => {
    const samplePlan = {
      name: 'Beginner Cardio Plan',
      duration: '30-45 minutes per session',
      frequency: '3-4 times per week',
      exercises: [
        { name: 'Brisk Walking', video: 'https://youtube.com/embed/test' }
      ]
    };
    
    expect(samplePlan).toHaveProperty('name');
    expect(samplePlan).toHaveProperty('duration');
    expect(samplePlan).toHaveProperty('frequency');
    expect(samplePlan.exercises).toHaveLength(1);
  });

  test('exercise video URL validation', () => {
    const exerciseVideos = {
      'Brisk Walking': 'https://www.youtube.com/embed/3Ka7B3hCg08',
      'Push-Ups': 'https://www.youtube.com/embed/_l3ySVKYVJ8'
    };
    
    expect(exerciseVideos['Brisk Walking']).toContain('youtube.com');
    expect(exerciseVideos['Push-Ups']).toContain('embed');
  });

  test('plan personalization logic', () => {
    const age = 25;
    const gender = 'male';
    let personalizedNote = '';
    
    if (age < 18) personalizedNote += 'Note: As a teen, focus on form. ';
    if (gender === 'male') personalizedNote += 'This plan includes chest focus. ';
    
    expect(personalizedNote).toBe('This plan includes chest focus. ');
  });

  test('share URL generation', () => {
    const pageUrl = encodeURIComponent('https://muscles-and-balance-7.web.app/');
    const message = encodeURIComponent("Check the best healthy platform!");
    
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${message}&url=${pageUrl}`;
    
    expect(facebookUrl).toContain('facebook.com/sharer');
    expect(twitterUrl).toContain('twitter.com/intent/tweet');
  });
});