/*
    Structure for the assignment 2 project
*/

// 1. Define a function namespave called drawio

// 2. Create an array to hold on the the shapes currently drawn
window.drawio = {
  shapes: [],
  pointx: [],
  pointy: [],
  selectedShape: 'rectangle', // !FIXME
  canvas: document.getElementById('canvas'),
  ctx: document.getElementById('canvas').getContext('2d'),
  selectedElement: null,
  availableShapes: {
    RECTANGLE: 'rectangle',
    CIRCLE: 'circle',
    PENCIL: 'pencil',
  },
  selectedColor: '#000',
  selectedFill: true,
  selectedLineWidth: 12,
  selectedFontSize: '28px',
  selectedFont: 'Ariel',
  selectedText: ' ',
};

$(function () {
  // Document is loaded and parsed

  function drawCanvas() {
    if (drawio.selectedElement) {
      drawio.selectedElement.render();
    }
    for (let i = 0; i < drawio.shapes.length; i++) {
      drawio.shapes[i].render();
    }
  }

  $('.sidebar--tool_list--tool').on('click', function () {
    $('.sidebar--tool_list--tool').removeClass('btn__active');
    $(this).addClass('btn__active');
    drawio.selectedShape = $(this).data('tool');
    console.log($(this).data('tool'));
  });

  $('.sidebar--settings--input-color').on('change', function () {
    drawio.selectedColor = $(this)[0].value;
  });
  $('.sidebar--settings--input-lineWidth').on('change', function () {
    drawio.selectedLineWidth = $(this)[0].value;
  });
  $('.sidebar--settings--input-fontSize').on('change', function () {
    drawio.selectedFontSize = $(this)[0].value + "px";
  });
  $('.sidebar--settings--input-fontType').on('change', function () {
    drawio.selectedFontType = $(this)[0].value;
    console.log(drawio.selectedFontType);
  });
  $('.sidebar--settings--input-text').on('change', function () {
    drawio.selectedText = $(this)[0].value;
    console.log(drawio.selectedText);
  });



  // mousedown
  $('#canvas').on('mousedown', function (mouseEvent) {
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
      case drawio.availableShapes.CIRCLE:
        drawio.selectedElement = new Circle(
          {
            x: mouseEvent.offsetX,
            y: mouseEvent.offsetY,
          },
          0,
        );
        break;
      case drawio.availableShapes.PENCIL:
        drawio.pointx.push(mouseEvent.offsetX);
        drawio.pointy.push(mouseEvent.offsetY);
        drawio.selectedElement = new Pencil({
          x: 0,
          y: 0
        }, drawio.pointx, drawio.pointy);
        break;
    }
  });

  // mousemove
  $('#canvas').on('mousemove', function (mouseEvent) {
    if (drawio.selectedElement) {
      if (drawio.selectedShape == 'pencil') {
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        // drawCanvas();
        drawio.pointx.push(mouseEvent.offsetX);
        drawio.pointy.push(mouseEvent.offsetY);
        drawCanvas();
      } else {
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height)
        drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
        drawCanvas();
      }
    }
  });

  // mouseup
  $('#canvas').on('mouseup', function () {
    if (drawio.selectedShape == 'pencil') {
      drawio.shapes.push(drawio.selectedElement);
      drawio.selectedElement = null;
      drawio.pointx = [];
      drawio.pointy = [];
    } else {
      drawio.shapes.push(drawio.selectedElement);
      drawio.selectedElement = null;
    }

  });
});
