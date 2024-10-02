/*
Dark mode implementation from
https://whitep4nth3r.com/blog/best-light-dark-mode-theme-toggle-javascript/
*/
function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

/**
 * Utility function to update the button text and aria-label.
 */
function updateButton({ buttonEl, isDark }) {
  const newCta = isDark ? "Switch to light mode" : "Switch to dark mode";
  // use an aria-label if you are omitting text on the button
  // and using a sun/moon icon, for example
  buttonEl.setAttribute("aria-label", newCta);
  buttonEl.innerText = newCta;
}

/**
 * Utility function to update the theme setting on the html tag
 */
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

/**
 * On page load:
 */

/**
 * 1. Grab what we need from the DOM and system settings on page load
 */
const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

/**
 * 2. Work out the current site settings
 */
let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});

/**
 * 3. Update the theme setting and button text accoridng to current settings
 */
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
 * 4. Add an event listener to toggle the theme
 */
button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
});

// Ryan's code
document.addEventListener("DOMContentLoaded", function () {
  const expandableHeaders = document.querySelectorAll(".expandableHeader");
  let nowOpen = null;

  expandableHeaders.forEach((everyHeader) => {
    everyHeader.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleContent(this);
    });
  });

  function toggleContent(everyHeader) {
    const listItem = everyHeader.closest("li");
    const content = listItem.querySelector(".expandableContent");
    const shortDescription = listItem.querySelector(".shortDescription");

    if (nowOpen && nowOpen !== listItem) {
      // Close the currently open content
      const openEachHeader = nowOpen.querySelector(".expandableHeader");
      const openEachContent = nowOpen.querySelector(".expandableContent");
      const openShortDescription = nowOpen.querySelector(".shortDescription");

      openEachContent.classList.remove("expanded");
      openEachHeader.classList.remove("active");
      openShortDescription.classList.remove("hidden");
    }

    content.classList.toggle("expanded");

    if (content.classList.contains("expanded")) {
      everyHeader.classList.add("active");
      shortDescription.classList.add("hidden");
      nowOpen = listItem;

      // Smooth scroll to the expanded content
      setTimeout(() => {
        content.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 300);
    } else {
      everyHeader.classList.remove("active");
      shortDescription.classList.remove("hidden");
      nowOpen = null;
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const interestsHeader = document.querySelector(".interestsHeader");
  if (interestsHeader) {
    interestsHeader.addEventListener("click", function () {
      const interestsContent = this.nextElementSibling;
      if (interestsContent) {
        interestsContent.classList.toggle("expanded");
        this.classList.toggle("active");

        if (interestsContent.classList.contains("expanded")) {
          setTimeout(() => {
            interestsContent.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }, 300);
        }
      }
    });
  }
});

function scrollToElement(element, duration) {
  var target = document.querySelector(element);
  var targetPosition = target.getBoundingClientRect().top + window.scrollY;
  var startPosition = window.scrollY;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    scrollToElement(this.getAttribute("href"), 1000);
  });
});
