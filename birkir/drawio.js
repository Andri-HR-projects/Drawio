window.drawio = {
  shapes: [],
  selectedShape: 'rectangle',
  canvas: document.querySelector('.myCanvas'),
  ctx: document.querySelector('.myCanvas').getContext('2d'),
  selectedElement: null,
  availableShapes: {
    RECTANGLE: 'rectangle',
    CIRCLE: 'circle',
    LINE: 'line',
    PEN: 'pen',
    TEXT: 'text',
  },
  selectedColor: '#111111',
  fill: true,
  currentLineWidth: 2,
  currentFontSize: 10,
  currentFontType: 'arial',
  currentText: '',
  undoneShapes: [],
  selectedLoad: '',
};

$(function () {
  // Document loaded and parsed

  // Load saves
  displayAllSaves();
  // Listen for selected load
  startListeningForLoadSelect();

  function drawCanvas() {
    // Clear board
    drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
    // Display layers in correct order
    drawio.ctx.globalCompositeOperation = 'destination-over';
    if (drawio.selectedElement) {
      drawio.selectedElement.render();
    }
    for (var i = drawio.shapes.length - 1; i >= 0; i--) {
      drawio.shapes[i].render();
    }
  }

  function populateShapes(detShapes) {
    drawio.shapes = [];
    for (var i = 0; i < detShapes.length; i++) {
      switch (detShapes[i].type) {
        case 'Rectangle':
          var shape = new Rectangle({ x: 0, y: 0 }, 0, 0);
          break;
        case 'Circle':
          var shape = new Circle({ x: 0, y: 0 }, 0);
          break;
        case 'Line':
          var shape = new Line({ x: 0, y: 0 }, { x: 0, y: 0 });
          break;
        case 'PenStroke':
          var shape = new PenStroke({ x: 0, y: 0 });
          break;
        case 'Text':
          var shape = new Text({ x: 0, y: 0 });
          break;
      }
      Object.assign(shape, detShapes[i].data);
      drawio.shapes.push(shape);
    }
  }

  function undo() {
    if (drawio.shapes.length) {
      drawio.undoneShapes.push(drawio.shapes[drawio.shapes.length - 1]);
      drawio.shapes.splice(-1, 1);
      drawCanvas();
      $('.message-box .message').text('undo');
      $('.message-box').addClass('is-active');
      setTimeout(() => {
        $('.message-box').removeClass('is-active');
      }, 1500);
    }
  }

  function redo() {
    if (drawio.undoneShapes.length) {
      drawio.shapes.push(drawio.undoneShapes[drawio.undoneShapes.length - 1]);
      drawio.undoneShapes.splice(-1, 1);
      drawCanvas();
      $('.message-box .message').text('redo');
      $('.message-box').addClass('is-active');
      setTimeout(() => {
        $('.message-box').removeClass('is-active');
      }, 1500);
    }
  }

  function getAllSaves() {
    var allSaves = [];
    allSaves = Object.keys(localStorage);
    return allSaves;
  }

  function displayAllSaves() {
    $('.savesBox-loads').empty();
    var saves = getAllSaves();
    for (var i = 0; i < saves.length; i++) {
      $('.savesBox-loads').append(
        '<li class="savesBox-loadItem"><button data-name="' + saves[i] + '" class="savesBox-loadItem-button">' + saves[i] + '</button></li>'
      );
    }
  }

  $('.navBar-shape').on('click', function () {
    $('.navBar-shape').removeClass('selected');
    $(this).addClass('selected');
    drawio.selectedShape = $(this).data('shape');
  });

  $('.myCanvas').on('mousedown', function (mouseEvent) {
    switch (drawio.selectedShape) {
      case drawio.availableShapes.RECTANGLE:
        drawio.selectedElement = new Rectangle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0, 0);
        break;
      case drawio.availableShapes.CIRCLE:
        drawio.selectedElement = new Circle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0);
        break;
      case drawio.availableShapes.LINE:
        drawio.selectedElement = new Line({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, { x: mouseEvent.offsetX, y: mouseEvent.offsetY });
        break;
      case drawio.availableShapes.PEN:
        drawio.selectedElement = new PenStroke({ x: mouseEvent.offsetX, y: mouseEvent.offsetY });
        break;
      case drawio.availableShapes.TEXT:
        drawio.selectedElement = new Text({ x: mouseEvent.offsetX, y: mouseEvent.offsetY });
        break;
    }
  });

  $('.myCanvas').on('mousemove', function (mouseEvent) {
    if (drawio.selectedElement) {
      drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
      drawCanvas();
    }
  });

  $('.myCanvas').on('mouseup', function () {
    if (drawio.selectedElement) {
      drawio.shapes.push(drawio.selectedElement);
      drawio.selectedElement = null;

      // Clear undoneShapes, so now user can't redo
      drawio.undoneShapes = [];
    }
  });

  // Listen for undo
  $('.undo').on('click', () => undo());

  // Listen for redo
  $('.redo').on('click', () => redo());

  // Listend for undo/redo on keyboard
  $(document).keydown(function (e) {
    if ((e.which === 90 && e.ctrlKey && e.shiftKey) || (e.which === 90 && e.metaKey && e.shiftKey)) {
      redo();
    }
    else if ((e.which === 90 && e.ctrlKey) || (e.which === 90 && e.metaKey)) {
      undo();
    }
  });

  // Listend for new
  $('.newButton').on('click', function () {
    drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
    drawio.shapes = [];
    drawio.undoneShapes = [];
  });

  // Change color
  $('.color').on('click', function () {
    $('.color').removeClass('selected');
    $(this).addClass('selected');
    drawio.selectedColor = $(this).data('color');
  });

  // Change fill property
  $('.fill').on('click', function () {
    if ($('.fill').hasClass('noFill')) {
      $(this).removeClass('noFill');
      drawio.fill = true;
    } else {
      $(this).addClass('noFill');
      drawio.fill = false;
    }
  });

  // Change Line Width property
  $('.settings-lineWidth').on('input', function () {
    drawio.currentLineWidth = $('.settings-lineWidth').val();
    $('.lineWidthValue').text(drawio.currentLineWidth);
  });

  // Change text
  $('.textForm-text').on('input', function () {
    drawio.currentText = $('.textForm-text').val();
  });

  // Change font size
  $('.textForm-fontSize').on('input', function () {
    drawio.currentFontSize = $('.textForm-fontSize').val();
    $('.fontSize-text').text(drawio.currentFontSize + 'px');
  });

  // Change font type
  $('.textForm-fontType').on('change', function () {
    drawio.currentFontType = $('.textForm-fontType').val();
  });

  // Listen for save
  $('.savesBox-saveButton').on('click', function () {
    var name = $('.savesBox-name').val();
    $('.savesBox-name').val('');
    if (name) {
      // Temporary array so JSON works fine
      var detailedShapes = [];
      for (var i = 0; i < drawio.shapes.length; i++) {
        var item = {
          type: drawio.shapes[i].constructor.name,
          data: drawio.shapes[i]
        }
        detailedShapes.push(item)
      }
      localStorage.setItem(name, JSON.stringify(detailedShapes));
      displayAllSaves();
      startListeningForLoadSelect();
    }
  });

  // Listen for load select
  function startListeningForLoadSelect() {
    $('.savesBox-loadItem-button').on('click', function () {
      $('.savesBox-loadItem-button').removeClass('selected');
      $(this).addClass('selected');
      drawio.selectedLoad = $(this).data('name');
    });
  }

  // Listen for load
  $('.savesBox-loadButton').on('click', function () {
    populateShapes(JSON.parse(localStorage.getItem(drawio.selectedLoad)));
    drawCanvas();
  });
});