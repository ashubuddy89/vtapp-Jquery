var DynamicDiv = function (){
  this.stackDiv = $("#stack-container");
  this.rowStr = "<div class='row'>new</div>"
}


DynamicDiv.prototype.createNewDivRow = function(){
  this.stackDiv.prepend($(_this.rowStr).text($(".row").size()+1));
}

DynamicDiv.prototype.removeFirstRow = function(){
  this.stackDiv.delegate(".row:first","click", function(){
    $(this).remove();
  })
}

DynamicDiv.prototype.addHighlightClassOnRow = function(){
  this.stackDiv.delegate(".row","click", function(){
    $(this).toggleClass("highlight");
  })
}

DynamicDiv.prototype.bindRowClickEvents = function(){
  this.removeFirstRow();
  this.addHighlightClassOnRow();
}

DynamicDiv.prototype.addNewRowEvent = function(){
  _this = this;
  $(".add-item").on("click", function(){
    _this.createNewDivRow();
  })
}

$(function(){
  var dynamic = new DynamicDiv();
  dynamic.addNewRowEvent();
  dynamic.bindRowClickEvents();
})