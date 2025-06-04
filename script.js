// Smooth scrolling for navigation links
const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 300,
  speedAsDuration: true
});

// Modal open/close logic for project modal and message modal
const projectModal = document.getElementById("projectModal");
const messageModal = document.getElementById("messageModal");
const modalCloseButtons = document.querySelectorAll(".modal-close");

document.querySelectorAll(".project-link").forEach(item => {
  item.addEventListener("click", event => {
    projectModal.classList.add("is-active");
  });
});

document.querySelectorAll(".message-link").forEach(item => {
  item.addEventListener("click", event => {
    messageModal.classList.add("is-active");
  });
});

modalCloseButtons.forEach(button => {
  button.addEventListener("click", event => {
    button.closest(".modal").classList.remove("is-active");
  });
});

// Contact form submission handler
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    contactForm.reset();
    if (messageModal) {
      messageModal.classList.remove("hidden");
      messageModal.classList.add("flex");
      // Optionally, focus the Close button for accessibility
      setTimeout(() => {
        const closeBtn = messageModal.querySelector("button");
        if (closeBtn) closeBtn.focus();
      }, 100);
    } else {
      alert("Message sent! I'll get back to you soon. Thank you for reaching out!");
    }
  });
}

function closeModal() {
  if (messageModal) {
    messageModal.classList.add("hidden");
    messageModal.classList.remove("flex");
  }
}

// Menu toggle for nav icons
const navMenu = document.getElementById("navMenu");
const navToggle = document.getElementById("navToggle");

navToggle.addEventListener("click", function() {
  navMenu.classList.toggle("is-active");
});