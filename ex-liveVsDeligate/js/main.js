var DynamicDiv = function (){
  this.stackDiv = $("#stack-container");
  this.rowStr = "<div class='row'>new</div>";
  this.counter = 1;
}

DynamicDiv.prototype.createNewDivRow = function(){
  this.stackDiv.prepend($(this.rowStr).text(this.counter++));
}

DynamicDiv.prototype.removeFirstRow = function(){
  var _this = this;
  this.stackDiv.delegate(".row:first", "click" , function(){
    $(this).remove();
    _this.counter--;
  })
}

DynamicDiv.prototype.addHighlightClassOnRow = function(){
  this.stackDiv.delegate(".row", "click" , function(){
    $(this).toggleClass("highlight");
  })
}

DynamicDiv.prototype.bindRowClickEvents = function(){
  this.removeFirstRow();
  this.addHighlightClassOnRow();
}

DynamicDiv.prototype.addNewRowEvent = function(){
  var _this = this;
  $(".add-item").on("click", function(){
    _this.createNewDivRow();
  })
}

DynamicDiv.prototype.init = function(){
  this.addNewRowEvent();
  this.bindRowClickEvents();
}

$(function(){
  var dynamic = new DynamicDiv();
  dynamic.init();
})
