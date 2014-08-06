var ProductFilter = function(){
  this.$productContainer = $("#product-container");
  this.$filterBox = $(".left-container .filter-box");
}

ProductFilter.prototype.createFilterProductListing = function(json, key){
  this.$productContainer.append( "<li id='" + json + "' class='product-img' data-color = '"+ key.color + "' data-brand = '" + key.brand+ "' data-sold = '" + key.sold_out + "'><img src=images/"+key.url+" /></li>" );
}

ProductFilter.prototype.jsonData = function(){
  var _this = this;
  $.getJSON( "data/product.json", function( json ) {
    $.each( json, function( json, key ) {
      _this.createFilterProductListing(json, key);
    });
  });  
}

ProductFilter.prototype.filterData = function(filterBox, filterElem){
  $(filterBox).each(function(){
    var filterArray = [],
        $currentFilter = $(this);
        checkedInput = $currentFilter.find("input[name='"+$currentFilter.attr("id")+"']:checked");

    if(checkedInput.length > 0){
      checkedInput.each(function(){
        filterArray.push("[data-"+$currentFilter.attr('id')+" = '"+$(this).attr('data-'+$currentFilter.attr("id"))+"']");
      })
      filterElem = filterElem.filter(filterArray.join());
    }
  })
  return filterElem;
}

ProductFilter.prototype.bindFilterClickEvent = function(){
  var _this = this;
  this.$filterBox.on("change", function(){
    var $filterElem = _this.$productContainer.find("li.product-img");
    $filterElem.hide();
    $filterElem = _this.filterData(_this.$filterBox, $filterElem);  
    $filterElem.show();
  })
}

$(function(){
  var filter = new ProductFilter(); 
  filter.jsonData();
  filter.bindFilterClickEvent();
})