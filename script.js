//  helpers
const debugEnabled = true;
function debugPrint(string) {
  if (debugEnabled == true) console.log(string);
}

window.addEventListener("load", () => {
  const openingAnimation = document.getElementById("openingAnimation");
  const banner = document.getElementById("banner");
  const pageTitle = document.getElementById("page-title");
  const navButton = document.getElementById("navButton");
  const topAnimation = document.getElementById("topAnimation");

  if (openingAnimation) {
    openingAnimation.style.animationPlayState = "running";
    if (pageTitle) pageTitle.style.animationPlayState = "running";

    const page = document.body.dataset.page;

    // only delete on pages that should remove it
    const shouldDelete = page === "bibliography" || page === "gallery" || page === "about";

    if (shouldDelete) {
      openingAnimation.addEventListener("animationend", () => {
        openingAnimation.remove();
      });
    }
  }

  if (topAnimation) {
    topAnimation.style.animationPlayState = "running"; // fixed + synced
  }

  // banner + nav button fade in slightly later
  setTimeout(() => {
    if (banner) banner.style.animationPlayState = "running";
    if (navButton) navButton.style.animationPlayState = "running";
  }, 400);

  // load bibliography
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
        navSection.classList.remove("remove"); // altered safely
        navSection.classList.remove("active");
        navButton.classList.remove("active");

        if (openingAnimation && document.body.contains(openingAnimation)) {
          openingAnimation.classList.remove("active");
        }
      }
    }
  });
});

// automated image generation
const totalPhotos = 78; // max amount of photos
const bibliography = [];

// check to see if we're on the right page
const isGallery = document.body.dataset.page === "gallery";
const photoFolder = isGallery ? "gallery" : "bibliography";

for (let i = 1; i <= totalPhotos; i++) {
  bibliography.push({
    title: `Photo ${i}`,
    year: 2026,
    desc: `Description ${i}`,
    img: `../photos/${photoFolder}/photo${i}.png`, // uses 'gallery' or 'bibliography'
  });
}

// puts the photos onto the webpage
function renderBibliography() {
  const container = document.querySelector(".grid");
  if (!container) return;

  debugPrint("renderBibliography fired");

  let htmlContent = "";

  for (let i = 0; i < bibliography.length; i++) {
    const item = bibliography[i];
    const delay = (i * 0.3).toFixed(2) + "s";

    htmlContent += `
      <div class="item" style="animation-delay: ${delay}; animation-play-state: running;">
        <img src="${item.img}" alt="${item.title}" onerror="if(this.src.endsWith('.png')) this.src=this.src.replace('.png', '.jpg');">
        <h3>${item.title} (${item.year})</h3>
        <p>${item.desc}</p>
      </div>
    `;
  }

  debugPrint(htmlContent);
  container.innerHTML = htmlContent;
}

// preview component
document.addEventListener("click", (event) => {
  const preview = document.getElementById("imagePreview");
  const previewImg = document.getElementById("imagePreviewImg");

  if (event.target.matches(".item img")) {
    previewImg.src = event.target.src;
    preview.classList.add("active");
    return;
  }

  if (preview && preview.classList.contains("active")) {
    preview.classList.remove("active");
  }
});
