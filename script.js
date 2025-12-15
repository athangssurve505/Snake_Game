const gameArea = document.querySelector(".gameArea");
const rows = Math.floor(gameArea.clientHeight / 50);
const cols = Math.floor(gameArea.clientWidth / 50);
const blocks = [];
let direction = null;
let current = {
  head: {
    x: 1,
    y: 1,
  },
  body: []
};

let previous = {
  head: {
    x: current.head.x,
    y: current.head.y
  },
  body: []
}

let food = generateFood();

function initalSteup() {
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

function generateFood() {
  const foodRow = Math.floor(Math.random() * rows);
  const foodCol = Math.floor(Math.random() * cols);
  return {
    row: foodRow,
    col: foodCol
  };
}

function renderSnake() {
  previous.head.x = current.head.x;
  previous.head.y = current.head.y;

 

  if(current.body.length>0){
  previous.body[0].x = current.body[0].x
  previous.body[0].y = current.body[0].y

    if (direction === "Up") current.body[0].x -= 1;
  if (direction === "Down") current.body[0].x += 1;
  if (direction === "Left") current.body[0].y -= 1;
  if (direction === "Right") current.body[0].y += 1;

  }

  if (direction === "Up") current.head.x -= 1;
  if (direction === "Down") current.head.x += 1;
  if (direction === "Left") current.head.y -= 1;
  if (direction === "Right") current.head.y += 1;


  // Snake Render
  blocks[current.head.x][current.head.y].classList.add("snake");
  blocks[previous.head.x][previous.head.y].classList.remove("snake");

  if(current.body.length>0){

  blocks[current.body[0].x][current.body[0].y].classList.add("snake");
  blocks[previous.body[0].x][previous.body[0].y].classList.remove("snake");
  }


  // Food Render after consumed
  if (blocks[current.head.x][current.head.y] === blocks[food.row][food.col]) {
    blocks[food.row][food.col].classList.remove("food")
    food = generateFood();
    blocks[food.row][food.col].classList.add("food")


   
       current.body.push({x:previous.head.x,y:previous.head.y});
       previous.body.push({x:previous.head.x,y:previous.head.y});

  


    console.log(current,previous)
  }

}

initalSteup();

let id = setInterval(() => {
  if (direction != null) {
    renderSnake();
  }
}, 300);
