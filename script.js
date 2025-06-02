//receiving email 
function sendMail() {
    const templateParams = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        phone : document.getElementById("phone").value,
        message : document.getElementById("message").value,
    };
    emailjs.send("service_sj2i7s9", "template_2t1mnwn", templateParams)
    .then(() => alert("Your message has been sent successfully!").catch(() => alert("Your message not sent, try again!")));
}


document.addEventListener('DOMContentLoaded', () => {

    // Dropdown Toggle for Navigation (for "About" )
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
        'https://charterhouselagos.com/wp-content/uploads/2025/01/Untitled-design-28-1-1536x960.jpg', // Make sure this matches your initial background
        'https://charterhouselagos.com/wp-content/uploads/2024/12/site-photo-1.jpg', // Add other images here
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

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.main-nav ul.nav-menu'); // Target the ul with both classes

    // Function to close the menu
    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active'); // Toggles display of the main menu
        navToggle.classList.toggle('active'); // Toggles hamburger icon animation
    });

    // Optional: Close menu when a navigation link is clicked
    // This is especially useful for single-page sites or if you just want
    // the menu to collapse after a user makes a selection.
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(event) {
            // Only close if it's not a dropdown parent, or if you want dropdowns to open on click
            // For now, it will close the entire menu.
            // If you want dropdowns to stay open, you'll need more complex JS logic.
            if (!this.closest('.dropdown')) { // Don't close if it's a dropdown parent link
                closeMenu();
            } else {
                // If it's a dropdown parent, prevent default link behavior to allow
                // custom dropdown toggling on mobile, if you implement it.
                // For this example, it lets the link navigate.
            }
        });
    });

    // Optional: Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // --- Dropdown Toggling for Mobile (More Advanced) ---
    // If you want the "About" dropdown to open/close on click on mobile
    // rather than navigating immediately, you'll need this.
    const dropdownParents = document.querySelectorAll('.main-nav .dropdown > a');

    dropdownParents.forEach(dropdownParent => {
        dropdownParent.addEventListener('click', function(event) {
            // Check if we are on a small screen (where hamburger is visible)
            if (window.innerWidth <= 768) { // Matches your @media query breakpoint
                event.preventDefault(); // Prevent default link navigation
                const dropdownContent = this.nextElementSibling; // Get the .dropdown-content

                // Close other open dropdowns in the mobile menu
                navMenu.querySelectorAll('.dropdown-content').forEach(content => {
                    if (content !== dropdownContent && content.style.display === 'block') {
                        content.style.display = 'none';
                    }
                });

                // Toggle the current dropdown
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                } else {
                    dropdownContent.style.display = 'block';
                }
            }
        });
    });

});