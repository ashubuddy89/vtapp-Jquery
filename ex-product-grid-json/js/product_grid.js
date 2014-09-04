var ProductFilter = function(){
  this.$productContainer = $("#product-container");
  this.$filterBox = $(".left-container .filter-box");
  this.filterArray = [];
}

ProductFilter.prototype.createFilterProductListing = function(id, item){
  this.$productContainer.append( "<li id='" + id + "' class='product-img' data-color = '" + item.color + "' data-brand = '" + item.brand + "' data-sold = '" + item.sold_out + "'><img src=images/" + item.url + " /></li>" );
}

ProductFilter.prototype.jsonData = function(){
  var _this = this;
  $.getJSON( "data/product.json", function( json ) {
    $.each( json, function(index) {
      _this.createFilterProductListing(index, this);
    });
  });  
}

ProductFilter.prototype.filterData = function(filterElem){
  var _this = this;
  this.$filterBox.each(function(){
    _this.filterArray = [];
    var $currentFilter = $(this),
        checkedInput = $currentFilter.find("input[name='" + $currentFilter.attr("id") + "']:checked");
    if(checkedInput.length > 0){
      _this.storeDataArray(checkedInput, $currentFilter);
      
      //join array
      filterElem = filterElem.filter(_this.filterArray.join());
    }
  })
  return filterElem;
}

ProductFilter.prototype.storeDataArray = function(elem, thisElem){
  var _this = this;
  elem.each(function(){
    _this.filterArray.push("[data-" + thisElem.attr('id') + " = '" + $(this).attr('data-' + thisElem.attr("id")) + "']");
  });
}

ProductFilter.prototype.bindFilterClickEvent = function(){
  var _this = this;
  this.$filterBox.on("change", function(){
    var $filterElem = _this.$productContainer.find("li.product-img");
    $filterElem.hide();
    $filterElem = _this.filterData($filterElem);  
    $filterElem.show();
  })
}

$(function(){
  var filter = new ProductFilter(); 
  filter.jsonData();
  filter.bindFilterClickEvent();
})