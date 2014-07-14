//1. Add five new list items to the end of the unordered list #myList.
for (i = 0; i < 5; i++) {
  var listLenght = $("#myList li").length + 1;
  $("#myList").append("<li>List Item " + listLenght + "</li>")
}


//2. Remove the odd list items
$("li:odd").remove();


//3. Add another h2 and another paragraph to the last div.module
var $newHeading = "<h2>Heading</h2>";
var $newParagraph = "<p>A new Paragraph added</p>";
$("div.module:last").append($newHeading);
$("div.module:last").append($newParagraph);


//4. Add another option to the select element; give the option the value "Wednesday"
$("select option:eq(2)").after('<option value="wednesday">Wednesday</option>');


//5. Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it.
$("div.module:last").after('<div class="module"><h2>New image added<h2/>',$("img:first").clone(),'</div>');