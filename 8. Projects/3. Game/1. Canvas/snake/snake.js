const canvas = document.getElementById('game');
const context = canvas.getContext("2d");

const blockSize = 20;   // 블록 크기
const canvasSize = 400; // 캔버스 크기
const snakeSpeed = 200; // 뱀 이동 속도(밀리초)

let snake = [ { x: 0, y: 0 }, ] // 초기 뱀 위치
let food = generateFood();
let direction = "right"; // 뱀 이동 방향
let snakeLength = 3;

// 화면에 그리기 - 반복적으로 호출할 메인 함수
function draw() {
  context.clearRect(0, 0, canvasSize, canvasSize); // 화면 초기화
  drawSnake();
  drawFood();

  moveSnake();
  checkFood();
  checkCollision()
}

// 충돌 함수 구현
function checkCollision() {
  const head = snake[0]; // 뱀의 머리

  if (head.x < 0 || head.x * blockSize > canvasSize - blockSize || (head.y < 0 && head.y * blockSize > canvasSize - blockSize)) {
    console.log('죽음')
  }
}

// 뱀이 음식을 먹었는지 확인
function checkFood() {
  const head = snake[0]; // 뱀의 머리
  
  if (head.x === food.x && head.y === food.y) {
    console.log('냠냠')
    food = generateFood()
  } else {
    snake.pop(); // 음식 먹지 않으면 꼬리 짜르기
  }
}

function drawSnake() {
  context.fillStyle = "#00F";

  snake.forEach((segment) => {
    context.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize); // x, y, width, height
  });
}

function drawFood() {
    context.fillStyle = '#F00';
    context.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize)
}

function generateFood() {
    let foodPosition;

    do {
        foodPosition = {
            x: Math.floor(Math.random() * (canvasSize / blockSize)),
            y: Math.floor(Math.random() * (canvasSize / blockSize)),
        };
    } while (isFoodOnSnake(foodPosition))

    return foodPosition;
}

function isFoodOnSnake(foodPosition) {
    // let isOnSnake = false;

    // snake.forEach(segment => {
    //     if (segment.x === foodPosition.x && segment.y === foodPosition.y) {
    //         isOnSnake = true;
    //     }
    // })

    return snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y)
}

function moveSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case "up":
      head.y -= 1;
      break;
    case "down":
      head.y += 1;
      break;
    case "left":
      head.x -= 1;
      break;
    case "right":
      head.x += 1;
      break;
  }

  if (head.x < 0 || head.x * blockSize > canvasSize - blockSize || (head.y < 0 && head.y * blockSize > canvasSize - blockSize)) {
    return;
  }
  
  snake.unshift(head); // 벗어나지 않았다면 뱀 머리 추가
  // snake.pop() // 꼬리 제거

  // if (snake.length > snakeLength) {
  //   snake.pop(); // 꼬리 제거
  // }
}

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
  //   direction = event.key.toLowerCase().replace("arrow", "");
}

setInterval(draw, snakeSpeed);
