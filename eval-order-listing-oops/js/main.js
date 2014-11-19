var OrderList = function (){
  this.$productContainer = $(".product-container");
  
  this.order = '{ "Order Id - 145":[{"id":"121","name":"Ashu","qty":"20","price":"5"}, {"id":"212","name":"Motorolla","qty":"2","price":"10"}, {"id":"222","name":"LG","qty":"5","price":"20"}],"order Id - 2":[{"id":"231","name":"Dikshu Lumia","qty":"20","price":"10"}, {"id":"202","name":"Xolo","qty":"5","price":"150"}, {"id":"212","name":"Google","qty":"5","price":"200"}],"order Id - 21":[{"id":"231","name":"kNokia Lumia","qty":"20","price":"5"}, {"id":"202","name":"kXolo","qty":"5","price":"15"}, {"id":"212","name":"kGoogle","qty":"5","price":"10"}] }'
}

OrderList.prototype.createOrderContanier = function (elem) {
  return $table = $("<table />");
}

OrderList.prototype.getOrder = function() {
  var _this = this;
  var obj = $.parseJSON(_this.order);
  var grandTotal = 0;

  $(obj).each(function(item, value){
    $.each(value, function(orderId, objItem){
      var $orderTable = _this.createOrderContanier(),
          itemNameList = "";

      grandTotal = 0;
          
      orderContainer = new OrderContainer($orderTable, "order-item-list");
      _this.$productContainer.append(orderContainer.containerTag.addClass(orderContainer.elemClass));
      $orderTable.append(orderContainer.getLineItemHeader(orderId));
      
      $.each(objItem, function(index, object){
        var totalPrice = _this.totalPrice(object.qty, object.price);
        grandTotal = grandTotal + _this.totalPrice(object.qty, object.price);
        itemNameList = itemNameList+object.name.toLowerCase()+ " " ;

        _this.getItemRow(objItem, index, object, totalPrice, $orderTable, itemNameList, object.qty, object.price);
      })
      
      $orderTable.append(orderContainer.getLineItemTotalPrice( grandTotal ));
    }); 
  });
}

OrderList.prototype.getItemRow = function (elem, index, object, totalPrice, orderTable, itemNameList, itemQty, itemPrice) {
  var _this = this;
  totalPrice = parseInt(totalPrice);
  $(orderTable).append(orderContainer.getLineItem(object.id, object.name, object.qty, object.price, totalPrice));
  $(orderTable).attr("data-name",itemNameList);
}


OrderList.prototype.totalPrice = function (itemQty, itemPrice){
  var totalPrice = parseInt(itemQty*itemPrice);
  return totalPrice;
}

OrderList.prototype.searchButtonKeyUpEvent = function (){
  var _this = this;
  $("#search").on("keyup", function(){
      var thisVal = $(this).val().toLowerCase().trim();
      _this.searchResultByTable(thisVal)
  })
}

OrderList.prototype.searchResultByTable = function (searchText, searchElems) {
  if(searchText.length > 0){
      $(".order-item-list").hide();
      $('.order-item-list[data-name*="'+searchText+'"]').show();
    }else{
      $(".order-item-list").show();
  }
}


OrderList.prototype.init = function () {
  this.getOrder();
  this.searchButtonKeyUpEvent();
}

$(function(){  
  var orderlist = new OrderList();
  orderlist.init();
})