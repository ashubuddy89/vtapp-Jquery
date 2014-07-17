var Accordion = function ($elemLink, $toggleElem) {
  this.$elemLink = $elemLink;
  this.$toggleElem = $toggleElem;
}

Accordion.prototype.bindAccordionEvent = function () {
  var _this = this;
  this.$elemLink.on("click", function(event) {
    event.preventDefault();
    var $this = $(this),
      $parentElem = $this.closest("li");
    $parentElem.siblings("li").removeClass("active").find(_this.$toggleElem).filter(':visible').slideUp();
    $parentElem.addClass("active").find(_this.$toggleElem).slideDown();
  })
}

$(function() {
  var accordion = new Accordion($(".toggle_link"), $(".excerpt"));
  accordion.bindAccordionEvent();
})