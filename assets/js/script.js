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

// reference pertinent elements
var landingContentEl = document.getElementById("landing-content");
var startBtnEl = document.getElementById("start-btn");
var mainEl = document.querySelector("main");

// set timer for quiz and render
var quizTimer = questionsArray.length * 10;
var timerEl = document.getElementById("timer");
var renderTimer = function () {
  timerEl.innerText = "Time: " + quizTimer;
};
renderTimer();

// render questions, one by one
var questionIterator = 0;
var renderQuestions = function () {
  // count down quiz timer
  var timerInterval = setInterval(function () {
    quizTimer--;
    renderTimer();
  }, 1000);

  // create question timer
  var initialTimeout;
  var beginQuestionTimer = function (delay) {
    initialTimeout = setTimeout(function () {
      questionContainerEl.remove();
      renderQuestions();

      // clear interval for quiz timer
      clearInterval(timerInterval);
    }, delay);
  };

  var handleAnswerClick = function (event) {
    // pause quiz timer
    clearInterval(timerInterval);

    // pause question timer
    clearTimeout(initialTimeout);

    // style buttons
    if (event.target.innerText !== questionObject.correct) {
      event.target.setAttribute("style", "background-color: var(--reddish)");

      // incorrect answer should deduct 5 seconds from quiz timer
      quizTimer -= 5;
      renderTimer();
    }
    correctAnswerEl.setAttribute("style", "background-color: var(--greenish)");
    beginQuestionTimer(2000);
  };

  // create container for question
  var questionContainerEl = document.createElement("div");
  questionContainerEl.id = "question-container";
  mainEl.appendChild(questionContainerEl);

  // if there are more questions left and time has not expired, run
  if (questionIterator < questionsArray.length && quizTimer > -1) {
    var questionObject = questionsArray[questionIterator];

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

    for (var i = 0; i < buttonArray.length; i++) {
      buttonArray[i].className = "btn";
      buttonArray[i].addEventListener("click", handleAnswerClick);
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
    questionIterator++;

    beginQuestionTimer(10000);
  } else {
    clearInterval(timerInterval);
    endGame();
  }
};

var endGame = function () {
  /* ---------------DELETE FOLLOWING LINE WHEN FINISHED--------------- */
  landingContentEl.remove();
  var storeScore = function () {
    // TODO: add functionality
  };
  // create elements
  var endGameContainerEl = document.createElement("div");
  var endGameHeaderEl = document.createElement("h2");
  var endGameTextEl = document.createElement("p");
  var scoreSubmitContainer = document.createElement("div");
  var scoreInputEl = document.createElement("input");
  var submitScoreEl = document.createElement("button");
  var skipButtonEl = document.createElement("button");

  // set attributes
  endGameContainerEl.id = "end-game-container";
  scoreSubmitContainer.id = "score-submit-container";
  scoreInputEl.type = "text";
  submitScoreEl.className = "btn";
  skipButtonEl.className = "btn";

  // set text
  endGameHeaderEl.innerText = "The quiz has ended";
  endGameTextEl.innerText =
    "Enter your name to submit your score.\nYour score: " + quizTimer;
  submitScoreEl.innerText = "Submit";
  skipButtonEl.innerText = "Skip";

  // set listeners
  submitScoreEl.addEventListener("click", storeScore);
  skipButtonEl.addEventListener("click", displayHighscores);

  scoreSubmitContainer.append(scoreInputEl, submitScoreEl, skipButtonEl);

  endGameContainerEl.append(
    endGameHeaderEl,
    endGameTextEl,
    scoreSubmitContainer
  );
  mainEl.appendChild(endGameContainerEl);
};

var displayHighscores = function () {
  //TODO: build this
};

var startQuiz = function () {
  landingContentEl.remove();
  renderQuestions();
};

startBtnEl.addEventListener("click", startQuiz);
