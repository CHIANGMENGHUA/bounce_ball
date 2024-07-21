export class Ball {
  constructor(x, y, radius, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
    context.stroke();
  }

  update(canvasWidth, canvasHeight) {
    // Check if the ball hits the boundaries
    if (this.x + this.radius >= canvasWidth) {
      this.x = canvasWidth - this.radius; // Ensure ball is inside the canvas
      this.speedX = -this.speedX;
    } else if (this.x - this.radius <= 0) {
      this.x = this.radius; // Ensure ball is inside the canvas
      this.speedX = -this.speedX;
    }

    if (this.y + this.radius >= canvasHeight) {
      this.y = canvasHeight - this.radius; // Ensure ball is inside the canvas
      this.speedY = -this.speedY;
    } else if (this.y - this.radius <= 0) {
      this.y = this.radius; // Ensure ball is inside the canvas
      this.speedY = -this.speedY;
    }

    // Update the ball's coordinates
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
