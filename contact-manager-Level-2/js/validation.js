var Validation = {
  
  EMAAILREG : /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9-]{1,}(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,4})$/,

  validateBlankInputs : function (elem, classError) {
    var status = true;
    
    elem.each(function(){
      var $this = $(this);

      if($this.val().trim().length) {
        $this.removeClass(classError);        
        status = true;
      }else{
        $this.focus().addClass(classError)
        status = false;
      }
      return status;
    })

    return status;
  },


  validateEmail : function(emailElem, classError) {
     var status = true,
      email = emailElem.val();
    
    if( !this.EMAAILREG.test(email) ) {
      emailElem.focus().addClass(classError);
      status = false;
    }

   return status;
  }
}