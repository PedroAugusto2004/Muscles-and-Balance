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
  