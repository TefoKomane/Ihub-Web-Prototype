// ============================================================
// 1. SCROLL REVEAL ANIMATION
// ============================================================
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

reveals.forEach((element) => {
  observer.observe(element);
});

// ============================================================
// 2. CONTACT FORM VALIDATION
// ============================================================
function initFormValidation() {
  const forms = document.querySelectorAll("form[data-validate]");
  
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateForm(form)) {
        showFormSuccess(form);
        form.reset();
      }
    });

    // Real-time validation on input
    form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("change", () => validateField(field));
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  const errorClass = "field-error";
  let isValid = true;

  // Remove previous error state
  field.classList.remove(errorClass);

  // Validate based on field type
  if (!value) {
    isValid = false;
  } else if (type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  } else if (type === "tel") {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    isValid = phoneRegex.test(value) && value.length >= 10;
  } else if (field.name === "message" && value.length < 10) {
    isValid = false;
  }

  if (!isValid) {
    field.classList.add(errorClass);
  }

  return isValid;
}

function validateForm(form) {
  const fields = form.querySelectorAll("input[required], textarea[required]");
  let isFormValid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      isFormValid = false;
    }
  });

  return isFormValid;
}

function showFormSuccess(form) {
  const successMsg = form.querySelector(".form-success-message");
  if (successMsg) {
    successMsg.classList.add("show");
    setTimeout(() => {
      successMsg.classList.remove("show");
    }, 4000);
  }
}

// ============================================================
// 3. IMAGE CAROUSEL/SLIDER
// ============================================================
function initCarousel() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll(".slide");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    let currentIndex = 0;

    if (slides.length === 0) return;

    // Show first slide
    slides[0].classList.add("active");

    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      slides[index].classList.add("active");
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }

    // Add click listeners
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    // Keyboard navigation for carousel
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    });

    // Auto-advance carousel every 6 seconds
    setInterval(nextSlide, 6000);
  });
}

// ============================================================
// 4. MODAL/POPUP FUNCTIONALITY
// ============================================================
function initModals() {
  // Modal triggers
  document.querySelectorAll("[data-modal-open]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute("data-modal-open");
      openModal(modalId);
    });
  });

  // Modal close buttons
  document.querySelectorAll("[data-modal-close]").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      const modal = closeBtn.closest(".modal");
      if (modal) closeModal(modal.id);
    });
  });

  // Close modal when clicking outside
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });

    // Close on Escape key
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal(modal.id);
      }
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("is-open");
    modal.focus();
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("is-open");
    document.body.style.overflow = "auto";
  }
}

// ============================================================
// 5. KEYBOARD NAVIGATION ENHANCEMENTS
// ============================================================
function initKeyboardNav() {
  // Close mobile menu on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const navCheck = document.getElementById("navCheck");
      if (navCheck) navCheck.checked = false;
    }
  });

  // Keyboard shortcuts for page navigation
  const shortcuts = {
    h: "#top", // Home
    p: "#programme", // Programme
    j: "#journey", // Journey
    a: "#alumni", // Alumni
    i: "#involved", // Involved
    c: "#contact", // Contact
  };

  document.addEventListener("keydown", (e) => {
    // Only trigger if user is not typing in a form
    if (
      e.target.tagName === "INPUT" ||
      e.target.tagName === "TEXTAREA"
    )
      return;

    if (e.key.toLowerCase() in shortcuts && !e.ctrlKey && !e.metaKey) {
      const target = document.querySelector(shortcuts[e.key.toLowerCase()]);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
}

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  initFormValidation();
  initCarousel();
  initModals();
  initKeyboardNav();
});