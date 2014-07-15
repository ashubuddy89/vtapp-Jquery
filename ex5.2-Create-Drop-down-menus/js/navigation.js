var DropDown = function (elemLink) {
  this.elemLink = $(elemLink);
}

DropDown.prototype.hoverEvent = function () {
  this.elemLink.hover(function () {
      var $this = $(this),
          $subMenu = $this.find("ul");
      $this.addClass("hover");
      if ($subMenu.length) {
        $subMenu.stop().fadeIn();
      }
    },

    function () {
      $(this).removeClass("hover").find("ul").stop().fadeOut();
    }
  )
}

$(function () {
  var drop_down = new DropDown($("#nav li"));
  drop_down.hoverEvent();
})