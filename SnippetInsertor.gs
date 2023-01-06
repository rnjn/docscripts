function insertSnippet() {
  var thisDoc = DocumentApp.getActiveDocument();
  var thisBody = thisDoc.getBody();
  var cursor = thisDoc.getCursor();
  var insertAt = thisBody.getChildIndex(cursor.getElement());
  Logger.log(insertAt);

  var snippet = DocumentApp.openById('1TVXfHRJ3cp67X1Bh0ATx962FUgUJ-a0ZMGgQTYlEhaU').getBody().copy();
  var itemsToCopy = snippet.getNumChildren();
  for(var i=0; i< itemsToCopy; i++){
    var itemToCopy = snippet.getChild(i).copy();
    var elementType = itemToCopy.getType();
    Logger.log(itemToCopy.getType());
    switch (elementType){
      case DocumentApp.ElementType.PARAGRAPH :
        thisBody.insertParagraph(insertAt + i, itemToCopy);
        break;
      case DocumentApp.ElementType.LIST_ITEM :
        thisBody.insertListItem(insertAt + i, itemToCopy);
        break;
      case DocumentApp.ElementType.TABLE :
        thisBody.insertTable(insertAt + i, itemToCopy);
        break;
      default:
        Logger.log("unknown element type to insert");
        break;
    }
  }
}


function addMenu() {
  DocumentApp.getUi().createMenu('Snippets')
  .addItem('Insert 1:1', 'insertSnippet')
  .addToUi();  
}

function onOpen() {
  addMenu();
}
