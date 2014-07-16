var SlideShow = function (slideContainer, slideElem) {
  this.slideContainer = $(slideContainer);
  this.slideElem = $(slideElem);
  this.slideElemLength = this.slideElem.length;
  this.currentItem = 0;     
  this.fadeTime = 2500;
  this.InitialFadeTime = 1000;
  this.itemInterval = 5000;
}

SlideShow.prototype.setSlideShowPosition = function() {
  $("body").prepend(this.slideContainer);
}

SlideShow.prototype.createSlideShowNav = function() {
  this.slideContainer.after('<div class="slide_nav"><span class="active"></span>/'+this.slideElemLength+'</div>');
  this.setActiveElemNumber();
}

SlideShow.prototype.setActiveElemNumber = function(){
  $(".slide_nav .active").text(this.currentItem + 1);
}

SlideShow.prototype.setInitialSlideElem = function() {
  this.slideElem.eq(this.currentItem).fadeIn(this.InitialFadeTime);
}

SlideShow.prototype.bindSlideShow = function() {
  this.setInitialSlideElem();
  this.setSlideInterval();
}

SlideShow.prototype.setSlideInterval = function() {
  var _this = this;
  setInterval(function(){
    if ( _this.currentItem == _this.slideElemLength - 1 ){
      _this.currentItem = 0;
    }else{
        _this.currentItem++;
    }
    _this.slideElem.eq(_this.currentItem).fadeIn(_this.fadeTime).siblings(_this.slideElem).fadeOut(_this.fadeTime);
    _this.setActiveElemNumber();
  }, _this.itemInterval);
}


$(function () {
  var slide_show = new SlideShow($("#slideshow"), $("#slideshow > li"));
  slide_show.setSlideShowPosition();
  slide_show.createSlideShowNav();
  slide_show.bindSlideShow();
})