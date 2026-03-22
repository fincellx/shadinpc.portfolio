// Select elements
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const header = document.querySelector('.navbar');

// Toggle Mobile Menu
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navLinks.classList.toggle('active');
};

// Scroll sections active link & Sticky Navbar
window.onscroll = () => {
    // Active Link Logic
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            document.querySelectorAll('.nav-links a').forEach(links => {
                links.classList.remove('active');
                document.querySelector('.nav-links a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky Navbar shadow effect
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navLinks.classList.remove('active');
};

// Intersection Observer for Reveal Animations
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            // Stop observing once revealed
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Dynamic typing effect for Home Section
const textArray = [ "Performance Marketer","Business Development", "Growth Specialist"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingElement = document.querySelector('.typing-text');

function type() {
    let currentText = textArray[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
}

// Custom Cursor Logic
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Direct position for dot
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Smoother animation for outline
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Hover effects for links and buttons
const interactiveElements = document.querySelectorAll('a, button, .skill-box, .project-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hover');
    });
});

// Start typing effect on load
document.addEventListener('DOMContentLoaded', () => {
    if (typingElement) {
        setTimeout(type, 1000);
    }

    // --- Contact Form & Modal Logic ---
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const action = contactForm.getAttribute('action');

            // Using fetch to submit to Google Forms
            // Note: Google Forms returns a CORS error on success, but the data is still submitted.
            // We use 'no-cors' mode to allow the submission to go through.
            fetch(action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
                .then(() => {
                    // Show success modal
                    successModal.classList.add('active');
                    successModal.style.display = 'flex';
                    // Reset form
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    // Even on error, we might want to show the modal if data likely went through
                    successModal.classList.add('active');
                    successModal.style.display = 'flex';
                    contactForm.reset();
                });
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
            setTimeout(() => {
                successModal.style.display = 'none';
            }, 400);
        });
    }

    // Close modal when clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
            setTimeout(() => {
                successModal.style.display = 'none';
            }, 400);
        }
    });
});

