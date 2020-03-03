var counter = 0;
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

function startQuiz() {
  document.getElementById("start-screen").classList.add("d-none");
  document.getElementById("questions").classList.remove("d-none");
  nextQuestion();
  
}
function nextQuestion() {
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
function getScore(){
    document.getElementById("questions").classList.add("d-none");
    document.getElementById("score-screen").classList.remove("d-none");
}
function retakeQuiz() {
  document.getElementById("score-screen").classList.add("d-none");
  document.getElementById("start-screen").classList.remove("d-none")
}


