/**
 * @param  {Object} position {x , y cords}
 */
function Shape(position) {
  this.position = position;
  this.color = drawio.selectedColor;
  this.fill = drawio.selectedFill;
  this.lineWidth = drawio.selectedLineWidth;
}

Shape.prototype.render = function() {};
Shape.prototype.move = function(position) {
  this.position = position;
};

Shape.prototype.resize = function() {};

/**
 * @param  {Object} position {x , y cords}
 * @param  {Number} width
 * @param  {Number} height
 */
function Rectangle(position, width, height) {
  Shape.call(this, position);
  this.width = width;
  this.height = height;
}

// Assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function() {
  // Render a rectangle
  if (this.fill) {
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.fillRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height
    );
  } else {
    drawio.ctx.lineWidth = this.lineWidth;
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.strokeRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height
    );
  }
};

Rectangle.prototype.resize = function(x, y) {
  this.width = x - this.position.x;
  this.height = y - this.position.y;
};

/**
 * @param  {Object} position x and y cords
 * @param  {Number} radius calculated using pythagoras of delta mouse movement
 */
function Circle(position, radius) {
  Shape.call(this, position);
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function() {
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

Circle.prototype.resize = function(x, y) {
  this.radius = Math.sqrt(
      Math.pow(x - this.position.x, 2) + Math.pow(y - this.position.y, 2)
  );
};

/**
 * @param  {Object} position {x , y cords}
 * @param  {Boolean} eraser if eraser is chosen
 */
function Pencil(position, eraser) {
  Shape.call(this, position);
  this.preCords = position;
  this.nextCords = position;
  this.cords = [];
  this.cords[0] = position;
  this.index = 1;
  this.eraser = eraser;
}

Pencil.prototype = Object.create(Shape.prototype);
Pencil.prototype.constructor = Pencil;

Pencil.prototype.render = function() {
  drawio.ctx.beginPath();
  if (this.eraser) {
    drawio.ctx.strokeStyle = '#fff';
  } else {
    drawio.ctx.strokeStyle = this.color;
  }
  drawio.ctx.lineWidth = this.lineWidth;
  drawio.ctx.moveTo(this.cords[0].x, this.cords[0].y);
  for (let i = 0; i < this.index - 1; i++) {
    drawio.ctx.lineTo(this.cords[i + 1].x, this.cords[i + 1].y);
  }
  drawio.ctx.stroke();
  drawio.ctx.closePath();
};

Pencil.prototype.resize = function(x, y) {
  this.cords[this.index] = {x, y};
  this.preCords = this.nextCords;
  this.nextCords = {x, y};
  this.index++;
};
