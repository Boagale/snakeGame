const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let pause = true;
let score = 0;
let direction = "RIGHT";
let ballDrawn = false;
let snakeTargetPosition = [200, 200];
let re = false;
let prescore = 0;
let message = "";
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

function drawSnakeTarget() {
  ctx.fillStyle = "#e3e3e3";
  ctx.beginPath();
  ctx.arc(
    snakeTargetPosition[0],
    snakeTargetPosition[1],
    5,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
}

function drawScoreText() {
  ctx.font = "32px Courier new";
  ctx.fillText(score, 250, 20);
}

function gameReset() {
  snakeBody = [
    [105, 250],
    [110, 250],
    [115, 250],
    [120, 250],
  ];
  direction = "RIGHT";
  prescore = score;
  score = 0;
  pause = true;
}

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
    score = score +1;
    snakeTargetPosition = [
      10 + Math.floor(Math.random() * 580),
      10 + Math.floor(Math.random() * 380),
    ];
    drawSnakeTarget();
    return true;
  }
  return false;
}
function checkWall() {
  if (
    snakeBody[snakeBody.length - 1][0] - 600 >= 0 ||
    snakeBody[snakeBody.length - 1][0] <= 0 ||
    snakeBody[snakeBody.length - 1][1] - 400 >= 0 ||
    snakeBody[snakeBody.length - 1][1] <= 0
  ) {
    gameReset();
    return;
  }
  return "play";
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
      } else {
        re = true;
      }
      break;
    case "DOWN":
      if (checkWall() === "play") {
        if (checkSnakeTarget()) {
          snakePositionControler("+", "y");
          snakePositionControler("+", "y");
        }
        snakeBody.shift();
        snakePositionControler("+", "y");
      } else {
        re = true;
        message = `Game over with score ${score} play again?`;
      }
      break;
    case "RIGHT":
      if (checkWall() === "play") {
        if (checkSnakeTarget()) {
          snakePositionControler("+", "x");
          snakePositionControler("+", "x");
        }

        snakeBody.shift();
        snakePositionControler("+", "x");
      } else {
        re = true;
        message = `Game over with score ${score} play again?`;
      }
      break;
    case "LEFT":
      if (checkWall() === "play") {
        if (checkSnakeTarget()) {
          snakePositionControler("-", "x");
          snakePositionControler("-", "x");
        }
        snakeBody.shift();
        snakePositionControler("-", "x");
      } else {
        re = true;
        message = `Game over with score ${score} play again?`;
      }
      break;
  }
}

setInterval(() => {
  if (!pause) {
    snakeMoveControler();
    ctx.clearRect(0, 0, 600, 400);

    // DRAW SNAKE BODY
    snakeBody.forEach((box) => ctx.fillRect(box[0], box[1], 5, 5));

    drawSnakeTarget();

      drawScoreText();
  } else {
    ctx.fillStyle = "#fff";
    ctx.font = "24px Courier new";
    ctx.fillText(re?`Game over with score ${prescore} play again?`:"Press space button to play?", 50, 200);
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
