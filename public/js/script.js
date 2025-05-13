//----------WORKOUT PLAN----------//

function getWorkoutPlan() {
    const fitnessLevel = document.getElementById('fitness-level').value;
    const goal = document.getElementById('goal').value;
    const preference = document.getElementById('preference').value;

    // Check if any field is empty
    if (!fitnessLevel || !goal || !preference) {
        alert("Please fill out the form first 💪");
        return; // Stop the function if form is incomplete
    }

    // Show loading animation and hide result section initially
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('workout-result').style.display = 'none';

    // Simulate delay for loading animation
    setTimeout(() => {
        let workoutPlanName = '';
        let duration = '';
        let frequency = '';
        let description = '';
        let exercises = [];

        // Helper for exercise objects
        function ex(name, video) {
            return { name, video };
        }

        // Workout plan logic (now with detailed exercises and video links)
        if (fitnessLevel === 'beginner') {
            if (goal === 'weight-loss') {
                if (preference === 'cardio') {
                    workoutPlanName = 'Beginner Cardio Plan';
                    duration = '30-45 minutes per session';
                    frequency = '3-4 times per week';
                    description = 'Low-impact cardio and bodyweight exercises for weight loss.';
                    exercises = [
                        ex('Brisk Walking', 'videos/cardio.mp4'),
                        ex('Jumping Jacks', 'challenge videos/jumping jacks.mp4'),
                        ex('Bodyweight Squats', 'challenge videos/squats.mp4'),
                        ex('Mountain Climbers', 'challenge videos/Mountain climber.mov'),
                        ex('Planks', 'challenge videos/planks.mp4')
                    ];
                } else {
                    workoutPlanName = 'Beginner Full Body Plan';
                    duration = '30-45 minutes per session';
                    frequency = '3-4 times per week';
                    description = 'Introductory full-body routine for weight loss and general fitness.';
                    exercises = [
                        ex('Push-Ups', 'challenge videos/pushups.mp4'),
                        ex('Bodyweight Squats', 'challenge videos/squats.mp4'),
                        ex('Lunges', 'challenge videos/lunges.mp4'),
                        ex('Planks', 'challenge videos/planks.mp4'),
                        ex('Step-Ups', 'challenge videos/step ups.mp4')
                    ];
                }
            } else if (goal === 'muscle-gain') {
                workoutPlanName = 'Beginner Strength Training Plan';
                duration = '45-60 minutes per session';
                frequency = '3 times per week';
                description = 'Basic strength exercises for muscle toning and initial gains.';
                exercises = [
                    ex('Push-Ups', 'challenge videos/pushups.mp4'),
                    ex('Bodyweight Squats', 'challenge videos/squats.mp4'),
                    ex('Dumbbell Rows', 'videos/strenght training.mp4'),
                    ex('Lunges', 'challenge videos/lunges.mp4'),
                    ex('Planks', 'challenge videos/planks.mp4')
                ];
            } else if (goal === 'endurance') {
                workoutPlanName = 'Beginner Endurance Plan';
                duration = '40-50 minutes per session';
                frequency = '3-4 times per week';
                description = 'Steady, moderate-intensity exercises to improve cardiovascular endurance.';
                exercises = [
                    ex('Jogging', 'videos/cardio.mp4'),
                    ex('Jump Rope', 'challenge videos/jumping jacks.mp4'),
                    ex('Mountain Climbers', 'challenge videos/Mountain climber.mov'),
                    ex('Planks', 'challenge videos/planks.mp4')
                ];
            } else {
                workoutPlanName = 'Beginner Yoga & Flexibility Plan';
                duration = '30-40 minutes per session';
                frequency = '3 times per week';
                description = 'Gentle yoga and stretching routines.';
                exercises = [
                    ex('Sun Salutation', 'videos/workout-video.mp4'),
                    ex('Child\'s Pose', 'videos/workout-video.mp4'),
                    ex('Cat-Cow Stretch', 'videos/workout-video.mp4'),
                    ex('Seated Forward Bend', 'videos/workout-video.mp4')
                ];
            }
        } else if (fitnessLevel === 'intermediate') {
            if (goal === 'weight-loss') {
                if (preference === 'cardio') {
                    workoutPlanName = 'Intermediate Cardio Plan';
                    duration = '45-60 minutes per session';
                    frequency = '4 times per week';
                    description = 'Moderate cardio and strength for weight loss.';
                    exercises = [
                        ex('Running', 'videos/cardio.mp4'),
                        ex('Burpees', 'challenge videos/burpees.mp4'),
                        ex('Jump Rope', 'challenge videos/jumping jacks.mp4'),
                        ex('Mountain Climbers', 'challenge videos/Mountain climber.mov'),
                        ex('Planks', 'challenge videos/planks.mp4')
                    ];
                } else {
                    workoutPlanName = 'Intermediate Full Body Plan';
                    duration = '45-60 minutes per session';
                    frequency = '4 times per week';
                    description = 'Full-body strength and cardio circuit.';
                    exercises = [
                        ex('Push-Ups', 'challenge videos/pushups.mp4'),
                        ex('Lunges', 'challenge videos/lunges.mp4'),
                        ex('Deadlifts', 'videos/strenght training.mp4'),
                        ex('Step-Ups', 'challenge videos/step ups.mp4'),
                        ex('Planks', 'challenge videos/planks.mp4')
                    ];
                }
            } else if (goal === 'muscle-gain') {
                workoutPlanName = 'Intermediate Strength Training Plan';
                duration = '60 minutes per session';
                frequency = '4 times per week';
                description = 'Compound and isolation exercises for muscle growth.';
                exercises = [
                    ex('Bench Press', 'videos/strenght training.mp4'),
                    ex('Deadlifts', 'videos/strenght training.mp4'),
                    ex('Pull-Ups', 'challenge videos/pull ups.mp4'),
                    ex('Lunges', 'challenge videos/lunges.mp4'),
                    ex('Planks', 'challenge videos/planks.mp4')
                ];
            } else if (goal === 'endurance') {
                workoutPlanName = 'Intermediate Endurance Plan';
                duration = '50-60 minutes per session';
                frequency = '4 times per week';
                description = 'Moderate to high-intensity cardio for stamina.';
                exercises = [
                    ex('Running', 'videos/cardio.mp4'),
                    ex('Burpees', 'challenge videos/burpees.mp4'),
                    ex('Jump Rope', 'challenge videos/jumping jacks.mp4'),
                    ex('Mountain Climbers', 'challenge videos/Mountain climber.mov'),
                    ex('Planks', 'challenge videos/planks.mp4')
                ];
            } else {
                workoutPlanName = 'Intermediate Yoga & Flexibility Plan';
                duration = '40-50 minutes per session';
                frequency = '3-4 times per week';
                description = 'Intermediate yoga and stretching.';
                exercises = [
                    ex('Warrior II', 'videos/workout-video.mp4'),
                    ex('Triangle Pose', 'videos/workout-video.mp4'),
                    ex('Bridge Pose', 'videos/workout-video.mp4'),
                    ex('Seated Forward Bend', 'videos/workout-video.mp4')
                ];
            }
        } else if (fitnessLevel === 'advanced') {
            if (goal === 'weight-loss') {
                if (preference === 'cardio') {
                    workoutPlanName = 'Advanced Cardio Plan';
                    duration = '60-75 minutes per session';
                    frequency = '5 times per week';
                    description = 'Intense cardio for maximum calorie burn.';
                    exercises = [
                        ex('HIIT Sprints', 'videos/cardio.mp4'),
                        ex('Burpees', 'challenge videos/burpees.mp4'),
                        ex('Mountain Climbers', 'challenge videos/Mountain climber.mov'),
                        ex('Jump Rope', 'challenge videos/jumping jacks.mp4'),
                        ex('Planks', 'challenge videos/planks.mp4')
                    ];
                } else {
                    workoutPlanName = 'Advanced Full Body Plan';
                    duration = '60-75 minutes per session';
                    frequency = '5 times per week';
                    description = 'Challenging full-body circuit for advanced users.';
                    exercises = [
                        ex('Pull-Ups', 'challenge videos/pull ups.mp4'),
                        ex('Deadlifts', 'videos/strenght training.mp4'),
                        ex('Bench Press', 'videos/strenght training.mp4'),
                        ex('Lunges', 'challenge videos/lunges.mp4'),
                        ex('Planks', 'challenge videos/planks.mp4')
                    ];
                }
            } else if (goal === 'muscle-gain') {
                workoutPlanName = 'Advanced Strength Training Plan';
                duration = '75-90 minutes per session';
                frequency = '5 times per week';
                description = 'Heavy lifting and advanced routines for muscle gain.';
                exercises = [
                    ex('Squats', 'challenge videos/squats.mp4'),
                    ex('Deadlifts', 'videos/strenght training.mp4'),
                    ex('Bench Press', 'videos/strenght training.mp4'),
                    ex('Pull-Ups', 'challenge videos/pull ups.mp4'),
                    ex('Planks', 'challenge videos/planks.mp4')
                ];
            } else if (goal === 'endurance') {
                workoutPlanName = 'Advanced Endurance Plan';
                duration = '60-75 minutes per session';
                frequency = '5 times per week';
                description = 'Long-distance and high-rep endurance.';
                exercises = [
                    ex('Long-Distance Running', 'videos/cardio.mp4'),
                    ex('Burpees', 'challenge videos/burpees.mp4'),
                    ex('Mountain Climbers', 'challenge videos/Mountain climber.mov'),
                    ex('Jump Rope', 'challenge videos/jumping jacks.mp4'),
                    ex('Planks', 'challenge videos/planks.mp4')
                ];
            } else {
                workoutPlanName = 'Advanced Yoga & Flexibility Plan';
                duration = '50-60 minutes per session';
                frequency = '4 times per week';
                description = 'Advanced yoga techniques for flexibility and strength.';
                exercises = [
                    ex('Crow Pose', 'videos/workout-video.mp4'),
                    ex('Wheel Pose', 'videos/workout-video.mp4'),
                    ex('King Pigeon', 'videos/workout-video.mp4'),
                    ex('Standing Splits', 'videos/workout-video.mp4')
                ];
            }
        }

        // Display the workout plan details in the result section
        document.getElementById('plan-name').innerText = workoutPlanName;
        document.getElementById('plan-duration').innerText = `Duration: ${duration}`;
        document.getElementById('plan-frequency').innerText = `Frequency: ${frequency}`;
        document.getElementById('plan-description').innerText = description;

        // New: Display exercises and video demonstrations
        const planExercisesDiv = document.getElementById('plan-exercises');
        if (exercises.length > 0) {
            let html = '<h6>Exercise Demonstrations:</h6><ul class="exercise-list">';
            exercises.forEach(ex => {
                html += `<li><strong>${ex.name}</strong><br><video width="220" height="124" controls preload="none" poster="images/MBlogo.png"><source src="${ex.video}" type="video/mp4">Your browser does not support the video tag.</video></li>`;
            });
            html += '</ul>';
            planExercisesDiv.innerHTML = html;
        } else {
            planExercisesDiv.innerHTML = '';
        }

        // Hide loading animation and show result section
        document.getElementById('loading').style.display = 'none';
        document.getElementById('workout-result').style.display = 'block';

        // Fix: Re-apply ScrollReveal to new exercise items
        if (typeof ScrollReveal !== 'undefined') {
            ScrollReveal().reveal('.exercise-list li', {
                distance: '40px',
                duration: 900,
                origin: 'bottom',
                interval: 120,
                opacity: 0,
                reset: true
            });
            // Optionally, re-apply to the whole result area
            ScrollReveal().reveal('#workout-result', {
                distance: '30px',
                duration: 700,
                origin: 'bottom',
                opacity: 0,
                reset: true
            });
        }
    }, 1500); // 1.5-second delay to simulate loading
}

