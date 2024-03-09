questions = [
  {
    question: "Which is the largets animal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Lion", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Who is the prime minister of India?",
    answers: [
      { text: "Rahul Gandhi", correct: false },
      { text: "Siddaramaiah", correct: false },
      { text: "Narendra Modhi", correct: true },
      { text: "Amit Shah", correct: false },
    ],
  },
  {
    question: "Which is the capital state of India?",
    answers: [
      { text: "West Bengal", correct: false },
      { text: "Tamil Nadu", correct: false },
      { text: "Kashmir", correct: false },
      { text: "Delhi", correct: true },
    ],
  },
  {
    question: "Which is the capital city of karnataka?",
    answers: [
      { text: "Mysore", correct: false },
      { text: "Banglore", correct: true },
      { text: "Davangere", correct: false },
      { text: "Mandya", correct: false },
    ],
  },
];

let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-buttons");
let nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct=="true"){
        button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`
    nextBtn.innerHTML="Play Again";
    nextBtn.style.display="block";
}

nextBtn.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
