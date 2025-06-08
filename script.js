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

// Carousel navigation for Projects section
const projectCarousel = document.getElementById("projectCarousel");
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");

if (projectCarousel && carouselPrev && carouselNext) {
  // Get the width of a single project card (including margin)
  function getCardWidth() {
    const card = projectCarousel.querySelector(".project-card");
    if (!card) return 0;
    const style = window.getComputedStyle(card);
    const marginRight = parseInt(style.marginRight) || 0;
    const marginLeft = parseInt(style.marginLeft) || 0;
    return card.offsetWidth + marginLeft + marginRight;
  }

  carouselPrev.addEventListener("click", () => {
    const cardWidth = getCardWidth();
    projectCarousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });

  carouselNext.addEventListener("click", () => {
    const cardWidth = getCardWidth();
    projectCarousel.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  // Mouse drag/swipe support
  let isDown = false;
  let startX;
  let scrollLeft;

  projectCarousel.addEventListener('mousedown', (e) => {
    isDown = true;
    projectCarousel.classList.add('dragging');
    startX = e.pageX - projectCarousel.offsetLeft;
    scrollLeft = projectCarousel.scrollLeft;
  });
  projectCarousel.addEventListener('mouseleave', () => {
    isDown = false;
    projectCarousel.classList.remove('dragging');
  });
  projectCarousel.addEventListener('mouseup', () => {
    isDown = false;
    projectCarousel.classList.remove('dragging');
  });
  projectCarousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - projectCarousel.offsetLeft;
    const walk = (x - startX) * 1.2; // scroll-fast
    projectCarousel.scrollLeft = scrollLeft - walk;
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchScrollLeft = 0;
  projectCarousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = projectCarousel.scrollLeft;
  });
  projectCarousel.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - touchStartX) * 1.2;
    projectCarousel.scrollLeft = touchScrollLeft - walk;
  });
}

// Project Popup Modal logic for new projects
const projectPopupModal = document.getElementById("projectPopupModal");
const projectPopupContent = document.getElementById("projectPopupContent");
const closeProjectPopup = document.getElementById("closeProjectPopup");

const projectData = {
  wtei: {
    title: "William Tan Enterprises Incorporated Payroll System",
    img: "resources/DTC Cover.png",
    desc: `This comprehensive payroll management system was developed for William Tan Enterprises Incorporated to streamline their employee compensation processes. The system features a robust web-based interface built with modern web technologies including Java for enterprise-level backend processing, PHP for server-side scripting, and MySQL for secure data storage. The design focuses on usability and efficiency for HR and accounting staff.`
  },
  zenzense: {
    title: "Login page for Zenzense",
    img: "resources/Web Portfolio Cover.png",
    desc: `A secure login portal for Zenzense employees, supporting role-based access and user management. The project includes a custom database schema for storing user credentials and permissions, and a clean, modern UI for ease of use.`
  },
  graphics: {
    title: "Digital Graphics Designing",
    img: "resources/Gaid Gadgets Cover.png",
    desc: `A 3D graphics design project using Blender, focused on creating assets and environments for game development. This project enhanced my skills in modeling, texturing, and animation for interactive applications.`
  },
  android: {
    title: "Android Studio Development",
    img: "resources/Task manager Mobile app UI Cover.png",
    desc: `Intermediate-level Android application development using Android Studio. Main skills include UI design, activity lifecycle management, and integration of predefined tools and libraries for rapid prototyping.`
  }
};

function openProjectPopup(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;
  projectPopupContent.innerHTML = `
    <img src="${data.img}" alt="${data.title}" class="project-popup-img" />
    <h3>${data.title}</h3>
    <div class="project-popup-desc">${data.desc}</div>
  `;
  projectPopupModal.classList.remove("hidden");
  projectPopupModal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeProjectPopupModal() {
  projectPopupModal.classList.remove("flex");
  projectPopupModal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

// Attach event listeners to all triggers
function setupProjectPopupTriggers() {
  document.querySelectorAll('.project-popup-trigger').forEach(el => {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      const key = this.getAttribute('data-project');
      if (key) openProjectPopup(key);
    });
  });
}
setupProjectPopupTriggers();
if (closeProjectPopup) {
  closeProjectPopup.addEventListener('click', closeProjectPopupModal);
}
// Close modal on background click
if (projectPopupModal) {
  projectPopupModal.addEventListener('click', function(e) {
    if (e.target === projectPopupModal) closeProjectPopupModal();
  });
}