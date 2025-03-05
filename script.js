document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for all links with a hash
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close mobile menu if open
      document.getElementById('mobile-menu').checked = false;
    });
  });

  // Highlight active navigation link based on scroll position
  function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 60;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPos >= sectionTop - sectionHeight / 3 && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          }
        });
      }
    });
  }

  // Handle back-to-top visibility on scroll
  function handleScroll() {
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  // Debounce function to optimize scroll event handling
  function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  window.addEventListener('scroll', debounce(() => {
    updateActiveNav();
    handleScroll();
  }));

  handleScroll();
  document.body.classList.add('loaded');

  // Contact form submission handling
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitButton = contactForm.querySelector('button');

    if (!name) {
      formMessage.textContent = 'Name is required.';
      formMessage.className = 'form-message error';
      return;
    }

    if (!email) {
      formMessage.textContent = 'Email is required.';
      formMessage.className = 'form-message error';
      return;
    }

    if (!message) {
      formMessage.textContent = 'Message is required.';
      formMessage.className = 'form-message error';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.className = 'form-message error';
      return;
    }

    submitButton.disabled = true;
    formMessage.textContent = 'Sending...';
    formMessage.className = 'form-message';

    try {
      const response = await fetch('https://formspree.io/f/xnnjkkpy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        formMessage.textContent = 'Message sent successfully! I’ll get back to you soon.';
        formMessage.className = 'form-message success';
        contactForm.reset();
      } else {
        formMessage.textContent = 'There was an error sending your message. Please try again later.';
        formMessage.className = 'form-message error';
      }
    } catch (error) {
      formMessage.textContent = 'There was an error sending your message. Please try again later.';
      formMessage.className = 'form-message error';
      console.error('Form submission error:', error);
    } finally {
      submitButton.disabled = false;
    }
  });

  // Back to top button functionality
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});