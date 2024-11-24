// Exercise data with video IDs
const upperBodyExercises = [
    { name: "Push-Ups", reps: "10", videoId: "pushups-video" },
    { name: "Shoulder Taps", reps: "20", videoId: "shoulder-taps-video" },
    { name: "Tricep Dips", reps: "10", videoId: "tricep-dips-video" }
];

const lowerBodyExercises = [
    { name: "Squats", reps: "10", videoId: "squats-video" },
    { name: "Lunges", reps: "10", videoId: "lunges-video" },
    { name: "Step-Ups", reps: "20", videoId: "step-ups-video" }
];

const coreExercises = [
    { name: "Plank", duration: "20 seconds", videoId: "plank-video" },
    { name: "Sit-Ups", reps: "15", videoId: "situps-video" },
    { name: "Leg Raises", reps: "10", videoId: "leg-raises-video" }
];

const fullBodyExercises = [
    { name: "Burpees", reps: "10", videoId: "burpees-video" },
    { name: "Jumping Jacks", reps: "20", videoId: "jumping-jacks-video" },
    { name: "Mountain Climbers", reps: "15", videoId: "mountain-climbers-video" }
];

// Variables
let selectedExercises = [];
let timer = 60;
let interval;
let isPaused = false;
let currentIndex = 0;

// Select muscle group and start challenge
document.querySelectorAll('.muscle-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const muscleGroup = this.getAttribute('data-group');
        selectMuscleGroup(muscleGroup);
    });
});

function selectMuscleGroup(group) {
    document.getElementById('start-button').disabled = false;
    switch (group) {
        case 'upper-body':
            selectedExercises = upperBodyExercises;
            break;
        case 'lower-body':
            selectedExercises = lowerBodyExercises;
            break;
        case 'core':
            selectedExercises = coreExercises;
            break;
        case 'full-body':
            selectedExercises = fullBodyExercises;
            break;
    }
    document.getElementById('exercise').innerText = `Press Start for ${group} workout!`;
}

// Start, stop, and reset buttons
document.getElementById('start-button').addEventListener('click', startChallenge);
document.getElementById('stop-button').addEventListener('click', stopChallenge);
document.getElementById('reset-button').addEventListener('click', resetChallenge);

// Start the workout challenge
function startChallenge() {
    if (isPaused) {
        isPaused = false; // Resume the countdown
        const playingVideo = document.querySelector('.exercise-video:not([hidden])');
        if (playingVideo) {
            playingVideo.play();
        }
    } else {
        resetAllVideos(); // Reset all videos before starting
        timer = 60; // Reset the timer to 60 seconds
        currentIndex = 0; // Reset the video index
        document.getElementById('countdown').innerText = timer;
        updateWorkout(); // Display the first exercise
    }

    document.getElementById('start-button').disabled = true;
    document.getElementById('stop-button').disabled = false;
    document.getElementById('reset-button').disabled = false;

    interval = setInterval(updateTimer, 1000); // Start the timer countdown
}

// Stop (pause) the workout
function stopChallenge() {
    isPaused = true;
    clearInterval(interval);  // Pause the countdown

    // Pause the currently playing video
    const playingVideo = document.querySelector('.exercise-video:not([hidden])');
    if (playingVideo) {
        playingVideo.pause();
    }

    document.getElementById('start-button').disabled = false;  // Enable resume
    document.getElementById('stop-button').disabled = true;   // Disable stop button
}

// Reset the workout
function resetChallenge() {
    clearInterval(interval); // Clear the countdown
    timer = 60; // Reset timer
    currentIndex = 0; // Reset exercise index
    document.getElementById('countdown').innerText = timer;
    document.getElementById('exercise').innerText = "Select a muscle group to begin and you will have 60 seconds to complete!";

    // Hide and reset all exercise videos
    resetAllVideos();

    document.getElementById('start-button').disabled = false;
    document.getElementById('stop-button').disabled = true;
    document.getElementById('reset-button').disabled = true;
}

// Utility function to reset all videos
function resetAllVideos() {
    document.querySelectorAll('.exercise-video').forEach(video => {
        video.hidden = true;
        video.pause();
        video.load(); // Reset the video to its initial state
    });
}

// Timer countdown
function updateTimer() {
    if (timer > 0) {
        timer--;
        document.getElementById('countdown').innerText = timer;

        if (timer % 20 === 0) {  // Every 20 seconds, change exercise
            updateWorkout();
        }
    } else {
        clearInterval(interval);  // Stop the countdown when timer reaches zero
        showMotivationalMessage();

        // Pause the currently playing video when the timer ends
        const playingVideo = document.querySelector('.exercise-video:not([hidden])');
        if (playingVideo) {
            playingVideo.pause();
        }
    }
}

// Display the workout exercise and corresponding video
function updateWorkout() {
    // Hide and reset all videos
    resetAllVideos();

 // Show the correct video for the current exercise
    const exercise = selectedExercises[currentIndex];
    if (exercise) {
        document.getElementById('exercise').innerText = `${exercise.reps || exercise.duration} ${exercise.name}`;
        const currentVideo = document.getElementById(exercise.videoId);
        if (currentVideo) {
            currentVideo.hidden = false;
            currentVideo.play();
        }
    }

    // Update index to the next exercise
    currentIndex = (currentIndex + 1) % selectedExercises.length;
}
// Show a motivational message when the timer ends
function showMotivationalMessage() {
    const messages = ["Congratulations! You completed the challenge!", "Well done! Keep up the good work!"];
    const message = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('motivational-message').innerText = message;
}
