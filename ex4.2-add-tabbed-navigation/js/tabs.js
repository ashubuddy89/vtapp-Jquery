var TabNavigation = function (elemHide, tabsLinkClass) {
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
    var elemText = $(this).find("h2").text();
    var $newUnorderListItem = $('<li class="tablink" data-nav=#' + elemText.toLowerCase() + '><span>' + elemText + '</span></li>')
    _this.newUnorderList.append($newUnorderListItem);
  });
}

TabNavigation.prototype.cssTabsNavigation = function () {
  this.cssTabsNavUl();
  this.cssTabElementsLi();
}

TabNavigation.prototype.cssTabsNavUl = function () {
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

TabNavigation.prototype.tabsClickEvent = function () {
  $(".tablink").on("click", function () {
    var $this = $(this);
    var thisAttr = $this.attr("data-nav");
    $this.addClass("current").siblings(".tablink").removeClass("current");
    $(thisAttr).show().siblings(".module").hide();
  });
}

TabNavigation.prototype.initShowFirstTabData = function () {
  this.newUnorderList.find("li:first").addClass("current");
  var firstTabAttr = this.newUnorderList.find("li:first").attr("data-nav");
  $(firstTabAttr).show();
}

TabNavigation.prototype.bindTabsNavigationEvents = function () {
  this.initShowFirstTabData();
  this.tabsClickEvent();
}

var tab_nav = new TabNavigation($(".module"));
tab_nav.hideAllModule();
tab_nav.createNewTabList();
tab_nav.cssTabsNavigation();
tab_nav.bindTabsNavigationEvents();