class Player {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  get x(){
    return this._x;
  };
  get y(){
    return this._y;
  };
  set x(val){
    this._x = parseInt(val);
  };
  set y(val){
    this._y = parseInt(val);
  };
}

//--------------------------------------------------

const display = (() => {
  const dom = {
    board: document.querySelector("#board"),
    layer0: document.querySelector("#layer0"),
    layer1: document.querySelector("#layer1"),
    layer2: document.querySelector("#layer2"),
  };

  function createBoard(){
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < board.getSize() ; j++){
        const tile = document.createElement("div");
        tile.classList.add("tile");
  
        i === 0 ? dom.layer0.appendChild(tile) :
        i === 1 ? dom.layer1.appendChild(tile) :
        dom.layer2.appendChild(tile);
      }
    }
  };

  function drawOnBoard(){
    const layer0Tiles = document.querySelectorAll("#layer0 .tile");
    for(let y = 0; y < board.getHeight() ;y++){
      for(let x = 0; x < board.getWidth(); x++){
        const i = x + ( y * board.getWidth() );
        layer0Tiles[i].innerText = player.y == y && player.x == x ? "@" : maps.getMap()[y][x];
      }
    }
  };

  return { createBoard, drawOnBoard };
})();

//--------------------------------------------------

const board = (() => {
  const width = 15;
  const height = 15;

  const getWidth = () => width;
  const getHeight = () => height;
  const getSize = () => width * height;

  return { getWidth, getHeight, getSize };
})();

//--------------------------------------------------

const gameLogic = (() => {
  //game rules here
  return {  };
})();

//--------------------------------------------------

const controls = (() => {
  const addListeners = () => {
    window.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      k === "arrowup" || k === "w" || k === "8" ? actionUp() :
      k === "arrowdown" || k === "s" || k === "2" ? actionDown() :
      k === "arrowleft" || k === "a" || k === "6" ? actionLeft() :
      k === "arrowright" || k === "d" || k === "4" ? actionRight() :
      console.log(k + " is not binded");
    })
  };

  const actionUp = () => {
    player.y--;
    display.drawOnBoard();
  }
  const actionDown = () => {
    player.y++;
    display.drawOnBoard();
  }
  const actionLeft = () => {
    player.x--;
    display.drawOnBoard();
  }
  const actionRight = () => {
    player.x++;
    display.drawOnBoard();
  }

  return { addListeners };
})();

//--------------------------------------------------

// ╔ ╚ ╝ ╗ ║ ═ ╩ ╦ ╠ ╣ ╬
const maps = (() => {
  const map = [
    "     NORTE     ",
    "               ",
    "  ╔═  ════ ═╗  ",
    "            ║  ",
    "  ║            ",
    "            ║  ",
    "  ╚════  ═══╝  ",
    "O             E",
    "E             S",
    "S             T",
    "T             E",
    "E           ║  ",
    "            ║  ",
    "        ════╝  ",
    "      SUR      ",
  ];

  const getMap = () => map;

  return { getMap };
})();



//--------------------------------------------------

//run on start
// const player = Player("Jason");
const player = new Player("Jason", 4, 4);

display.createBoard();
controls.addListeners();
display.drawOnBoard();