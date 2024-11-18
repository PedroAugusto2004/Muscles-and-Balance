// Import the necessary functions from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging.js";

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ0rFP7j83dQ9v1YyUwTvhOIb3ZTNbY0E",
  authDomain: "muscles-and-balance-7.firebaseapp.com",
  projectId: "muscles-and-balance-7",
  storageBucket: "muscles-and-balance-7.appspot.com",
  messagingSenderId: "679194909576",
  appId: "1:679194909576:web:f7f3faa46293dc8359383d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

console.log("Firebase app initialized:", app);
console.log("Firebase Auth initialized:", auth);
console.log("Firebase Firestore initialized:", db);

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

// Sign-up function
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

  // Basic validation
  if (password !== confirmPassword) {
    showAlert("Passwords do not match!", 'error');
    return;
  }

  if (!email || !password || !name || !dateOfBirth || !country || !gender) {
    showAlert("Please fill in all fields.", 'error');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name, email, dateOfBirth, phone, country, gender, createdAt: new Date()
    });

    showAlert("Signed up successfully!", 'success');
    window.location.href = "home.htm";
  } catch (error) {
    console.error("Error during sign up:", error);
    if (error.code === 'auth/email-already-in-use') {
      showAlert('Email already in use.', 'error');
    } else if (error.code === 'auth/invalid-email') {
      showAlert('Invalid email.', 'error');
    } else if (error.code === 'auth/weak-password') {
      showAlert('Password should be at least 6 characters long.', 'error');
    } else {
      showAlert("Error: " + error.message, 'error');
    }
  }
}

// Sign-in function
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

// Display welcome message and toggle auth elements
async function displayWelcomeMessageAndAuthButtons(userId) {
  const signinButton = document.getElementById("signin-link");
  const welcomeMessage = document.getElementById("welcome-message");
  const logoutButton = document.getElementById("logout-button");

  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();

      localStorage.setItem("userName", userData.name);
      welcomeMessage.textContent = `Welcome, ${userData.name}!`;
      welcomeMessage.classList.remove("hidden");

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
  popupOverlay.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;";

  const popup = document.createElement("div");
  popup.id = "logout-popup";
  popup.style.cssText = "background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); text-align: center;";
  popup.innerHTML = `
    <p>Are you sure you want to log out?</p>
    <button id="confirm-logout" style="margin-right: 10px;">Yes</button>
    <button id="cancel-logout">No</button>
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
    window.location.href = "login.htm";
  }).catch((error) => {
    console.error("Error signing out:", error);
  });
}

// Track auth state
onAuthStateChanged(auth, (user) => {
  console.log("Auth state changed:", user);
  if (user) {
    displayWelcomeMessageAndAuthButtons(user.uid);
  } else {
    document.getElementById("signin-link")?.classList.remove("hidden");
    document.getElementById("welcome-message")?.classList.add("hidden");
    document.getElementById("logout-button")?.classList.add("hidden");
  }
});

// Attach button events
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('signup-button')?.addEventListener('click', handleSignUp);
  document.getElementById('user-signin-button')?.addEventListener('click', handleSignIn);
  document.getElementById('logout-button')?.addEventListener('click', showLogoutPopup);
});

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
      welcomeMessage.textContent = `Welcome, ${userData.name}!`;
      welcomeMessage.classList.remove("hidden");

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
  }, 100); // Small delay to trigger CSS transition
}


// Check if the user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Show the popup if the user is not logged in
    setTimeout(showLoginPopup, 2000); // Delay to make it less intrusive
  }
});
