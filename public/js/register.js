// Import the necessary functions from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Import cookie management
import './cookies.js';

let app;
let auth;
let db;
let googleProvider;

// Initialize Firebase configuration
async function initializeFirebase() {
    try {
        const response = await fetch('https://muscles-and-balance-7.uc.r.appspot.com/api/firebase-config');
        const firebaseConfig = await response.json();
        
        // Initialize Firebase only if it hasn't been initialized yet
        if (!app) {
            app = initializeApp(firebaseConfig);
            auth = getAuth(app);
            db = getFirestore(app);
            
            // Initialize Google Provider with custom parameters
            googleProvider = new GoogleAuthProvider();
            googleProvider.addScope('profile');
            googleProvider.addScope('email');
            googleProvider.setCustomParameters({
                'prompt': 'select_account'
            });

            // Set up event listeners after Firebase is initialized
            setupEventListeners();
            setupAuthStateListener();
        }
        return true;
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        return false;
    }
}

// Initialize Firebase before running any other code
await initializeFirebase();

// Function to set up auth state listener
function setupAuthStateListener() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Save user session in cookies
            CookieManager.set('userSession', JSON.stringify({
                uid: user.uid,
                email: user.email,
                emailVerified: user.emailVerified,
                lastLogin: Date.now()
            }), 7);
            displayWelcomeMessageAndAuthButtons(user.uid);
        } else {
            // Clear user session cookies
            CookieManager.delete('userSession');
            document.getElementById("signin-link")?.classList.remove("hidden");
            document.getElementById("welcome-message")?.classList.add("hidden");
            document.getElementById("logout-button")?.classList.add("hidden");
            
            // Show sign-in and sign-up buttons
            const signInButton = document.getElementById("sign-in-button");
            const signUpButton = document.getElementById("sign-up-button");
            if (signInButton) signInButton.classList.remove("hidden");
            if (signUpButton) signUpButton.classList.remove("hidden");
        }
    });
}

// Function to set up event listeners
function setupEventListeners() {
    // Sign-up button
    const signupButton = document.getElementById('signup-button');
    if (signupButton) {
        signupButton.addEventListener('click', handleSignUp);
    }

    // Sign-in button
    const signinButton = document.getElementById('user-signin-button');
    if (signinButton) {
        signinButton.addEventListener('click', handleSignIn);
    }

    // Google sign-in button
    const googleSigninButton = document.getElementById('google-signin-button');
    if (googleSigninButton) {
        googleSigninButton.addEventListener('click', handleGoogleSignIn);
    }

    // Logout button
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', showLogoutPopup);
    }

    // Forgot password form
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
}

// Function to show a custom alert
function showAlert(message, type = 'info') {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');

    if (alertBox && alertMessage) {
        alertMessage.textContent = message;
        alertBox.className = `alert ${type}`;
        alertBox.classList.remove('hidden');

        setTimeout(() => {
            alertBox.style.opacity = '1';
            alertBox.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            closeAlert();
        }, 5000);
    } else {
        console.error("Alert elements not found.");
    }
}

function closeAlert() {
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
        alertBox.style.opacity = '0';
        alertBox.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            alertBox.classList.add('hidden');
        }, 300);
    }
}

// Function to validate password strength based on Firebase requirements
function validatePassword(password) {
    const errors = [];

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must include at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Password must include at least one lowercase letter.");
    }

    if (!/[0-9]/.test(password)) {
        errors.push("Password must include at least one numeric character.");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must include at least one special character.");
    }

    return errors;
}

// Sign-up function with enhanced password validation
async function handleSignUp(event) {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const dateOfBirth = document.getElementById('signup-dob').value;
    const phone = document.getElementById('signup-phone').value || "";
    const country = document.getElementById('signup-country').value;
    const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : "";
    const termsAgreed = document.getElementById('terms').checked;

    // Check if terms and conditions are agreed upon
    if (!termsAgreed) {
        showAlert("You must agree to the terms and conditions.", 'error');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        showAlert("Passwords do not match!", 'error');
        return;
    }

    // Validate all fields
    if (!email || !password || !name || !dateOfBirth || !country || !gender) {
        showAlert("Please fill in all fields.", 'error');
        return;
    }

    // Validate password strength
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
        showAlert(passwordErrors.join(" "), 'error');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            name,
            email,
            dateOfBirth,
            phone,
            country,
            gender,
            createdAt: new Date(),
        });

        // Save user preferences in cookies
        UserPreferences.save({
            name,
            country,
            gender,
            registrationDate: Date.now()
        });

        // Send verification email
        await sendEmailVerification(user);
        showAlert("Signed up successfully! Please verify your email.", 'success');

        // Redirect to a verification page
        setTimeout(() => {
            window.location.href = "email-verification.htm";
        }, 3000);

    } catch (error) {
        console.error("Error during sign up:", error);
        if (error.code === 'auth/email-already-in-use') {
            showAlert('Email already in use.', 'error');
        } else if (error.code === 'auth/invalid-email') {
            showAlert('Invalid email.', 'error');
        } else if (error.code === 'auth/weak-password') {
            showAlert('Password does not meet the requirements.', 'error');
        } else {
            showAlert("Error: " + error.message, 'error');
        }
    }
}

// Sign-in function with email verification check
async function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    if (!email || !password) {
        showAlert("Please enter both email and password.", 'error');
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if the email is verified
        if (!user.emailVerified) {
            showAlert("Please verify your email before logging in.", 'error');
            return;
        }

        showAlert("Successfully signed in!", 'success');
        await displayWelcomeMessageAndAuthButtons(user.uid);

        setTimeout(() => {
            window.location.href = "home.htm";
        }, 1000);
    } catch (error) {
        console.error("Error during sign in:", error);
        if (error.code === 'auth/wrong-password') {
            showAlert('Incorrect password.', 'error');
        } else if (error.code === 'auth/user-not-found') {
            showAlert('No user found.', 'error');
        } else {
            showAlert("Error: " + error.message, 'error');
        }
    }
}

