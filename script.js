/**
 * ForgeYantra - Modern Internship Platform Landing Page
 * Vanilla JavaScript Implementation
 * Features: Dark/Light Mode, Mobile Navigation, Scroll Reveal,
 * Domain Filtering, Role Auto-Select, Frontend Form Validation & UX.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Theme Management (Dark / Light Mode)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggle');
  const STORAGE_KEY = 'forgeyantra_theme';

  // Determine initial theme: localStorage -> prefers-color-scheme -> default 'dark'
  function getInitialTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  // Initialize theme on load
  const currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Listen for OS system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* ==========================================================================
     2. Mobile Navigation Drawer & Hamburger
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

  function openMobileMenu() {
    if (!mobileDrawer || !hamburgerBtn) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileMenu() {
    if (!mobileDrawer || !hamburgerBtn) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close drawer when clicking any link
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     3. Active Navigation Link Highlighting on Scroll
     ========================================================================== */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

  function updateActiveNavLink() {
    const scrollY = window.scrollY + 120; // Offset for header

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* ==========================================================================
     4. Scroll Reveal Animations (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Reveal once
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* ==========================================================================
     5. Internship Roles Category Filtering
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const roleCards = document.querySelectorAll('.role-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update button active state
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      roleCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hide');
          // Trigger a micro-fade animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ==========================================================================
     6. "Apply for this Role" Direct Pre-Selection
     ========================================================================== */
  const applyRoleTriggers = document.querySelectorAll('.apply-role-trigger');
  const roleSelectInput = document.getElementById('roleSelect');
  const contactSection = document.getElementById('contact');

  applyRoleTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const roleName = trigger.getAttribute('data-role');

      if (roleSelectInput && roleName) {
        roleSelectInput.value = roleName;
        // Trigger validation clear on the role field
        validateField(roleSelectInput);
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Focus name field after smooth scrolling
        setTimeout(() => {
          const fullNameInput = document.getElementById('fullName');
          if (fullNameInput) {
            fullNameInput.focus();
          }
        }, 600);
      }
    });
  });

  /* ==========================================================================
     7. Frontend Form Validation & Interactive Submission
     ========================================================================== */
  const form = document.getElementById('internshipForm');
  const submitBtn = document.getElementById('submitBtn');
  const successCard = document.getElementById('formSuccessMessage');
  const resetFormBtn = document.getElementById('resetFormBtn');
  const successApplicantName = document.getElementById('successApplicantName');
  const successApplicantRole = document.getElementById('successApplicantRole');

  // Input Elements
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');
  const portfolioInput = document.getElementById('portfolio');

  // Validation Rules
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
  const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

  function setError(inputElement, message) {
    const group = inputElement.closest('.form-group');
    const errorSpan = group ? group.querySelector('.error-msg') : null;
    if (group) group.classList.add('has-error');
    if (errorSpan) errorSpan.textContent = message;
    return false;
  }

  function clearError(inputElement) {
    const group = inputElement.closest('.form-group');
    const errorSpan = group ? group.querySelector('.error-msg') : null;
    if (group) group.classList.remove('has-error');
    if (errorSpan) errorSpan.textContent = '';
    return true;
  }

  function validateField(inputElement) {
    const value = inputElement.value.trim();

    switch (inputElement.id) {
      case 'fullName':
        if (!value) return setError(inputElement, 'Full name is required.');
        if (value.length < 2) return setError(inputElement, 'Please enter at least 2 characters.');
        return clearError(inputElement);

      case 'email':
        if (!value) return setError(inputElement, 'Email address is required.');
        if (!EMAIL_REGEX.test(value)) return setError(inputElement, 'Please enter a valid email address.');
        return clearError(inputElement);

      case 'phone':
        if (!value) return setError(inputElement, 'Phone number is required.');
        if (!PHONE_REGEX.test(value.replace(/\s+/g, ''))) {
          return setError(inputElement, 'Please enter a valid phone number (min 7 digits).');
        }
        return clearError(inputElement);

      case 'roleSelect':
        if (!value) return setError(inputElement, 'Please select an internship track.');
        return clearError(inputElement);

      case 'message':
        if (!value) return setError(inputElement, 'Please provide a brief background or cover note.');
        if (value.length < 10) return setError(inputElement, 'Please write at least 10 characters.');
        return clearError(inputElement);

      case 'portfolio':
        if (value && !URL_REGEX.test(value)) {
          return setError(inputElement, 'Please enter a valid URL (e.g. https://github.com/username).');
        }
        return clearError(inputElement);

      default:
        return true;
    }
  }

  // Real-time input listeners for instant feedback
  [fullNameInput, emailInput, phoneInput, roleSelectInput, messageInput, portfolioInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        // Clear error as user types
        validateField(input);
      });
      input.addEventListener('blur', () => {
        validateField(input);
      });
      if (input.tagName === 'SELECT') {
        input.addEventListener('change', () => validateField(input));
      }
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all required fields
      const isNameValid = validateField(fullNameInput);
      const isEmailValid = validateField(emailInput);
      const isPhoneValid = validateField(phoneInput);
      const isRoleValid = validateField(roleSelectInput);
      const isMessageValid = validateField(messageInput);
      const isPortfolioValid = validateField(portfolioInput);

      const isFormValid = isNameValid && isEmailValid && isPhoneValid && isRoleValid && isMessageValid && isPortfolioValid;

      if (!isFormValid) {
        // Focus first erroneous field
        const firstErrorField = form.querySelector('.form-group.has-error input, .form-group.has-error select, .form-group.has-error textarea');
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      // Collect applicant name and role for instant UI confirmation display
      const applicantName = fullNameInput.value.trim();
      const applicantRole = roleSelectInput.value;

      // Simulate UI submission with loading state (frontend-only, no data stored)
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        // Stop loading spinner
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }

        // Hide form and show success card
        form.style.display = 'none';
        if (successCard) {
          if (successApplicantName) successApplicantName.textContent = applicantName;
          if (successApplicantRole) successApplicantRole.textContent = applicantRole;
          successCard.classList.add('active');
          successCard.setAttribute('aria-hidden', 'false');
          successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 1200);
    });
  }

  // Handle Reset Form / Submit Another
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      if (form) {
        form.reset();
        form.style.display = 'block';
        // Clear any leftover error styling
        document.querySelectorAll('.form-group').forEach((grp) => grp.classList.remove('has-error'));
        document.querySelectorAll('.error-msg').forEach((msg) => (msg.textContent = ''));
      }
      if (successCard) {
        successCard.classList.remove('active');
        successCard.setAttribute('aria-hidden', 'true');
      }
      if (fullNameInput) fullNameInput.focus();
    });
  }

  /* ==========================================================================
     8. Back to Top Button
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTop');

  function toggleBackToTopButton() {
    if (!backToTopBtn) return;
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTopButton, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
