var $divClassModule;
console.log("1. Select all of the div elements that have a class of module.")
console.log($divClassModule = $('div.module'));

var $myListItem;
console.log("2. Come up with three selectors that you could use to get the third item in the #myList unordered list. Which is the best to use? Why?")
console.log($myListItem = $('#myList li').eq(2));
console.log($myListItem = $('#myList li:nth-child(3)')); // it directly searches the elements.
console.log($myListItem = $('#myList').find("#myListItem"));

var $searchLabel;
console.log("3. Select the label for the search input using an attribute selector.")
console.log($searchLabel = $('label[for = "q"]'));

var $findHiddenElements;
console.log("4. Figure out how many elements on the page are hidden")
console.log($findHiddenElements = $(':hidden').length);

var $findImageWithAltAttr;
console.log("5. Figure out how many image elements on the page have an alt attribute.")
console.log($findImageWithAltAttr = $('img[alt]').length);

var $tableOddRows;
console.log("6. Select all of the odd table rows in the table body.")
console.log($tableOddRows = $('table tr:odd'));