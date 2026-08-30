// loading animations + render after navButton starts
window.addEventListener("load", async () => {
  const timeline = [
    { id: "openingAnimation", delay: 0 },
    { id: "banner", delay: 400 },
    { id: "navButton", delay: 400 },
  ];

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let totalElapsed = 0;

  for (const step of timeline) {
    const element = document.getElementById(step.id);
    const timeToWait = step.delay - totalElapsed;

    if (timeToWait > 0) {
      await wait(timeToWait);
      totalElapsed = step.delay;
    }

    if (element) {
      element.style.animationPlayState = "running";
    }

    // start rendering bibliography right after we start the navButton animation
    if (step.id === "navButton") {
      // small extra delay so navButton entrance feels finished before items appear
      await wait(200);
      renderBibliography();
    }
  }
});

// navigation menu
document.addEventListener("DOMContentLoaded", () => {
  const navButton = document.getElementById("navButton");
  const navSection = document.getElementById("navSection");
  const openingAnimation = document.getElementById("openingAnimation");

  navButton.addEventListener("click", (event) => {
    navSection.classList.toggle("active");
    navButton.classList.toggle("active");
    openingAnimation.classList.toggle("active");
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (navSection.classList.contains("active")) {
      const clickedALink =
        event.target.tagName === "A" && navSection.contains(event.target);

      if (!clickedALink) {
        navSection.classList.remove("active");
        navButton.classList.remove("active");
        openingAnimation.classList.remove("active");
      }
    }
  });

  // Do NOT call renderBibliography() here — it's called after navButton animation in window.load
});

// bibliography data
const bibliography = [
  {
    title: "Lorem ipsum.",
    year: 2026,
    desc: "desc",
    img: "../photos/Screenshot 2026-07-31 144338.png",
  },
  {
    title: "Lorem ipsum.",
    year: 2026,
    desc: "desc",
    img: "../photos/Screenshot 2026-07-31 144407.png",
  },
  {
    title: "Lorem ipsum.",
    year: 2026,
    desc: "desc",
    img: "../photos/Screenshot 2026-07-31 144426.png",
  },
  {
    title: "Lorem ipsum.",
    year: 2026,
    desc: "desc",
    img: "../photos/Screenshot 2026-07-31 144433.png",
  },
  {
    title: "Lorem ipsum.",
    year: 2026,
    desc: "desc",
    img: "../photos/Screenshot 2026-07-31 144444.png",
  },
];

function createBiblioItem(item, index) {
  const delay = (index * 0.3).toFixed(2) + "s";
  return `
    <div class="biblio-item" style="animation-delay: ${delay};">
      <img src="${item.img}" alt="${item.title}">
      <h3>${item.title} (${item.year})</h3>
      <p>${item.desc}</p>
    </div>
  `;
}

function renderBibliography() {
  const container = document.querySelector(".biblio-grid");
  if (!container) return;

  // Insert items
  container.innerHTML = bibliography.map(createBiblioItem).join("");

  // Ensure animations run (in case any global rule paused them)
  const items = container.querySelectorAll(".biblio-item");
  items.forEach((el) => {
    el.style.animationPlayState = "running";
  });
}
