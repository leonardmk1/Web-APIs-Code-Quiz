var score = 0;
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
// starting the quiz by removing the display of the questions and adding display none to the start screen
function startQuiz() {
  document.getElementById("start-screen").classList.add("d-none");
  document.getElementById("questions").classList.remove("d-none");
  nextQuestion();
}
function nextQuestion(userAnswer) {
  if (counter > 0 && userAnswer === questions[counter - 1].correct) {
    score = score + 20;
  }
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
function getScore() {
  document.getElementById("questions").classList.add("d-none");
  document.getElementById("score-screen").classList.remove("d-none");
  $("#score").text(`Your Score: ${score}`);
}
function retakeQuiz() {
  document.getElementById("score-screen").classList.add("d-none");
  document.getElementById("questions").classList.remove("d-none");
  counter = 0;
  nextQuestion();
}
function viewHighScore() {
  document.getElementById("score-screen").classList.add("d-none");
  document.getElementById("high-scores").classList.remove("d-none");
  $("#high-score-list").text(`${score}`);
}
function home() {
  document.getElementById("high-scores").classList.add("d-none");
  document.getElementById("start-screen").classList.remove("d-none");
}
// employees.sort(function(a, b){
//   return a.age-b.age
// })
function saveScore() {
  var list = JSON.parse(localStorage.getItem("score"));
  if (!Array.isArray(list)) {
    list = [];
  }
  function putOnPage() {
    $("#high-score-list").empty(); // empties out the html
    var insideList = JSON.parse(localStorage.getItem("#high-score-list"));

    if (!Array.isArray(insideList)) {
      insideList = [];
    }

    for (var i = 0; i < insideList.length; i++) {
      var p = $("<p>").text(insideList[i]);
      var b = $("<button class='delete'>")
        .text("x")
        .attr("data-index", i);

      p.prepend(b);

      $("#high-score-list").prepend(p);
    }
  }

  putOnPage();

  $(document).on("click", "button.delete", function() {
    var scoreList = JSON.parse(localStorage.getItem("scoreList"));
    var currentIndex = $(this).attr("data-index");

    scoreList.splice(currentIndex, 1);
    list = scoreList;
    console.log("list" + list);

    localStorage.setItem("scoreList", JSON.stringify(scoreList));

    putOnPage();
  });

  $("input[type='submit']").on("click", function(event) {
    event.preventDefault();

    var val = $("input[type='text']").val();
    $("input[type='text']").val("");

    list.push(val);
    localStorage.setItem("todolist", JSON.stringify(list));

    putOnPage();
  });
}
