
document.addEventListener('DOMContentLoaded', function () {
    // Make hero content visible immediately
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('visible');
        }, 300);
    }
    
    // Select all section containers and features
    const sectionContainers = document.querySelectorAll('.section-container');
    const features = document.querySelectorAll('.feature');

    // Create an IntersectionObserver for scroll animations
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class to fade in the element
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }); // Trigger earlier for better UX

    // Observe the sections and features
    sectionContainers.forEach(container => observer.observe(container));
    features.forEach(feature => observer.observe(feature));
    
    // Handle header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and background opacity based on scroll position
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});


