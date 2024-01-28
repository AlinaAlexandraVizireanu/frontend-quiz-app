const toggleBrightnessBtn = document.querySelector(".toggleBrightness");
const logoSun = document.querySelector(".logo_brightness-sun");
const logoMoon = document.querySelector(".logo_brightness-moon");
const logoHeader = document.querySelector(".logo_categories");
const headerTitle = document.querySelector(".logo_categories-text");
const mainTitleParagraph = document.querySelector(".main_title p");
const answerParent = document.querySelector(".answer");
const answerText = document.querySelectorAll(".answer_text");
const answerChildren = answerParent.children;

toggleBrightnessBtn.addEventListener("click", function () {
  if (!document.body.classList.contains("dark-mode")) {
    document.body.classList.add("dark-mode");
    mainTitleParagraph.classList.add("dark-mode-p");
    logoSun.src = "./assets/images/icon-sun-light.svg";
    logoMoon.src = "./assets/images/icon-moon-light.svg";

    for (const child of answerChildren) {
      child.classList.add("dark-mode-children");
    }
  } else {
    document.body.classList.remove("dark-mode");
    mainTitleParagraph.classList.remove("dark-mode-p");
    logoSun.src = "./assets/images/icon-sun-dark.svg";
    logoMoon.src = "./assets/images/icon-moon-dark.svg";

    for (const child of answerChildren) {
      child.classList.remove("dark-mode-children");
    }
  }
});

[...answerChildren].forEach((button) => {
  button.addEventListener("click", function () {
    switch (button.innerText) {
      case "HTML":
        appendToHeader(button.children[0].children[0], button.children[1]);
        break;
      case "CSS":
        appendToHeader(button.children[0].children[0], button.children[1]);
        break;
      case "Javascript":
        appendToHeader(button.children[0].children[0], button.children[1]);
        break;
      default:
        appendToHeader(button.children[0].children[0], button.children[1]);
    }
  });
});

function appendToHeader(element, elementText) {
  if (![...logoHeader.children].some((child) => child.tagName === "IMG")) {
    headerTitle.innerText = elementText.innerText;
    logoHeader.prepend(element);
  }
}
