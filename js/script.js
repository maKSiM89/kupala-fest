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
const collectedAmount = 0;
const targetAmount = 200000;
const progressPercent = Math.min(Math.round((collectedAmount / targetAmount) * 100), 100);
const fernProgress = document.querySelector(".fern-progress");
const fernValue = document.querySelector(".fern-progress-value");

if (fernProgress) {
  fernProgress.style.setProperty("--progress", `${progressPercent}%`);
}

if (fernValue) {
  fernValue.textContent = `${progressPercent}%`;
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
let currentSlide = 0;

function goToSlide(index) {
  if (!slides[index]) return;

  slides[index].scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest"
  });

  currentSlide = index;
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
