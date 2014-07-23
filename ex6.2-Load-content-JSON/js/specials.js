var JsonData = function(){
  this.$dataLoadElem = $('<div class="data-load" />');
  this.$titleElem = $('<h1 class="title" />');
  this.$textElem  = $('<h2 class="text" />');
  this.$imgElem = $('<div class="img"></div>');
  this.$colorElem = $('<h3 class="color" />');
  this.$specials = $("#specials");
  this.cacheData = {};
}

JsonData.prototype.createDataInnerElements = function(){
  this.$dataLoadElem.append(this.$titleElem)
                    .append(this.$textElem)
                    .append(this.$imgElem.html('<img src="" />'))
                    .append(this.$colorElem);
}

JsonData.prototype.removeButton =  function(){
  this.$specials.find(".buttons").remove();
}

JsonData.prototype.loadJsonData = function(json, key, title, text, image, color){
  this.$dataLoadElem.fadeIn().css("background" , json[key].color);
  this.$titleElem.text(json[key].title);
  this.$textElem.text(json[key].text);
  this.$imgElem.find("img").attr("src", json[key].image);
  this.$colorElem.text(json[key].color);
}

JsonData.prototype.bindClickEvent = function(){
  var _this = this;

  this.$specials.find("select").change(function(event){
    var selectedOptionValue = $(this).val();

    if(selectedOptionValue){
      if ($.isEmptyObject(_this.cacheData)) {
        $.getJSON('data/specials.json', function (json) {
          _this.cacheData = json;
          _this.removeButton();
          _this.loadJsonData(_this.cacheData, selectedOptionValue);
        });
       // console.log("non cache data");
      } 
      else 
      {
        _this.loadJsonData(_this.cacheData, selectedOptionValue);
        //console.log("cache data");
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
