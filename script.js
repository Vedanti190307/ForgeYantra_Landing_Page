/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
const STORAGE_KEY = 'forgeyantra_theme';

function getStoredTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (e) {}

  return 'dark';
}

function applyTheme(theme) {
  const targetTheme = (theme === 'light') ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', targetTheme);
  document.documentElement.classList.remove('dark-mode', 'light-mode');
  document.documentElement.classList.add(targetTheme + '-mode');

  if (document.body) {
    document.body.setAttribute('data-theme', targetTheme);
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(targetTheme + '-mode');
  }

  try {
    localStorage.setItem(STORAGE_KEY, targetTheme);
  } catch (e) {}

  const label = `Switch to ${targetTheme === 'dark' ? 'light' : 'dark'} mode`;
  const buttons = document.querySelectorAll('.btn-theme-toggle');
  buttons.forEach((btn) => {
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

// Expose globally for inline onclick support
window.toggleTheme = toggleTheme;
window.applyTheme = applyTheme;

// Apply initial theme immediately
applyTheme(getStoredTheme());

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Mark document as JS ready
  document.documentElement.classList.add('js-ready');

  // Re-sync theme buttons once DOM is fully ready
  applyTheme(getStoredTheme());

  const themeButtons = document.querySelectorAll('.btn-theme-toggle');
  themeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });
  });

  // Listen to OS theme changes if user has no saved manual preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      } catch (err) {}
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
    document.body.style.overflow = 'hidden';
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

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

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
    const scrollY = window.scrollY + 140;

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
  updateActiveNavLink();

  /* ==========================================================================
     4. Resilient Scroll Reveal Animations
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-item');

  // Immediately reveal all Hero elements so they are 100% visible on first paint
  document.querySelectorAll('#home .reveal-item').forEach((el) => {
    el.classList.add('revealed');
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.05,
        rootMargin: '0px 0px 40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Immediate fallback
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // Safety timer to guarantee all elements become visible regardless of browser behavior
  setTimeout(() => {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }, 1000);

  /* ==========================================================================
     5. Internship Roles Category Filtering
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const roleCards = document.querySelectorAll('.role-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
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
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ==========================================================================
     6. "Apply for this Role" Direct Pre-Selection & Smooth Scroll
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
        validateField(roleSelectInput);
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const fullNameInput = document.getElementById('fullName');
          if (fullNameInput) fullNameInput.focus();
        }, 500);
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

  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');
  const portfolioInput = document.getElementById('portfolio');

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
  const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

  function setError(inputElement, message) {
    if (!inputElement) return false;
    const group = inputElement.closest('.form-group');
    const errorSpan = group ? group.querySelector('.error-msg') : null;
    if (group) group.classList.add('has-error');
    if (errorSpan) errorSpan.textContent = message;
    return false;
  }

  function clearError(inputElement) {
    if (!inputElement) return true;
    const group = inputElement.closest('.form-group');
    const errorSpan = group ? group.querySelector('.error-msg') : null;
    if (group) group.classList.remove('has-error');
    if (errorSpan) errorSpan.textContent = '';
    return true;
  }

  function validateField(inputElement) {
    if (!inputElement) return true;
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
          return setError(inputElement, 'Please enter a valid phone number.');
        }
        return clearError(inputElement);

      case 'roleSelect':
        if (!value) return setError(inputElement, 'Please select an internship track.');
        return clearError(inputElement);

      case 'message':
        if (!value) return setError(inputElement, 'Please provide a brief cover note.');
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

  [fullNameInput, emailInput, phoneInput, roleSelectInput, messageInput, portfolioInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => validateField(input));
      input.addEventListener('blur', () => validateField(input));
      if (input.tagName === 'SELECT') {
        input.addEventListener('change', () => validateField(input));
      }
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(fullNameInput);
      const isEmailValid = validateField(emailInput);
      const isPhoneValid = validateField(phoneInput);
      const isRoleValid = validateField(roleSelectInput);
      const isMessageValid = validateField(messageInput);
      const isPortfolioValid = validateField(portfolioInput);

      const isFormValid = isNameValid && isEmailValid && isPhoneValid && isRoleValid && isMessageValid && isPortfolioValid;

      if (!isFormValid) {
        const firstErr = form.querySelector('.form-group.has-error input, .form-group.has-error select, .form-group.has-error textarea');
        if (firstErr) firstErr.focus();
        return;
      }

      const applicantName = fullNameInput.value.trim();
      const applicantRole = roleSelectInput.value;

      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }

        form.style.display = 'none';
        if (successCard) {
          if (successApplicantName) successApplicantName.textContent = applicantName;
          if (successApplicantRole) successApplicantRole.textContent = applicantRole;
          successCard.classList.add('active');
          successCard.setAttribute('aria-hidden', 'false');
          successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 1000);
    });
  }

  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      if (form) {
        form.reset();
        form.style.display = 'block';
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