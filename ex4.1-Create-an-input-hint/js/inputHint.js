var InputHint = function (elemLabel, elemInput, hintClass) {
  this.elemLabel = $(elemLabel);
  this.elemInput = $(elemInput);
  this.hintClass = hintClass;
}

InputHint.prototype.setInputValue = function () {
  var $labelText = this.elemLabel.text();
  this.elemInput.val($labelText);
  return this;
}

InputHint.prototype.addClassOnInput = function () {
  this.elemInput.addClass(this.hintClass);
  return this;
}

InputHint.prototype.removeLabel = function () {
  this.elemLabel.remove();
  return this;
}

InputHint.prototype.inputFocusEvent = function () {
  var _this = this;
  this.elemInput.bind("focus", function () {
    var thisVal = $(this).val();
    if (thisVal == "Enter search term"){
      _this.elemInput.removeClass(_this.hintClass).val("");
    }
  })
}

InputHint.prototype.inputBlurEvent = function () {
  var _this = this;

  this.elemInput.bind("blur", function () {
    if (_this.elemInput.val().trim() == "") {
      _this.setInputValue();
      _this.addClassOnInput();
    }
  })
}

InputHint.prototype.bindInputEvents = function () {
  this.inputFocusEvent();
  this.inputBlurEvent();
}

$(function () {
  var input_hint = new InputHint($("#search label"), $(".input_text"), "hint");
  input_hint.setInputValue()
            .addClassOnInput()
            .removeLabel()
            .bindInputEvents();
})