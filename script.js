const syncPointer = ({ x, y }) => {
  document.documentElement.style.setProperty("--x", x.toFixed(2));
  document.documentElement.style.setProperty(
    "--xp",
    (x / window.innerWidth).toFixed(2)
  );
  document.documentElement.style.setProperty("--y", y.toFixed(2));
  document.documentElement.style.setProperty(
    "--yp",
    (y / window.innerHeight).toFixed(2)
  );
};

document.body.addEventListener("pointermove", syncPointer);

document.addEventListener("DOMContentLoaded", () => {
  // Ensure this is called after DOM is loaded
  todayDate();

  // Existing setup code
  const hello = document.getElementById("hello");
  const welcome = document.getElementById("welcome");
  const mainContent = document.getElementById("main-content");
  const header = document.querySelector("header");

  hello.style.opacity = 1;
  hello.style.transform = "translateX(0)";

  hello.addEventListener("animationend", () => {
    welcome.style.opacity = 1;
    welcome.style.transform = "scale(1)";
  });

  welcome.addEventListener("animationend", () => {
    mainContent.classList.remove("hidden");
    document
      .getElementById("choose-theme")
      .scrollIntoView({ behavior: "smooth" });
    setupSectionNavigation();
    setupScrollUpButtons();
    setupCarouselButtons();

    // Add fade-out class after the animations
    setTimeout(() => {
      hello.classList.add("fade-out");
      welcome.classList.add("fade-out");
    }, 10); // Adjust the delay if necessary

    // Remove elements from the DOM after the fade-out transition
    welcome.addEventListener("transitionend", () => {
      header.classList.add("header-hidden");
    });
  });

  // Setup theme change functionality
  setupThemeChange();

  // Hamburger menu toggle
  const hamburgerButton = document.querySelector(".hamburger-button");
  const navigation = document.querySelector(".navigation");

  hamburgerButton.addEventListener("click", () => {
    navigation.classList.toggle("show");
  });

  // Close navigation when a link is clicked
  const navLinks = document.querySelectorAll(".navigation a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("show");
    });
  });

  // Dropdown menu toggle
  const dropdownButtons = document.querySelectorAll(
    ".navigation > li > button"
  );
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdown = button.nextElementSibling.querySelector(".dropdown");
      dropdown.classList.toggle("show");
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show");
    });
  });
});

function todayDate() {
  const d = new Date();
  const n = d.getFullYear();
  document.getElementById("date").innerHTML = n; // Use innerHTML to set the year
}

function applyDarkTheme() {
  document.body.style.backgroundColor = "#1a1a2e";
  document.body.style.color = "#c0c0c0";

  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");

  if (h1) {
    h1.classList.add("hidden");
  }
  if (h2) {
    h2.classList.add("hidden");
  }
}

function setupThemeChange() {
  const themes = {
    "dark-theme": {
      "--bg": "#2b3246",
      "--color": "#f0f0f0",
      "--bg-section": "#374d83",
      "--bg-hov": "#628ecb",
      "--bg-nav": "#71252f",
      "--bg-foot": "#71252f",
    },
    "light-theme": {
      "--bg": "#ebe6e0",
      "--color": "#4c7766",
      "--bg-section": "#f0f0f0",
      "--bg-hov": "#f0f0f0",
      "--bg-nav": "#c3a27c",
      "--bg-foot": "#c3a27c",
    },
    "boho-theme": {
      "--bg": "#8b5e3c",
      "--color": "#f2c57c",
      "--bg-section": "#b46b64",
      "--bg-hov": "#7f5539",
      "--bg-nav": "#566e39",
      "--bg-foot": "#566e39",
    },
    "gradient-theme": {
      "--bg": "linear-gradient(45deg, #D4E157 0%, #388E3C 67%)",
      "--color": "#f0f0f0",
      "--bg-section":
        "linear-gradient(90deg, rgba(103,0,31,1) 5%, rgba(171,32,46,1) 20%, rgba(213,95,80,1) 35%, rgba(240,162,133,1) 49%, rgba(144,194,221,1) 51%, rgba(75,148,196,1) 65%, rgba(34,101,163,1) 80%, rgba(34,101,163,1) 95%)",
      "--bg-hov": "linear-gradient(135deg, #1F4307 26%, #99F2C8 94%)",
      "--bg-nav": "linear-gradient(45deg, #2C3E50 10%, #FD746C 67%)",
      "--bg-foot": "linear-gradient(45deg, #2C3E50 10%, #FD746C 67%)",
    },
  };

  Object.keys(themes).forEach((themeId) => {
    const radioButton = document.getElementById(themeId);
    if (radioButton) {
      radioButton.addEventListener("change", () => {
        if (radioButton.checked) {
          applyTheme(themes[themeId]);
        }
      });
    }
  });
}

