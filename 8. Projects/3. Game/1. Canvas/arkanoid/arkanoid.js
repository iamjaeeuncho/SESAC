const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

// 기본 게임 속성 정의
const ballRadius = 10;

// 공의 적절한 시작 위치
let x = canvas.width / 2;
let y = canvas.height - 30;

// 공의 이동 속도
let dx = 2; // x 방향 이동 속도
let dy = 2; // y 방향 이동 속도

// 패들 정의
const paddleHeight = 10;
const paddleWidth = 100;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;

const paddleSpeed = 5;

// 키 입출력 제어
let rightPressed = false;
let leftPressed = false;

// 벽돌 그리기
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = "#0095DD";
        context.fill();
        context.closePath();
      }
    }
  }
}

function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "#FF00DD";
  context.fill();
  context.closePath();
}

function drawPaddle() {
  context.beginPath();
  context.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  context.fillStyle = "#000000";
  context.fill();
  context.closePath();
}

function moveBall() {
  if (y + ballRadius > canvas.height) {
    console.log("죽음");
    gameOver();
    // document.location.reload();
  } else {
    x += dx;
    y += dy;
    if (y - ballRadius < 0 || (y + ballRadius > paddleY && x > paddleX && x < paddleX + paddleWidth)) {
      dy *= -1;
    } else if (x + ballRadius > canvas.width || x - ballRadius < 0) {
      dx *= -1;
    }
  }
}

function movePaddle() {
  if (rightPressed && paddleX > 0) {
    paddleX -= paddleSpeed;
  }
  if (leftPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  }
}

function gameOver() {
  context.clearRect(0, 0, canvas.width, canvas.height); // 화면 초기화

  context.fillStyle = "#F00";
  context.font = "30px Arial";
  context.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
}

function collectionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r]
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth &&
                    y > b.y && y < b.y + brickHeight
                    ) {
                        b.status = 0;
                        dy = -dy;
                    }
            }
        }
    }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height); // 화면 초기화

  drawPaddle();
  drawBall();
  drawBricks();

  moveBall();
  movePaddle();

  collectionDetection();

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyUpHandler(event) {
  switch (event.key) {
    case "ArrowLeft":
      rightPressed = false;
      break;
    case "ArrowRight":
      leftPressed = false;
      break;
  }
}

function keyDownHandler(event) {
  switch (event.key) {
    case "ArrowLeft":
      rightPressed = true;
      break;
    case "ArrowRight":
      leftPressed = true;
      break;
  }
}

// 메인 함수 호출
draw();

console.log(bricks);
