window.addEventListener("load", () => {
  const opening = document.getElementById("openingAnimation");
  const banner = document.getElementById("banner");

  opening.style.animationPlayState = "running";
  banner.style.animationPlayState = "running";
  navButton.style.animationPlayState = "running";
});

document.addEventListener("DOMContentLoaded", () => {
  const navButton = document.getElementById("navButton");
  const navSection = document.getElementById("navSection");

  navButton.addEventListener("click", () => {
    navSection.classList.toggle("active");
  });
});
