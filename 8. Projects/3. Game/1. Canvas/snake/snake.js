const canvas = document.getElementById('game');
const context = canvas.getContext("2d");

const blockSize = 20;   // 블록 크기
const canvasSize = 400; // 캔버스 크기
const snakeSpeed = 200; // 뱀 이동 속도(밀리초)

let snake = [ { x: 0, y: 0 }, ] // 초기 뱀 위치
let food = generateFood();
let gameover = false;

let direction = "right"; // 뱀 이동 방향
let directionBuffer = []; // 키 입력 버퍼
// let snakeLength = 5;

// 화면에 그리기 - 반복적으로 호출할 메인 함수
function draw() {
  context.clearRect(0, 0, canvasSize, canvasSize); // 화면 초기화

  if (gameover) {
    context.fillStyle = '#F00';
    context.font = '30px Arial';
    context.fillText('Game Over', 80, canvasSize / 2);
    context.font = '20px Arial';
    context.fillText('Retry? Press Y', 100, canvasSize / 2 + 40);
    return;
  }

  drawSnake();
  drawFood();

  moveSnake();
  checkCollision();
  checkFood();
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
    let isOnSnake = false;

    snake.forEach(segment => {
        if (segment.x === foodPosition.x && segment.y === foodPosition.y) {
            isOnSnake = true;
        }
    })
    // return snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y)
}

// 충돌 함수 구현
function checkCollision() {
  const head = snake[0]; // 뱀의 머리

  if ((head.x < 0 || head.x * blockSize > canvasSize - blockSize) ||
      (head.y < 0 || head.y * blockSize > canvasSize - blockSize) ||
      isSnakeCollision()) {
    console.log('게임오버');
    gameover = true;
  }
}

// 뱀이 자기 자신과 부딪칠 때
function isSnakeCollision() {
  const head = snake[0];
  return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
}

// 뱀이 음식을 먹었는지 확인
function checkFood() {
  const head = snake[0];
  
  if (head.x === food.x && head.y === food.y) {
    console.log('냠냠')
    food = generateFood()
  } else {
    snake.pop(); // 음식 먹지 않으면 꼬리 짜르기
  }
}

function moveSnake() {
  const head = { ...snake[0] };

  if (directionBuffer.length > 0) {
    direction = directionBuffer.shift();
  }

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

  snake.unshift(head); // 벗어나지 않았다면 뱀 머리 추가
  // snake.pop() // 꼬리 제거

  // if (snake.length > snakeLength) {
  //   snake.pop(); // 꼬리 제거
  // }
}

document.addEventListener("keydown", handleKeyPress);

let lastKeyPressTime = 0; // 최종키 입력시간

function resetGame() {
  snake = [ { x: 0, y: 0 }];
  direction = 'right'
  food = generateFood();
  gameover = false;
}

function handleKeyPress(event) {
  console.log(event.key)

  if (gameover) {
    if (event.key.toLowerCase() === 'y') {
      resetGame();
    }
  }

  // const now = Date.now();
  // const timeSinceLastKeyPress = now - lastKeyPressTime;
  // console.log(timeSinceLastKeyPress)

  // if (timeSinceLastKeyPress < snakeSpeed) {
    // console.log('이 키 입력 무시')
    // return;
  // }

  if (directionBuffer.length >= 2) {
    console.log('너무 많은 키 입력 중', directionBuffer)
    return;
  }

  let previousKeyPress = direction;

  if (directionBuffer.length > 0) {
    previousKeyPress = directionBuffer[directionBuffer.length - 1];
  }

  switch (event.key) {
    case "ArrowUp":
      if (previousKeyPress !== 'down') {
        directionBuffer.push('up')
      }
      break;
    case "ArrowDown":
      if (previousKeyPress !== 'up') {
        directionBuffer.push('down')
      }
      break;
    case "ArrowLeft":
      if (previousKeyPress !== 'right') {
        directionBuffer.push('left')
      }
      break;
    case "ArrowRight":
      if (previousKeyPress !== 'up') {
        directionBuffer.push('right')
      }
      break;
    // case 'ArrowUp':
    // case 'ArrowDown':
    // case 'ArrowLeft':
    // case 'ArrowRight':
    //     direction = event.key.toLowerCase().replace('arrow', '');
    //     break;
  }
  // lastKeyPressTime = now;
}

setInterval(draw, snakeSpeed);
