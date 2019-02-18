/*
    Structure for the assignment 2 project
*/

// 1. Define a function namespave called drawio

// 2. Create an array to hold on the the shapes currently drawn
window.drawio = {
  shapes: [],
  undo: [],
  redo: [],
  selectedShape: 'pencil',
  canvas: document.getElementById('canvas'),
  ctx: document.getElementById('canvas').getContext('2d'),
  selectedElement: null,
  availableShapes: {
    RECTANGLE: 'rectangle',
    CIRCLE: 'circle',
    PENCIL: 'pencil',
    ERASER: 'eraser',
    LINE: 'line',
    // TODO: add line, text, move
  },
  selectedColor: '#000',
  selectedFill: true,
  selectedLineWidth: 12,
  selectedFontSize: '28px',
  selectedFont: 'Ariel',
  selectedText: ' ',
};

$(function() {
  // Document is loaded and parsed
  /**
   */
  function drawCanvas() {
    drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
    drawio.ctx.globalCompositeOperation = 'destination-over';
    if (drawio.selectedElement) {
      drawio.selectedElement.render();
    }
    for (let i = drawio.shapes.length - 1; i >= 0; i--) {
      drawio.shapes[i].render();
    }
  }

  // Resize canvas
  $('.nav--container--input--number').on('change', function() {
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    console.log(drawio.canvas);
    $(drawio.canvas).prop('width', width);
    $(drawio.canvas).prop('height', height);
    drawCanvas();
  });

  // !Enlarge and shrink sidebar on arrowclick
  $('.sidebar--arrow').on('click', function() {
    const sidebar = document.getElementById('sidebar__right');
    const arrow = document.getElementById('sidebar--arrow');
    if (
      sidebar.classList.contains('sidebar__large') ||
      sidebar.classList.contains('sidebar__small')
    ) {
      sidebar.classList.toggle('sidebar__small');
      sidebar.classList.toggle('sidebar__large');
      arrow.classList.toggle('sidebar--arrow__left');
      arrow.classList.toggle('sidebar--arrow__right');
    } else {
      sidebar.classList.toggle('sidebar__large');
      arrow.classList.toggle('sidebar--arrow__right');
    }
  });

  // Change selectedShape
  $('.sidebar--tool_list--tool').on('click', function() {
    $('.sidebar--tool_list--tool').removeClass('btn__active');
    $(this).addClass('btn__active');
    drawio.selectedShape = $(this).data('tool');
    console.log($(this).data('tool'));
  });
  // Change selectedColor from preset
  $('.nav--container--input--color').on('click', function() {
    drawio.selectedColor = $(this).data('value');
    $('.nav--container--input--color-active').removeClass(
        'nav--container--input--color-active'
    );
    $($(this)).addClass('nav--container--input--color-active');
  });
  // Change selectedColor from type color
  $('.nav--container--input--customColor').on('change', function() {
    drawio.selectedColor = $(this)[0].value;
    $('.nav--container--input--color-active').removeClass(
        'nav--container--input--color-active'
    );
    $($(this)).addClass('nav--container--input--color-active');
  });
  // Change selectedLineWidth
  $('.nav--container--input-lineWidth').on('change', function() {
    drawio.selectedLineWidth = $(this)[0].value;
  });
  // Change selectedFill
  $('.nav--container--input--fill').on('click', function() {
    drawio.selectedFill = !drawio.selectedFill;
    $('.nav--container--input--fill')[0].classList.toggle(
        'nav--container--input--fill-filled'
    );
  });
  // Clear canvas
  $('.nav--container--input-clear').on('click', function() {
    drawio.shapes = [];
    drawCanvas();
  });
  // Change selectedFontSize
  $('.nav--container--input-fontSize').on('change', function() {
    drawio.selectedFontSize = $(this)[0].value + 'px';
  });
  // Change selectedFont
  $('.nav--container--input-fontType').on('change', function() {
    drawio.selectedFontType = $(this)[0].value;
    console.log(drawio.selectedFontType);
  });
  // Change selectedText
  $('.nav--container--input-text').on('change', function() {
    drawio.selectedText = $(this)[0].value;
    console.log(drawio.selectedText);
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
            0
        );
        break;
      case drawio.availableShapes.CIRCLE:
        drawio.selectedElement = new Circle(
            {
              x: mouseEvent.offsetX,
              y: mouseEvent.offsetY,
            },
            0
        );
        break;
      case drawio.availableShapes.PENCIL:
        drawio.selectedElement = new Pencil(
            {
              x: mouseEvent.offsetX,
              y: mouseEvent.offsetY,
            },
            false
        );
        break;
      case drawio.availableShapes.ERASER:
        drawio.selectedElement = new Pencil(
            {
              x: mouseEvent.offsetX,
              y: mouseEvent.offsetY,
            },
            true
        );
        break;
      case drawio.availableShapes.LINE:
        drawio.selectedElement = new Line(
            {
              x: mouseEvent.offsetX,
              y: mouseEvent.offsetY,
            },
            0
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
  $('#canvas').on('mouseup', function() {
    if (drawio.selectedElement) {
      drawio.shapes.push(drawio.selectedElement);
      drawio.selectedElement = null;
    }
    drawio.redo = [];
  });
});
