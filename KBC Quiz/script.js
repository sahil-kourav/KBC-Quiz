const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".countinue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn");
const hateText = document.querySelector(".hate-text");


let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
let totalAttempted = 0;
let totalWrong = 0;
let totalHateAnswers = 0;

const nextBtn = document.querySelector(".next-btn");
const optionList = document.querySelector(".option-list");

// Timer-related variables
let timeValue = 30; // Time limit for each question in seconds
let counter; // Variable to store the interval function

// Start button click event
startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
}

// Exit button click event
exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
}

// Continue button click event
continueBtn.onclick = () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");

  showQuestions(0);
  questionCounter(1);
  headerScore();
}

// Try again button click event
tryAgainBtn.onclick = () => {
  quizBox.classList.add("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  totalAttempted = 0;
  totalWrong = 0;
  totalHateAnswers = 0;

  showQuestions(questionCount);
  questionCounter(questionNumb);
  headerScore();
};

// Go home button click event
goHomeBtn.onclick = () => {
  quizSection.classList.remove("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  totalAttempted = 0;
  totalWrong = 0;
  totalHateAnswers = 0;

  showQuestions(questionCount);
  questionCounter(questionNumb);
}

// Next button click event
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);
    questionNumb++;
    questionCounter(questionNumb);
    nextBtn.classList.remove('active');
    stopTimer(); // Stop the timer before showing the next question
    startTimer(timeValue); // Start the timer for the new question
  } else {
    showResultBox(); // Show the result box when quiz is complete
  }
};

// Show questions and options
function showQuestions(index) {
  const questionText = document.querySelector(".question-text");
  questionText.textContent = `${questions[index].numb}.${questions[index].question}`;

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
      <div class="option"><span>${questions[index].options[1]}</span></div>
      <div class="option"><span>${questions[index].options[2]}</span></div>
      <div class="option"><span>${questions[index].options[3]}</span></div>`;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll('.option');
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }

  stopTimer(); // Stop any existing timer
  startTimer(timeValue); // Start a new timer for the current question
}

// Option selected by the user
function optionSelected(answer) {
  stopTimer(); // Stop the timer when the user selects an option
  totalAttempted++; // Increment attempted questions
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length; 

  if (userAnswer == correctAnswer) {
    answer.classList.add("correct");
    userScore += 1; // Increment correct answers
    headerScore();
  } else {
    answer.classList.add("incorrect");
    totalWrong++; // Increment wrong answers
    totalHateAnswers++;
  }

  // Disable all options after the user selects an answer
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add('disabled');
  }

  nextBtn.classList.add('active'); // Activate the Next button
}

// Timer function
function startTimer(time) {
  const timerSec = document.querySelector('.timer-sec');

  counter = setInterval(() => {
    timerSec.textContent = time; // Display remaining time
    time--; // Decrease time

    if (time < 0) {
      clearInterval(counter); // Stop the timer when time runs out
      nextBtn.classList.add('active'); // Automatically enable the Next button when time runs out
      nextQuestion(); // Automatically move to the next question
    }
  }, 1000); // Run every 1 second
}

// Stop timer function
function stopTimer() {
  clearInterval(counter); // Stop the timer
}

// Automatically move to the next question when time runs out
function nextQuestion() {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);
    questionNumb++;
    questionCounter(questionNumb);
    nextBtn.classList.remove('active');
    startTimer(timeValue); // Restart the timer for the next question
  } else {
    showResultBox(); // Show the result when the quiz is finished
  }
}

// Question counter
function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

// Display header score
function headerScore() {
  const headerScoreText = document.querySelector('.header-score');
  headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

// Show result box
function showResultBox() {
  quizBox.classList.remove('active');
  resultBox.classList.add('active');
  let totalScore;

  const attemptedText = document.querySelector('.attempted-text');
  attemptedText.textContent = `Total Attempted Questions: ${totalAttempted}`;

  const correctText = document.querySelector('.correct-text');
  correctText.textContent = `Total Correct Answers: ${userScore}`;

  const wrongText = document.querySelector('.wrong-text');
  wrongText.textContent = `Total Wrong Answers: ${totalWrong}`;

  totalScore=  userScore - (totalHateAnswers/2)
  console.log('score ',userScore)
  console.log('totalScore ',totalScore)

  const scoreText = document.querySelector('.score-text');
  scoreText.textContent = `Your score ${totalScore} out of ${questions.length}`;

  


  const circularProgress = document.querySelector('.circular-progress');
  const progressValue = document.querySelector('.progress-value');
  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255, .1)0deg)`;
    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}