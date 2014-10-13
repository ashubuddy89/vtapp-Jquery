var ContactManager = function (){
  this.blockContaier = $(".result-listing");
  this.emailBox = $("#email");
  this.emailReg = /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9-]{2,}(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,4})$/;
}

ContactManager.prototype.createContactBlock = function (name, email) {
  return this.blockContaier.append($('<div class="user-data-block" data-search="'+name.toLowerCase()+'"><h4>'+name+'</h4><h6><a href="mailto:'+email+'">'+email+'</a></h6><button class="del">Delete</button></div>'));
}

ContactManager.prototype.buttonClickEvent = function () {
  var _this = this;
  $("#add-btn").on("click", function(){
    var nameVal = $("#name").val(),
        emailVal = $("#email").val();
    _this.validateBlankInput(nameVal, emailVal);
  })
}

ContactManager.prototype.deleteClickEvent = function () {
  $(".result-lsiting").delegate(".del", "click", function(){
    $(this).parents(".user-data-block").remove();
  })
}

ContactManager.prototype.searchResult = function (){
  $("#search").keyup(function(){
    var thisVal = $(this).val().toLowerCase().trim();
    $(".user-data-block").each(function(){
      var $this = $(this);
      if($this.data("search").search(thisVal) == 0){
        $this.show();
      }else{
        $this.hide();
      }
    })
  })
}

ContactManager.prototype.validateBlankInput = function(name, email){
  var _this = this;
  $(".require").each(function(){
    var $this = $(this),
        $validateData =  $this.data("validate");
    if($this.val().trim() == '')  {
      alert($this.data("name") + " can not be blank");
      $this.focus();
      return false;
    }

    if($validateData == "email"){
      if(_this.checkValidateEmail()){
        _this.createContactBlock(name, email);        
      }
    }
  })
}

ContactManager.prototype.checkValidateEmail = function(){
  var _this = this,
      email=this.emailBox.val();
    if(!this.emailReg.test( email )) {
      alert("Please enter valid email");
      return false;
    }
    else{
      return true;
    }
}

ContactManager.prototype.bindEvents = function (){
  this.buttonClickEvent();
  this.deleteClickEvent();
  this.searchResult();
}

$(function(){
  var contactManager = new ContactManager();
  contactManager.bindEvents();
})