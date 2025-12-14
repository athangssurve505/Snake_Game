// Game board and score element
const gameArea = document.querySelector(".gameArea");
const score = document.querySelector(".score");
const time = document.querySelector(".time").innerHTML.split(":")


// Scores variables
const highscore = document.querySelector(".high-score");
let highScoreText = highscore.innerHTML.split(":");
let scoreText = score.innerHTML.split(":");
let currentScore = 0;

// Row and cols of the board
const rows = Math.floor(gameArea.clientHeight / 50);
const cols = Math.floor(gameArea.clientWidth / 50);

let now = new Date();

let minutes = now.getMinutes() - now.getMinutes();
let seconds = now.getSeconds() -  now.getSeconds();



const blocks = [];
let direction = "Right";
let snake = {
  head: {
    x: 1,
    y: 1,
  },
  body: [],
};
let oppDirection = {
  Left: "Right",
  Right: "Left",
  Up: "Down",
  Down: "Up",
};

let food = generateFood();

function initalSteup() {
  createGrid();
  gameControls();
  blocks[food.row][food.col].classList.add("food");
  highscore.innerHTML =`${highScoreText[0]}: ${localStorage.getItem("highScore")}`;
}

function createGrid() {
  for (let i = 0; i < rows; i++) {
    blocks[i] = [];
    for (let j = 0; j < cols; j++) {
      const block = document.createElement("div");
      block.classList.add("block");
      blocks[i][j] = block;
      gameArea.appendChild(block);
    }
  }
}

function changeDirection(newDirection) {
  if (newDirection !== oppDirection[direction]) {
    direction = newDirection;
  }
}

function gameControls() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "w" || e.key === "ArrowUp") changeDirection("Up");
    if (e.key === "s" || e.key === "ArrowDown") changeDirection("Down");
    if (e.key === "a" || e.key === "ArrowLeft") changeDirection("Left");
    if (e.key === "d" || e.key === "ArrowRight") changeDirection("Right");

    if (direction != null) {
      if (e.key === "Enter") {
        clearInterval(id);
        clearInterval(timerid)
        alert("game exited");
      }
    }
  });
}

function setScores() {
  if (!localStorage.getItem("highScore")) {
    localStorage.setItem("highScore", +highScoreText[1]);
  }

  // Set Current Score
  currentScore += 10;
  score.innerHTML = `${scoreText[0]}: ${currentScore}`;

  //

 

  if (localStorage.getItem("highScore") < currentScore) {
    localStorage.setItem("highScore", currentScore);
  }
  highscore.innerHTML =`${highScoreText[0]}: ${localStorage.getItem("highScore")}`;
}

function generateFood() {
  const foodRow = Math.floor(Math.random() * rows);
  const foodCol = Math.floor(Math.random() * cols);
  return {
    row: foodRow,
    col: foodCol,
  };
}

function renderSnake() {
  // 1) Save previous positions
  const prevHead = { x: snake.head.x, y: snake.head.y };
  const prevBody = snake.body.map((seg) => ({ x: seg.x, y: seg.y }));

  // 2) Move the head first
  if (direction === "Up") snake.head.x -= 1;
  if (direction === "Down") snake.head.x += 1;
  if (direction === "Left") snake.head.y -= 1;
  if (direction === "Right") snake.head.y += 1;

  // 3) Move body from HEAD → TAIL
  if (snake.body.length > 0) {
    // First segment follows old head
    snake.body[0].x = prevHead.x;
    snake.body[0].y = prevHead.y;

    // Other segments follow previous segment positions
    for (let i = 1; i < snake.body.length; i++) {
      snake.body[i].x = prevBody[i - 1].x;
      snake.body[i].y = prevBody[i - 1].y;
    }
  }

  // Check if snakes hits edge of row or col
  if (
    snake.head.x < 0 ||
    snake.head.x >= rows ||
    snake.head.y < 0 ||
    snake.head.y >= cols
  ) {
    clearInterval(id);
    clearInterval(timerid)
    alert("Game Over");
    return;
  }

  // Check if snake hits its own body
  const hitSelf = snake.body.some(
    (seg) => seg.x === snake.head.x && seg.y === snake.head.y
  );

  if (hitSelf) {
    clearInterval(id);
    clearInterval(timerid)
    alert("Game Over: You hit yourself!");
    return;
  }


  

  // 4) Clear all existing snake classes
  document
    .querySelectorAll(".snake")
    .forEach((b) => b.classList.remove("snake"));

  // 5) Render head
  blocks[snake.head.x][snake.head.y].classList.add("snake");

  // 6) Render all body segments
  for (let i = 0; i < snake.body.length; i++) {
    const seg = snake.body[i];
    blocks[seg.x][seg.y].classList.add("snake");
  }

  // 7) FOOD COLLISION
  if (snake.head.x === food.row && snake.head.y === food.col) {
    // Remove old food and spawn new one
    blocks[food.row][food.col].classList.remove("food");
    food = generateFood();
    blocks[food.row][food.col].classList.add("food");


    // Set Scores 
    setScores();

    // New body segment appears at the OLD tail position
    let newSegment;

    if (prevBody.length > 0) {
      // If body exists, append segment at previous tail
      newSegment = {
        x: prevBody[prevBody.length - 1].x,
        y: prevBody[prevBody.length - 1].y,
      };
    } else {
      // No body yet → attach to old head
      newSegment = { x: prevHead.x, y: prevHead.y };
    }

    snake.body.push(newSegment);
  }
}

function startTimer(){
  // Timer variable
  seconds+=1

  if(minutes ==  60 ){
    time[0] = "00"
  }
  if(seconds == 60){
    minutes++
    seconds = 0
  }
  document.querySelector(".time").innerHTML =
  `Time: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

initalSteup();

let id = setInterval(() => {
  if (direction != null) {
    renderSnake();
  }
}, 300);

let timerid = setInterval(
  startTimer
,1000)
