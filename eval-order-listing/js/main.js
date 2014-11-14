var OrderList = function (){
  this.$productContainer = $(".product-container");
  
  this.order = '{ "Order Id - 145":[{"id":"121","name":"Nokia","qty":"20","price":"10"}, {"id":"212","name":"Motorolla","qty":"5","price":"200"}, {"id":"222","name":"LG","qty":"5","price":"200"}],"order Id - 2":[{"id":"231","name":"Nokia Lumia","qty":"20","price":"10000"}, {"id":"202","name":"Xolo","qty":"5","price":"150"}, {"id":"212","name":"Google","qty":"5","price":"200"}],"order Id - 21":[{"id":"231","name":"kNokia Lumia","qty":"20","price":"10000"}, {"id":"202","name":"kXolo","qty":"5","price":"150"}, {"id":"212","name":"kGoogle","qty":"5","price":"210"}] }'
}

OrderList.prototype.createOrderListing = function(id, item){
  this.$productContainer.append($("<li />").addClass("order-item-list")
                                           .append($('<h4 />').text("order " + item.id))
                                           .append($('<h6 />').text(item.name))
                                          );
}

OrderList.prototype.getOrder = function(i) {
  var _this = this;
  var obj = $.parseJSON(_this.order);

  $(obj).each(function(item, value){
    $.each(value, function(orderId, objItem){
      var $orderTable = $("<table />");
      var itemNameArray = "";
      _this.$productContainer.append($orderTable.addClass("order-item-list")
                                                .append($("<tr />").addClass("order-block-title")
                                                                   .append($("<th/>").text(orderId))
                                                                   .append($("<th />").text("Name"))
                                                                   .append($("<th />").text("Qty"))
                                                                   .append($("<th />").text("Price"))
                                                                   .append($("<th />").text("Total Price"))
                                                  ));
      $.each(objItem, function(m, object){
       
        $orderTable.append($("<tr />").attr("data-priority", object.price).addClass("order-block").attr("data-name", object.name.toLowerCase())
                                 .append($("<td />").text(object.id))
                                 .append($("<td />").text(object.name))
                                 .append($("<td />").text(object.qty))
                                 .append($("<td />").text(parseInt(object.price)))
                                 .append($("<td />").addClass("price").text(parseInt(object.price*object.qty)))
                                 );
        
        itemNameArray = itemNameArray+object.name.toLowerCase()+ " " ;
        $orderTable.attr("data-name",itemNameArray)
      });

      $orderTable.append($("<tr />").addClass("order-block-title bold")
                              .append($("<td />").addClass("text-right pr20").attr("colspan",4).text("Total"))
                              .append($("<td />").addClass("total").text("Gran Total")));
      _this.itemsTotal();
    }); 
  });
}

OrderList.prototype.searchButtonKeyUpEvent = function (){
  var _this = this;
  $("#search").on("keyup", function(){
      var thisVal = $(this).val().toLowerCase().trim();
      _this.searchResultByTable(thisVal)
  })
}

//searching by table
OrderList.prototype.searchResultByTable = function (searchText, searchElems) {
    if(searchText.length > 0){
        $(".order-item-list").hide();
        $('.order-item-list[data-name*="'+searchText+'"]').show();
      }else{
        $(".order-item-list").show();
    }
}


//searching by rows
OrderList.prototype.searchResultByRows = function (searchText, searchElems) {
    if(searchText.length > 0){
        $(".order-item-list").hide();
        $('.order-block[data-name^="'+searchText+'"]').parents("table").show();
      }else{
        $(".order-item-list").show();
    }
}


OrderList.prototype.itemsTotal = function(){
  $(".order-item-list").each(function(){
    var total = 0;
    $(this).find(".price").each(function(){
      total = total + parseInt($(this).text());
      $(this).parents(".order-item-list").find(".total").text(total)
    })    
  })
}

$(function(){  
  var orderlist = new OrderList();
  orderlist.getOrder();
  orderlist.searchButtonKeyUpEvent();
})