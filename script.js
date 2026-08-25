/**
 * ForgeYantra - Modern Internship Platform
 * Vanilla JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================================
     1. THEME MANAGEMENT
  ========================================================= */

  const themeToggleBtn = document.getElementById("themeToggle");
  const STORAGE_KEY = "forgeyantra_theme";

  function getInitialTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      return "light";
    }

    return "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    if (themeToggleBtn) {
      const nextTheme = theme === "dark" ? "light" : "dark";

      themeToggleBtn.setAttribute(
        "aria-label",
        `Switch to ${nextTheme} mode`
      );

      themeToggleBtn.setAttribute(
        "title",
        `Switch to ${nextTheme} mode`
      );
    }
  }

  applyTheme(getInitialTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "dark";

      const nextTheme =
        currentTheme === "dark" ? "light" : "dark";

      applyTheme(nextTheme);
    });
  }

  /* =========================================================
     2. MOBILE NAVIGATION
  ========================================================= */

  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");

  const mobileNavLinks = document.querySelectorAll(
    ".mobile-nav-link, .mobile-cta"
  );

  function openMobileMenu() {
    if (!mobileDrawer || !hamburgerBtn) return;

    mobileDrawer.classList.add("open");
    mobileDrawer.setAttribute("aria-hidden", "false");

    hamburgerBtn.classList.add("active");
    hamburgerBtn.setAttribute("aria-expanded", "true");

    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    if (!mobileDrawer || !hamburgerBtn) return;

    mobileDrawer.classList.remove("open");
    mobileDrawer.setAttribute("aria-hidden", "true");

    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen =
        mobileDrawer &&
        mobileDrawer.classList.contains("open");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", closeMobileMenu);
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      mobileDrawer &&
      mobileDrawer.classList.contains("open")
    ) {
      closeMobileMenu();
    }
  });

  /* =========================================================
     3. ACTIVE NAVIGATION
  ========================================================= */

  const sections = document.querySelectorAll(
    "section[id], header[id]"
  );

  const navLinks = document.querySelectorAll(
    ".nav-desktop .nav-link"
  );

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");

          if (
            link.getAttribute("href") === `#${sectionId}`
          ) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener(
    "scroll",
    updateActiveNavLink,
    { passive: true }
  );

  updateActiveNavLink();

  /* =========================================================
     4. SCROLL REVEAL
  ========================================================= */

  const revealElements =
    document.querySelectorAll(".reveal-item");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("revealed");
    });
  }

  /* =========================================================
     5. INTERNSHIP ROLE FILTER
  ========================================================= */

  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const roleCards =
    document.querySelectorAll(".role-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      const filterValue =
        button.getAttribute("data-filter");

      roleCards.forEach((card) => {
        const category =
          card.getAttribute("data-category");

        if (
          filterValue === "all" ||
          category === filterValue
        ) {
          card.classList.remove("hide");

          card.style.opacity = "0";
          card.style.transform = "translateY(12px)";

          setTimeout(() => {
            card.style.transition =
              "opacity 0.4s ease, transform 0.4s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 30);
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  /* =========================================================
     6. APPLY FOR ROLE
  ========================================================= */

  const applyRoleTriggers =
    document.querySelectorAll(".apply-role-trigger");

  const roleSelectInput =
    document.getElementById("roleSelect");

  const contactSection =
    document.getElementById("contact");

  applyRoleTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();

      const roleName =
        trigger.getAttribute("data-role");

      if (roleSelectInput && roleName) {
        roleSelectInput.value = roleName;
        validateField(roleSelectInput);
      }

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth"
        });

        setTimeout(() => {
          const fullNameInput =
            document.getElementById("fullName");

          if (fullNameInput) {
            fullNameInput.focus();
          }
        }, 600);
      }
    });
  });

  /* =========================================================
     7. FORM VALIDATION
  ========================================================= */

  const form =
    document.getElementById("internshipForm");

  const submitBtn =
    document.getElementById("submitBtn");

  const successCard =
    document.getElementById("formSuccessMessage");

  const resetFormBtn =
    document.getElementById("resetFormBtn");

  const successApplicantName =
    document.getElementById("successApplicantName");

  const successApplicantRole =
    document.getElementById("successApplicantRole");

  const fullNameInput =
    document.getElementById("fullName");

  const emailInput =
    document.getElementById("email");

  const phoneInput =
    document.getElementById("phone");

  const messageInput =
    document.getElementById("message");

  const portfolioInput =
    document.getElementById("portfolio");

  const EMAIL_REGEX =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const PHONE_REGEX =
    /^[+]?[0-9]{7,15}$/;

  const URL_REGEX =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

  function setError(input, message) {
    if (!input) return false;

    const group =
      input.closest(".form-group");

    const errorMessage =
      group?.querySelector(".error-msg");

    if (group) {
      group.classList.add("has-error");
    }

    if (errorMessage) {
      errorMessage.textContent = message;
    }

    return false;
  }

  function clearError(input) {
    if (!input) return true;

    const group =
      input.closest(".form-group");

    const errorMessage =
      group?.querySelector(".error-msg");

    if (group) {
      group.classList.remove("has-error");
    }

    if (errorMessage) {
      errorMessage.textContent = "";
    }

    return true;
  }

  function validateField(input) {
    if (!input) return true;

    const value = input.value.trim();

    switch (input.id) {
      case "fullName":

        if (!value) {
          return setError(
            input,
            "Full name is required."
          );
        }

        if (value.length < 2) {
          return setError(
            input,
            "Please enter at least 2 characters."
          );
        }

        return clearError(input);

      case "email":

        if (!value) {
          return setError(
            input,
            "Email address is required."
          );
        }

        if (!EMAIL_REGEX.test(value)) {
          return setError(
            input,
            "Please enter a valid email address."
          );
        }

        return clearError(input);

      case "phone":

        if (!value) {
          return setError(
            input,
            "Phone number is required."
          );
        }

        if (
          !PHONE_REGEX.test(
            value.replace(/[\s()-]/g, "")
          )
        ) {
          return setError(
            input,
            "Please enter a valid phone number."
          );
        }

        return clearError(input);

      case "roleSelect":

        if (!value) {
          return setError(
            input,
            "Please select an internship track."
          );
        }

        return clearError(input);

      case "message":

        if (!value) {
          return setError(
            input,
            "Please provide a brief background or cover note."
          );
        }

        if (value.length < 10) {
          return setError(
            input,
            "Please write at least 10 characters."
          );
        }

        return clearError(input);

      case "portfolio":

        if (
          value &&
          !URL_REGEX.test(value)
        ) {
          return setError(
            input,
            "Please enter a valid URL."
          );
        }

        return clearError(input);

      default:
        return true;
    }
  }

  const formInputs = [
    fullNameInput,
    emailInput,
    phoneInput,
    roleSelectInput,
    messageInput,
    portfolioInput
  ];

  formInputs.forEach((input) => {
    if (!input) return;

    input.addEventListener("input", () => {
      validateField(input);
    });

    input.addEventListener("blur", () => {
      validateField(input);
    });

    if (input.tagName === "SELECT") {
      input.addEventListener("change", () => {
        validateField(input);
      });
    }
  });

  /* =========================================================
     8. FORM SUBMISSION
  ========================================================= */

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const isNameValid =
        validateField(fullNameInput);

      const isEmailValid =
        validateField(emailInput);

      const isPhoneValid =
        validateField(phoneInput);

      const isRoleValid =
        validateField(roleSelectInput);

      const isMessageValid =
        validateField(messageInput);

      const isPortfolioValid =
        validateField(portfolioInput);

      const isFormValid =
        isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isRoleValid &&
        isMessageValid &&
        isPortfolioValid;

      if (!isFormValid) {
        const firstError =
          form.querySelector(
            ".form-group.has-error input, " +
            ".form-group.has-error select, " +
            ".form-group.has-error textarea"
          );

        if (firstError) {
          firstError.focus();
        }

        return;
      }

      const applicantName =
        fullNameInput.value.trim();

      const applicantRole =
        roleSelectInput.value;

      if (submitBtn) {
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove("loading");
          submitBtn.disabled = false;
        }

        form.style.display = "none";

        if (successCard) {
          if (successApplicantName) {
            successApplicantName.textContent =
              applicantName;
          }

          if (successApplicantRole) {
            successApplicantRole.textContent =
              applicantRole;
          }

          successCard.classList.add("active");
          successCard.setAttribute(
            "aria-hidden",
            "false"
          );

          successCard.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
          });
        }
      }, 1200);
    });
  }

  /* =========================================================
     9. RESET FORM
  ========================================================= */

  if (resetFormBtn) {
    resetFormBtn.addEventListener("click", () => {
      if (form) {
        form.reset();
        form.style.display = "block";

        document
          .querySelectorAll(".form-group")
          .forEach((group) => {
            group.classList.remove("has-error");
          });

        document
          .querySelectorAll(".error-msg")
          .forEach((message) => {
            message.textContent = "";
          });
      }

      if (successCard) {
        successCard.classList.remove("active");

        successCard.setAttribute(
          "aria-hidden",
          "true"
        );
      }

      if (fullNameInput) {
        fullNameInput.focus();
      }
    });
  }

  /* =========================================================
     10. BACK TO TOP
  ========================================================= */

  const backToTopBtn =
    document.getElementById("backToTop");

  function toggleBackToTopButton() {
    if (!backToTopBtn) return;

    if (window.scrollY > 350) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }

  window.addEventListener(
    "scroll",
    toggleBackToTopButton,
    { passive: true }
  );

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* =========================================================
     END
  ========================================================= */
});