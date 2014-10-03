var ProductRate = function () {
  this.products = ['Coffee', 'Tea', 'Sodas'];
  this.likeOptions = ['Love it','Like it','No Views','Dislike it','Abhor it',];
  this.ratingContainer = $("#container");
  this.headingRow = $('<li class="heading" />');
}


ProductRate.prototype.createHeadingRow = function () {
  var _this = this;
  this.ratingContainer.append(this.headingRow);

  $.each(this.likeOptions, function (index) {
    $(_this.headingRow).append($('<strong/>').text(this).addClass("col heading-title").attr("id",this.replace(/\s+/g, '-')))
  });
}

ProductRate.prototype.createRow = function (rowTitle) {
  return $('<li class="rating-row"><strong class="col title" id="' + rowTitle + '">' + rowTitle + '</strong></li>');
}

ProductRate.prototype.createButton = function (name, ratingAttr) {
  return $('<label class="col radio-block"><input class="radio-btn" type="radio" name="' + name + '" data-rating="' + ratingAttr + '" data-product="' + name + '"/></label>')
}

ProductRate.prototype.createProductRatingRow = function () {
  var _this = this;
  $.each(this.products, function (index) {
    var row = _this.createRow(this, this);
    $(_this.ratingContainer).append(row);

    //for radio button
    $.each(_this.likeOptions, function (index2) {
      row.append(_this.createButton(_this.products[index], this.replace(/\s+/g, '-')));
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
        ratingAttr = $this.data("rating"),
        porducAttr = $this.data("product");    
        
    $(".col.active").removeClass("active");
    $("#"+ratingAttr + ", #" + porducAttr).addClass("active");
  });
}


ProductRate.prototype.rowTitleClickEvent = function () {
  $(".rating-row .col.title").on("click", function () {
    var $this = $(this),
        $parentElem  = $this.parent(".rating-row"),
        checkedRadio = $parentElem.find(".radio-btn:checked");
    
    $(".title.active, .heading-title.active").removeClass("active");
    $this.addClass("active");
    if(checkedRadio.length){
        $(".heading-title#"+checkedRadio.data("rating")).addClass("active")
    }
  });
}

ProductRate.prototype.headingTitleClickEvent = function () {
  $(".heading-title").on("click" , function(){
    var $this = $(this),
        $activeProduct = $(".rating-row .active");

    if($activeProduct.length){
      $this.addClass("active").siblings(".active").removeClass("active");
      $activeProduct.parent(".rating-row").find(".radio-btn[data-rating=" + $this.attr("id") + "]").prop("checked", true);
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