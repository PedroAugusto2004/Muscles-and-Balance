document.addEventListener('DOMContentLoaded', () => {
    // Function to show sign-up form
    function showSignUp() {
        document.getElementById('sign-in-form').style.display = 'none';
        document.getElementById('sign-up-form').style.display = 'block';
        document.getElementById('forgot-password-form').style.display = 'none';
    }

    // Function to show sign-in form
    function showSignIn() {
        document.getElementById('sign-in-form').style.display = 'block';
        document.getElementById('sign-up-form').style.display = 'none';
        document.getElementById('forgot-password-form').style.display = 'none';
    }

    // Function to show forgot password form
    function showForgotPassword() {
        document.getElementById('sign-in-form').style.display = 'none';
        document.getElementById('sign-up-form').style.display = 'none';
        document.getElementById('forgot-password-form').style.display = 'block';
    }

    // Initialize intl-tel-input for the phone number input
    const phoneInput = document.querySelector("#signup-phone");
    const ipInfoToken = '526cbc626b7e19';

    const iti = window.intlTelInput(phoneInput, {
        initialCountry: "auto",
        geoIpLookup: function (callback) {
            fetch(`https://ipinfo.io?token=${ipInfoToken}`, { headers: { 'Accept': 'application/json' } })
                .then((resp) => resp.json())
                .then((resp) => {
                    const countryCode = (resp && resp.country) ? resp.country : "us";
                    callback(countryCode);
                })
                .catch((error) => {
                    console.error("Error fetching IP info:", error);
                    callback("us");
                });
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    // Handle navigation based on URL hash
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash === '#sign-in-form') {
            showSignIn();
        } else if (hash === '#sign-up-form') {
            showSignUp();
        } else if (hash === '#forgot-password-form') {
            showForgotPassword();
        }
    }
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();  // Check hash on initial load

    // Expose functions for inline links
    window.showSignUp = () => { window.location.hash = '#sign-up-form'; };
    window.showSignIn = () => { window.location.hash = '#sign-in-form'; };
    window.showForgotPassword = () => { window.location.hash = '#forgot-password-form'; };

    // Attach UI handlers for navigation buttons
    const showSignUpButton = document.querySelector('#show-signup-button');
    const showSignInButton = document.querySelector('#show-signin-button');
    const showForgotPasswordButton = document.querySelector('#show-forgot-password-button');

    if (showSignUpButton) {
        showSignUpButton.addEventListener('click', showSignUp);
    }
    if (showSignInButton) {
        showSignInButton.addEventListener('click', showSignIn);
    }
    if (showForgotPasswordButton) {
        showForgotPasswordButton.addEventListener('click', showForgotPassword);
    }

    // Handle sign-up form submission and pass formatted phone number to register.js
    const signupButton = document.getElementById('signup-button');
    if (signupButton) {
        signupButton.addEventListener('click', (event) => {
            event.preventDefault();
            const formattedPhoneNumber = iti.getNumber(); // Get the number in E.164 format
            phoneInput.value = formattedPhoneNumber; // Set the input value to the formatted number

            // Trigger the handleSignUp function in register.js
            handleSignUp(event);
        });
    }
});
