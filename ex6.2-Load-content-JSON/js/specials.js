var JsonData = function(){
  this.$dataLoadElem = $('<div class="data-load" />');
  this.$titleElem = $('<h1 class="title" />');
  this.$textElem  = $('<h2 class="text" />');
  this.$imgElem = $('<div class="img"><img /></div>');
  this.$colorElem = $('<h3 class="color" />');
  this.$specials = $("#specials");
  this.cacheData = {};
}

JsonData.prototype.createDataInnerElements = function(){
  this.$dataLoadElem.append(this.$titleElem)
                    .append(this.$textElem)
                    .append(this.$imgElem)
                    .append(this.$colorElem);
}

JsonData.prototype.removeSubmitButton =  function(){
  this.$specials.find(".buttons").remove();
}

JsonData.prototype.loadJsonData = function(json, key){
  this.$dataLoadElem.fadeIn().css("background" , json[key].color);
  this.$titleElem.text(json[key].title);
  this.$textElem.text(json[key].text);
  this.$imgElem.find("img").attr("src", json[key].image);
  this.$colorElem.text(json[key].color);
}

JsonData.prototype.getDataWithAjaxRequest = function(value){
  var _this = this;
  $.getJSON('data/specials.json', function (json) {
    _this.cacheData = json;
    _this.loadJsonData(_this.cacheData, value);
  });
}

JsonData.prototype.getCahceData = function(value){
  this.loadJsonData(this.cacheData,value);
}

JsonData.prototype.bindClickEvent = function(){
  var _this = this;

  this.$specials.find("select").change(function(){
    var selectedOptionValue = $(this).val();

    if(selectedOptionValue){
      if ($.isEmptyObject(_this.cacheData)) {
        _this.getDataWithAjaxRequest(selectedOptionValue)
        _this.removeSubmitButton();
      } 
      else 
      {
        _this.getCahceData(selectedOptionValue);
      }
    }
  });
}

JsonData.prototype.createDataLoadElement = function(){
  this.$specials.find("form").after(this.$dataLoadElem);
}

$(function(){
  var json_data = new JsonData();

  json_data.createDataInnerElements();
  json_data.createDataLoadElement();
  json_data.bindClickEvent();
})
