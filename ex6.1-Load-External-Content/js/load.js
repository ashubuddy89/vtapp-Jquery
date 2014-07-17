var LoadAjaxData = function ($elemLink) {
  this.$elemLink = $elemLink;
}


LoadAjaxData.prototype.createTargetElement = function(){
  var _this = this;
  this.$elemLink.each(function(){
    var $targetElem = $('<div class="data_load"></div>') 
    $(this).data('target', $targetElem);
    $(this).closest("h3").after($targetElem);
  })
}

LoadAjaxData.prototype.bindLoadEvent = function () {
  var _this = this;
  this.$elemLink.on("click", function(event) {
    event.preventDefault();
    var $this = $(this),
        thisAttrDataPage = $this.attr("data-page");
    $this.data('target').load('data/blog.html ' + thisAttrDataPage);
  })
}

$(function() {
  var load_ajax_data = new LoadAjaxData($("#blog h3 > a"));
  load_ajax_data.createTargetElement();
  load_ajax_data.bindLoadEvent();
})