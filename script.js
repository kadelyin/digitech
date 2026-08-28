// loading animations
window.addEventListener("load", async () => {
  const timeline = [
    { id: "openingAnimation", delay: 0 },
    { id: "banner", delay: 200 },
    { id: "navButton", delay: 200 },
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
  }
});

// navigation menu + bibliography
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

  renderBibliography();
});

// bibliography
const bibliography = [
  {
    title: "1",
    year: 2026,
    desc: "desc",
    img: "../photos/Screenshot 2026-07-31 144338.png",
  },
  {
    title: "2",
    year: 2026,
    desc: "desc",
    img: "../photos/Screenshot 2026-07-31 144407.png",
  },
  {
    title: "3",
    year: 2026,
    desc: "desc",
    img: "../photos/Screenshot 2026-07-31 144426.png",
  },
  {
    title: "4",
    year: 2026,
    desc: "desc",
    img: "../photos/Screenshot 2026-07-31 144433.png",
  },
  {
    title: "5",
    year: 2026,
    desc: "desc",
    img: "../photos/Screenshot 2026-07-31 144444.png",
  },
];

function createBiblioItem(item) {
  return `
    <div class="biblio-item">
      <img src="${item.img}" alt="${item.title}">
      <h3>${item.title} (${item.year})</h3>
      <p>${item.desc}</p>
    </div>
  `;
}

function renderBibliography() {
  const container = document.querySelector(".biblio-grid");
  container.innerHTML = bibliography
    .map((item, index) => {
      return `
        <div class="biblio-item" style="animation-delay: ${index * 0.15}s">
          <img src="${item.img}" alt="${item.title}">
          <h3>${item.title} (${item.year})</h3>
          <p>${item.desc}</p>
        </div>
      `;
    })
    .join("");
}
