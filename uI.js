import { gameLogic } from "./gameLogic.js";

export const uI = (() => {
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
      drawOnBoard(1);
    });
  };

  function createBoard(){
    for(let i = 0; i < 3; i++){
      const size = gameLogic.getBoardSize().x * gameLogic.getBoardSize().y;
      for(let j = 0; j < size ; j++){
        const tile = document.createElement("div");
        tile.classList.add("tile");

        const layer = dom[`layer${i}`];
        layer.appendChild(tile);
      }
    }
  };

  function drawOnBoard(layer){
    const layerTiles = document.querySelectorAll(`#layer${layer} .tile`);
    for(let y = 0; y < gameLogic.getBoardSize().x ;y++){
      for(let x = 0; x < gameLogic.getBoardSize().y; x++){
        const i = x + ( y * gameLogic.getBoardSize().x );
        const playerPos = {x: gameLogic.getPlayer().x, y: gameLogic.getPlayer().y};
        const isPlayerHere = layer === 1 && playerPos.y == y && playerPos.x == x;
        const playerUrl = "./media/images/sprites/arroba.png"
        const url = isPlayerHere ? playerUrl : gameLogic.getTile(layer, x, y);
        if(layer === 2) {
          const color = gameLogic.haveCeiling(layer, x, y) ? "rgba(0, 0, 0, .25)" : "";
          layerTiles[i].style.backgroundColor = color;
        } else {
          layerTiles[i].style.backgroundImage = url === null ?  "" : `url(${url})`;
        }
      }
    }
  };

  return { createBoard, drawOnBoard, addListeners };
})();

uI.createBoard();
uI.addListeners();
uI.drawOnBoard(0);
uI.drawOnBoard(1);
uI.drawOnBoard(2);