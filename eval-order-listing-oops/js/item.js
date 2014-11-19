var LineItem = function (){}

LineItem.prototype.createLineItemrHeader = function (orderID) {

  var $orderItemHeader = $('<tr />').addClass("order-block-title")
                                    .append(this.createOrderHeaderBlock(orderID))
                                    .append(this.createOrderHeaderBlock("Name"))
                                    .append(this.createOrderHeaderBlock("Qty"))
                                    .append(this.createOrderHeaderBlock("Price"))
                                    .append(this.createOrderHeaderBlock("Total Price"));
  return $orderItemHeader;
}

LineItem.prototype.createLineItem = function (orderID, itemName, itemQty, itemPrice, itemTotalPrice) {
  var $orderItemRow = $('<tr />').addClass("order-block")
                                 .append(this.createLineItemBlock(orderID))
                                 .append(this.createLineItemBlock(itemName))
                                 .append(this.createLineItemBlock(itemQty))
                                 .append(this.createLineItemBlock(itemPrice))
                                 .append(this.createLineItemBlock(itemTotalPrice).addClass("price"));

  return $orderItemRow;
}

LineItem.prototype.createOrderHeaderBlock = function (value){
  return $("<th />").text(value);
}

LineItem.prototype.createLineItemBlock = function (value){
  return $("<td />").text(value);
}


LineItem.prototype.createItemGrandTotalRow = function (totalPrice){
  var $grandTotal = $('<tr />').addClass("order-block-title bold")
                               .append(this.createLineItemBlock("Total").addClass("text-right pr20")                                         .attr("colspan",4))
                               .append(this.createLineItemBlock( totalPrice).addClass("total"));
  return $grandTotal;
}

