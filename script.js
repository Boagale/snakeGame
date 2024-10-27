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