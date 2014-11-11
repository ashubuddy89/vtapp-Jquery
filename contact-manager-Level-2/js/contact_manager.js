var ContactManager = function (param){
  this.paramAttributes = param;
}


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
  

    
    if( !Validation.validateBlankInputs(_this.paramAttributes.required, "error") ){
      alert($(".error").data("name") + " cant be blank")
    } 
    else if( !Validation.validateEmail(_this.paramAttributes.emailInput, "error") ){
      alert($(".error").data("name") + " not valid")
    }
    else{
      _this.createContactBlock(nameVal, emailVal);
      _this.makeFiledBlank();
    }

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


ContactManager.prototype.scrollToLastContactBlock = function() {
  var lastContactBolckTopOffset = $('.'+this.paramAttributes.userDataBlock).last().offset().top;
  $(window).scrollTop(lastContactBolckTopOffset);
}

ContactManager.prototype.makeFiledBlank = function() {
  this.paramAttributes.required.val("");
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