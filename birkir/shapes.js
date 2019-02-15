function Shape(position) {
  this.position = position;
  this.color = drawio.selectedColor;
  this.fill = drawio.fill;
  this.lineWidth = drawio.currentLineWidth;
  this.fontSize = drawio.currentFontSize;
  this.fontType = drawio.currentFontType;
  this.text = drawio.currentText;
};

Shape.prototype.render = function () {

};

Shape.prototype.move = function (position) {
  this.position = position;
};

Shape.prototype.resize = function (position) { };

function Rectangle(position, width, height) {
  Shape.call(this, position);
  this.width = width;
  this.height = height;
};

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function () {
  if (this.fill) {
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  } else {
    drawio.ctx.lineWidth = this.lineWidth;
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }
};

Rectangle.prototype.resize = function (x, y) {
  this.width = x - this.position.x;
  this.height = y - this.position.y;
};

function Circle(position, radius) {
  Shape.call(this, position);
  this.radius = radius;
};

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function () {
  drawio.ctx.beginPath();
  drawio.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
  if (this.fill) {
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.fill();
  } else {
    drawio.ctx.lineWidth = this.lineWidth;
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.stroke();
  }
};

Circle.prototype.resize = function (x, y) {
  this.radius = Math.sqrt((x - this.position.x) * (x - this.position.x) + (y - this.position.y) * (y - this.position.y));
};

function Line(position, endpoint) {
  Shape.call(this, position);
  this.endpoint = endpoint;
};

Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function () {
  drawio.ctx.beginPath();
  drawio.ctx.lineWidth = this.lineWidth;
  drawio.ctx.strokeStyle = this.color;
  drawio.ctx.moveTo(this.position.x, this.position.y);
  drawio.ctx.lineTo(this.endpoint.x, this.endpoint.y);
  drawio.ctx.stroke();
};

Line.prototype.resize = function (x, y) {
  this.endpoint = { x, y };
};

function PenStroke(position) {
  Shape.call(this, position);
  this.prePos = position;
  this.nextPos = position;
  this.positions = [];
  this.positions[0] = position;
  this.index = 1;
};

PenStroke.prototype = Object.create(Shape.prototype);
PenStroke.prototype.constructor = PenStroke;

PenStroke.prototype.render = function () {
  drawio.ctx.beginPath();
  drawio.ctx.lineWidth = this.lineWidth;
  drawio.ctx.strokeStyle = this.color;
  for (var i = 0; i < this.index - 1; i++) {
    drawio.ctx.moveTo(this.positions[i].x, this.positions[i].y);
    drawio.ctx.lineTo(this.positions[i + 1].x, this.positions[i + 1].y);
    drawio.ctx.stroke();
  }
};

PenStroke.prototype.resize = function (x, y) {
  this.positions[this.index] = { x, y };
  this.index++;
  this.prePos = this.nextPos;
  this.nextPos = { x, y };
};

function Text(position) {
  Shape.call(this, position);
  this.position = position;
  // So that text appears before user moves the mouse
  this.render();
};

Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Text.prototype.render = function () {
  drawio.ctx.fillStyle = this.color;
  drawio.ctx.font = this.fontSize.toString() + 'px ' + this.fontType.toString();
  drawio.ctx.fillText(this.text, this.position.x, this.position.y);
};

Text.prototype.resize = function (x, y) {
  this.position = { x, y }
};