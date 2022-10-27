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
        const playerIsHere = layer === 1 && gameLogic.getPlayer().y == y && gameLogic.getPlayer().x == x;
        const url = playerIsHere ? "./media/images/sprites/arroba.png"
        : gameLogic.getTile(layer, x, y);
        
        layerTiles[i].style.backgroundImage = url === null ?  "" : `url(${url})`;
      }
    }
  };

  return { createBoard, drawOnBoard, addListeners };
})();

uI.createBoard();
uI.addListeners();
uI.drawOnBoard(0);
uI.drawOnBoard(1);