
document.addEventListener('DOMContentLoaded', function () {
    // Select all sections and features (h2, h3, p)
    const sections = document.querySelectorAll('section');
    const headings = document.querySelectorAll('h2');
    const featureTitles = document.querySelectorAll('.feature h3');
    const featureTexts = document.querySelectorAll('.feature p');

    // Create an IntersectionObserver to detect when elements come into and go out of view
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class to fade in the element
                entry.target.classList.add('visible');
                // Remove the 'fade-out' class if it was previously applied
                entry.target.classList.remove('fade-out');
            } else {
                // Add the 'fade-out' class to fade out the element
                entry.target.classList.add('fade-out');
                // Remove the 'visible' class if it's not in view anymore
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    // Observe the sections and content inside the sections
    sections.forEach(section => observer.observe(section));
    headings.forEach(heading => observer.observe(heading));
    featureTitles.forEach(feature => observer.observe(feature));
    featureTexts.forEach(feature => observer.observe(feature));
});


// Function to replace buttons with a welcome message
function displayWelcomeMessage(username) {
    const authPlaceholder = document.getElementById('auth-placeholder');
    const buttons = authPlaceholder.querySelector('.top-right-buttons');
    const welcomeMessage = document.getElementById('welcome-message');

    // Remove the buttons if they exist
    if (buttons) {
        buttons.remove();
    }

    // Create and show the welcome message
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${username}`;
        welcomeMessage.classList.remove('hidden');
    } else {
        // If the welcome message doesn't exist, create it
        const newMessage = document.createElement('p');
        newMessage.id = 'welcome-message';
        newMessage.className = 'welcome-message';
        newMessage.textContent = `Welcome, ${username}`;
        authPlaceholder.appendChild(newMessage);
    }
}

// Function to display authentication buttons (Sign In & Sign Up)
function displayAuthButtons() {
    const authPlaceholder = document.getElementById('auth-placeholder');
    const welcomeMessage = document.getElementById('welcome-message');

    // Hide the welcome message if it exists
    if (welcomeMessage) {
        welcomeMessage.classList.add('hidden');
    }

    // Add the buttons back if they are not already in the placeholder
    const buttonsHTML = `
        <div class="top-right-buttons">
            <a href="login.htm#sign-in-form" class="auth-button sign-in" id="signin-link">Sign In</a>
            <a href="login.htm#sign-up-form" class="auth-button sign-up" id="signup-link">Sign Up</a>
        </div>
    `;
    if (!authPlaceholder.querySelector('.top-right-buttons')) {
        authPlaceholder.insertAdjacentHTML('afterbegin', buttonsHTML);
    }
}

// Example usage: Simulate login and logout
const username = ""; // Replace with dynamic user info or leave empty for logout

// Show the appropriate content based on login state
if (username) {
    displayWelcomeMessage(username); // Show the welcome message when logged in
} else {
    displayAuthButtons(); // Show the buttons when logged out
}
