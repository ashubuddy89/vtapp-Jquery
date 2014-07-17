var JsonData = function($titleElem, $textElem, $imgElem, $colorElem){
  this.$titleElem = $('<h1 class="title" />');
  this.$textElem  = $('<h2 class="text" />');
  this.$imgElem = $('<div class="img"></div>');
  this.$colorElem = $('<h3 class="color" />');
  this.cacheData = '';
}

JsonData.prototype.createDataElement = function(){
  $("#specials form").after('<div class="data-load" />');
}

JsonData.prototype.createElements = function(title, text, image, color){
  $(".data-load").css("background" , color)
                 .append(this.$titleElem.text(title))
                 .append(this.$textElem.text(text))
                 .append(this.$imgElem.html('<img src=' + image + ' />'))
                 .append(this.$colorElem.text(color));
}
  
JsonData.prototype.removeButton =  function(elem){
  $("#specials").find(".buttons").remove();
}

JsonData.prototype.loadJsonData = function(json, key){
  this.createElements(json[key].title, json[key].text, json[key].image, json[key].color);
}

JsonData.prototype.bindClickEvent = function(){
  var _this = this;

  $("#specials form select").change("option", function(event){
    event.preventDefault();
    var thisVal = $(this).val();
    if(thisVal){
      if (_this.cacheData) {
        _this.loadJsonData(_this.cacheData, thisVal);
      } 
      else 
      {
        $.getJSON('data/specials.json', function (json) {
          _this.cacheData = json;
          _this.removeButton();
          _this.loadJsonData(_this.cacheData, thisVal);
        });
      }
    }
  });
}

$(function(){
  var json_data = new JsonData();
      json_data.createDataElement();
      json_data.bindClickEvent();
})
