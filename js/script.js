/* ==================================
   MOBILE MENU
================================== */

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
}

/* ==================================
   SMOOTH SCROLL
================================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

/* ==================================
   SCROLL ANIMATIONS
================================== */

const animatedElements = document.querySelectorAll(
  ".timeline-card, .feature-card, .report-card, .location-card"
);

animatedElements.forEach((el) => {
  el.classList.add("fade-up");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },

  {
    threshold: 0.15
  }
);

animatedElements.forEach((el) => {
  observer.observe(el);
});

/* ==================================
   DONATION PROGRESS
================================== */

/*
    Змінюється лише це значення.
    Приклад:

    82500
*/
const collectedAmount = 328092;
const targetAmount = 200000;
const actualPercent = Math.round((collectedAmount / targetAmount) * 100);
const progressPercent = Math.min(actualPercent, 100);
const fernProgress = document.querySelector(".fern-progress");
const fernValue = document.querySelector(".fern-progress-value");
const charityAmount = document.querySelector(".charity-amount");
const charityTargetValue = document.querySelector(".charity-target-value");
const charityPercent = document.querySelector(".charity-percent");

function formatCurrency(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " грн";
}

if (fernProgress) {
  fernProgress.style.setProperty("--progress", `${progressPercent}%`);
}

if (fernValue) {
  fernValue.textContent = `${progressPercent}%`;
}

if (charityAmount) {
  charityAmount.textContent = formatCurrency(collectedAmount);
}

if (charityTargetValue) {
  charityTargetValue.textContent = formatCurrency(targetAmount);
}

if (charityPercent) {
  charityPercent.textContent = `${actualPercent}%`;
}

/* ==================================
   PROGRAM JSON
================================== */

async function loadProgram() {
  const container = document.getElementById("program-container");

  if (!container) return;

  try {
    const response = await fetch("program.json");
    const data = await response.json();

    container.innerHTML = "";

    data.forEach((day) => {
      const dayBlock = document.createElement("div");

      dayBlock.className = "program-day";

      let eventsHtml = "";

      day.events.forEach((event) => {
        eventsHtml += `
                    <div class="program-event">

                        <div class="program-time">
                            ${event.time}
                        </div>

                        <div>

                            <strong>
                                ${event.title}
                            </strong>

                            <br>

                            <span>
                                ${event.location}
                            </span>

                        </div>

                    </div>
                `;
      });

      dayBlock.innerHTML = `
                <h3>${day.day}</h3>
                ${eventsHtml}
            `;

      container.appendChild(dayBlock);
    });
  } catch (error) {
    console.error("Помилка завантаження програми", error);
  }
}

loadProgram();

/* ==================================
   HEADER BACKGROUND ON SCROLL
================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.background = "rgba(23,61,61,.95)";
  } else {
    header.style.background = "rgba(23,61,61,.85)";
  }
});

/* ==================================
   MOBILE GALLERY
================================== */
const galleryTrack = document.querySelector(".gallery-grid");
const slides = document.querySelectorAll(".gallery-grid img");
const prevBtn = document.querySelector(".gallery-prev");
const nextBtn = document.querySelector(".gallery-next");
const dotsContainer = document.querySelector(".gallery-dots");
let currentSlide = 0;
let scrollTimer;

function updateDots() {
  if (!dotsContainer) return;
  dotsContainer.querySelectorAll(".gallery-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function createDots() {
  if (!dotsContainer || !slides.length) return;

  dotsContainer.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "gallery-dot";
    dot.setAttribute("aria-label", `Фото ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  updateDots();
}

function getClosestSlideIndex() {
  if (!galleryTrack) return 0;

  const trackCenter =
    galleryTrack.getBoundingClientRect().left + galleryTrack.getBoundingClientRect().width / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;

  slides.forEach((slide, index) => {
    const slideCenter =
      slide.getBoundingClientRect().left + slide.getBoundingClientRect().width / 2;
    const distance = Math.abs(trackCenter - slideCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function setCurrentSlide(index) {
  currentSlide = index;
  updateDots();
}

function goToSlide(index) {
  if (!slides[index]) return;

  slides[index].scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest"
  });

  setCurrentSlide(index);
}

function handleGalleryScroll() {
  if (!galleryTrack) return;

  clearTimeout(scrollTimer);
  scrollTimer = window.setTimeout(() => {
    setCurrentSlide(getClosestSlideIndex());
  }, 120);
}

if (galleryTrack && slides.length) {
  createDots();
  galleryTrack.addEventListener("scroll", handleGalleryScroll);
}

if (galleryTrack && slides.length && prevBtn && nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  });
}
