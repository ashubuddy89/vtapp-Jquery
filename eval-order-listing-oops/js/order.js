var OrderContainer = function (containerTag, elemClass){
  this.containerTag = containerTag;
  this.elemClass = elemClass;
  this.lineitem = new LineItem();
}

OrderContainer.prototype.getLineItemHeader = function (orderID) {
  return this.lineitem.createLineItemrHeader(orderID);
}


OrderContainer.prototype.getLineItem = function (orderID, itemName, itemQty, itemPrice, itemTotalPrice) {
  return this.lineitem.createLineItem(orderID, itemName, itemQty, itemPrice, itemTotalPrice);
}

OrderContainer.prototype.getLineItemTotalPrice = function (totalPrice) {
  return this.lineitem.createItemGrandTotalRow(totalPrice);
}
