document.addEventListener('DOMContentLoaded', () => {
  // Make all sections visible initially for better no-JS experience
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('visible');
  });
  
  document.querySelector('.footer').classList.add('visible');

  // Dark/Light Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Set initial theme from localStorage or system preference
  const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      updateThemeIcon(newTheme);
    });
  }
  
  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  // Enhanced Navbar functionality
  const navbar = document.querySelector('.navbar');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navItems = document.querySelectorAll('.nav-item');
  
  // Add shadow to navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Toggle menu when hamburger is clicked
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
      
      // Update aria-expanded attribute for accessibility
      const expanded = navbarToggle.getAttribute('aria-expanded') === 'true';
      navbarToggle.setAttribute('aria-expanded', !expanded);
      
      // Change icon based on menu state
      const icon = navbarToggle.querySelector('i');
      if (navbarMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
        navbarMenu.classList.remove('active');
        const icon = navbarToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        navbarToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Add keyboard accessibility to nav items
  navItems.forEach(item => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
  
  // Scroll to top button visibility
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Improved typewriter effect
  const typewriterText = document.getElementById('typewriter-text');
  const cursor = document.querySelector('.cursor');
  const fullText = "HI, I'M PRINCE UWAGBOE";
  let i = 0;
  
  // Ensure elements are visible immediately
  if (typewriterText) {
    typewriterText.textContent = '';
    typewriterText.style.visibility = 'visible';
    typewriterText.style.opacity = '1';
    typewriterText.style.display = 'inline-block';
  }
  
  if (cursor) {
    cursor.style.cssText = 'display: inline-block !important; opacity: 1 !important; visibility: visible !important; animation: blink 0.7s infinite;';
  }
  
  function typeWriter() {
    if (i < fullText.length) {
      typewriterText.textContent += fullText.charAt(i);
      i++;
      
      if (i < fullText.length) {
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          if (cursor) {
            cursor.classList.add('hidden');
          }
        }, 500);
      }
    }
  }

  // New improved subtitle with stronger messaging
  const subHeadingText = document.querySelector('.sub-heading');
  const subHeadingFullText = "Transforming business data into smart, scalable solutions using automation, analytics, and clean code.";
  let j = 0;

  function subHeadingTypeWriter() {
    if (j < subHeadingFullText.length) {
      subHeadingText.textContent += subHeadingFullText.charAt(j);
      j++;
      setTimeout(subHeadingTypeWriter, 30);
    }
  }
  
  // Start typewriter effects with a small delay
  setTimeout(() => {
    if (typewriterText) {
      typeWriter();
    }
    
    setTimeout(() => {
      if (subHeadingText) {
        subHeadingText.textContent = '';
        subHeadingTypeWriter();
      }
    }, fullText.length * 100 + 300);
  }, 300);

  // Project filtering functionality with keyboard accessibility
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      // Add keyboard accessibility
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
      
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and add to clicked button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            // Show cards that match the filter
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            // Hide cards that don't match
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Testimonial carousel with keyboard accessibility
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  let currentIndex = 0;
  let testimonialInterval;
  
  if (testimonials.length && prevBtn && nextBtn) {
    function showTestimonial(index) {
      testimonials.forEach((t, i) => {
        t.classList.remove('active');
        if (i === index) t.classList.add('active');
      });
    }
    
    // Add keyboard accessibility
    prevBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        prevBtn.click();
      }
    });
    
    nextBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nextBtn.click();
      }
    });
    
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
      resetAutoRotation();
    });
    
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
      resetAutoRotation();
    });
    
    // Auto-rotate testimonials
    function startAutoRotation() {
      testimonialInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
      }, 10000);
    }
    
    function resetAutoRotation() {
      clearInterval(testimonialInterval);
      startAutoRotation();
    }
    
    startAutoRotation();
    showTestimonial(currentIndex);
  }

  // Enhanced Contact Form 
  const formInputs = document.querySelectorAll('.floating-label input, .floating-label textarea, .floating-label select');
  const contactForm = document.getElementById('contact-form');
  const messageField = document.getElementById('message');
  const charCounter = document.getElementById('char-count');
  const formMessage = document.getElementById('form-message');
  
  if (formInputs.length) {
    formInputs.forEach(input => {
      // Check initial state
      if (input.value.trim() !== '') {
        input.classList.add('has-value');
      }
      
      // Add event listeners for focus/blur/input
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
        input.classList.toggle('has-value', input.value.trim() !== '');
      });
      
      input.addEventListener('input', () => {
        input.classList.toggle('has-value', input.value.trim() !== '');
      });
      
      // Keyboard accessibility
      if (input.tagName.toLowerCase() === 'select') {
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            input.click();
          }
        });
      }
    });
  }
  
  if (messageField && charCounter) {
    charCounter.textContent = messageField.value.length;
    
    messageField.addEventListener('input', () => {
      const count = messageField.value.length;
      charCounter.textContent = count;
      
      if (count > 400) {
        charCounter.style.color = count > 450 ? '#ff4757' : '#ff9800';
      } else {
        charCounter.style.color = '';
      }
    });
  }
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (!isValid) {
        formMessage.textContent = 'Please fill in all required fields.';
        formMessage.className = 'form-message error';
        return;
      }
      
      // Simulate form submission
      const submitButton = contactForm.querySelector('.submit-button');
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      // This timeout simulates an API call delay - replace with actual form handling
      setTimeout(() => {
        contactForm.classList.add('form-submitted');
        formMessage.textContent = 'Your message has been sent successfully! I will get back to you soon.';
        formMessage.className = 'form-message success';
        
        setTimeout(() => {
          contactForm.reset();
          contactForm.classList.remove('form-submitted');
          submitButton.disabled = false;
          submitButton.innerHTML = '<span class="button-text"><i class="fas fa-paper-plane"></i> Send Message</span><span class="button-success"><i class="fas fa-check"></i> Sent!</span>';
          
          if (charCounter) {
            charCounter.textContent = '0';
            charCounter.style.color = '';
          }
          
          formInputs.forEach(input => {
            input.classList.remove('has-value');
          });
        }, 3000);
      }, 1500);
    });
  }

  // Implement smooth scrolling with a11y improvements
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href').length > 1) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navbar.offsetHeight;
          
          window.scrollTo({
            top: offsetTop,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
          });
          
          // Set focus to the target element for better a11y
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({preventScroll: true});
          
          // Update URL without page reload
          history.pushState(null, '', targetId);
        }
      }
    });
  });

  // Detect if JavaScript is enabled and add class to body
  document.body.classList.add('js-enabled');
  
  // Initialize section visibility with IntersectionObserver for performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  });
  
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
});