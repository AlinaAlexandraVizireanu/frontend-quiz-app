const toggleBrightnessBtn = document.querySelector(".toggleBrightness");
const logoSun = document.querySelector(".logo_brightness-sun");
const logoMoon = document.querySelector(".logo_brightness-moon");
const logoHeader = document.querySelector(".logo_categories");
const headerTitle = document.querySelector(".logo_categories-text");
const mainTitleParagraph = document.querySelector(".welcoming_paragraph");
const mainTitleQuestion = document.querySelector(".main_title_question");
const numberOfQuestions = document.querySelector(".number_of_questions");
const answerIconText = document.querySelectorAll(".answer_icon-text");
const answerParent = document.querySelector(".answer");
const answerChildren = document.querySelectorAll('[class^="answer-"]');
const submitBtn = document.querySelector(".submit_answer");
const requestToSelectErr = document.querySelector(".request_to_select");
let data = null;
let questions = [];
let counter = 0;
let selectedAnswer = null;

axios
  .get("data.json")
  .then((response) => {
    data = response.data.quizzes;
  })
  .catch((error) => {
    console.log(error);
  });

window.addEventListener("click", function (event) {
  if (!answerParent.contains(event.target)) {
    removeBorders();
    requestToSelectErr.classList.remove("invisible");
    requestToSelectErr.classList.add("visible");
  }
});

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
    appendToHeader(button.children[0].children[0], button.children[1]);
    getCategoryData(button.innerText);
    displayElements();
    select(button);
    addBorders(button);
  });
});

submitBtn.addEventListener("click", function () {
  if (questions[counter - 1].answer == selectedAnswer) {
    setTimeout(displayQuestions, 2000);
  } else {
    console.log("wrong");
  }
});

function appendToHeader(element, elementText) {
  if (![...logoHeader.children].some((child) => child.tagName === "IMG")) {
    headerTitle.innerText = elementText.innerText;
    logoHeader.prepend(element);
    mainTitleParagraph.classList.add("invisible");
    [...answerChildren]
      .filter((element) => {
        return element.children[0].children[0].tagName === "IMG";
      })
      .forEach((element) => {
        element.children[0].children[0].classList.add("invisible");
      });
  }
}

function getCategoryData(category) {
  data.forEach((section) => {
    if (category === section.title) {
      questions = section.questions;
      displayQuestions();
    }
  });
}

function displayElements() {
  [...answerIconText].forEach((icon) => {
    icon.classList.remove("invisible");
    icon.classList.add("visible");
  });
  submitBtn.classList.remove("invisible");
  submitBtn.classList.add("visible");
}

function select(button) {
  selectedAnswer = button.children[1].innerText;
}

function displayQuestions() {
  mainTitleQuestion.innerHTML = questions[counter].question;
  for (let i = 0; i <= 3; i++) {
    answerChildren[i].children[1].innerText = questions[counter].options[i];
  }
  counter++;
  numberOfQuestions.innerText = `Question ${counter} of 10`;
  numberOfQuestions.classList.add("visible");
}

function addBorders(button) {
  [...answerChildren].forEach((child) => {
    child.classList.remove("selected");
  });
  button.classList.add("selected");
  if (requestToSelectErr.classList.contains("visible")) {
    requestToSelectErr.classList.remove("visible");
    requestToSelectErr.classList.add("invisible");
  }
}

function removeBorders() {
  [...answerChildren].forEach((child) => {
    child.classList.remove("selected");
  });
}
