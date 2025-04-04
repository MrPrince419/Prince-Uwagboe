document.addEventListener('DOMContentLoaded', () => {
  // Make all sections visible initially to ensure content is displayed even if IntersectionObserver fails
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('visible');
  });
  
  document.querySelector('.footer').classList.add('visible');

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
      navbarToggle.classList.toggle('active');
      
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
      }
    });
  }
  
  // Add active class to nav items based on scroll position
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all items
      navItems.forEach(navItem => navItem.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Close mobile menu after clicking
      if (navbarMenu) {
        navbarMenu.classList.remove('active');
        if (navbarToggle) {
          const icon = navbarToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  });

  // Improved typewriter effect with cursor that follows each letter
  const typewriterText = document.getElementById('typewriter-text');
  const cursor = document.querySelector('.cursor');
  const fullText = "HI, I'M PRINCE UWAGBOE"; // Capitalized text
  let i = 0;
  
  // Ensure elements are visible immediately
  if (typewriterText) {
    typewriterText.textContent = ''; // Start with empty text
    typewriterText.style.visibility = 'visible';
    typewriterText.style.opacity = '1';
    typewriterText.style.display = 'inline-block';
  }
  
  if (cursor) {
    // Make sure cursor is visible and properly positioned
    cursor.style.cssText = 'display: inline-block !important; opacity: 1 !important; visibility: visible !important; animation: blink 0.7s infinite;';
  }
  
  // Typewriter function that adds one letter at a time with cursor following each letter
  function typeWriter() {
    if (i < fullText.length) {
      // Add the next character to the text
      typewriterText.textContent += fullText.charAt(i);
      i++;
      
      // Continue typing if not at the end
      if (i < fullText.length) {
        setTimeout(typeWriter, 100); // Typing speed (milliseconds)
      } else {
        // When typing is complete (after the last 'E'), hide the cursor
        setTimeout(() => {
          if (cursor) {
            cursor.style.display = 'none';
            cursor.style.animation = 'none';
            cursor.style.opacity = '0';
            cursor.style.visibility = 'hidden';
            cursor.classList.add('hidden');
          }
        }, 500); // Wait 500ms after the last character before hiding cursor
      }
    }
  }

  // New typewriter effect for sub-heading
  const subHeadingText = document.querySelector('.sub-heading');
  const subHeadingFullText = "Turning business data into smart decisions — with analytics, automation, and clean code.";
  let j = 0;
  let subHeadingTimeout;

  function subHeadingTypeWriter() {
    if (j < subHeadingFullText.length) {
      subHeadingText.textContent += subHeadingFullText.charAt(j);
      j++;
      subHeadingTimeout = setTimeout(subHeadingTypeWriter, 50); // Typing speed (milliseconds)
    }
  }
  
  // Start typewriter effect with minimal delay
  setTimeout(() => {
    typeWriter(); // Reduced delay before starting
    
    // Start sub-heading typewriter effect after main heading is complete
    setTimeout(() => {
      if (subHeadingText) {
        // Ensure the sub-heading is cleared before starting
        subHeadingText.textContent = '';
        subHeadingTypeWriter();
      }
    }, fullText.length * 100 + 500); // Adjusted timing to start after main heading completes
  }, 300);

  // Navbar toggle functionality
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
        navbarMenu.classList.remove('active');
      }
    });
    
    // Close menu when clicking on a link
    navbarMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
      });
    });
  }

  // Then proceed with normal animation logic
  setTimeout(() => {
    // Smooth scrolling for all links with a hash
    document.querySelectorAll('a[href*="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          // Remove active/highlighted state from all links
          document.querySelectorAll('a[href*="#"]').forEach(el => {
            el.classList.remove('active');
          });
          
          // Add active state to clicked link
          this.classList.add('active');
          
          // Scroll to the target section
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Create canvas for cursor trail effect
    const createCursorTrail = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      
      document.body.appendChild(canvas);
      
      // Set canvas size to window size
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      let mouseX = 0;
      let mouseY = 0;
      const dots = [];
      
      class Dot {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.size = 3;
          this.opacity = 0.5;
          this.color = '#007BFF';
        }
        
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 123, 255, ${this.opacity})`;
          ctx.fill();
          ctx.closePath();
          
          this.opacity -= 0.02;
          this.size -= 0.1;
        }
      }
      
      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        dots.push(new Dot(mouseX, mouseY));
      });
      
      function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw dots
        for (let i = 0; i < dots.length; i++) {
          dots[i].draw();
          
          // Remove dot if it's too small or transparent
          if (dots[i].size <= 0 || dots[i].opacity <= 0) {
            dots.splice(i, 1);
            i--;
          }
        }
      }
      
      animate();
    };
    
    // Initialize cursor trail effect
    createCursorTrail();

    // Add scroll spy functionality to highlight the current section in the navbar
    const addScrollSpy = () => {
      const sections = document.querySelectorAll('.section');
      const navLinks = document.querySelectorAll('.navbar-menu a');
      
      const options = {
        threshold: 0.4,
        rootMargin: '0px 0px -20% 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      }, options);
      
      sections.forEach(section => {
        observer.observe(section);
      });
    };
    
    addScrollSpy();

    // Modified Intersection Observer for scroll animations
    const observeElements = () => {
      const sections = document.querySelectorAll('.section');
      const header = document.querySelector('.header'); // Add header to observed elements
      const footer = document.querySelector('.footer');
      
      const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!entry.target.classList.contains('visible')) {
              entry.target.classList.add('visible');
            }
          }
        });
      }, options);
      
      // Observe header specifically
      if (header) observer.observe(header);
      
      sections.forEach(section => {
        observer.observe(section);
      });
      
      if (footer) observer.observe(footer);
    };
    
    observeElements();

    // Add this code to update active nav items
    const updateActiveNavItem = () => {
      const scrollPosition = window.scrollY + 100; // Offset to account for navbar height
      
      document.querySelectorAll('.section, .header').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${sectionId}`) {
              item.classList.add('active');
            }
          });
        }
      });
    };
    
    window.addEventListener('scroll', updateActiveNavItem);
    window.addEventListener('load', updateActiveNavItem);

    // Card tilt effect on hover
    const addTiltEffect = () => {
      const cards = document.querySelectorAll('.about-card, .project-card, .focus-card, .education-card');
      
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const angleX = (y - centerY) / 20;
          const angleY = (centerX - x) / 20;
          
          card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    };
    
    addTiltEffect();

    // Add ripple effect to buttons
    const addRippleEffect = () => {
      const buttons = document.querySelectorAll('.primary-button, .secondary-button, .project-button, .submit-button, .reset-button');
      
      buttons.forEach(button => {
        button.addEventListener('click', function(e) {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const ripple = document.createElement('span');
          ripple.classList.add('ripple');
          ripple.style.top = `${y}px`;
          ripple.style.left = `${x}px`;
          
          button.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });
    };
    
    addRippleEffect();

    // Handle back-to-top visibility on scroll
    const handleScroll = () => {
      const backToTop = document.getElementById('back-to-top');
      
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };

    // Debounce function to optimize scroll event handling
    const debounce = (func, wait = 100) => {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    window.addEventListener('scroll', debounce(handleScroll, 50));
    handleScroll();

    // Back to top button functionality
    document.getElementById('back-to-top').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Contact form message character counter
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    
    if (messageField && charCount) {
      // Update character count on input
      messageField.addEventListener('input', () => {
        const count = messageField.value.length;
        charCount.textContent = count;
        
        // Change color if approaching limit
        if (count > 400) {
          charCount.style.color = '#ff9800';
        } else if (count > 450) {
          charCount.style.color = '#f44336';
        } else {
          charCount.style.color = '#777';
        }
      });
    }

    // Contact form submission handling
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
      
      // Initially disable the submit button
      submitButton.disabled = true;

      // Function to check if all required fields are filled
      const checkFormValidity = () => {
        let isValid = true;
        inputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
          }
          if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
            isValid = false;
          }
        });
        return isValid;
      };
      
      // Check form validity on input and toggle button state
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          if (checkFormValidity()) {
            submitButton.disabled = false; // Enable the button
            submitButton.classList.add('form-ready');
          } else {
            submitButton.disabled = true; // Disable the button
            submitButton.classList.remove('form-ready');
          }
        });
      });
      
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        contactForm.classList.add('validation-attempted');
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate inputs
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
        
        if (!subject) {
          formMessage.textContent = 'Subject is required.';
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
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        try {
          // Simulate form submission with a delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
          formMessage.className = 'form-message success';
          
          // Add slide animation to success message
          formMessage.style.animation = 'slideUp 0.5s ease-in-out';
          contactForm.reset();
          contactForm.classList.remove('validation-attempted');
          submitButton.classList.remove('form-ready');
          
          // Reset character count
          if (charCount) {
            charCount.textContent = '0';
            charCount.style.color = '#777';
          }
        } catch (error) {
          formMessage.textContent = 'There was an error sending your message. Please try again later.';
          formMessage.className = 'form-message error';
          console.error('Form submission error:', error);
        } finally {
          // Restore button state
          submitButton.disabled = false;
          submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
      });
      
      // Reset form message when resetting the form
      const resetButton = contactForm.querySelector('button[type="reset"]');
      if (resetButton) {
        resetButton.addEventListener('click', () => {
          formMessage.textContent = '';
          formMessage.className = 'form-message';
          contactForm.classList.remove('validation-attempted');
          submitButton.classList.remove('form-ready');
          
          // Reset character count
          if (charCount) {
            charCount.textContent = '0';
            charCount.style.color = '#777';
          }
        });
      }
    }
  }, 100);

  // Enhanced button hover effects
  const enhanceButtonHoverEffects = () => {
    const buttons = document.querySelectorAll('.primary-button, .secondary-button, .project-button');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        // Add animate.css classes for hover effect
        button.classList.add('animate__animated', 'animate__pulse');
      });
      
      button.addEventListener('mouseleave', () => {
        // Remove animation classes when mouse leaves
        setTimeout(() => {
          button.classList.remove('animate__animated', 'animate__pulse');
        }, 500);
      });
    });
  };
  
  // Add skill icon animations
  const animateSkillIcons = () => {
    const skillItems = document.querySelectorAll('.skill-item i');
    
    skillItems.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        icon.classList.add('animate__animated', 'animate__rubberBand');
      });
      
      icon.addEventListener('mouseleave', () => {
        setTimeout(() => {
          icon.classList.remove('animate__animated', 'animate__rubberBand');
        }, 1000);
      });
    });
  };
  
  // Add smooth page transitions
  const addPageTransitions = () => {
    const mainContent = document.querySelector('main') || document.body;
    
    // Add transition class to main content
    mainContent.classList.add('page-transition');
    
    // Add transition effect when navigating between sections
    document.querySelectorAll('a[href*="#"]').forEach(link => {
      link.addEventListener('click', function() {
        mainContent.classList.add('page-exit');
        
        setTimeout(() => {
          mainContent.classList.remove('page-exit');
          mainContent.classList.add('page-enter');
          
          setTimeout(() => {
            mainContent.classList.remove('page-enter');
          }, 500);
        }, 300);
      });
    });
  };
  
  // Update dark mode toggle with icon
  const updateDarkModeToggle = () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
      const currentTheme = document.body.getAttribute('data-theme') || 'light';
      
      // Set initial icon based on current theme
      darkModeToggle.innerHTML = currentTheme === 'dark' 
        ? '<i class="fas fa-sun"></i> Light Mode' 
        : '<i class="fas fa-moon"></i> Dark Mode';
        
      // Add animation class
      darkModeToggle.classList.add('animate__animated');
    }
  };
  
  // Initialize enhanced UI features
  setTimeout(() => {
    enhanceButtonHoverEffects();
    animateSkillIcons();
    addPageTransitions();
    updateDarkModeToggle();
    
  }, 100);

  // Fixed Navbar visibility issue - move this section from the top to ensure it runs after other code
  setTimeout(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.cssText = 'display: block !important; opacity: 1 !important; visibility: visible !important;';
      
      // Make sure menu items are also visible
      const navbarMenu = document.querySelector('.navbar-menu');
      if (navbarMenu) {
        navbarMenu.style.cssText = 'visibility: visible !important; opacity: 1 !important;';
      }
    }
  }, 100);
});