// Function to handle password reset
async function handleForgotPassword(event) {
    event.preventDefault();

    const email = document.getElementById("forgot-email").value.trim();
    if (!validateEmail(email)) {
        showAlert("Please enter a valid email address.", "error");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        showAlert("Password reset email sent.", "success");
        document.getElementById("forgot-email").value = "";

        // Optionally redirect to the login page after showing the success message
        setTimeout(() => {
            document.getElementById("forgot-password-form").style.display = "none";
            document.getElementById("sign-in-form").style.display = "block";
        }, 3000);
    } catch (error) {
        console.error("Error sending password reset email:", error);
        showAlert("Failed to send password reset email. Try again later.", "error");
    }
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function to handle Google sign-in
async function handleGoogleSignIn() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Check if user already exists in Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            // Save new user data to Firestore
            await setDoc(userDocRef, {
                name: user.displayName,
                email: user.email,
                createdAt: new Date(),
                profilePicture: user.photoURL,
                provider: "Google"
            });
        }

        showAlert("Successfully signed in with Google!", "success");
        setTimeout(() => {
            window.location.href = "home.htm";
        }, 1000);
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        showAlert("Google Sign-In failed: " + error.message, "error");
    }
}

// Display welcome message and toggle auth elements
async function displayWelcomeMessageAndAuthButtons(userId) {
    const signinButton = document.getElementById("signin-link");
    const welcomeMessage = document.getElementById("welcome-message");
    const logoutButton = document.getElementById("logout-button");

    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
            const userData = userDoc.data();

            // Set the user's name in localStorage
            localStorage.setItem("userName", userData.name);

            // Update and display the welcome message
            welcomeMessage.textContent = `Welcome, ${userData.name}!`;
            welcomeMessage.classList.remove("hidden");

            // Trigger animation by adding the visible class
            setTimeout(() => {
                welcomeMessage.classList.add("visible");
            }, 100); // Slight delay for animation to take effect

            // Toggle visibility of auth buttons
            signinButton?.classList.add("hidden");
            logoutButton?.classList.remove("hidden");
        }
    } catch (error) {
        console.error("Error retrieving user data:", error);
    }
}

// Logout confirmation popup
function showLogoutPopup() {
    const popupOverlay = document.createElement("div");
    popupOverlay.id = "popup-overlay";
    popupOverlay.style.cssText =
        "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;";

    const popup = document.createElement("div");
    popup.id = "logout-popup";
    popup.style.cssText =
        "position: relative; padding: 20px; border-radius: 12px; background-color: #000000cc; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); text-align: center;";

    popup.innerHTML = `
    <div class="wave wave1"></div>
    <div class="wave wave2"></div>
    <div class="wave wave3"></div>
    <p>Are you sure you want to log out?</p>
    <div class="popup-buttons">
      <button id="confirm-logout">Yes</button>
      <button id="cancel-logout">No</button>
    </div>
  `;

    popupOverlay.appendChild(popup);
    document.body.appendChild(popupOverlay);

    document.getElementById("confirm-logout").addEventListener("click", () => {
        handleLogout();
        closeLogoutPopup();
    });

    document.getElementById("cancel-logout").addEventListener("click", closeLogoutPopup);
}

// Close logout popup
function closeLogoutPopup() {
    const popupOverlay = document.getElementById("popup-overlay");
    if (popupOverlay) document.body.removeChild(popupOverlay);
}

// Logout function
function handleLogout() {
    signOut(auth).then(() => {
        window.location.href = "home.htm";
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
}

// WELCOME MESSAGE FOR INDEX.HTM

// Function to display the welcome message and hide sign-in and sign-up buttons
async function showWelcomeMessage(userId) {
    const signInButton = document.getElementById("sign-in-button");
    const signUpButton = document.getElementById("sign-up-button");
    const welcomeMessage = document.getElementById("user-welcome-message");

    try {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
            const userData = userDoc.data();

            // Display welcome message
            welcomeMessage.textContent = `Welcome Back, ${userData.name}!`;
            welcomeMessage.classList.remove("hidden");

            // Make the element visible with animation
            welcomeMessage.classList.remove('hidden');
            setTimeout(() => {
                welcomeMessage.classList.add('visible');
            }, 100); // Slight delay to trigger the animation

            // Hide the auth buttons
            signInButton?.classList.add("hidden");
            signUpButton?.classList.add("hidden");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// Track auth state and display the welcome message
onAuthStateChanged(auth, (user) => {
    const signInButton = document.getElementById("sign-in-button");
    const signUpButton = document.getElementById("sign-up-button");
    const welcomeMessage = document.getElementById("user-welcome-message");

    if (user) {
        // User is logged in
        showWelcomeMessage(user.uid);

        // Hide sign-in and sign-up buttons
        signInButton?.classList.add("hidden");
        signUpButton?.classList.add("hidden");
    } else {
        // User is logged out
        signInButton?.classList.remove("hidden");
        signUpButton?.classList.remove("hidden");
        welcomeMessage?.classList.add("hidden");
        welcomeMessage.textContent = ""; // Clear any previous message
    }
});

// Function to show the login/signup popup
function showLoginPopup() {
    const popup = document.getElementById('login-popup');
    popup.classList.remove('hidden');
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';
    }, 50); // Small delay to trigger CSS transition
}

// Check if the user is logged in
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Show the popup if the user is not logged in
        setTimeout(showLoginPopup, 200); // Delay to make it less intrusive
    }
});


