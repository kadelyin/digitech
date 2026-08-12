window.addEventListener("load", () => {
  const opening = document.getElementById("openingAnimation");
  const banner = document.getElementById("banner");
  const navButton = document.getElementById("navButton");

  opening.style.animationPlayState = "running";
  banner.style.animationPlayState = "running";
  if (navButton) navButton.style.animationPlayState = "running";
});

document.addEventListener("DOMContentLoaded", () => {
  const navButton = document.getElementById("navButton");
  const navSection = document.getElementById("navSection");

  // toggle menu when clicking the menu button
  navButton.addEventListener("click", (event) => {
    navSection.classList.toggle("active");
    event.stopPropagation(); // stops click from bubbling to document instantly
  });

  // handle all background clicks on the screen
  document.addEventListener("click", (event) => {
    // only run if the menu is actually open
    if (navSection.classList.contains("active")) {
      // check if the user specifically clicked a link tag inside the nav
      const clickedALink =
        event.target.tagName === "A" && navSection.contains(event.target);

      // if they didn't click a link, close the menu
      if (!clickedALink) {
        navSection.classList.remove("active");
      }
    }
  });
});
