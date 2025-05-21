// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Dropdown Toggle for Navigation (for "About" or similar)
    const dropdowns = document.querySelectorAll('.main-nav .dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a'); // The main link for the dropdown
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        // Toggle on click for better mobile experience
        dropdownLink.addEventListener('click', function(event) {
            // Prevent default link behavior
            event.preventDefault();

            // Close other open dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });

            // Toggle 'active' class on the clicked dropdown parent
            dropdown.classList.toggle('active');
        });

        // Optional: Keep dropdown open on hover for desktop (handled by CSS, but JS could enhance)
        // This part is mainly handled by CSS `:hover` but can be added for robustness
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 992) { // Apply only on larger screens
                this.classList.add('active');
            }
        });

        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) { // Apply only on larger screens
                this.classList.remove('active');
            }
        });
    });

    // Close dropdowns if clicked outside
    document.addEventListener('click', function(event) {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target) && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }
        });
    });


    // --- Placeholder for a simple image slider (if applicable) ---
    const heroSection = document.querySelector('.hero-section');
    const images = [
        'path/to/your/hero-bg.jpg', // Make sure this matches your initial background
        'path/to/your/another-hero-bg-1.jpg', // Add other images here
        'path/to/your/another-hero-bg-2.jpg'
    ];
    let currentImageIndex = 0;

    function changeHeroBackground() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    }

    // Uncomment and adjust if you have a slider
    // setInterval(changeHeroBackground, 5000); // Change image every 5 seconds

    // If you have explicit navigation arrows (e.g., Font Awesome):
    // const leftArrow = document.querySelector('.hero-section .arrow.left');
    // const rightArrow = document.querySelector('.hero-section .arrow.right');

    // if (leftArrow && rightArrow) {
    //     leftArrow.addEventListener('click', () => {
    //         currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    //         heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    //     });

    //     rightArrow.addEventListener('click', () => {
    //         changeHeroBackground(); // Reuse the existing function
    //     });
    // }


    // --- Placeholder for Mobile Menu Toggle (Hamburger) ---
    // You'd typically have a button for this on smaller screens
    // const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    // const mainNav = document.querySelector('.main-nav ul');

    // if (mobileMenuToggle && mainNav) {
    //     mobileMenuToggle.addEventListener('click', () => {
    //         mainNav.classList.toggle('active'); // Toggle a class to show/hide the menu
    //     });
    // }

    // --- Scroll to Top Button Functionality ---
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    scrollToTopBtn.addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

    // --- Admission Buttons Active State (Optional, if you want interaction) ---
    const admissionButtons = document.querySelectorAll('.admission-btn');
    admissionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all buttons
            admissionButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            this.classList.add('active');
            // You could also load different content based on the clicked button
            // console.log(`Admission button clicked: ${this.textContent}`);
        });
    });


    // --- Counter Animation for Fun Facts Section ---
    const counters = document.querySelectorAll('.counter');
    const funFactsSection = document.querySelector('.fun-facts-section');
    let countersActivated = false; // Flag to ensure animation runs only once

    // Function to start the counter animation
    const startCounter = (counterElement) => {
        const target = parseInt(counterElement.dataset.target);
        let current = 0;
        const duration = 2000; // 2 seconds for the animation
        const increment = target / (duration / 10); // Calculate increment for smoother animation

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counterElement.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.textContent = target; // Ensure it reaches the exact target
            }
        };
        updateCounter();
    };

    // Intersection Observer to detect when the section comes into view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersActivated) {
                counters.forEach(counter => {
                    startCounter(counter);
                });
                countersActivated = true; // Set flag to true so it doesn't re-run
                observer.unobserve(funFactsSection); // Stop observing once activated
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    // Start observing the fun facts section
    if (funFactsSection) {
        observer.observe(funFactsSection);
    }
});