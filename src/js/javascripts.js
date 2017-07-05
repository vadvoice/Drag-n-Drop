var dragElems = document.getElementsByClassName('drag-elem');
for (var i = 0; i < dragElems.length; i++) {
  dragElems[i].addEventListener('mousedown', (e) => {
    if (e.which != 1) { // right click
      return;
    }
    var dragElem = e.target;
    dragElem = filterDragElem(dragElem, 'drag-elem')

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

      // super rules
      if ( parseFloat(dragElem.style.left) < 0 ) {
        dragElem.style.left = 0
      }
      if ((parseFloat(dragElem.style.left) + dragElem.offsetWidth) > window.innerWidth) {
        dragElem.style.left = window.innerWidth - dragElem.offsetWidth + 'px'
      }
      if (parseFloat(dragElem.style.top) < 0 ) {
        dragElem.style.top = 0
      }
      if ( (parseFloat(dragElem.style.top) + dragElem.offsetHeight) > window.innerHeight ) {
        dragElem.style.top = window.innerHeight - dragElem.offsetHeight + 'px'
      }
    }

    document.onmousemove = function(e) {
      moveAt(e);
      var area = searchPlace(e);
      if( area.className.search('drop-area') >= 0 ) {
        // do something anrial
      }
    }
    document.onmouseup = (e) => {
      dragElem.classList.remove('taken');
      dropArea = searchPlace(e);
      elem = filterDragElem(e.target, 'drag-elem')
      document.onmousemove = null;
      dragElem.onmouseup = null;

      if( dropArea.className.search('drop-area') >= 0 ) {
        elem.style.position = 'relative';
        elem.classList.add('fall');
        dropArea.appendChild(elem );
        elem.style.left = 0;
        elem.style.top = 0;
      } else {
        setTimeout( ()=>{
          var dragArea = document.getElementsByClassName('drag-area')[0];
          dragArea.appendChild(elem)
          elem.style.animation = 'hide .3s'
          setTimeout( ()=>{
            elem.style.position = 'relative';
            elem.style.left = 0;
            elem.style.top = 0;
          }, 300)

        }, 200)
      }
    }
  })
}

// get element coords
function getCoords(elem) {
  return elem.getBoundingClientRect();
}

// filter elements
function filterDragElem(dragElem, searchClass) {
  while( dragElem.className.search(searchClass) < 0 ) {
    dragElem = dragElem.parentNode
    if (dragElem.nodeName == "BODY") {
      return
    }
  }
  return dragElem;
}

// search elements
function searchPlace (e) {
  var elem = e.target;
  elem = filterDragElem(elem, 'drag-elem')
  elem.style.pointerEvents = 'none';
  var dropArea = document.elementFromPoint(e.pageX, e.pageY);
  elem.style.pointerEvents = 'auto';
  return dropArea;
}
