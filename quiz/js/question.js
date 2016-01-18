var QuizQuestion = function(){
  this.answer_input = document.getElementById("answer_input");
}

QuizQuestion.prototype.randomArray = function(){
  return operator_array[Math.floor((Math.random()*operator_array.length))];
}

QuizQuestion.prototype.generateNumber = function(){
  return parseInt(Math.random().toFixed(2)*20);
}

QuizQuestion.prototype.getRandomQuestion = function(){
  return this.generateNumber() + this.randomArray()  + this.generateNumber();
}

QuizQuestion.prototype.getNextQuestion = function(elem) {
  this.questionText(elem, this.getRandomQuestion());
  this.resetQuestion();
}

QuizQuestion.prototype.questionText = function(elem,value){
  elem.innerHTML  = value;
}

QuizQuestion.prototype.resetQuestion = function() {
  this.answer_input.value = "";
  this.answer_input.focus();
}

QuizQuestion.prototype.init = function(elem) {
  this.questionText(elem,this.getRandomQuestion());
}
