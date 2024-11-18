
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

// Add event listener for all navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        // Scroll to the target section smoothly
        const targetId = this.getAttribute('href').substring(1); // Remove the '#' from href
        const targetElement = document.getElementById(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        // Update active class for links
        document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});
