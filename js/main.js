// Elite Insurance - Main JavaScript Functionality

(function () {
  "use strict";

  // =============================================
  // Global Variables
  // =============================================
  let isScrolling = false;
  let currentSection = "home";
  let mobileMenuOpen = false;

  // =============================================
  // DOM Content Loaded Event
  // =============================================
  document.addEventListener("DOMContentLoaded", function () {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeMobileMenu();
    initializeScrollToTop();
    initializeParallax();
    // initializeLazyLoading();
    initializeTypingEffect();
    initializeCounters();
    initializeTilt();
  });
  // =============================================
  // Navigation Functions
  // =============================================
  function initializeNavigation() {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    // Smooth scrolling for navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        // Check if it's an internal anchor link
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            smoothScrollTo(targetElement, 80); // Account for navbar height

            // Update active state
            updateActiveNavLink(targetId);

            // Close mobile menu if open
            if (mobileMenuOpen) {
              toggleMobileMenu();
            }
          }
        }
      });
    });

    // Navbar scroll effect
    let lastScrollY = window.pageYOffset;

    window.addEventListener(
      "scroll",
      throttle(() => {
        const currentScrollY = window.pageYOffset;

        if (currentScrollY > 100) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          navbar.style.transform = "translateY(-100%)";
        } else {
          navbar.style.transform = "translateY(0)";
        }

        lastScrollY = currentScrollY;

        // Update active navigation based on scroll position
        updateNavigationOnScroll();
      }, 100)
    );
  }

  //   function updateActiveNavLink(activeId) {
  //     const navLinks = document.querySelectorAll(".nav-link");

  //     navLinks.forEach((link) => {
  //       link.classList.remove("active");

  //       const href = link.getAttribute("href");
  //       if (
  //         href === `#${activeId}` ||
  //         (activeId === "home" && href === "#home")
  //       ) {
  //         link.classList.add("active");
  //       }
  //     });
  //   }

  function updateNavigationOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        if (currentSection !== sectionId) {
          currentSection = sectionId;
          updateActiveNavLink(sectionId);
        }
      }
    });
  }

  // =============================================
  // Mobile Menu Functions
  // =============================================
  function initializeMobileMenu() {
    const mobileToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener("click", toggleMobileMenu);

      // Close menu when clicking outside
      document.addEventListener("click", function (e) {
        if (
          mobileMenuOpen &&
          !navMenu.contains(e.target) &&
          !mobileToggle.contains(e.target)
        ) {
          toggleMobileMenu();
        }
      });
    }
  }

  function toggleMobileMenu() {
    const navMenu = document.querySelector(".nav-menu");
    const mobileToggle = document.querySelector(".nav-toggle");

    mobileMenuOpen = !mobileMenuOpen;

    if (mobileMenuOpen) {
      navMenu.style.display = "flex";
      navMenu.style.flexDirection = "column";
      navMenu.style.position = "absolute";
      navMenu.style.top = "100%";
      navMenu.style.left = "0";
      navMenu.style.right = "0";
      navMenu.style.background =
        "linear-gradient(135deg, var(--white) 0%, var(--gray-200) 100%";
      navMenu.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      navMenu.style.padding = "1rem";
      navMenu.style.zIndex = "1000";

      mobileToggle.classList.add("active");
      animateMenuIcon(true);
    } else {
      navMenu.style.display = "";
      navMenu.style.flexDirection = "";
      navMenu.style.position = "";
      navMenu.style.top = "";
      navMenu.style.left = "";
      navMenu.style.right = "";
      navMenu.style.background = "";
      navMenu.style.boxShadow = "";
      navMenu.style.padding = "";

      mobileToggle.classList.remove("active");
      animateMenuIcon(false);
    }
  }

  function animateMenuIcon(isOpen) {
    const spans = document.querySelectorAll(".nav-toggle span");

    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  }

  // =============================================
  // Scroll Effects
  // =============================================
  function initializeScrollEffects() {
    const scrollElements = document.querySelectorAll(
      ".scroll-reveal, [data-aos]"
    );

    if (scrollElements.length === 0) return;

    const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    };

    const elementOutOfView = (el) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop >
        (window.innerHeight || document.documentElement.clientHeight)
      );
    };

    const displayScrollElement = (element) => {
      element.classList.add("revealed");
    };

    const hideScrollElement = (element) => {
      element.classList.remove("revealed");
    };

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        } else if (elementOutOfView(el)) {
          hideScrollElement(el);
        }
      });
    };

    window.addEventListener("scroll", throttle(handleScrollAnimation, 100));

    // Initial check
    handleScrollAnimation();
  }

  // =============================================
  // Animation Functions
  // =============================================
  function initializeAnimations() {
    // Initialize staggered animations
    const animatedElements = document.querySelectorAll(
      ".animate-fade-up, .animate-scale"
    );

    animatedElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.1}s`;
    });

    // Initialize floating elements animation
    initializeFloatingElements();

    // Initialize card hover effects
    initializeCardEffects();
  }

  function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll(".float-element");

    floatingElements.forEach((element, index) => {
      const randomDelay = Math.random() * 2;
      const randomDuration = 4 + Math.random() * 4;

      element.style.animationDelay = `${randomDelay}s`;
      element.style.animationDuration = `${randomDuration}s`;
    });
  }

  function initializeCardEffects() {
    const cards = document.querySelectorAll(
      ".agent-card, .feature-card, .service-card"
    );

    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
        this.style.transition = "all 0.3s ease";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "";
      });
    });
  }

  // =============================================
  // Timeline Animation
  // =============================================
  //   function initializeTimeline() {
  //     const timelineItems = document.querySelectorAll(".timeline-item");

  //     const animateTimelineItem = (item, index) => {
  //       setTimeout(() => {
  //         item.classList.add("animate-fade-up");
  //         item.style.opacity = "1";
  //       }, index * 200);
  //     };

  //     const timelineObserver = new IntersectionObserver(
  //       (entries) => {
  //         entries.forEach((entry) => {
  //           if (entry.isIntersecting) {
  //             const items = entry.target.querySelectorAll(".timeline-item");
  //             items.forEach((item, index) => {
  //               animateTimelineItem(item, index);
  //             });
  //             timelineObserver.unobserve(entry.target);
  //           }
  //         });
  //       },
  //       { threshold: 0.2 }
  //     );

  //     const timeline = document.querySelector(".timeline");
  //     if (timeline) {
  //       timelineObserver.observe(timeline);
  //     }
  //   }

  // =============================================
  // Typing Effect
  // =============================================
  function initializeTypingEffect() {
    const typingElements = document.querySelectorAll(".typing-effect");

    typingElements.forEach((element) => {
      const text = element.textContent;
      const speed = element.dataset.speed || 50;

      element.textContent = "";
      element.style.borderRight = "2px solid #2563eb";

      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, parseInt(speed));
        } else {
          // Blinking cursor effect
          setInterval(() => {
            element.style.borderRightColor =
              element.style.borderRightColor === "transparent"
                ? "#2563eb"
                : "transparent";
          }, 750);
        }
      };

      // Start typing when element comes into view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            typeWriter();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(element);
    });
  }

  // =============================================
  // Counter Animation
  // =============================================
  function initializeCounters() {
    const counters = document.querySelectorAll(".stat-number");

    const animateCounter = (counter) => {
      const target = parseInt(counter.textContent.replace(/[^\d]/g, ""));
      const increment = target / 100;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = counter.textContent.replace(/\d+/, target);
          clearInterval(timer);
        } else {
          counter.textContent = counter.textContent.replace(
            /\d+/,
            Math.ceil(current)
          );
        }
      }, 20);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.7 }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  // =============================================
  // Tilt Effect
  // =============================================
  function initializeTilt() {
    const tiltElements = document.querySelectorAll(
      ".card-tilt, .profile-image-3d"
    );

    tiltElements.forEach((element) => {
      element.addEventListener("mousemove", handleTilt);
      element.addEventListener("mouseleave", resetTilt);
    });
  }

  function handleTilt(e) {
    if (window.innerWidth <= 768) return; // Disable on mobile

    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  }

  function resetTilt(e) {
    const element = e.currentTarget;
    element.style.transform = "";
  }

  // =============================================
  // Parallax Effect
  // =============================================
  function initializeParallax() {
    const parallaxElements = document.querySelectorAll(".parallax");

    if (parallaxElements.length === 0) return;

    window.addEventListener(
      "scroll",
      throttle(() => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach((element) => {
          const rate = scrolled * -0.5;
          element.style.transform = `translateY(${rate}px)`;
        });
      }, 16)
    );
  }

  // =============================================
  // Lazy Loading
  // =============================================
  //   function initializeLazyLoading() {
  //     const images = document.querySelectorAll('img[loading="lazy"]');

  //     if ("IntersectionObserver" in window) {
  //       const imageObserver = new IntersectionObserver((entries) => {
  //         entries.forEach((entry) => {
  //           if (entry.isIntersecting) {
  //             const img = entry.target;
  //             img.src = img.dataset.src || img.src;
  //             img.classList.remove("lazy");
  //             imageObserver.unobserve(img);
  //           }
  //         });
  //       });

  //       images.forEach((img) => {
  //         imageObserver.observe(img);
  //       });
  //     }
  //   }

  // =============================================
  // Scroll to Top
  // =============================================
  function initializeScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = "scroll-top-btn";
    scrollTopBtn.setAttribute("aria-label", "Scroll to top");

    // Add styles
    scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 50%, var(--primary-dark));
            color: var(--gray-50);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            transition: all 0.3s ease;
        `;

    document.body.appendChild(scrollTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener(
      "scroll",
      throttle(() => {
        if (window.pageYOffset > 300) {
          scrollTopBtn.style.display = "flex";
        } else {
          scrollTopBtn.style.display = "none";
        }
      }, 100)
    );

    // Scroll to top functionality
    scrollTopBtn.addEventListener("click", () => {
      smoothScrollTo(document.body, 0);
    });

    // Hover effects
    scrollTopBtn.addEventListener("mouseenter", () => {
      scrollTopBtn.style.transform = "translateY(-3px) scale(1.1)";
      scrollTopBtn.style.boxShadow = "0 6px 20px rgba(37, 99, 235, 0.4)";
    });

    scrollTopBtn.addEventListener("mouseleave", () => {
      scrollTopBtn.style.transform = "";
      scrollTopBtn.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
    });
  }

  // =============================================
  // Utility Functions
  // =============================================
  function smoothScrollTo(element, offset = 0) {
    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = Math.min(Math.abs(distance) / 2, 1000); // Max 1 second
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  function throttle(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // =============================================
  // Performance Monitoring
  // =============================================
  function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0];
        console.log(
          "Page Load Time:",
          perfData.loadEventEnd - perfData.loadEventStart,
          "ms"
        );
      }, 0);
    });

    // Monitor scroll performance
    let scrollCount = 0;
    window.addEventListener("scroll", () => {
      scrollCount++;
      if (scrollCount % 100 === 0) {
        console.log("Scroll events processed:", scrollCount);
      }
    });
  }

  // =============================================
  // Accessibility Enhancements
  // =============================================
  function initializeAccessibility() {
    // Skip to content link
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.textContent = "Skip to main content";
    skipLink.className = "sr-only";
    skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #2563eb;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
        `;

    skipLink.addEventListener("focus", () => {
      skipLink.style.top = "6px";
    });

    skipLink.addEventListener("blur", () => {
      skipLink.style.top = "-40px";
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Enhanced keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (mobileMenuOpen) {
          toggleMobileMenu();
        }
      }
    });

    // Focus management for modal/menu states
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && mobileMenuOpen) {
        const navMenu = document.querySelector(".nav-menu");
        const focusable = navMenu.querySelectorAll(focusableElements);
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  // Initialize accessibility features
  initializeAccessibility();

  // Initialize performance monitoring in development
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    initializePerformanceMonitoring();
  }

  // =============================================
  // Error Handling
  // =============================================
  window.addEventListener("error", (e) => {
    console.error("JavaScript Error:", e.error);
    // Could implement error reporting here
  });

  // =============================================
  // Resize Handler
  // =============================================
  window.addEventListener(
    "resize",
    debounce(() => {
      // Close mobile menu on resize to desktop
      if (window.innerWidth > 768 && mobileMenuOpen) {
        toggleMobileMenu();
      }

      // Recalculate animations and effects
      initializeScrollEffects();
    }, 250)
  );

  // =============================================
  // Export functions for global access
  // =============================================
  window.EliteInsurance = {
    smoothScrollTo,
    throttle,
    debounce,
  };
})();
