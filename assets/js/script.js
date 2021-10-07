var questionsArray = [
  {
    question: "Which of these is NOT a primitive data type?",
    wrongA: "string",
    wrongB: "boolean",
    wrongC: "number",
    correct: "function",
  },
  {
    question: "Which of these expressions will evaluate to 'true'?",
    wrongA: "1 === '1'",
    wrongB: "'a' == 'A'",
    wrongC: "'a' === 'A'",
    correct: "1 == '1'",
  },
  {
    question: "Which type of loop will execute at least once?",
    wrongA: "for",
    wrongB: "for...in",
    wrongC: "while",
    correct: "do...while",
  },
  {
    question:
      "At which index is 'cat' given the following array?\nvar arr = ['dog', 'cat', 'mouse', 'bird']",
    wrongA: "0",
    wrongB: "2",
    wrongC: "3",
    correct: "1",
  },
  {
    question: "When invoking a function, what goes inside the parentheses?",
    wrongA: "parameter",
    wrongB: "string",
    wrongC: "variable",
    correct: "argument",
  },
  {
    question:
      "You can reference an object's properties by using bracket notation or _________ notation.",
    wrongA: "variable",
    wrongB: "mixed",
    wrongC: "mathematical",
    correct: "dot",
  },
  {
    question:
      "What is the proper syntax for selecting the first element of an array?",
    wrongA: "array.0",
    wrongB: "array{0}",
    wrongC: "array(0)",
    correct: "array[0]",
  },
  {
    question:
      "When a variable has not been assigned a value, its type is _________.",
    wrongA: '""',
    wrongB: "NaN",
    wrongC: "symbol",
    correct: "undefined",
  },
  {
    question:
      "When a function is a property value on an object, it is called a _________.",
    wrongA: "objFunction",
    wrongB: "arm",
    wrongC: "practice",
    correct: "method",
  },
];

// set timer for quiz and render
var quizTimer = questionsArray.length * 10;
var timerEl = document.getElementById("timer");
timerEl.innerText = timerEl.innerText + " " + quizTimer;

var landingContentEl = document.getElementById("landing-content");
var startBtnEl = document.getElementById("start-btn");
var mainEl = document.querySelector("main");

// render questions, one by one
var i = 0;
var renderQuestions = function () {
  // count down quiz timer
  var timerInterval = setInterval(function () {
    quizTimer--;
    timerEl.innerText = "Time: " + quizTimer;
  }, 1000);

  // create question timer
  var initialTimeout;
  var beginQuestionTimer = function (delay) {
    initialTimeout = setTimeout(function () {
      questionContainerEl.remove();
      renderQuestions();

      // clear interval for quiz timer
      clearInterval(timerInterval)
    }, delay);
  };

  var handleAnswerClick = function (event) {
    // pause quiz timer
    clearInterval(timerInterval);

    // pause question timer
    clearTimeout(initialTimeout);
    timerEl.innerText = "Time: " + quizTimer

    // style buttons
    if (event.target.innerText !== questionObject.correct.innerText) {
      event.target.setAttribute("style", "background-color: var(--reddish)");
    }
    correctAnswerEl.setAttribute("style", "background-color: var(--greenish)");
    beginQuestionTimer(3000);
  };

  // create container for question
  var questionContainerEl = document.createElement("div");
  questionContainerEl.id = "question-container";
  mainEl.appendChild(questionContainerEl);

  if (i < questionsArray.length) {
    var questionObject = questionsArray[i];

    // create question/answer elements
    var questionEl = document.createElement("h2");
    var wrongAnswerAEl = document.createElement("button");
    var wrongAnswerBEl = document.createElement("button");
    var wrongAnswerCEl = document.createElement("button");
    var correctAnswerEl = document.createElement("button");

    // add text to question/answer elements
    questionEl.innerText = questionObject.question;
    wrongAnswerAEl.innerText = questionObject.wrongA;
    wrongAnswerBEl.innerText = questionObject.wrongB;
    wrongAnswerCEl.innerText = questionObject.wrongC;
    correctAnswerEl.innerText = questionObject.correct;

    // add class and listener to answer elements
    var buttonArray = [
      wrongAnswerAEl,
      wrongAnswerBEl,
      wrongAnswerCEl,
      correctAnswerEl,
    ];

    for (var j = 0; j < buttonArray.length; j++) {
      buttonArray[j].className = "btn";
      buttonArray[j].addEventListener("click", handleAnswerClick);
    }

    // render question/answer elements to DOM
    questionContainerEl.append(
      questionEl,
      wrongAnswerAEl,
      wrongAnswerBEl,
      wrongAnswerCEl,
      correctAnswerEl
    );

    // iterate for next question
    i++;

    beginQuestionTimer(10000);
  }
};

var startQuiz = function () {
  landingContentEl.remove();

  renderQuestions();
};

startBtnEl.addEventListener("click", startQuiz);
