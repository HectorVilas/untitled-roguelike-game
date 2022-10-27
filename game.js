class Player {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  get x(){ return this._x };
  get y(){ return this._y };
  set x(val){ this._x = parseInt(val) };
  set y(val){ this._y = parseInt(val) };
  get loc(){ return {x: this.x, y: this.y} };
}



//--------------------------------------------------

const uI = (() => {
  const dom = {
    board: document.querySelector("#board"),
    layer0: document.querySelector("#layer0"),
    layer1: document.querySelector("#layer1"),
    layer2: document.querySelector("#layer2"),
  };
  const binds = {
    north: ["arrowup", "w", "8"],
    south: ["arrowdown", "s", "2"],
    west: ["arrowleft", "a", "4"],
    east: ["arrowright", "d", "6"],
  };

  const addListeners = () => {
    window.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      if(binds.north.includes(k)) gameLogic.move("n")
      else if (binds.south.includes(k)) gameLogic.move("s")
      else if(binds.west.includes(k)) gameLogic.move("w")
      else if(binds.east.includes(k)) gameLogic.move("e")
    });
  };

  function createBoard(){
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < gameLogic.getBoardSize() ; j++){
        const tile = document.createElement("div");
        tile.classList.add("tile");

        const layer = i === 0 ? dom.layer0 : i === 1 ? dom.layer1 : dom.layer2;
        layer.appendChild(tile);
      }
    }
  };

  function drawOnBoard(layer){
    const layerTiles = document.querySelectorAll(`#layer${layer} .tile`);
    for(let y = 0; y < gameLogic.getBoardHeight() ;y++){
      for(let x = 0; x < gameLogic.getBoardWidth(); x++){
        const i = x + ( y * gameLogic.getBoardWidth() );
        const playerIsHere = layer === 1 && player.y == y && player.x == x;
        const url = playerIsHere ? "./media/images/sprites/arroba.png"
        : gameLogic.getTile(layer, x, y);
        
        layerTiles[i].style.backgroundImage = url === null ?  "" : `url(${url})`;
      }
    }
  };

  return { createBoard, drawOnBoard, addListeners };
})();


const gameLogic = (() => {
  const boardWidth = 15;
  const boardHeight = 15;

  const getBoardWidth = () => boardWidth;
  const getBoardHeight = () => boardHeight;
  const getBoardSize = () => boardWidth * boardHeight;
  const getTile = (layer, x, y) => maps.tiles[maps.getMap()[layer][y][x]].url;
  const move = (dir) => {
    const to = {x: player.x, y: player.y};

    dir === "n" ? to.y--
    : dir === "s" ? to.y++
    : dir === "w" ? to.x--
    : dir === "e" ? to.x++
    : console.log("invalid direction");

    if(!maps.isBlocked(to.x,to.y)) {
      player.x = to.x;
      player.y = to.y;
    };

    uI.drawOnBoard(1);
  }

  return { getBoardWidth, getBoardHeight, getBoardSize, getTile, move };
})();



//--------------------------------------------------

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
      "  ww www       ",
      "  w    w       ",
      "               ",
      "  w    w       ",
      "  ww www       ",
      "               ",
      "               ",
      "               ",
      "               ",
      "      ww ww    ",
      "      w   w    ",
      "      w   w    ",
      "      wwwww    ",
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

  const isBlocked = (x, y) => {
    const destination = tiles[map[1][y]?.[x]]?.blocks;
    const isBlocked = destination === undefined || destination;

    return isBlocked ? true : false;
  }

  const getMap = () => map;

  return { getMap, tiles, isBlocked };
})();



//--------------------------------------------------

//run on start
const player = new Player("Jason", 4, 4);

uI.createBoard();
uI.addListeners();
uI.drawOnBoard(0);
uI.drawOnBoard(1);