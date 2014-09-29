var ProductRate = function () {
  this.products = ['Coffee', 'Tea', 'Sodas'];
  this.likeOptions = ['Love it','Like it','No Views','Dislike it','Abhor it'];
  this.ratingContainer = $("#container");
  this.headingRow = $('<li class="heading" />');
}

ProductRate.prototype.createHeadingRow = function () {
  var _this = this;
  $(this.ratingContainer).append(this.headingRow);

  $.each(this.likeOptions, function (index) {
    $(_this.headingRow).append($('<strong/>').text(this).addClass("col heading-title").attr("id", "prod" + index))
  });
}

ProductRate.prototype.createRow = function (rowTitle, rowId) {
  return $('<li class="rating-row" id="row' + rowId + '"><strong class="col title">' + rowTitle + '</strong></li>');
}

ProductRate.prototype.createButton = function (name, ratingAttr, rowAttr) {
  return $('<label class="col radio-block"><input class="radio-btn" type="radio" name="' + name + '" data-rating="prod' + ratingAttr + '" data-row="row' + rowAttr + '"/></label>')
}

ProductRate.prototype.createProductRatingRow = function () {
  var _this = this;
  $.each(this.products, function (index) {
    var row = _this.createRow(this, index);
    $(_this.ratingContainer).append(row);

    //for radio button
    $.each(_this.likeOptions, function (index2) {
      row.append(_this.createButton(_this.products[index], index2, index));
    })
  });
}

ProductRate.prototype.init = function ()  {
  this.createHeadingRow();
  this.createProductRatingRow();
}

ProductRate.prototype.radioBtnClickEvent = function () {
  $(".radio-btn").on("click", function(){
    var $this = $(this),
        attrRating = $this.data("rating"),
        attrRow = $this.data("row");
    
    $(".heading-title.active, .rating-row.active").removeClass("active");
    $("#"+attrRating).addClass("active");
    $("#"+attrRow).addClass("active");
  });
}

ProductRate.prototype.rowTitleClickEvent = function () {
  $(".rating-row .col.title").on("click", function () {
    var $this = $(this),
        $parentElem  = $this.parent(".rating-row");
        checkedRadio = $parentElem.find(".radio-btn:checked"),
        checkedLength = $(checkedRadio).length;

    if(checkedLength){
      $(checkedRadio).trigger('click');
    }else{
      $parentElem.addClass("active").siblings(".rating-row").removeClass("active");
      $(".heading-title").filter(".active").removeClass("active");
    }
  });
}

ProductRate.prototype.headingTitleClickEvent = function () {
  $(".heading-title").on("click" , function(){
    var $this = $(this),
        $thisId = $this.attr("id"),
        $activeRow = $(".rating-row.active");
    if($activeRow.length){
      $activeRow.find(".radio-btn[data-rating=" + $thisId + "]").trigger('click');  
    }
  });
}

ProductRate.prototype.bindClickEvent = function () {
  this.radioBtnClickEvent();
  this.rowTitleClickEvent();
  this.headingTitleClickEvent(); 
}

$(function () {
  var product_rate = new ProductRate();
  product_rate.init();
  product_rate.bindClickEvent();
})