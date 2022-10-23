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

  function drawOnBoard(layer){
    const layerTiles = document.querySelectorAll(`#layer${layer} .tile`);
    for(let y = 0; y < board.getHeight() ;y++){
      for(let x = 0; x < board.getWidth(); x++){
        const i = x + ( y * board.getWidth() );
        layerTiles[i].innerText =
          layer === 1 && player.y == y && player.x == x 
          ? "@"
          : maps.getMap()[layer][y][x];
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
  const action = {
    up(){
      player.y--;
      display.drawOnBoard(1);
    },
    down(){
      player.y++;
      display.drawOnBoard(1);
    },
    left(){
      player.x--;
      display.drawOnBoard(1);
    },
    right(){
      player.x++;
      display.drawOnBoard(1);
    }
  };

  return { action };
})();

//--------------------------------------------------

const controls = (() => {
  const addListeners = () => {
    window.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      k === "arrowup" || k === "w" || k === "8" ? gameLogic.action.up() :
      k === "arrowdown" || k === "s" || k === "2" ? gameLogic.action.down() :
      k === "arrowleft" || k === "a" || k === "6" ? gameLogic.action.left() :
      k === "arrowright" || k === "d" || k === "4" ? gameLogic.action.right() :
      console.log(k + " is not binded");
    })
  };

  return { addListeners };
})();

//--------------------------------------------------

// ╔ ╚ ╝ ╗ ║ ═ ╩ ╦ ╠ ╣ ╬
const maps = (() => {
  const map = [
    [ //floor
      "sssssssssssssdd",
      "ssssssssssssddd",
      "ssssssssssdddDD",
      "sssssssssdddDdd",
      "sssssssssdddDdd",
      "sssssssssdddDdd",
      "sssssssssdddDdd",
      "sssssssssdddDdd",
      "sssssssssdddDdd",
      "ssssssssssddDdd",
      "sssssssssssdDdd",
      "dddssssssssddDd",
      "ddddssssssssdDd",
      "ddddssssssssddD",
      "dddddssssssssdd",
    ],
    [ //walls
      "               ",
      "               ",
      "  ww  wwww ww  ",
      "            w  ",
      "  w            ",
      "            w  ",
      "  wwwww  wwww  ",
      "               ",
      "               ",
      "               ",
      "               ",
      "            w  ",
      "            w  ",
      "        wwwww  ",
      "               ",
    ],
    [ //ceiling
      "               ",
      "               ",
      "  ccccccccccc  ",
      "  ccccccccccc  ",
      "  ccccccccccc  ",
      "  ccccccccccc  ",
      "  ccccccccccc  ",
      "               ",
      "               ",
      "               ",
      "               ",
      "           cc  ",
      "          ccc  ",
      "       cccccc  ",
      "               ",
    ]

  ];

  const tiles = {
    " ": {
      url: null,
      name: "nothing",
      blocks: false,
      flamable: false,
    },
    "w": {
      url: "./media/images/tiles/wall.png",
      name: "wall",
      blocks: true,
      flamable: true,
    },
    "s": {
      url: "./media/images/tiles/sand.png",
      name: "sand",
      blocks: false,
      flamable: false,
    },
    "S": {
      url: "./media/images/tiles/sand-path.png",
      name: "sand path",
      blocks: false,
      flamable: false,
    },
    "g": {
      url: "./media/images/tiles/grass.png",
      name: "grass",
      blocks: false,
      flamable: true,
    },
    "d": {
      url: "./media/images/tiles/dirt.png",
      name: "dirt",
      blocks: false,
      flamable: true,
    },
    "D": {
      url: "./media/images/tiles/dirt-path.png",
      name: "dirt path",
      blocks: false,
      flamable: true,
    },
    "c": {
      url: null,
      name: "ceiling",
      blocks: false,
      flamable: true,
    },
  }

  const getMap = () => map;

  return { getMap, tiles };
})();



//--------------------------------------------------

//run on start
// const player = Player("Jason");
const player = new Player("Jason", 4, 4);

display.createBoard();
controls.addListeners();
display.drawOnBoard(0);
display.drawOnBoard(1);