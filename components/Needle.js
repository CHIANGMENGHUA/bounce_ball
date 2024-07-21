// components/Needle.js

export class Needle {
  constructor(x, y, width, height, color) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + width;
    this.y2 = y;
    this.x3 = x + width / 2;
    this.y3 = y - height;
    this.color = color;
  }

  draw(context) {
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.lineTo(this.x3, this.y3);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
}
