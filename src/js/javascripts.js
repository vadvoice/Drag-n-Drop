var dragElems = document.getElementsByClassName('drag-elem');
console.log(dragElems);
for (var i = 0; i < dragElems.length; i++) {
  dragElems[i].addEventListener('mousedown', (e) => {
      var dragElem = e.target;
      dragElem = filterDragElem(dragElem)

      dragElem.ondragstart = function() {
        return false;
      };

      dragElem.classList.add('taken');

      var coords = getCoords(dragElem);
      var shiftX = e.pageX - coords.left;
      var shiftY = e.pageY - coords.top;
      moveAt(e)
      dragElem.style.position = 'absolute';
      // move function
      function moveAt(e) {
        dragElem.style.left = e.pageX - shiftX + 'px';
        dragElem.style.top = e.pageY - shiftY + 'px';
      }

      document.onmousemove = function(e) {
        moveAt(e);

      }
      document.onmouseup = (e) => {
        dragElem.classList.remove('taken');
        searchPlace(e);
        document.onmousemove = null;
        dragElem.onmouseup = null
      }
      function searchPlace (e) {
        var elem = e.target;
        elem = filterDragElem(elem)
        elem.style.pointerEvents = 'none';
        var dropArea = document.elementFromPoint(e.pageX, e.pageY);
        elem.style.pointerEvents = 'auto';

        if( dropArea.className.search('drop-area') >= 0 ) {
          elem.style.position = 'relative';
          elem.classList.add('fall');
          dropArea.appendChild(elem.parentNode);
          elem.style.left = 0;
          elem.style.top = 0;
        }
      }
  })
}

// get element coords
function getCoords(elem) {
  return elem.getBoundingClientRect();
}
// filter elements
function filterDragElem(dragElem) {
  while( dragElem.className.search('drag-elem') < 0 ) {
    dragElem = dragElem.parentNode
    if (dragElem.nodeName == "BODY") {
      return
    }
  }
  return dragElem;
}
