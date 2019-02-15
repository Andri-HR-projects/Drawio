/*
    Structure for the assignment 2 project
*/

// 1. Define a function namespave called drawio

// 2. Create an array to hold on the the shapes currently drawn
window.drawio = {
  shapes: [],
  selectedShape: 'rectangle', // !FIXME
  ctx: document.getElementById('canvas').getContext('2d'),
  selectedElement: null,
  availableShapes: {
    RECTANGLE: 'rectangle',
  },
};

$(function() {
  // Document is loaded and parsed

  function drawCanvas() {
    if (drawio.selectedElement) {
      drawio.selectedElement.render();
    }
    for (let i = 0; i < drawio.shapes.lenght; i++) {
      drawio.shapes[i].render();
    }
  }

  $('.sidebar--tool_list--tool').on('click', function() {
    $('.sidebar--tool_list--tool').removeClass('btn__active');
    $(this).addClass('btn__active');
    drawio.selectedShape = $(this).data('tool');
  });

  // mousedown
  $('#canvas').on('mousedown', function(mouseEvent) {
    switch (drawio.selectedShape) {
      case drawio.availableShapes.RECTANGLE:
        drawio.selectedElement = new Rectangle(
          {
            x: mouseEvent.offsetX,
            y: mouseEvent.offsetY,
          },
          0,
          0,
        );
        break;
    }
  });

  // mousemove
  $('#canvas').on('mousemove', function(mouseEvent) {
    if (drawio.selectedElement) {
      drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
      drawCanvas();
    }
  });

  // mouseup
});
