

$.getJSON( "data/product.json", function( data ) {
  var items = [];
  $.each( data, function( data, key ) {
    $("#product-container").append( "<li id='" + data + "' class='product-img' data-color = '"+ key.color + "' data-brand = '" + key.brand+ "' data-sold = '" + key.sold_out + "'><img src=images/"+key.url+" /></li>" );
  });
});

$(".filter-box li .filter-checkbox").change(function(){

    if($(".filter-checkbox:checked").length ){
      $(".filter-checkbox:checked").each(function(index){
        var thisFilterDataName = $(this).attr("data-name");
        var selectedFilterValue = $(this).attr('data-' + thisFilterDataName);
        var dataArray = [];        
        // console.log(thisFilterDataName +"\n"+ selectedFilterValue)
        // console.log($("#product-container").children("li[data-"+thisFilterDataName+"='" + selectedFilterValue + "']"));
        // $("#product-container").children("li").filter("li[data-"+thisFilterDataName+"='" + selectedFilterValue + "']").addClass("show");
        $("#product-container li").each(function(){
          if($(this).attr('data-'+thisFilterDataName) == selectedFilterValue){
            dataArray.push(this)
            $(this).addClass("show")
          }
        })
      })
    }else{
      $("#product-container li").removeClass("show");
    }
})
