const gameArea = document.querySelector(".gameArea");
const rows = Math.floor(gameArea.clientHeight / 50);
const cols = Math.floor(gameArea.clientWidth / 50);
const blocks = [];
let direction = null;
let snake = {
  head: {
    x: 1,
    y: 1,
  },
};

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

function gameControls() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "w" || e.key === "ArrowUp") direction = "Up";
    if (e.key === "s" || e.key === "ArrowDown") direction = "Down";
    if (e.key === "a" || e.key === "ArrowLeft") direction = "Left";
    if (e.key === "d" || e.key === "ArrowRight") direction = "Right";
    if (direction != null) {
      if (e.key === "Enter") {
        clearInterval(id);
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
