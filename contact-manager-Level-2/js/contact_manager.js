var ContactManager = function (param){
  this.param = param;
  this.emailReg = /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9-]{2,}(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,4})$/;
}

ContactManager.prototype.bindEvents = function (){
  this.addContactButtonClickEvent();
  this.deleteContactClickEvent();
  this.searchResult();
}

ContactManager.prototype.createContactBlock = function (name, email) {
  return this.param.$blockContainer.append($('<div class="user-data-block" data-search="'+name.toLowerCase()+'"><h4>'+name+'</h4><h6><a href="mailto:'+email+'">'+email+'</a></h6><button class="del">Delete</button></div>'));
}

ContactManager.prototype.addContactButtonClickEvent = function () {
  var _this = this;
  $("#add-btn").on("click", function(){
    var nameVal = _this.param.$nameInput.val(),
        emailVal = _this.param.$emailInput.val();

    _this.validateBlankInput(nameVal, emailVal);
  })
}

ContactManager.prototype.deleteContactClickEvent = function () {
  this.param.$blockContainer.delegate(".del", "click", function(){
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
  this.param.$required.each(function(){
    var $this = $(this),
        $validateData =  $this.data("validate");
    if($this.val().trim() == '')  {
      alert($this.data("name") + " can not be blank");
      $this.focus();
      return false;
    }

    if($validateData == "email"){
      if(_this.validateEmail()){
        _this.createContactBlock(name, email);        
      }
    }
  })
}

ContactManager.prototype.validateEmail = function(){
  var _this = this,
      email= this.param.$emailInput.val();
    if(!this.emailReg.test( email )) {
      alert("Please enter valid email");
      return false;
    }
    else{
      return true;
    }
}

$(function(){
  var param = {$required:$(".required"), $nameInput:$("#name"), $emailInput:$("#email"), $blockContainer: $(".result-listing")},
      contactManager = new ContactManager(param);
  contactManager.bindEvents();
})