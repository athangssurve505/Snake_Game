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
let direction = null;
let snake = {
  head: {
    x: 1,
    y: 1,
  },
};

let previous = {
  head: {
    x: current.head.x,
    y: current.head.y
  },
  body: []
}

let food = generateFood();

function initalSteup(){
    createGrid();
    gameControls();
    blocks[food.row][food.col].classList.add("food")
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

function generateFood(){
    const foodRow = Math.floor(Math.random() * rows);
    const foodCol = Math.floor(Math.random() * cols);
     return  {
        row:foodRow,
        col:foodCol
    };
}

function renderSnake() {
  let intial = {x:snake.head.x, y:snake.head.y};
  if (direction === "Up") snake.head.x -= 1;
  if (direction === "Down") snake.head.x += 1;
  if (direction === "Left") snake.head.y -= 1;
  if (direction === "Right") snake.head.y += 1;

  // Snake Render
  blocks[snake.head.x][snake.head.y].classList.add("snake");
  blocks[intial.x][intial.y].classList.remove("snake");

  // Food Render after consumed
  if(blocks[snake.head.x][snake.head.y] === blocks[food.row][food.col]){
    blocks[food.row][food.col].classList.remove("food")
    food = generateFood();
    blocks[food.row][food.col].classList.add("food")
  }

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
