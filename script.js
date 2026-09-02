window.addEventListener("load", () => {
  const openingAnimation = document.getElementById("openingAnimation");
  const banner = document.getElementById("banner");
  const navButton = document.getElementById("navButton");
  const topAnimation = document.getElementById("topAnimation");

  if (openingAnimation) {
    openingAnimation.style.animationPlayState = "running";

    const page = document.body.dataset.page;

    // Only delete on pages that should remove it
    const shouldDelete = page === "bibliography";

    if (shouldDelete) {
      openingAnimation.addEventListener("animationend", () => {
        openingAnimation.remove();
      });
    }
  }

  if (topAnimation) {
    topAnimation.style.animationPlayState = "running"; // fixed + synced
  }

  // Banner + nav button fade in slightly later
  setTimeout(() => {
    if (banner) banner.style.animationPlayState = "running";
    if (navButton) navButton.style.animationPlayState = "running";
  }, 400);

  // Load bibliography
  setTimeout(() => {
    renderBibliography();
  }, 600);

  const navSection = document.getElementById("navSection");

  if (navButton && navSection && openingAnimation) {
    navButton.addEventListener("click", (event) => {
      navSection.classList.toggle("active");
      navButton.classList.toggle("active");

      if (openingAnimation && document.body.contains(openingAnimation)) {
        openingAnimation.classList.toggle("active");
      }

      event.stopPropagation();
    });
  }

  document.addEventListener("click", (event) => {
    if (navSection && navSection.classList.contains("active")) {
      const clickedALink =
        event.target.tagName === "A" && navSection.contains(event.target);

      if (!clickedALink) {
        navSection.classList.remove("active");
        navButton.classList.remove("active");

        if (openingAnimation && document.body.contains(openingAnimation)) {
          openingAnimation.classList.remove("active");
        }
      }
    }
  });
});

// list of your photo items
const bibliography = [
  {
    title: "Photo 1",
    year: 2026,
    desc: "Description 1",
    img: "../photos/photo1.png",
  },
  {
    title: "Photo 2",
    year: 2026,
    desc: "Description 2",
    img: "../photos/photo2.png",
  },
  {
    title: "Photo 3",
    year: 2026,
    desc: "Description 3",
    img: "../photos/photo3.png",
  },
  {
    title: "Photo 4",
    year: 2026,
    desc: "Description 4",
    img: "../photos/photo4.png",
  },
  {
    title: "Photo 5",
    year: 2026,
    desc: "Description 5",
    img: "../photos/photo5.png",
  },
  {
    title: "Photo 6",
    year: 2026,
    desc: "Description 6",
    img: "../photos/photo6.png",
  },
  {
    title: "Photo 7",
    year: 2026,
    desc: "Description 7",
    img: "../photos/photo7.png",
  },
  {
    title: "Photo 8",
    year: 2026,
    desc: "Description 8",
    img: "../photos/photo8.png",
  },
  {
    title: "Photo 9",
    year: 2026,
    desc: "Description 9",
    img: "../photos/photo9.png",
  },
  {
    title: "Photo 10",
    year: 2026,
    desc: "Description 10",
    img: "../photos/photo10.png",
  },
  {
    title: "Photo 11",
    year: 2026,
    desc: "Description 11",
    img: "../photos/photo11.png",
  },
  {
    title: "Photo 12",
    year: 2026,
    desc: "Description 12",
    img: "../photos/photo12.png",
  },
  {
    title: "Photo 13",
    year: 2026,
    desc: "Description 13",
    img: "../photos/photo13.png",
  },
  {
    title: "Photo 14",
    year: 2026,
    desc: "Description 14",
    img: "../photos/photo14.png",
  },
  {
    title: "Photo 15",
    year: 2026,
    desc: "Description 15",
    img: "../photos/photo15.png",
  },
  {
    title: "Photo 16",
    year: 2026,
    desc: "Description 16",
    img: "../photos/photo16.png",
  },
  {
    title: "Photo 17",
    year: 2026,
    desc: "Description 17",
    img: "../photos/photo17.png",
  },
  {
    title: "Photo 18",
    year: 2026,
    desc: "Description 18",
    img: "../photos/photo18.png",
  },
  {
    title: "Photo 19",
    year: 2026,
    desc: "Description 19",
    img: "../photos/photo19.png",
  },
  {
    title: "Photo 20",
    year: 2026,
    desc: "Description 20",
    img: "../photos/photo20.png",
  },
  {
    title: "Photo 21",
    year: 2026,
    desc: "Description 21",
    img: "../photos/photo21.png",
  },
  {
    title: "Photo 22",
    year: 2026,
    desc: "Description 22",
    img: "../photos/photo22.png",
  },
  {
    title: "Photo 23",
    year: 2026,
    desc: "Description 23",
    img: "../photos/photo23.png",
  },
  {
    title: "Photo 24",
    year: 2026,
    desc: "Description 24",
    img: "../photos/photo24.png",
  },
  {
    title: "Photo 25",
    year: 2026,
    desc: "Description 25",
    img: "../photos/photo25.png",
  },
];

// puts the photos onto the webpage
function renderBibliography() {
  const container = document.querySelector(".biblio-grid");
  if (!container) return;

  let htmlContent = "";

  for (let i = 0; i < bibliography.length; i++) {
    const item = bibliography[i];
    const delay = (i * 0.3).toFixed(2) + "s";

    htmlContent += `
      <div class="biblio-item" style="animation-delay: ${delay}; animation-play-state: running;">
        <img src="${item.img}" alt="${item.title}">
        <h3>${item.title} (${item.year})</h3>
        <p>${item.desc}</p>
      </div>
    `;
  }

  container.innerHTML = htmlContent;
}
