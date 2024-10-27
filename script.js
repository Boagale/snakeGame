const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let pause = true;
let score = 0;
let direction = "RIGHT";
let ballDrawn = false;
let ballPosition = [200, 200];
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

setInterval(() => {
  if (!pause) {
    //   snakeMoveControler();
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
