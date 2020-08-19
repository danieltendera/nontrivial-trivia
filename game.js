// Can you please link the function below with the click on a button ?
var playersScore = 0;
var moderatorScore = 0;
var editMode = false;
var wasTimerRunForCurrentQuestion = false;


async function runTimer(){
  console.log("wasTimerRunForCurrentQuestion", wasTimerRunForCurrentQuestion);
  if(wasTimerRunForCurrentQuestion) {
    return;
  }
  wasTimerRunForCurrentQuestion = true;

  // TODO:
  // Make sure it only runs once! (use new global variable for storing a flag)
  var countDownDate = new Date().getTime() + 120000;

   var x = setInterval(function() {
     if(!wasTimerRunForCurrentQuestion){
       document.getElementById("countdown-timer").innerHTML = "2 минуты"
       clearInterval(x);
       return;
     }

     var now = new Date().getTime();
     var distance = countDownDate - now;
     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     var seconds = Math.ceil((distance % (1000 * 60)) / 1000);

     document.getElementById("countdown-timer").innerHTML = minutes + ":" + seconds;
     if (distance < 0) {
       clearInterval(x);
       document.getElementById("countdown-timer").innerHTML = "Время вышло! <br> Кто будет отвечать?";
     }},    1000)

     return;
}


async function processQuestionPage(){
  const QUESTION_BOX = document.querySelector(".question-text");

  let currentQuestion = {};
  let questionIndex = 0;
  let availableQuestions = [];

  const results = await getQuestionsFromCSV();

  let questions = results.map( (row) => {
    return {question:row[0], answer:row[1]}
  });

  // select all rows where there is an answer
  questions = _.filter(questions, (question) => question.answer )

  console.log(questions.length);

  const BUTTON_SHOW_ANSWER = document.querySelector("#show-answer-button");
  const BUTTON_NEXT = document.querySelector(".next-question");
  const ANSWER_BOX = document.querySelector(".answer-text");
  const BUTTON_COUNTDOWN_START = document.querySelector("#countdown-button");
  const PLAYERS_SCORE_BUTTON = document.querySelector("#players-score");
  const MODERATOR_SCORE_BUTTON = document.querySelector("#moderator-score");
  const TOGGLE_EDIT_SCORE_BUTTON = document.querySelector("#toggleEdit-button");


  TOGGLE_EDIT_SCORE_BUTTON.onclick = () =>{
    editMode = !editMode;
    if(editMode){
      $(PLAYERS_SCORE_BUTTON).attr("contentEditable","true");
      $(MODERATOR_SCORE_BUTTON).attr("contentEditable","true");
    }else{
      $(PLAYERS_SCORE_BUTTON).attr("contentEditable","false");
      $(MODERATOR_SCORE_BUTTON).attr("contentEditable","false");

      playersScore = PLAYERS_SCORE_BUTTON.innerHTML;
      moderatorScore = MODERATOR_SCORE_BUTTON.innerHTML;
    }
  }

  PLAYERS_SCORE_BUTTON.onclick = () => {
    if(!editMode){
      playersScore++;
      document.querySelector("#players-score").innerHTML = playersScore;
    }
  };
  MODERATOR_SCORE_BUTTON.onclick = () => {
    if(!editMode){
      moderatorScore++;
      document.querySelector("#moderator-score").innerHTML = moderatorScore;
    }
  };

  BUTTON_SHOW_ANSWER.onclick = showAnswer;

  BUTTON_NEXT.onclick = getNewQuestion;
  BUTTON_COUNTDOWN_START.onclick = runTimer;

   function showAnswer() {
     const HIDE_ANSWER_BUTTON = document.querySelector(".answer");
     if(HIDE_ANSWER_BUTTON){
       HIDE_ANSWER_BUTTON.classList.remove("hidden") };
     }

    function hideAnswer() {document.querySelector(".answer").classList.add("hidden") };

    function startGame() {
      questionIndex = 0;
      availableQuestions = questions;
      getNewQuestion();
    };

    function getNewQuestion() {
      hideAnswer();
      wasTimerRunForCurrentQuestion = false;
      currentQuestion = availableQuestions[questionIndex];
      QUESTION_BOX.innerText = currentQuestion.question;
      ANSWER_BOX.innerText = currentQuestion.answer;
      questionIndex++;
      document.querySelector(".question-number").innerHTML = "Вопрос " + questionIndex;

      if(questionIndex === (availableQuestions.length )) {
        BUTTON_NEXT.innerText = "Это был последний вопрос";
        BUTTON_NEXT.disabled = true;
      }


     };


    document.test = 0;



    startGame();

  }




  document.addEventListener("readystatechange", processQuestionPage);

  // How to make the checkboxes mutually eclusive. i.e when yes is selected, no cannot be selected.

  // let correct-answer = document.querySelector('input[id="correct"]:checked');
  // let incorrect-answer = document.querySelector('input[id="incorrect"]:checked');
  //
  // // if correct asnwer checkbox is selected add one point to the team, else add one point to the moderator
  // let scoreTeam =
  // let scoreModerator =
