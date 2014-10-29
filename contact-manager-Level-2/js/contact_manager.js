var ContactManager = function (param){
  this.paramAttributes = param;
}

ContactManager.prototype.emailReg = /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9-]{2,}(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,4})$/;

ContactManager.prototype.bindEvents = function (){
  this.addContactButtonClickEvent();
  this.deleteContactClickEvent();
  this.searchResult();
}

ContactManager.prototype.createContactBlock = function (name, email) {
  this.paramAttributes.blockContainer.append($("<div />").addClass(this.paramAttributes.userDataBlock)
                                                .attr('data-search', name.toLowerCase())
                                                .append($('<h4 />').text(name))
                                                .append($('<h6 />')
                                                .append($('<a />').attr('href', "mailto:" + email).text(email)))
                                                .append($('<button />').addClass(this.paramAttributes.delBtn).text('Delete'))
                                                );
}

ContactManager.prototype.addContactButtonClickEvent = function () {
  var _this = this;
  this.paramAttributes.addContactBtn.on("click", function(){
    var nameVal = _this.paramAttributes.nameInput.val(),
      emailVal = _this.paramAttributes.emailInput.val();
    
    _this.validateBlankInput(nameVal, emailVal);
  })
}

ContactManager.prototype.deleteContactClickEvent = function () {
  var _this =this;
  this.paramAttributes.blockContainer.delegate('.'+ _this.paramAttributes['delBtn'], "click", function(){
    $(this).parents('.'+ _this.paramAttributes['userDataBlock']).remove();
  })
}

ContactManager.prototype.searchResult = function (){
  var _this = this;
  this.paramAttributes.searchInputBox.keyup(function(){
    var thisVal = $(this).val().toLowerCase().trim();
    console.log(thisVal)

    $('.'+ _this.paramAttributes['userDataBlock']).each(function(){
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
  this.paramAttributes.required.each(function(){
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
        _this.makeFiledBlank();
        _this.scrollToLastContactBlock();
      }
    }
  })
}

ContactManager.prototype.scrollToLastContactBlock = function() {
  var lastContactBolckTopOffset = $('.'+this.paramAttributes.userDataBlock).last().offset().top;
  $(window).scrollTop(lastContactBolckTopOffset);
}

ContactManager.prototype.makeFiledBlank = function() {
  this.paramAttributes.required.val("");
}

ContactManager.prototype.validateEmail = function() {
  var _this = this,
      email= this.paramAttributes.emailInput.val();
  if(!this.emailReg.test( email )) {
    alert("Please enter valid email");
    return false;
  }
  else{
    return true;
  }
}

$(function(){
  var param = {
               userDataBlock : 'user-data-block',
               delBtn : 'delete',
               required : $('.required'),
               nameInput : $('.name'),
               emailInput : $('.email'),
               blockContainer : $('.result-listing'),
               addContactBtn : $('.add-contact'),
               searchInputBox : $('#search')
             },
      contactManager = new ContactManager(param);
  contactManager.bindEvents();
})