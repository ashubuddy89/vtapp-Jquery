var InputHint = function(elemLabel, elemInput, hintClass){
  this.elemLabel = $(elemLabel);
  this.elemInput = $(elemInput);
  this.hintClass = hintClass;
}

InputHint.prototype.setInputValue = function () {
  var $labelText = $(this.elemLabel).text();
  this.elemInput.val($labelText);
}

InputHint.prototype.addClassOnInput = function () {
  this.elemInput.addClass(this.hintClass);
}

InputHint.prototype.removeLabel = function () {
  this.elemLabel.remove();
}

InputHint.prototype.inputFocusEvent = function (){
  var _this = this;
  this.elemInput.bind("focus", function (){
    $(this).removeClass(_this.hintClass).val("");
  })
}

InputHint.prototype.inputBlurEvent = function () {
  var _this = this;
  this.elemInput.bind("blur", function () {
    if($(this).val().trim() == ""){
       _this.setInputValue();
       _this.addClassOnInput();
    }
  })
}

InputHint.prototype.bindInputEvents = function(){
  this.inputFocusEvent();
  this.inputBlurEvent();
}

var input_hint = new InputHint($("#search label"), $(".input_text"), "hint");
input_hint.setInputValue();
input_hint.addClassOnInput();
input_hint.removeLabel();
input_hint.bindInputEvents();