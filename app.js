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
const endOfQuizSection = document.querySelector(".end_of_quiz");
const endOfQuizTotalScore = document.querySelector(".end_of_quiz-total");
const endOfQuizText = document.querySelector(".end_of_quiz-total-questions");
const progressBar = document.querySelector(".progress-bar");
const computedStyle = getComputedStyle(progressBar);
const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
const newIconCorrect = document.createElement("img");
const newIconWrong = document.createElement("img");
let endOfQuizLogo = null;
let data = null;
let selectedAnswer = null;
let questions = [];
let counter = 0;
let total = 0;

newIconCorrect.classList.add("new-icon");
newIconWrong.classList.add("new-icon");
newIconCorrect.src = "./assets/images/icon-correct.svg";
newIconWrong.src = "./assets/images/icon-incorrect.svg";

axios
  .get("data.json")
  .then((response) => {
    data = response.data.quizzes;
  })
  .catch((error) => {
    console.log(error);
  });

window.addEventListener("click", function (event) {
  if (
    !answerParent.contains(event.target) &&
    submitBtn.innerText == "Submit Answer" &&
    submitBtn.classList.contains("visible")
  ) {
    removeBorders();
    requestToSelectErr.classList.remove("invisible");
    requestToSelectErr.classList.add("visible");
  }
});

toggleBrightnessBtn.addEventListener("click", function () {
  if (!document.body.classList.contains("dark-mode")) {
    document.body.classList.add("dark-mode");
    requestToSelectErr.classList.add("dark-mode-error");
    progressBar.classList.add("dark-mode-children");
    mainTitleParagraph.classList.add("dark-mode-p");
    numberOfQuestions.classList.add("dark-mode-p");
    endOfQuizText.classList.add("dark-mode-p");
    logoSun.src = "./assets/images/icon-sun-light.svg";
    logoMoon.src = "./assets/images/icon-moon-light.svg";

    for (const child of answerChildren) {
      child.classList.add("dark-mode-children");
    }
  } else {
    document.body.classList.remove("dark-mode");
    requestToSelectErr.classList.remove("dark-mode-error");
    progressBar.classList.remove("dark-mode-children");
    mainTitleParagraph.classList.remove("dark-mode-p");
    numberOfQuestions.classList.remove("dark-mode-p");
    endOfQuizText.classList.remove("dark-mode-p");
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
    [...answerChildren].forEach((child) => {
      if (child.classList.contains("selected")) {
        child.append(newIconCorrect);
        child.classList.add("correct");
      }
    });
    total++;
    setTimeout(displayQuestions, 2000);
  } else {
    [...answerChildren].forEach((child) => {
      if (child.classList.contains("selected")) {
        child.append(newIconWrong);
        child.classList.add("wrong");
      }
      if (child.children[1].innerText == questions[counter - 1].answer) {
        child.append(newIconCorrect);
      }
    });
    setTimeout(displayQuestions, 2000);
  }
});

function appendToHeader(element, elementText) {
  if (![...logoHeader.children].some((child) => child.tagName === "IMG")) {
    headerTitle.innerText = elementText.innerText;
    logoHeader.prepend(element);
    endOfQuizLogo = logoHeader.cloneNode(true);
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
  numberOfQuestions.classList.remove("invisible");
  numberOfQuestions.classList.add("visible");
  progressBar.classList.remove("invisible");
  progressBar.classList.add("visible");
}

function select(button) {
  selectedAnswer = button.children[1].innerText;
}

function displayQuestions() {
  newIconCorrect.remove();
  newIconWrong.remove();
  removeBorders();
  if (counter < 1) {
    mainTitleQuestion.innerHTML = questions[counter].question;
    for (let i = 0; i <= 3; i++) {
      answerChildren[i].children[1].innerText = questions[counter].options[i];
    }
    counter++;
    numberOfQuestions.innerText = `Question ${counter} of 10`;
    currentProgress = counter / 10;
    progressBar.style.setProperty("--width", width + currentProgress);
  } else {
    endOfQuiz();
  }
}

function addBorders(button) {
  removeBorders();
  button.classList.add("selected");
  if (requestToSelectErr.classList.contains("visible")) {
    requestToSelectErr.classList.remove("visible");
    requestToSelectErr.classList.add("invisible");
  }
}

function removeBorders() {
  [...answerChildren].forEach((child) => {
    child.classList.remove("selected");
    if (child.classList.contains("correct")) {
      child.classList.remove("correct");
    } else if (child.classList.contains("wrong")) {
      child.classList.remove("wrong");
    }
  });
}

function endOfQuiz() {
  numberOfQuestions.classList.remove("visible");
  numberOfQuestions.classList.add("invisible");
  mainTitleQuestion.innerHTML = "Quiz completed <span>You scored...</span>";
  progressBar.classList.remove("visible");
  progressBar.classList.add("invisible");
  endOfQuizSection.classList.remove("invisible");
  endOfQuizSection.classList.add("visible");
  [...answerChildren].forEach((child) => {
    child.classList.add("invisible");
  });
  submitBtn.innerText = "Play Again";
  endOfQuizSection.prepend(endOfQuizLogo);
  endOfQuizTotalScore.innerText = `${total}`;
}
