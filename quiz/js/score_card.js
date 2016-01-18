var ScoreCard = function(score_table){
  this.heading = ["Number", "Question", "Answer", " User Answer", "State"];
  this.table = score_table;
  this.elemScore_card = document.getElementById("score_card");
  this.result_btn = document.getElementById("check-result");
}

ScoreCard.prototype.createNewElement = function (elem, id, className){
  elem = document.createElement(elem);
  elem.id = id;
  elem.className = className; 
  return elem;
}

ScoreCard.prototype.createTable = function(question_array) {
  this.table = this.createNewElement("table", "score_table", "table table-striped");
  this.table.appendChild(this.createNewElement("tbody", "", ""));
  this.table.childNodes[0].appendChild(this.createTableHeading());
  this.elemScore_card.appendChild(this.table);
}

ScoreCard.prototype.insertTableRow = function() {
  return this.table.insertRow();
}
ScoreCard.prototype.createTableHeading = function(){
  var count = 0;
  var tr = this.insertTableRow();
  
  while(count < this.heading.length) {
    var th = this.createNewElement("th", "", "heading");
    th.innerHTML = this.heading[count];
    tr.appendChild(th);
    count++;
  }
  return tr;
}

ScoreCard.prototype.createRows = function(question_array) {
  var count = 0;
  
  while(count < question_array.length) {
    this.insertTableRow();
    question_hash = question_array[count];

    for(hash_Key in question_hash) {
      var td = this.createNewElement("td", "", "");
      td.innerHTML = question_hash[hash_Key];
      this.table.rows[count+1].appendChild(td);
    }
    count++;
  }
}

ScoreCard.prototype.createScoreRow = function () {
 return this.createNewElement("tr", "", "score-row"); 
}

ScoreCard.prototype.checkResult = function (question_array) {
  var _this = this;
  this.result_btn.addEventListener("click", function(){
    _this.createRows(question_array);
    _this.elemScore_card.className = "show";
    this.style.display = "none";
  })
}

ScoreCard.prototype.init = function(question_array){
  this.createTable(question_array);
}