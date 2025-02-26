// script.js
// Smooth scrolling
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            easing: 'ease-in-out'
        });
        document.getElementById('mobile-menu').checked = false;
        this.blur();
    });
});

// Scroll highlighting with debounce
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 60;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPos >= sectionTop - sectionHeight/3 && 
            scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Debounce function
function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

document.addEventListener('scroll', debounce(updateActiveNav));

// Keyboard navigation for menu
document.querySelector('.menu-toggle').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        document.getElementById('mobile-menu').click();
    }
});

// Light/Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    }
    localStorage.setItem('theme', body.getAttribute('data-theme'));
});

const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
if (savedTheme === 'dark') {
    themeToggle.textContent = '☀️';
} else {
    themeToggle.textContent = '🌙';
}

// Keyboard navigation for theme toggle
themeToggle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    try {
        const response = await fetch('https://formspree.io/f/xnnjkkpy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
            alert('Message sent successfully! I’ll get back to you soon.');
            contactForm.reset();
        } else {
            alert('There was an error sending your message. Please try again later.');
        }
    } catch (error) {
        alert('There was an error sending your message. Please try again later.');
        console.error('Form submission error:', error);
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Keyboard navigation for cards
document.querySelectorAll('.card, .project-card, .tech-card, .testimonial-card').forEach(card => {
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            card.querySelector('h3')?.focus();
        }
    });
});

// Parallax effect on scroll
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const scrollTop = window.scrollY;
        const offset = rect.top + scrollTop;
        const depth = 20;
        section.style.transform = `translateZ(${depth - (scrollTop - offset) / 10}px)`;
    });
});

// Slideshow Functionality
document.addEventListener('DOMContentLoaded', () => {
    const slideshows = document.querySelectorAll('.slideshow-container');

    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelector('.slides');
        const slideItems = slides.querySelectorAll('.slide');
        const prevBtn = slideshow.querySelector('.prev');
        const nextBtn = slideshow.querySelector('.next');
        const bubblesContainer = slideshow.querySelector('.bubbles');
        let currentSlide = 0;

        // Create bubbles
        slideItems.forEach((_, index) => {
            const bubble = document.createElement('span');
            bubble.classList.add('bubble');
            if (index === 0) bubble.classList.add('active');
            bubble.dataset.index = index;
            bubblesContainer.appendChild(bubble);
        });

        const bubbles = bubblesContainer.querySelectorAll('.bubble');

        // Show slide
        function showSlide(index) {
            if (index >= slideItems.length) currentSlide = 0;
            if (index < 0) currentSlide = slideItems.length - 1;
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            bubbles.forEach(bubble => bubble.classList.remove('active'));
            bubbles[currentSlide].classList.add('active');

            // Adjust dynamic height for project cards
            if (slideshow.dataset.slideshow === 'projects') {
                const currentSlideHeight = slideItems[currentSlide].scrollHeight;
                slides.style.height = `${currentSlideHeight}px`;
            }
        }

        // Next slide
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
        });

        // Previous slide
        prevBtn.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
        });

        // Bubble navigation
        bubbles.forEach(bubble => {
            bubble.addEventListener('click', () => {
                currentSlide = parseInt(bubble.dataset.index);
                showSlide(currentSlide);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.activeElement === prevBtn || document.activeElement === nextBtn || document.activeElement === bubblesContainer) {
                if (e.key === 'ArrowLeft') {
                    currentSlide--;
                    showSlide(currentSlide);
                } else if (e.key === 'ArrowRight') {
                    currentSlide++;
                    showSlide(currentSlide);
                }
            }
        });

        // Initialize first slide
        showSlide(currentSlide);
    });

    // Initialize Particle.js with error handling
    if (typeof particlesJS === 'function') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#6b46c1" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#6b46c1", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } },
                "modes": { "repulse": { "distance": 100, "duration": 0.4 } }
            }
        }, function() {
            console.log('Particles.js loaded successfully');
        });
    } else {
        console.error('Particles.js library failed to load. Check the script source or internet connection.');
    }
});