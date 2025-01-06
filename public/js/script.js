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

        // Workout plan logic
        if (fitnessLevel === 'beginner') {
            if (goal === 'weight-loss') {
                workoutPlanName = preference === 'cardio' ? 'Beginner Cardio Plan' : 'Beginner Full Body Plan';
                duration = '30-45 minutes per session';
                frequency = '3-4 times per week';
                description = 'This plan combines low-impact cardio or bodyweight exercises designed for weight loss at an introductory level.';
            } else if (goal === 'muscle-gain') {
                workoutPlanName = 'Beginner Strength Training Plan';
                duration = '45-60 minutes per session';
                frequency = '3 times per week';
                description = 'Focuses on basic strength exercises, ideal for muscle toning and initial strength gains.';
            } else if (goal === 'endurance') {
                workoutPlanName = 'Beginner Endurance Plan';
                duration = '40-50 minutes per session';
                frequency = '3-4 times per week';
                description = 'Improves cardiovascular endurance with steady, moderate-intensity exercises.';
            } else {
                workoutPlanName = 'Beginner Yoga & Flexibility Plan';
                duration = '30-40 minutes per session';
                frequency = '3 times per week';
                description = 'Gentle yoga and stretching routines to enhance flexibility and mindfulness.';
            }
        } else if (fitnessLevel === 'intermediate') {
            if (goal === 'weight-loss') {
                workoutPlanName = preference === 'cardio' ? 'Intermediate Cardio Plan' : 'Intermediate Full Body Plan';
                duration = '45-60 minutes per session';
                frequency = '4 times per week';
                description = 'A balanced program incorporating moderate cardio and strength exercises aimed at weight loss.';
            } else if (goal === 'muscle-gain') {
                workoutPlanName = 'Intermediate Strength Training Plan';
                duration = '60 minutes per session';
                frequency = '4 times per week';
                description = 'Targets muscle growth with compound and isolation exercises, perfect for building strength and mass.';
            } else if (goal === 'endurance') {
                workoutPlanName = 'Intermediate Endurance Plan';
                duration = '50-60 minutes per session';
                frequency = '4 times per week';
                description = 'Increases stamina with a combination of moderate to high-intensity cardio exercises.';
            } else {
                workoutPlanName = 'Intermediate Yoga & Flexibility Plan';
                duration = '40-50 minutes per session';
                frequency = '3-4 times per week';
                description = 'Enhances flexibility and mental relaxation with intermediate-level yoga and stretching routines.';
            }
        } else if (fitnessLevel === 'advanced') {
            if (goal === 'weight-loss') {
                workoutPlanName = preference === 'cardio' ? 'Advanced Cardio Plan' : 'Advanced Full Body Plan';
                duration = '60-75 minutes per session';
                frequency = '5 times per week';
                description = 'A challenging program with intense cardio workouts designed for maximum calorie burn and fat loss.';
            } else if (goal === 'muscle-gain') {
                workoutPlanName = 'Advanced Strength Training Plan';
                duration = '75-90 minutes per session';
                frequency = '5 times per week';
                description = 'Focuses on heavy lifting and advanced strength routines for maximum muscle gain and power.';
            } else if (goal === 'endurance') {
                workoutPlanName = 'Advanced Endurance Plan';
                duration = '60-75 minutes per session';
                frequency = '5 times per week';
                description = 'An intense program incorporating long-distance running, cycling, or high-rep endurance exercises.';
            } else {
                workoutPlanName = 'Advanced Yoga & Flexibility Plan';
                duration = '50-60 minutes per session';
                frequency = '4 times per week';
                description = 'Advanced yoga techniques aimed at enhancing flexibility, strength, and mindfulness for experienced practitioners.';
            }
        }

        // Display the workout plan details in the result section
        console.log('Workout Plan Name:', workoutPlanName);
        console.log('Duration:', duration);
        console.log('Frequency:', frequency);
        console.log('Description:', description);

        document.getElementById('plan-name').innerText = workoutPlanName;
        document.getElementById('plan-duration').innerText = `Duration: ${duration}`;
        document.getElementById('plan-frequency').innerText = `Frequency: ${frequency}`;
        document.getElementById('plan-description').innerText = description;

        // Hide loading animation and show result section
        document.getElementById('loading').style.display = 'none';
        document.getElementById('workout-result').style.display = 'block';
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
    console.log('DOM fully loaded and parsed');

    // Check if ScrollReveal is loaded
    if (typeof ScrollReveal !== 'undefined') {
        console.log('ScrollReveal is loaded');

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
    const textElement = button.querySelector('.read-text');
    textElement.textContent = hiddenContent.classList.contains('show') ? 'Read less' : 'Read more';

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