function applyTheme(theme, themeName) {
  // Apply theme variables
  Object.keys(theme).forEach((variable) => {
    document.documentElement.style.setProperty(variable, theme[variable]);
  });

  // Hide the header for light, boho, and gradient themes
  const header = document.querySelector("header");
  if (themeName !== "dark-theme") {
    header.classList.add("hidden-header");
  } else {
    header.classList.remove("hidden-header");
  }

  // Adjust navigation position for dark theme
  const nav = document.querySelector(".navigation");
  if (themeName === "dark-theme") {
    nav.classList.add("dark-nav-adjust");
  } else {
    nav.classList.remove("dark-nav-adjust");
  }

  // Explicitly set the background properties
  document.body.style.background = theme["--bg"];
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.background = theme["--bg-section"];
  });
  if (nav) {
    nav.style.background = theme["--bg-nav"];
  }
  const footer = document.querySelector("footer");
  if (footer) {
    footer.style.background = theme["--bg-foot"];
  }

  // Update the title background color to match the body's background
  const title = document.querySelector(".title");
  if (title) {
    title.style.background = theme["--bg"];
  }

  // Explicitly set the background for dropdown list and title in the Useful links section
  const dropdownLists = document.querySelectorAll(".dropdown__list");
  dropdownLists.forEach((dropdown) => {
    dropdown.style.background = theme["--bg"];
  });
  const dropdownTitles = document.querySelectorAll(".dropdown__title");
  dropdownTitles.forEach((title) => {
    title.style.background = theme["--bg-nav"];
    title.style.color = theme["--color"];
  });

  // Explicitly set the background for dropdowns in the navigation
  const navDropdowns = document.querySelectorAll(".dropdown");
  navDropdowns.forEach((dropdown) => {
    dropdown.style.background = theme["--bg-nav"];
  });

  // Update GitHub icon in the footer based on theme
  const githubIconContainer = document.getElementById("github-icon-container");
  if (githubIconContainer) {
    if (themeName === "boho-theme") {
      // Boho theme
      githubIconContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#f2c57c" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
        </svg>
      `;
    } else if (themeName === "light-theme") {
      // Light theme
      githubIconContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#4c7766" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
        </svg>
      `;
    } else {
      // Dark and Gradient themes
      githubIconContainer.innerHTML = `
        <img src="images/github_line.svg" alt="GitHub" width="24" height="24" />
      `;
    }
  }

  // Update Twitter (now X) icon in the footer based on theme
  const twitterIconContainer = document.getElementById(
    "twitter-icon-container"
  );
  if (twitterIconContainer) {
    if (themeName === "boho-theme") {
      // Boho theme
      twitterIconContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#f2c57c" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      `;
    } else if (themeName === "light-theme") {
      // Light theme
      twitterIconContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#4c7766" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      `;
    } else {
      // Dark and Gradient themes
      twitterIconContainer.innerHTML = `
        <img src="images/social_x_line.svg" alt="X" width="24" height="24" />
      `;
    }
  }

  // Add a dynamic style element for the hover state
  let dynamicStyle = document.getElementById("dynamic-style");
  if (!dynamicStyle) {
    dynamicStyle = document.createElement("style");
    dynamicStyle.id = "dynamic-style";
    document.head.appendChild(dynamicStyle);
  }
  dynamicStyle.innerHTML = `
    .dropdown__list li a:hover {
      background: ${theme["--bg-hov"]};
    }
  `;
}

function setupScrollUpButtons() {
  const scrollUpButtons = document.querySelectorAll(".scroll-up");
  scrollUpButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nav = document.querySelector("nav");
      if (nav) {
        nav.scrollIntoView({ behavior: "smooth" });
      }
      resetRadioButtons(); // Reset the state of the radio buttons
    });
  });
}

function setupCarouselButtons() {
  const carousel = document.querySelector(".carousel");
  const scrollLeftButton = document.querySelector(".carousel-button.left");
  const scrollRightButton = document.querySelector(".carousel-button.right");

  scrollLeftButton.addEventListener("click", () => {
    carousel.scrollBy({
      left: -400, // Adjust this value as needed
      behavior: "smooth",
    });
  });

  scrollRightButton.addEventListener("click", () => {
    carousel.scrollBy({
      left: 400, // Adjust this value as needed
      behavior: "smooth",
    });
  });
}

function setupSectionNavigation() {
  const buttonSectionMap = {
    "btn-about": "about",
    "btn-html-css-js": "html-css-js",
    "btn-python": "python",
    "btn-webflow": "webflow",
    "btn-android": "android",
    "btn-ux-ui": "ux-ui",
  };

  Object.keys(buttonSectionMap).forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    const sectionId = buttonSectionMap[buttonId];
    const section = document.getElementById(sectionId);

    if (button && section) {
      button.addEventListener("change", () => {
        if (button.checked) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });
}

function resetRadioButtons() {
  const radioButtons = document.querySelectorAll(
    'input[name="radio-theme-group"]'
  );
  radioButtons.forEach((button) => {
    button.checked = false;
  });
}
