const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let pause = true;
let score = 0;
let direction = "RIGHT";
let ballDrawn = false;
let snakeTargetPosition = [200, 200];
let gameOver = false;
let snakeBody = [
  [105, 250],
  [110, 250],
  [115, 250],
  [120, 250],
];

canvas.width = 600;
canvas.height = 400;
canvas.style.border = "2px solid gray";
canvas.style.background = "brown";
function snakePositionControler(sign, axis) {
  if (sign === "+" && axis === "x") {
    snakeBody.push([
      snakeBody[snakeBody.length - 1][0] + 5,
      snakeBody[snakeBody.length - 1][1],
    ]);
  }
  if (sign === "-" && axis === "x") {
    snakeBody.push([
      snakeBody[snakeBody.length - 1][0] - 5,
      snakeBody[snakeBody.length - 1][1],
    ]);
  }
  if (sign === "+" && axis === "y") {
    snakeBody.push([
      snakeBody[snakeBody.length - 1][0],
      snakeBody[snakeBody.length - 1][1] + 5,
    ]);
  }
  if (sign === "-" && axis === "y") {
    snakeBody.push([
      snakeBody[snakeBody.length - 1][0],
      snakeBody[snakeBody.length - 1][1] - 5,
    ]);
  }
}

function checkSnakeTarget() {
    if (
      Math.abs(snakeTargetPosition[0] - snakeBody[snakeBody.length - 1][0]) < 7 &&
      Math.abs(snakeTargetPosition[1] - snakeBody[snakeBody.length - 1][1]) < 7
    ) {
      score++;
      snakeTargetPosition = [
        10 + Math.floor(Math.random() * 580),
        10 + Math.floor(Math.random() * 380),
      ];
      drawBall();
      return true;
    }
    return false;
  }

function snakeMoveControler() {
  switch (direction) {
    case "UP":
      if (checkWall() === "play") {
        if (checkSnakeTarget()) {
          snakePositionControler("-", "y");
          snakePositionControler("-", "y");
        }
        snakeBody.shift();
        snakePositionControler("-", "y");
      } else alert(`Game Over score ${score}`);
      break;
    case "DOWN":
      if (checkWall() === "play") {
        if (checkSnakeTarget()) {
          snakePositionControler("+", "y");
          snakePositionControler("+", "y");
        }
        snakeBody.shift();
        snakePositionControler("+", "y");
      } else alert(`Game Over score ${score}`);
      break;
    case "RIGHT":
      if (checkWall() === "play") {
        if (checkSnakeTarget()) {
          snakePositionControler("+", "x");
          snakePositionControler("+", "x");
        }

        snakeBody.shift();
        snakePositionControler("+", "x");
      } else alert(`Game Over score ${score}`);
      break;
    case "LEFT":
      if (checkWall() === "play") {
        if (checkSnakeTarget()) {
          snakePositionControler("-", "x");
          snakePositionControler("-", "x");
        }
        snakeBody.shift();
        snakePositionControler("-", "x");
        snakeBody.shift();
      } else alert(`Game Over score ${score}`);
      break;
  }
}

setInterval(() => {
  if (!pause) {
    snakeMoveControler();
    ctx.clearRect(0, 0, 600, 400);

    // DRAW SNAKE BODY
    snakeBody.forEach((box) => ctx.fillRect(box[0], box[1], 5, 5));

    //   drawSnakeTarget();

    //   drawScoreText();
  } else {
    ctx.fillStyle = "#fff";
    ctx.font = "24px Courier new";
    ctx.fillText("Press space button to play?", 50, 200);
  }
}, 50);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      direction = "UP";
      break;
    case "ArrowDown":
      direction = "DOWN";
      break;
    case "ArrowRight":
      direction = "RIGHT";
      break;
    case "ArrowLeft":
      direction = "LEFT";
      break;
    case " ":
      pause = !pause;
      break;
    default:
      break;
  }
});
