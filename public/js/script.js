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

        // Map of exercise names to public video URLs (YouTube or other free sources)
        const exerciseVideos = {
            'Brisk Walking': 'https://www.youtube.com/embed/3Ka7B3hCg08',
            'Jumping Jacks': 'https://www.youtube.com/embed/c4DAnQ6DtF8',
            'Bodyweight Squats': 'https://www.youtube.com/embed/aclHkVaku9U',
            'Mountain Climbers': 'https://www.youtube.com/embed/nmwgirgXLYM',
            'Planks': 'https://www.youtube.com/embed/pSHjTRCQxIw',
            'Push-Ups': 'https://www.youtube.com/embed/_l3ySVKYVJ8',
            'Lunges': 'https://www.youtube.com/embed/QOVaHwm-Q6U',
            'Step-Ups': 'https://www.youtube.com/embed/dQqApCGd5Ss',
            'Dumbbell Rows': 'https://www.youtube.com/embed/pYcpY20QaE8',
            'Jogging': 'https://www.youtube.com/embed/5r7w6Zjwcp8',
            'Jump Rope': 'https://www.youtube.com/embed/1BZMwQ6yC6o',
            'Sun Salutation': 'https://www.youtube.com/embed/6IUyY9Dyr5w',
            "Child's Pose": 'https://www.youtube.com/embed/7kgZnJqzNaU',
            'Cat-Cow Stretch': 'https://www.youtube.com/embed/wBjj5F1yQ1E',
            'Seated Forward Bend': 'https://www.youtube.com/embed/8pQ9b4hQyN4',
            'Burpees': 'https://www.youtube.com/embed/dZgVxmf6jkA',
            'Deadlifts': 'https://www.youtube.com/embed/op9kVnSso6Q',
            'Bench Press': 'https://www.youtube.com/embed/gRVjAtPip0Y',
            'Pull-Ups': 'https://www.youtube.com/embed/eGo4IYlbE5g',
            'Warrior II': 'https://www.youtube.com/embed/2pLT-olgUJs',
            'Triangle Pose': 'https://www.youtube.com/embed/8pQ9b4hQyN4',
            'Bridge Pose': 'https://www.youtube.com/embed/wPM8icPu6H8',
            'HIIT Sprints': 'https://www.youtube.com/embed/ml6cT4AZdqI',
            'Squats': 'https://www.youtube.com/embed/aclHkVaku9U',
            'Long-Distance Running': 'https://www.youtube.com/embed/5r7w6Zjwcp8',
            'Crow Pose': 'https://www.youtube.com/embed/8v45WSuAeYI',
            'Wheel Pose': 'https://www.youtube.com/embed/2qZ517Rw7ME',
            'King Pigeon': 'https://www.youtube.com/embed/8pQ9b4hQyN4',
            'Standing Splits': 'https://www.youtube.com/embed/8pQ9b4hQyN4',
        };

        // Workout plan logic (now with detailed exercises and video links)
        if (fitnessLevel === 'beginner') {
            if (goal === 'weight-loss') {
                if (preference === 'cardio') {
                    workoutPlanName = 'Beginner Cardio Plan';
                    duration = '30-45 minutes per session';
                    frequency = '3-4 times per week';
                    description = 'Low-impact cardio and bodyweight exercises for weight loss.';
                    exercises = [
                        ex('Brisk Walking', exerciseVideos['Brisk Walking']),
                        ex('Jumping Jacks', exerciseVideos['Jumping Jacks']),
                        ex('Bodyweight Squats', exerciseVideos['Bodyweight Squats']),
                        ex('Mountain Climbers', exerciseVideos['Mountain Climbers']),
                        ex('Planks', exerciseVideos['Planks'])
                    ];
                } else {
                    workoutPlanName = 'Beginner Full Body Plan';
                    duration = '30-45 minutes per session';
                    frequency = '3-4 times per week';
                    description = 'Introductory full-body routine for weight loss and general fitness.';
                    exercises = [
                        ex('Push-Ups', exerciseVideos['Push-Ups']),
                        ex('Bodyweight Squats', exerciseVideos['Bodyweight Squats']),
                        ex('Lunges', exerciseVideos['Lunges']),
                        ex('Planks', exerciseVideos['Planks']),
                        ex('Step-Ups', exerciseVideos['Step-Ups'])
                    ];
                }
            } else if (goal === 'muscle-gain') {
                workoutPlanName = 'Beginner Strength Training Plan';
                duration = '45-60 minutes per session';
                frequency = '3 times per week';
                description = 'Basic strength exercises for muscle toning and initial gains.';
                exercises = [
                    ex('Push-Ups', exerciseVideos['Push-Ups']),
                    ex('Bodyweight Squats', exerciseVideos['Bodyweight Squats']),
                    ex('Dumbbell Rows', exerciseVideos['Dumbbell Rows']),
                    ex('Lunges', exerciseVideos['Lunges']),
                    ex('Planks', exerciseVideos['Planks'])
                ];
            } else if (goal === 'endurance') {
                workoutPlanName = 'Beginner Endurance Plan';
                duration = '40-50 minutes per session';
                frequency = '3-4 times per week';
                description = 'Steady, moderate-intensity exercises to improve cardiovascular endurance.';
                exercises = [
                    ex('Jogging', exerciseVideos['Jogging']),
                    ex('Jump Rope', exerciseVideos['Jump Rope']),
                    ex('Mountain Climbers', exerciseVideos['Mountain Climbers']),
                    ex('Planks', exerciseVideos['Planks'])
                ];
            } else {
                workoutPlanName = 'Beginner Yoga & Flexibility Plan';
                duration = '30-40 minutes per session';
                frequency = '3 times per week';
                description = 'Gentle yoga and stretching routines.';
                exercises = [
                    ex('Sun Salutation', exerciseVideos['Sun Salutation']),
                    ex("Child's Pose", exerciseVideos["Child's Pose"]),
                    ex('Cat-Cow Stretch', exerciseVideos['Cat-Cow Stretch']),
                    ex('Seated Forward Bend', exerciseVideos['Seated Forward Bend'])
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
                        ex('Running', exerciseVideos['Jogging']),
                        ex('Burpees', exerciseVideos['Burpees']),
                        ex('Jump Rope', exerciseVideos['Jump Rope']),
                        ex('Mountain Climbers', exerciseVideos['Mountain Climbers']),
                        ex('Planks', exerciseVideos['Planks'])
                    ];
                } else {
                    workoutPlanName = 'Intermediate Full Body Plan';
                    duration = '45-60 minutes per session';
                    frequency = '4 times per week';
                    description = 'Full-body strength and cardio circuit.';
                    exercises = [
                        ex('Push-Ups', exerciseVideos['Push-Ups']),
                        ex('Lunges', exerciseVideos['Lunges']),
                        ex('Deadlifts', exerciseVideos['Deadlifts']),
                        ex('Step-Ups', exerciseVideos['Step-Ups']),
                        ex('Planks', exerciseVideos['Planks'])
                    ];
                }
            } else if (goal === 'muscle-gain') {
                workoutPlanName = 'Intermediate Strength Training Plan';
                duration = '60 minutes per session';
                frequency = '4 times per week';
                description = 'Compound and isolation exercises for muscle growth.';
                exercises = [
                    ex('Bench Press', exerciseVideos['Bench Press']),
                    ex('Deadlifts', exerciseVideos['Deadlifts']),
                    ex('Pull-Ups', exerciseVideos['Pull-Ups']),
                    ex('Lunges', exerciseVideos['Lunges']),
                    ex('Planks', exerciseVideos['Planks'])
                ];
            } else if (goal === 'endurance') {
                workoutPlanName = 'Intermediate Endurance Plan';
                duration = '50-60 minutes per session';
                frequency = '4 times per week';
                description = 'Moderate to high-intensity cardio for stamina.';
                exercises = [
                    ex('Running', exerciseVideos['Jogging']),
                    ex('Burpees', exerciseVideos['Burpees']),
                    ex('Jump Rope', exerciseVideos['Jump Rope']),
                    ex('Mountain Climbers', exerciseVideos['Mountain Climbers']),
                    ex('Planks', exerciseVideos['Planks'])
                ];
            } else {
                workoutPlanName = 'Intermediate Yoga & Flexibility Plan';
                duration = '40-50 minutes per session';
                frequency = '3-4 times per week';
                description = 'Intermediate yoga and stretching.';
                exercises = [
                    ex('Warrior II', exerciseVideos['Warrior II']),
                    ex('Triangle Pose', exerciseVideos['Triangle Pose']),
                    ex('Bridge Pose', exerciseVideos['Bridge Pose']),
                    ex('Seated Forward Bend', exerciseVideos['Seated Forward Bend'])
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
                        ex('HIIT Sprints', exerciseVideos['HIIT Sprints']),
                        ex('Burpees', exerciseVideos['Burpees']),
                        ex('Mountain Climbers', exerciseVideos['Mountain Climbers']),
                        ex('Jump Rope', exerciseVideos['Jump Rope']),
                        ex('Planks', exerciseVideos['Planks'])
                    ];
                } else {
                    workoutPlanName = 'Advanced Full Body Plan';
                    duration = '60-75 minutes per session';
                    frequency = '5 times per week';
                    description = 'Challenging full-body circuit for advanced users.';
                    exercises = [
                        ex('Pull-Ups', exerciseVideos['Pull-Ups']),
                        ex('Deadlifts', exerciseVideos['Deadlifts']),
                        ex('Bench Press', exerciseVideos['Bench Press']),
                        ex('Lunges', exerciseVideos['Lunges']),
                        ex('Planks', exerciseVideos['Planks'])
                    ];
                }
            } else if (goal === 'muscle-gain') {
                workoutPlanName = 'Advanced Strength Training Plan';
                duration = '75-90 minutes per session';
                frequency = '5 times per week';
                description = 'Heavy lifting and advanced routines for muscle gain.';
                exercises = [
                    ex('Squats', exerciseVideos['Squats']),
                    ex('Deadlifts', exerciseVideos['Deadlifts']),
                    ex('Bench Press', exerciseVideos['Bench Press']),
                    ex('Pull-Ups', exerciseVideos['Pull-Ups']),
                    ex('Planks', exerciseVideos['Planks'])
                ];
            } else if (goal === 'endurance') {
                workoutPlanName = 'Advanced Endurance Plan';
                duration = '60-75 minutes per session';
                frequency = '5 times per week';
                description = 'Long-distance and high-rep endurance.';
                exercises = [
                    ex('Long-Distance Running', exerciseVideos['Long-Distance Running']),
                    ex('Burpees', exerciseVideos['Burpees']),
                    ex('Mountain Climbers', exerciseVideos['Mountain Climbers']),
                    ex('Jump Rope', exerciseVideos['Jump Rope']),
                    ex('Planks', exerciseVideos['Planks'])
                ];
            } else {
                workoutPlanName = 'Advanced Yoga & Flexibility Plan';
                duration = '50-60 minutes per session';
                frequency = '4 times per week';
                description = 'Advanced yoga techniques for flexibility and strength.';
                exercises = [
                    ex('Crow Pose', exerciseVideos['Crow Pose']),
                    ex('Wheel Pose', exerciseVideos['Wheel Pose']),
                    ex('King Pigeon', exerciseVideos['King Pigeon']),
                    ex('Standing Splits', exerciseVideos['Standing Splits'])
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
                html += `<li><strong>${ex.name}</strong><br><iframe width="220" height="124" src="${ex.video}" frameborder="0" allowfullscreen loading="lazy"></iframe></li>`;
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