var TabNavigation = function (elemHide) {
  this.elemHide = $(elemHide);
  this.newUnorderList = $("<ul class='tab_nav'></ul>");
}

TabNavigation.prototype.hideAllModule = function () {
  var _this = this;
  _this.elemHide.hide();
}

TabNavigation.prototype.createNewTabList = function () {
  this.newUnorderList.insertBefore(this.elemHide.first());
  this.createNewListElements();
}

TabNavigation.prototype.createNewListElements = function () {
  var _this = this;
  this.elemHide.each(function () {
    var elemText = $(this).find("h2").text(),
      $newUnorderListItem = $('<li class="tablink" data-nav=#' + elemText.toLowerCase() + '><span>' + elemText + '</span></li>');
    _this.newUnorderList.append($newUnorderListItem);
  });
}

TabNavigation.prototype.cssTabNavigation = function () {
  this.cssTabNavUl();
  this.cssTabElementsLi();
}

TabNavigation.prototype.cssTabNavUl = function () {
  this.newUnorderList.css({
    listStyle: "none",
    margin: 0,
    width: 100 + "%",
    clear: "both",
    overflow: "hidden",
  });
}

TabNavigation.prototype.cssTabElementsLi = function () {
  this.newUnorderList.find("li").css({
    float: "left",
    ovrflow: "hidden",
    padding: 10,
    background: "#f2f2f2",
    marginRight: 5,
    cursor: "pointer"
  });
}

TabNavigation.prototype.tabClickEvent = function () {
  $(".tablink").click(function () {
    var $this = $(this),
      thisAttr = $this.attr("data-nav");
    $this.addClass("current").siblings(".tablink").removeClass("current");
    $(thisAttr).show().siblings(".module").hide();
  });
}

TabNavigation.prototype.initShowFirstTabData = function () {
  this.newUnorderList.find("li:first").addClass("current");
  this.elemHide.first().show();
}

TabNavigation.prototype.bindTabNavigationEvents = function () {
  this.initShowFirstTabData();
  this.tabClickEvent();
}

$(function () {
  var tab_nav = new TabNavigation($(".module"));
  tab_nav.hideAllModule();
  tab_nav.createNewTabList();
  tab_nav.cssTabNavigation();
  tab_nav.bindTabNavigationEvents();
})