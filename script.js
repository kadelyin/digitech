// loading animations
window.addEventListener("load", async () => {
  const timeline = [
    { id: "openingAnimation", delay: 0 },
    { id: "banner", delay: 600 },
    { id: "navButton", delay: 600 },
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

// navigation menu
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