/*===== SHORTCTUT =====*/

// Close menu when clicking outside of it
window.addEventListener('click', (event) => {
    const menu = document.querySelector('.shortcut-options');
    const toggle = document.getElementById('toggle-menu');
  
    // If the menu is open and click occurs outside of it, close the menu
    if (toggle.checked && !menu.contains(event.target) && event.target.id !== 'toggle-menu') {
      toggle.checked = false;
    }
  });
  
  // Close the menu when clicking the X button
  document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('toggle-menu').checked = false;
  });


  /*===== SHARE BUTTON =====*/

 // Function to open modal
 function openModal() {
    document.getElementById("shareModal").style.display = "flex";
}

// Function to close modal
function closeModal() {
    document.getElementById("shareModal").style.display = "none";
}

// Function to copy the link
function copyLink() {
    const shareLink = document.getElementById("shareLink");
    shareLink.select();
    document.execCommand("copy");

    // Show the custom alert
    const alertBox = document.getElementById("customAlert");
    alertBox.classList.add("show");

    // Hide the alert after 2 seconds
    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 2000);
}

function share(platform) {
    const pageUrl = encodeURIComponent('https://muscles-and-balance-7.web.app/');
    const message = encodeURIComponent("Check the best healthy platform of all time!");
  
    let shareUrl = '';
  
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${pageUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${message}%20${pageUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
        break;
      case 'instagram':
        return;
      default:
        return;
    }
  
    window.open(shareUrl, '_blank');
  }

/*===== SCROLL TO THE TOP BUTTON =====*/

// Get the button
let mybutton = document.getElementById("scrollToTopBtn");

// When the user clicks on the button, scroll to the top of the document
mybutton.onclick = function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/*===== SCROLL REVEAL ANIMATION =====*/
document.addEventListener('DOMContentLoaded', function() {

    // Check if ScrollReveal is loaded
    if (typeof ScrollReveal !== 'undefined') {

        // Initialize ScrollReveal and reveal elements within the .section class
        ScrollReveal().reveal('.section .content', {
            duration: 1000, // Animation duration in milliseconds
            origin: 'bottom', // Animation starting point
            distance: '20px', // Distance to travel
            easing: 'ease-in-out', // Easing function
            reset: true // Whether to reset the animation on scroll back up
        });
    } else {
        console.error('ScrollReveal is not loaded');
    }
});

// Initialize ScrollReveal
ScrollReveal().reveal('.reveal', {
    distance: '50px',
    origin: 'bottom',
    duration: 800,
    easing: 'ease-in-out',
    opacity: 0,
    reset: true // Resets animation when scrolled back into view (optional)
});

// HIDDING ARTICLE
const button = document.getElementById('read-more-button');
const hiddenContent = document.getElementById('hidden-content');

// Initialize ScrollReveal
document.addEventListener('DOMContentLoaded', () => {
    ScrollReveal().reveal('.visible-content, .hidden-content', {
        distance: '50px',
        duration: 1000,
        origin: 'bottom',
        interval: 200,
    });
});

button.addEventListener('click', () => {
    hiddenContent.classList.toggle('show');
    button.classList.toggle('active');
    const textElement = button.querySelector('.read-text');
    textElement.textContent = hiddenContent.classList.contains('show') ? 'Show less' : 'Show more';

    // Dynamically reinitialize ScrollReveal for visible content
    ScrollReveal().clean('.hidden-content, .visible-content'); // Remove existing animations
    ScrollReveal().reveal('.visible-content, .hidden-content.show', {
        distance: '50px',
        duration: 1000,
        origin: 'bottom',
        interval: 200,
        reset: true, // Ensure animations reset when scrolling
    });

    // Scroll to the button when collapsing content
    if (!hiddenContent.classList.contains('show')) {
        const buttonPosition = button.getBoundingClientRect().top + window.scrollY;
        const offset = 550; // Adjust as needed
        window.scrollTo({
            top: buttonPosition - offset,
            behavior: 'smooth',
        });
    }
});