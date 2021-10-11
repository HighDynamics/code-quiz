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
      "At which index is 'cat' given the following array?\n['dog', 'cat', 'mouse', 'bird']",
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

var highscoresArray = localStorage.highscores
  ? JSON.parse(localStorage.highscores)
  : [];

// reference pertinent elements
var landingContentEl = document.getElementById("landing-content");
var startBtnEl = document.getElementById("start-btn");
var mainEl = document.querySelector("main");
var highscoresLink = document.getElementById("highscore-link");

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

    // incorrect answer, style buttons
    if (!event.target.dataset.correct) {
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

  // if there are more questions left and time has not expired
  if (questionIterator < questionsArray.length && quizTimer > -1) {
    var questionObject = questionsArray[questionIterator];

    // create question/answer elements
    var questionEl = document.createElement("h2");
    var wrongAnswerAEl = document.createElement("button");
    var wrongAnswerBEl = document.createElement("button");
    var wrongAnswerCEl = document.createElement("button");
    var correctAnswerEl = document.createElement("button");

    // add text to question/answer elements; give true value to correct answer dataset
    questionEl.innerText = questionObject.question;
    wrongAnswerAEl.innerText = questionObject.wrongA;
    wrongAnswerBEl.innerText = questionObject.wrongB;
    wrongAnswerCEl.innerText = questionObject.wrongC;
    correctAnswerEl.innerText = questionObject.correct;
    correctAnswerEl.dataset.correct = true

    // add class and listener to answer elements
    var buttonArray = [
      wrongAnswerAEl,
      wrongAnswerBEl,
      wrongAnswerCEl,
      correctAnswerEl,
    ];

    // loop through button elements randomly to select order of display
    var buttonCollector = [];

    for (var i = 0; i < buttonArray.length; i++) {
      var randomIndex = Math.floor(Math.random() * 4);
      while (buttonCollector.includes(buttonArray[randomIndex])) {
        randomIndex = Math.floor(Math.random() * 4);
      }
      buttonArray[randomIndex].className = "btn";
      buttonArray[randomIndex].addEventListener("click", handleAnswerClick);

      // give buttons numbers
      buttonArray[randomIndex].innerText =
        i+1 + ") " + buttonArray[randomIndex].innerText;

      buttonCollector.push(buttonArray[randomIndex]);
    }

    // render question/answer elements to DOM
    questionContainerEl.append(
      questionEl,
      buttonCollector[0],
      buttonCollector[1],
      buttonCollector[2],
      buttonCollector[3]
    );

    // iterate for next question
    questionIterator++;

    beginQuestionTimer(10000);
  } else {
    clearInterval(timerInterval);
    questionContainerEl.remove()
    endGame();
  }
};

var endGame = function () {
  var storeScore = function () {
    var name = nameInputEl.value;
    if(!name){
      alert("Enter a name to save your score!")
      nameInputEl.setAttribute("style", "outline: 1px solid var(--reddish)")
      return false
    }
    highscoresArray.push({ name: name, score: quizTimer });
    localStorage.highscores = JSON.stringify(highscoresArray);
    displayHighscores();
  };

  // create elements
  var endGameContainerEl = document.createElement("div");
  var endGameHeaderEl = document.createElement("h2");
  var endGameTextEl = document.createElement("p");
  var scoreSubmitContainer = document.createElement("div");
  var nameInputEl = document.createElement("input");
  var submitScoreEl = document.createElement("button");
  var skipButtonEl = document.createElement("button");

  // set attributes
  endGameContainerEl.id = "end-game-container";
  scoreSubmitContainer.id = "score-submit-container";
  nameInputEl.type = "text";
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

  scoreSubmitContainer.append(nameInputEl, submitScoreEl, skipButtonEl);

  endGameContainerEl.append(
    endGameHeaderEl,
    endGameTextEl,
    scoreSubmitContainer
  );
  mainEl.appendChild(endGameContainerEl);
};

var displayHighscores = function () {
  // remove whatever container is present
  document.querySelector("main div").remove()

  var goBack = function () {
    highscoresDisplayContainerEl.remove();
    quizTimer = questionsArray.length * 10;
    renderTimer();
    questionIterator = 0;
    mainEl.appendChild(landingContentEl);
  };

  var clearHighscores = function () {
    localStorage.clear();
  };

  // create elements
  var highscoresDisplayContainerEl = document.createElement("div");
  var highscoresHeaderEl = document.createElement("h2");
  var highscoresList = document.createElement("ol");
  var buttonContainer = document.createElement("div");
  var goBackButtonEl = document.createElement("button");
  var clearScoresButtonEl = document.createElement("button");

  // set attributes
  highscoresDisplayContainerEl.id = "highscores-display-container";
  goBackButtonEl.className = "btn";
  clearScoresButtonEl.className = "btn";

  // set listeners
  goBackButtonEl.addEventListener("click", goBack);
  clearScoresButtonEl.addEventListener("click", clearHighscores);

  // set text
  highscoresHeaderEl.innerText = "High Scores";
  goBackButtonEl.innerText = "Go Back";
  clearScoresButtonEl.innerText = "Clear Scores";

  // order highscoresArray and create list items from highscoresArray
  highscoresArray.sort((a, b) => (a.score < b.score ? 1 : -1));
  var highscoreCount = highscoresArray.length > 10 ? 10 : highscoresArray.length
  for (var i = 0; i < highscoreCount; i++) {
    var listItem = document.createElement("li");
    var object = highscoresArray[i];
    listItem.innerHTML =
      "<span>" +
      (i + 1) +
      ". " +
      object.name +
      "</span>" +
      "<span>" +
      object.score +
      "</span>";
    highscoresList.appendChild(listItem);
  }

  // render elements
  buttonContainer.append(goBackButtonEl, clearScoresButtonEl);

  highscoresDisplayContainerEl.append(
    highscoresHeaderEl,
    highscoresList,
    buttonContainer
  );

  mainEl.appendChild(highscoresDisplayContainerEl);
};

var startQuiz = function () {
  landingContentEl.remove();
  renderQuestions();
};

startBtnEl.addEventListener("click", startQuiz);
highscoresLink.addEventListener("click", displayHighscores);
