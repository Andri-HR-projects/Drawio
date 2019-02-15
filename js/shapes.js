function Shape(position) {
  this.position = position;
  this.color = drawio.selectedColor;
  this.fill = drawio.selectedFill;
  this.lineWidth = drawio.selectedLineWidth;
}

Shape.prototype.render = function () { };
Shape.prototype.move = function (position) {
  this.position = position;
};

Shape.prototype.resize = function () { };

function Rectangle(position, width, height) {
  Shape.call(this, position);
  this.width = width;
  this.height = height;
}

//Assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function () {
  //Render a rectangle
  drawio.ctx.fillStyle = this.color;
  drawio.ctx.fillRect(
    this.position.x,
    this.position.y,
    this.width,
    this.height,
  );
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


function Pencil(position, xMoved, yMoved) {
  Shape.call(this, position, this.color, this.lineWidth);
  this.xMoved = xMoved;
  this.yMoved = yMoved;
}

Pencil.prototype = Object.create(Shape.prototype);
Pencil.prototype.constructor = Pencil;

Pencil.prototype.render = function () {
  drawio.ctx.strokeStyle = this.color;
  drawio.ctx.lineWidth = this.lineWidth;

  drawio.ctx.beginPath();
  drawio.ctx.moveTo(this.xMoved[0], this.yMoved[0]);
  for (var i = 1; i <= this.xMoved.length; i++) {

    // !Find Way to implement rounded drawing tool
    // drawio.ctx.beginPath();
    // drawio.ctx.arc(this.xMoved[i], this.yMoved[i], this.lineWidth, 0, 2 * Math.PI);
    // drawio.ctx.fillStyle = this.color;
    // drawio.ctx.fill();
    drawio.ctx.lineTo(this.xMoved[i], this.yMoved[i]);
  }
  drawio.ctx.stroke();
  drawio.ctx.closePath();

};
