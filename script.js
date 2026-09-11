// helpers
const debugEnabled = true;

function debugPrint(string) {
  if (debugEnabled == true) console.log(string);
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const totalPhotos = 78;
const bibliography = [];
const isGallery = document.body.dataset.page === "gallery";
const photoFolder = isGallery ? "gallery" : "bibliography";

for (let i = 1; i <= totalPhotos; i++) {
  bibliography.push({
    title: `Photo ${i}`,
    year: 2026,
    desc: `Description ${i}`,
    img: `../photos/${photoFolder}/photo${i}.png`,
  });
}

function renderBibliography() {
  const container = document.querySelector(".grid");
  if (!container) return Promise.resolve();

  debugPrint("renderBibliography fired");
  let htmlContent = "";

  for (let i = 0; i < bibliography.length; i++) {
    const item = bibliography[i];
    const delay = (i * 0.3).toFixed(2) + "s";

    htmlContent += `
            <div class="item" style="animation-delay: ${delay}; animation-play-state: paused;">
                <img src="${item.img}" alt="${item.title}" onerror="if(this.src.endsWith('.png')) this.src=this.src.replace('.png', '.jpg');">
                <h3>${item.title} (${item.year})</h3>
                <p>${item.desc}</p>
            </div>
        `;
  }
  container.innerHTML = htmlContent;

  const images = container.querySelectorAll("img");
  const promises = Array.from(images).map((img) => {
    return new Promise((resolve) => {
      if (img.complete) resolve();
      img.addEventListener("load", resolve);
      img.addEventListener("error", resolve);
    });
  });

  return Promise.all(promises);
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);

  renderBibliography().then(() => {
    startSiteAnimations();
  });
});

function startSiteAnimations() {
  const openingAnimation = document.getElementById("openingAnimation");
  const banner = document.getElementById("banner");
  const pageTitle = document.getElementById("page-title");
  const navButton = document.getElementById("navButton");
  const topAnimation = document.getElementById("topAnimation");
  const navSection = document.getElementById("navSection");

  document.querySelectorAll(".item").forEach((item) => {
    item.style.animationPlayState = "running";
  });

  if (openingAnimation) {
    openingAnimation.style.animationPlayState = "running";
    if (pageTitle) pageTitle.style.animationPlayState = "running";

    const page = document.body.dataset.page;
    const shouldDelete =
      page === "bibliography" ||
      page === "gallery" ||
      page === "about" ||
      page === "contact";

    if (shouldDelete) {
      openingAnimation.addEventListener("animationend", () => {
        openingAnimation.remove();
      });
    }
  }

  if (topAnimation) topAnimation.style.animationPlayState = "running";
  if (banner) banner.style.animationPlayState = "running";
  if (navButton) navButton.style.animationPlayState = "running";

  if (navButton && navSection) {
    navButton.addEventListener("click", (event) => {
      navSection.classList.toggle("active");
      navButton.classList.toggle("active");
      event.stopPropagation();
    });
  }

  document.addEventListener("click", (event) => {
    if (navSection && navSection.classList.contains("active")) {
      const clickedALink =
        event.target.tagName === "A" && navSection.contains(event.target);
      if (!clickedALink) {
        navSection.classList.remove("remove");
        navSection.classList.remove("active");
        if (navButton) navButton.classList.remove("active");
      }
    }
  });
}

// preview component
document.addEventListener("click", (event) => {
  const preview = document.getElementById("imagePreview");
  const previewImg = document.getElementById("imagePreviewImg");

  if (event.target.matches(".item img")) {
    if (previewImg) previewImg.src = event.target.src;
    if (preview) preview.classList.add("active");
    return;
  }

  if (preview && preview.classList.contains("active")) {
    preview.classList.remove("active");
  }
});

// copy text component
const button = document.getElementById("copyBtn");

button.addEventListener("click", async () => {
  const phraseToCopy = button.getAttribute("data-phrase");

  try {
    await navigator.clipboard.writeText(phraseToCopy);
    const originalText = button.textContent;
    button.textContent = "copied to clipboard";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
    alert(
      "Could not copy text automatically. Please select and copy manually.",
    );
  }
});
