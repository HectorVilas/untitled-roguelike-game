const display = (() => {
  const dom = {
    board: document.querySelector("#board"),
    layer0: document.querySelector("#layer0"),
    layer1: document.querySelector("#layer1"),
    layer2: document.querySelector("#layer2"),
    
  };

  function createBoard(){
    const layers = 3;
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
    for(let x = 0; x < board.getHeight() ;x++){
      for(let y = 0; y < board.getWidth(); y++){
        const i = y + ( x * board.getWidth() )
        layer0Tiles[i].innerText = maps.getMap()[x][y];
      }
    }
  };

  return { createBoard, drawOnBoard };
})();

//////////////////////////////////////////////////

const board = (() => {
  const width = 16;
  const height = 16;

  const getWidth = () => width;
  const getHeight = () => height;
  const getSize = () => width * height;

  return { getWidth, getHeight, getSize };
})();

//////////////////////////////////////////////////
// ╔ ╚ ╝ ╗ ║ ═ ╩ ╦ ╠ ╣ ╬
const maps = (() => {
  const map = [
    "     NORTE      ",
    "                ",
    "  ╔═  ════  ═╗  ",
    "             ║  ",
    "  ║             ",
    "             ║  ",
    "  ╚════  ════╝  ",
    "O              E",
    "E              S",
    "S              T",
    "T              E",
    "E            ║  ",
    "             ║  ",
    "             ║  ",
    "        ═════╝  ",
    "      SUR       ",
  ];

  const getMap = () => map;

  return { getMap };
})();

//run on start
display.createBoard();
display.drawOnBoard();