import { Ball } from "./components/Ball.js";
import { Paddle } from "./components/Paddle.js";
import { Brick } from "./components/Brick.js";
import { Needle } from "./components/Needle.js";

// Game speed
const game = setInterval(drawScene, 10);

// Configuration Variables
const canvas = document.getElementById("myCanvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const context = canvas.getContext("2d");
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// ball parameter
const ballStartX = 160;
const ballStartY = 60;
const ballRadius = 15;
const ballSpeedX = 5;
const ballSpeedY = 5;
const ballColor = "yellow";

// paddle parameter
const paddleX = 10;
const paddleY = 680;
const paddleWidth = 150;
const paddleHeight = 10;
const paddleColor = "orange";

// brick parameter
const brickWidth = 30;
const brickHeight = 30;
const brickRadius = 5;
const brickCount = 100;
const brickLowerBound = 500;
const brickColor = "lightgreen";

// needle parameter
const needleWidth = 30;
const needleHeight = 80;
const needleColor = "black";

let bricks = [];
let needles = [];
let hitCount = 0;

// Create objects
const ball = new Ball(
  ballStartX,
  ballStartY,
  ballRadius,
  ballSpeedX,
  ballSpeedY,
  ballColor
);
const paddle = new Paddle(
  paddleX,
  paddleY,
  paddleWidth,
  paddleHeight,
  paddleColor
);

// make brick position random
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min));
}

// Check if two bricks overlap
function isOverlapping(brick1, brick2) {
  return !(
    brick1.x + brick1.width < brick2.x ||
    brick1.x > brick2.x + brick2.width ||
    brick1.y + brick1.height < brick2.y ||
    brick1.y > brick2.y + brick2.height
  );
}

// Create non-overlapping bricks
function createBrick() {
  let brick;
  let overlaps;

  do {
    overlaps = false;
    brick = new Brick(
      getRandomArbitrary(
        windowWidth / 2 - canvasWidth / 2,
        windowWidth / 2 + canvasWidth / 2 - brickWidth
      ),
      getRandomArbitrary(windowHeight / 2 - canvasHeight / 2, brickLowerBound),
      brickWidth,
      brickHeight,
      brickRadius,
      brickColor
    );

    // Check if the new brick overlaps with any existing bricks
    for (let existingBrick of bricks) {
      if (isOverlapping(brick, existingBrick)) {
        overlaps = true;
        break;
      }
    }
  } while (overlaps);

  return brick;
}

// Create all bricks
for (let i = 0; i < brickCount; i++) {
  bricks.push(createBrick());
}

// Create multiple needles spanning the entire canvas width
const needleCount = Math.ceil(canvasWidth / needleWidth);
for (let i = 0; i < needleCount; i++) {
  const x = i * needleWidth;
  needles.push(
    new Needle(x, canvasHeight, needleWidth, needleHeight, needleColor)
  );
}

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  paddle.x = e.clientX - rect.left - paddle.width / 2;
});

function drawScene() {
  // Draw background
  context.fillStyle = "#616161";
  context.fillRect(0, 0, canvasWidth, canvasHeight);

  // Check if the ball hits any bricks
  bricks.forEach((brick) => {
    if (brick.visible && brick.touchingBall(ball)) {
      hitCount++;
      brick.visible = false;

      // Change the ball's direction based on collision side
      if (ball.x < brick.x || ball.x > brick.x + brick.width) {
        ball.speedX = -ball.speedX;
      } else {
        ball.speedY = -ball.speedY;
      }

      if (hitCount === brickCount) {
        alert("You Win");
        clearInterval(game);
        window.location.reload();
      }
    }
  });

  // Check if the ball hits the orange paddle
  if (
    ball.x + ball.radius >= paddle.x &&
    ball.x - ball.radius <= paddle.x + paddle.width &&
    ball.y + ball.radius >= paddle.y &&
    ball.y - ball.radius <= paddle.y + paddle.height
  ) {
    // Reverse the ball's Y direction
    ball.speedY *= -1;

    // Ensure the ball is placed above or below the paddle after collision
    if (ball.y > paddle.y) {
      ball.y = paddle.y + paddle.height + ball.radius; // Place the ball below the paddle
    } else {
      ball.y = paddle.y - ball.radius; // Place the ball above the paddle
    }
  }

  // Check if the ball has reached the bottom area where needles are located
  if (ball.y + ball.radius > canvasHeight - needleHeight) {
    alert("Game Over");
    clearInterval(game);
    window.location.reload();
  }

  // Update the ball
  ball.update(canvasWidth);

  // Draw all bricks
  bricks.forEach((brick) => {
    if (brick.visible) {
      brick.draw(context);
    }
  });

  // Draw all needles
  needles.forEach((needle) => {
    needle.draw(context);
  });

  // Draw the paddle
  paddle.draw(context);

  // Draw the ball
  ball.draw(context);
}
