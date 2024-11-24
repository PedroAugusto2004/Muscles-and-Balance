$(document).ready(function() {
	
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1){  
			$('.page-title').addClass("sticky");
		}
		else{
			$('.page-title').removeClass("sticky");
		}
	});

});

//HAMBURGER

document.querySelector('.navbar-toggler').addEventListener('click', function () {
    document.querySelector('.hamburger-menu').classList.toggle('active');
    const menu = document.querySelector('.nav-menu-wrapper');
    
    // Check if the menu is open and adjust max-height accordingly
    if (menu.classList.contains('open')) {
      menu.style.maxHeight = '0'; // Close the menu smoothly
    } else {
      menu.style.maxHeight = menu.scrollHeight + 'px'; // Open the menu smoothly
    }
  
    menu.classList.toggle('open'); // Toggle the open class
  });
  
  //NAV LINK ACTIVE
  
  document.addEventListener("DOMContentLoaded", () => {
    const navbarLinks = document.querySelectorAll("#navbar a");
  
    // Normalize URLs to handle cases with/without trailing slashes
    const normalizeUrl = url => url.endsWith('/') ? url.slice(0, -1) : url;
    const currentUrl = normalizeUrl(window.location.href);
  
    // Check which link matches the current page URL and add the 'active' class
    navbarLinks.forEach(link => {
      if (normalizeUrl(link.href) === currentUrl) {
        link.classList.add("active");
      }
  
      // Add click event listener to update active class dynamically
      link.addEventListener("click", () => {
        navbarLinks.forEach(l => l.classList.remove("active")); // Remove 'active' from all
        link.classList.add("active"); // Add 'active' to clicked link
      });
    });
  });
  
// Get all navigation links
const navLinks = document.querySelectorAll('.nav-link-alt');

// Function to remove the 'active' class from all links
function clearActiveState() {
  navLinks.forEach(link => link.classList.remove('active'));
}

// Add click event listeners to each nav link
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    clearActiveState(); // Remove active state from all links
    this.classList.add('active'); // Add active state to the clicked link
  });
});

//PROFILE PIC

//REDIRECTION

function redirectToSection(button) {
  const target = button.getAttribute('data-target');
  window.location.href = target;
}

//SLIDESHOW

let slideIndex = 0;
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = document.querySelectorAll('.slides img').length;
    let startX, endX;

    function showSlides() {
        slides.style.transform = `translateX(${-slideIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlides();
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        showSlides();
    }

    // Touch events
    slides.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });

    slides.addEventListener('touchmove', e => {
        endX = e.touches[0].clientX;
    });

    slides.addEventListener('touchend', () => {
        if (startX > endX + 50) {
            nextSlide(); // Swipe left
        } else if (startX < endX - 50) {
            prevSlide(); // Swipe right
        }
    });

    // Automatic slide (optional)
    setInterval(nextSlide, 5000); // Change image every 5 seconds

// SUBSCRIBE

document.getElementById('submitBtn').addEventListener('click', function() {
    // Get the email input field
    const emailInput = document.getElementById('emailInput').value;
  
    // Check if the email input is not empty
    if (emailInput.trim() !== '') {
      // Change button text to 'SUBMITTED'
      this.textContent = 'SUBMITTED';
      
      // Clear the email input field
      document.getElementById('emailInput').value = '';
  
      // Disable the button to prevent further clicks
      this.style.pointerEvents = 'none';
      this.style.backgroundColor = '#333'; // Change button color after submission
  
      // Redirect to the login page after submission (example: "/login")
      setTimeout(function() {
      }, 1500); // Adds a slight delay of 1.5 seconds before redirecting
    } else {
      // If the email input is empty, alert the user
      alert('Please fill in your email before submitting.');
    }
  });
  