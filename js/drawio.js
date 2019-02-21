/*
    Structure for the assignment 2 project
*/

// 1. Define a function namespace called drawio

// 2. Create an array to hold on the the shapes currently drawn
window.drawio = {
  shapes: [],
  redoShapes: [],
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
    TEXT: 'text',
  },
  selectedColor: '#000',
  selectedFill: true,
  selectedLineWidth: 12,
  selectedFontSize: '28px',
  selectedFont: 'ariel',
  selectedText: '',
};

$(function () {
  // Document is loaded and parsed

  /**
   * Fill select tag with options that correspond to saved pictures
   */
  function populateSaves() {
    const names = Object.keys(localStorage);
    for (let i = 0; i < names.length; i++) {
      $('#selectPictures').append(
        '<option class=\'sidebar--toolList--select--option\' value=' +
        names[i] +
        '>' +
        names[i] +
        '</option>'
      )
    }
  }
  populateSaves();
  /**
   * Draw on canvas from shape array
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

  // Change selectedShape
  $('.btn-tool').on('click', function () {
    if (drawio.selectedShape == 'text') {
      $('#textHider').addClass('hidden');
    }
    $('.btn-tool').removeClass('btn__active');
    $(this).addClass('btn__active');
    drawio.selectedShape = $(this).data('tool');
    if (drawio.selectedShape == 'text') {
      $('#textHider').removeClass('hidden');
    }
  });
  // Change selectedColor from preset
  $('.nav--container--input--color').on('click', function () {
    drawio.selectedColor = $(this).data('value');
    $('.nav--container--input--color-active').removeClass(
      'nav--container--input--color-active'
    );
    $($(this)).addClass('nav--container--input--color-active');
  });
  // Change selectedColor from type color
  $('.nav--container--input--customColor').on('change', function () {
    drawio.selectedColor = $(this)[0].value;
    $('.nav--container--input--color-active').removeClass(
      'nav--container--input--color-active'
    );
    $($(this)).addClass('nav--container--input--color-active');
  });
  // Change selectedLineWidth
  $('.nav--container--input-lineWidth').on('change', function () {
    drawio.selectedLineWidth = $(this)[0].value;
  });
  // Change selectedFill
  $('.nav--container--input--fill').on('click', function () {
    drawio.selectedFill = !drawio.selectedFill;
    $('.nav--container--input--fill')[0].classList.toggle(
      'nav--container--input--fill-filled'
    );
  });
  // Change selectedFontSize
  $('.nav--container--input-fontSize').on('change', function () {
    drawio.selectedFontSize = $(this)[0].value + 'px';
  });
  // Change selectedFont
  $('#fontType').on('change', function () {
    drawio.selectedFont = $(this)[0].value;
  });
  // Change selectedText
  $('#text').on('input', function () {
    drawio.selectedText = $(this)[0].value;
  });
  // Undo shapes
  $('.nav--container--tool-undo').on('click', function () {
    undo();
  });
  // Redo shapes
  $('.nav--container--tool-redo').on('click', function () {
    redo();
  });
  //Keyboard shortcut
  $(document).keydown(function (key) {
    if ((key.which === 89 && key.ctrlKey) || (key.which === 89 && key.metaKey)) {
      redo();
    }
    else if ((key.which === 90 && key.ctrlKey) || (key.which === 90 && key.metaKey)) {
      undo();
    }
  });
  function redo() {
    if (drawio.redoShapes.length) {
      drawio.shapes.push(drawio.redoShapes.pop());
      drawCanvas();
    }
  }
  function undo() {
    if (drawio.shapes.length) {
      drawio.redoShapes.push(drawio.shapes.pop());
      drawCanvas();
    }
  }

  // Clear canvas
  $('.nav--container--input-clear').on('click', function () {
    drawio.shapes = [];
    drawCanvas();
  });
  // Download canvas
  $('#downloadPicture').on('click', function () {
    var picture = window.open('about:blank', 'image from canvas');
    picture.document.write("<img src='" + canvas.toDataURL("image/png") + "'/>");
  });
  // Resize canvas
  $('.nav--container--input--number').on('change', function () {
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    $(drawio.canvas).prop('width', width);
    $(drawio.canvas).prop('height', height);
    drawCanvas();
  });
  // Save
  $('#savePicture').on('click', function () {
    const name = $('#pictureName').val();
    $('#pictureName').val('');
    if (name) {
      const nameShape = [];
      for (let i = 0; i < drawio.shapes.length; i++) {
        const item = {
          type: drawio.shapes[i].constructor.name,
          data: drawio.shapes[i],
        };
        nameShape.push(item);
      }
      if (!Object.keys(localStorage).includes(name)) {
        $('#selectPictures').append(
          '<option class=\'sidebar--toolList--select--option\' value=' +
          name +
          '>' +
          name +
          '</option>'
        )
      }
      localStorage.setItem(name, JSON.stringify(nameShape));
    }
  });
  // Load
  $('#loadPicture').on('click', function () {
    const namePicture = $('#selectPictures')
      .find(':selected')
      .val();
    const localStorageData = JSON.parse(localStorage.getItem(namePicture));
    drawio.shapes = [];
    drawio.undo = [];
    for (let i = 0; i < localStorageData.length; i++) {
      let shape;
      switch (localStorageData[i].type) {
        case 'Rectangle':
          shape = new Rectangle({ x: 0, y: 0 });
          break;
        case 'Circle':
          shape = new Circle({ x: 0, y: 0 });
          break;
        case 'Pencil':
          (shape = new Pencil({ x: 0, y: 0 })), false;
          break;
        case 'Eraser':
          (shape = new Pencil({ x: 0, y: 0 })), true;
          break;
        case 'Line':
          shape = new Line({ x: 0, y: 0 });
          break;
        case 'Text':
          shape = new Text({ x: 0, y: 0 });
          break;
        default:
          break;
      }
      Object.assign(shape, localStorageData[i].data);
      drawio.shapes.push(shape);
    }
    drawCanvas();
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
      case drawio.availableShapes.TEXT:
        if (drawio.selectedText != '') {
          drawio.selectedElement = new Text({
            x: mouseEvent.offsetX,
            y: mouseEvent.offsetY,
          });
        }
        break;
      default:
        break;
    }
  });

  // mousemove
  $('#canvas').on('mousemove', function (mouseEvent) {
    if (drawio.selectedElement) {
      drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
      drawCanvas();
    }
  });

  // mouseleave
  $('#canvas').on('mouseleave', function (mouseEvent) {
    if (drawio.selectedElement) {
      if (
        drawio.selectedElement.constructor.name === 'Pencil' ||
        drawio.selectedElement.constructor.name === 'Eraser'
      ) {
        drawio.shapes.push(drawio.selectedElement);
        drawio.selectedElement = null;
        drawio.redo = [];
      }
    }
  });

  // mouseup
  $('#canvas').on('mouseup', function () {
    if (drawio.selectedElement) {
      drawio.shapes.push(drawio.selectedElement);
      drawio.selectedElement = null;
    }
    drawio.redo = [];
  });
});
