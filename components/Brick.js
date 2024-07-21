export class Brick {
  constructor(x, y, width, height, radius, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.color = color;
    this.visible = true;
  }

  draw(context) {
    context.fillStyle = this.color;
    if (this.radius > 0) {
      context.beginPath();
      context.moveTo(this.x + this.radius, this.y);
      context.lineTo(this.x + this.width - this.radius, this.y);
      context.arc(
        this.x + this.width - this.radius,
        this.y + this.radius,
        this.radius,
        -Math.PI / 2,
        0
      );
      context.lineTo(this.x + this.width, this.y + this.height - this.radius);
      context.arc(
        this.x + this.width - this.radius,
        this.y + this.height - this.radius,
        this.radius,
        0,
        Math.PI / 2
      );
      context.lineTo(this.x + this.radius, this.y + this.height);
      context.arc(
        this.x + this.radius,
        this.y + this.height - this.radius,
        this.radius,
        Math.PI / 2,
        Math.PI
      );
      context.lineTo(this.x, this.y + this.radius);
      context.arc(
        this.x + this.radius,
        this.y + this.radius,
        this.radius,
        Math.PI,
        -Math.PI / 2
      );
      context.closePath();
      context.fill();
    } else {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  touchingBall(ball) {
    const distX = Math.max(this.x, Math.min(ball.x, this.x + this.width));
    const distY = Math.max(this.y, Math.min(ball.y, this.y + this.height));
    const dx = ball.x - distX;
    const dy = ball.y - distY;
    return dx * dx + dy * dy < ball.radius * ball.radius;
  }
}
