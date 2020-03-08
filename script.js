// global variables for the quiz functions
var timeLeft = 80;
var counter = 0;
var score;
var jsHighScores = JSON.parse(localStorage.getItem("jsHighScores"));
if (jsHighScores === null) {
  localStorage.setItem("jsHighScores", "[]");
}

// Questions to be asked
var questions = [
  {
    question: "What does js stand for?",
    a: "javaschrimp",
    b: "jockeyscript",
    c: "javasyntax",
    d: "javascript",
    correct: "d"
  },
  {
    question: "Which of these indicates an array in javascript?",
    a: "{ }",
    b: "[ ]",
    c: "| |",
    d: "- -",
    correct: "b"
  },
  {
    question: "Which HTML element do we put the javascript in?",
    a: "<header>",
    b: "<style>",
    c: "<script>",
    d: "<div>",
    correct: "c"
  },
  {
    question: "Whic of these is not a data type?",
    a: "String",
    b: "Number",
    c: "Object",
    d: "Decimal",
    correct: "d"
  },
  {
    question: "When was Javascript created?",
    a: "1990",
    b: "1995",
    c: "2000",
    d: "2002",
    correct: "b"
  }
];
// starting the quiz by removing the display of the questions and adding display none to the start screen
function startQuiz() {
  document.getElementById("start-screen").classList.add("d-none");
  document.getElementById("questions").classList.remove("d-none");
  nextQuestion();
}
// Prompts the next question to appear as well as displays if the answer is correct or incorrect. If incorrect 10 seconds will be removed from the time left.
function nextQuestion(userAnswer) {
  if (counter > 0 && userAnswer === questions[counter - 1].correct) {
    $("#correct").removeClass("d-none");
    setTimeout(function(){
      $("#correct").addClass("d-none");
    }, 1050);
  }
  if (counter > 0 && userAnswer !== questions[counter - 1].correct) {
    $("#incorrect").removeClass("d-none");
    setTimeout(function(){
      $("#incorrect").addClass("d-none");
    }, 1050);
    timeLeft = timeLeft - 10;
  }
  // states that if the counter is 5, return score based on time left.
  if (counter === 5) {
    return getScore();
  }
  document.getElementById("question").textContent = questions[counter].question;
  document.getElementById("a").textContent = questions[counter].a;
  document.getElementById("b").textContent = questions[counter].b;
  document.getElementById("c").textContent = questions[counter].c;
  document.getElementById("d").textContent = questions[counter].d;
  counter++;
  document.getElementById("qnum").textContent = counter;
}
// displays the score based on time left, removes the score screen or finished screen to be displayed with the users score
function getScore() {
  score = timeLeft;
  document.getElementById("questions").classList.add("d-none");
  document.getElementById("score-screen").classList.remove("d-none");
  $("#score").text(`Your Score: ${score}`);
}
// Allows for the user to retake the quiz, by removing the display from the questions jumbotron and resetting the countdown timer
function retakeQuiz() {
  document.getElementById("score-screen").classList.add("d-none");
  document.getElementById("questions").classList.remove("d-none");
  counter = 0;
  nextQuestion();
  resetTimer();
}
// Shows high scores screen and puts top 5 high scores on it
function viewHighScore() {
  document.getElementById("score-screen").classList.add("d-none");
  document.getElementById("high-scores").classList.remove("d-none");
  var highscores = JSON.parse(localStorage.getItem("jsHighScores"));
  for (let i = 0; i < highscores.length; i++) {
    $("#high-score-list").append(highscores[i].username);
    $("#high-score-list").append(` ${highscores[i].score}`);
    $("#high-score-list").append("<br>");
  }
}
// takes the user to the start screen
function home() {
  document.getElementById("high-scores").classList.add("d-none");
  document.getElementById("start-screen").classList.remove("d-none");
  location.reload();
}
const username = document.getElementById("userName");
const btnSaveScore = document.getElementById("btnSaveScore")
// saves the score to local storage
// putting the username and high score in an array
// sorting the array from high to low
function saveScore() {
  const username = userName.value;
  const scores = JSON.parse(localStorage.getItem("jsHighScores"));
  if (scores.length < 5) {
    scores.push({ 
      username: username,
      score: score
    });
    scores.sort(function(a, b){
      return b.score - a.score
    })
    localStorage.setItem("jsHighScores", JSON.stringify(scores)); 
    // takes the lowest score in the array and replaces it with a higher score
    // sets the username and high scores from local storage to the high score jumbotron
  } else if (score >= scores[4].score) {
    scores[4]= { 
      username: username,
      score: score
    };
    scores.sort(function(a, b){
      return b.score - a.score
  });
  localStorage.setItem("jsHighScores", JSON.stringify(scores));
  viewHighScore();
}};

// countdown timer when quiz is prompted 
  var element = document.getElementById("timeLeft");

  function countdown() {
   
    if (timeLeft == 0) {
      clearInterval(timerId);
    } else {
      element.innerHTML = timeLeft;
      timeLeft--;
    }
  }
  var timerId = setInterval(countdown, 1000)
  // resets the time left to originial alotted time
  function resetTimer() {
    timeLeft = 80;
  }