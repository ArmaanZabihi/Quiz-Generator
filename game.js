const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice-text");
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
var time=60 
var timeEl= document.querySelector('#time')
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is 4 x 4 ?",
    choice1: "4",
    choice2: "16",
    choice3: "14",
    choice4: "8",
    answer: 16,
  },
  {
    question: "What is 4 x 5 ?",
    choice1: "20",
    choice2: "25",
    choice3: "45",
    choice4: "9",
    answer: 20,
  },
  {
    question: "What is 4 x 7 ?",
    choice1: "21",
    choice2: "28",
    choice3: "30",
    choice4: "11",
    answer: 28,
  },
  {
    question: "What is 4 x 9 ?",
    choice1: "4",
    choice2: "36",
    choice3: "34",
    choice4: "13",
    answer: 36,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = questions;
  startTimer()
  getNewQuestion();
};

function startTimer(){
    var timer = setInterval(function(){
time--
timeEl.textContent=time
    },1000)

}

getNewQuestion = () => {
  if (questions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }
  // change to a var, start at 0, make it global
  //const questionsIndex = Math.floor(Math.random() * questions.length);
  progressText.textContent = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  //progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
var currentQuestion= questions[questionCounter]
  question.textContent = currentQuestion.question;
  questionCounter++;
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    var choiceText= currentQuestion["choice" + number];
    choice.textContent = choiceText
  });

 // questions.splice(questionsIndex, 1);
  acceptingAnswers = true;

  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

      let classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      if (classToApply === "correct") {
        incrementScore(SCORE_POINTS);
      }

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });
};

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
//add start game to click
startGame();
