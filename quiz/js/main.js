var Quiz = function() {
  this.question_array = [];
  this.count = 1;
  this.correct_answer = 0;
  this.state = "false";
  this.btn = document.getElementById("question_btn");
  this.question_text_elem = document.getElementById("question");
  this.question_box_container = document.getElementById("question-box");
  this.answer_input = document.getElementById("answer_input");
  this.quiz_question = new QuizQuestion();
  this.score_card = new ScoreCard();
}

Quiz.prototype.storeQuestion = function (qid, question, answer, user_answer) {
  this.question_hash = {};
  this.question_hash = {"qid" : qid, "question": question, "answer": answer, "user_answer": user_answer, "state": this.state};
  return this.question_hash;
}

Quiz.prototype.currentScore =  function(score){
  document.getElementById("user-score").innerHTML = score;
}

Quiz.prototype.init = function() {
  this.quiz_question.init(this.question_text_elem);
  this.currentScore(0);
  this.clickEvent();
  this.score_card.init();
}

Quiz.prototype.showRsultBtn =  function() {
  this.question_box_container.style.display = "none";
  this.hideQuestionBox();
  this.score_card.checkResult(this.question_array);
}

Quiz.prototype.hideQuestionBox =  function() {
  document.getElementById("check-score-row").classList.remove("hide");
}

Quiz.prototype.checkQuestion = function(counter, question_length, user_val, question_val, question){

  if(counter < question_length){
    this.compareQuestion(user_val, question_val, question);
  }else {
    this.compareQuestion(user_val, question_val, question);
    this.showRsultBtn();
  }
}

Quiz.prototype.compareQuestion = function(user_val, question_val, question) {
  
  if(user_val == " ") {
    user_val = "Not Attempted";
  } else if(user_val == question_val) {
    this.correct_answer++;
    this.currentScore(this.correct_answer);
    this.state = "true";
  } else {
    this.state = "false";
  }
    
  this.question_array.push(this.storeQuestion(this.count, question, question_val, user_val, this.state));
}

Quiz.prototype.clickEvent = function(){
  var _this = this;
  
  this.btn.addEventListener("click", function(){
    var input_btn_val = Number(_this.answer_input.value),
        question = _this.question_text_elem.innerHTML,
        question_val = eval(question).toFixed(2).replace(/[.,]00$/, "");

    _this.checkQuestion(_this.count, quiz_question_lenght, input_btn_val,  question_val, question);
    _this.quiz_question.getNextQuestion(_this.question_text_elem); 
    _this.count++;
  })
}

window.onload =  function(){
  var quiz_start = new Quiz();
  quiz_start.init();  
}