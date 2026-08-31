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

    if (step.id === "navButton") {
      await wait(200);
      renderBibliography();
    }
  }
});

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
});

let bibliography = [];

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

async function renderBibliography() {
  const container = document.querySelector(".biblio-grid");
  if (!container) return;

  try {
    const response = await fetch("../photos/");
    const htmlText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");

    const links = Array.from(doc.querySelectorAll("a"));
    const imageFiles = links
      .map((link) => link.getAttribute("href"))
      .filter((href) => href && href.match(/\.(png|jpe?g|gif|webp|svg)$/i));

    bibliography = imageFiles.map((href) => {
      const fileName = href.split("/").pop();
      const cleanTitle = decodeURIComponent(fileName).replace(/\.[^/.]+$/, "");

      return {
        title: cleanTitle,
        year: 2026,
        desc: "desc",
        img: `../photos/${fileName.trim()}`,
      };
    });

    container.innerHTML = bibliography.map(createBiblioItem).join("");

    const items = container.querySelectorAll(".biblio-item");
    items.forEach((el) => {
      el.style.animationPlayState = "running";
    });

    console.log(`Loaded ${bibliography.length} photos automatically!`);
  } catch (error) {
    console.error("Failed to automatically read the photos directory:", error);
    container.innerHTML = `<p>Error loading bibliography items.</p>`;
  }
}
