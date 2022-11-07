import { gameLogic } from "./gameLogic.js";

export const ui = (() => {
  const scale = {
    boardSize: 21,
    tilesetWidth: 24,
    tilePixelRes: 12,
    pixelMultiplier: 3,
    getDomTileSize: () => scale.tilePixelRes * scale.pixelMultiplier,
    getDomBoardSize: () => scale.getDomTileSize() * scale.boardSize,
  };

  const domLayers = {
    layer0: document.querySelector("#layer0"), //floor-tiles
    layer1: document.querySelector("#layer1"), //floor-sprites
    layer2: document.querySelector("#layer2"), //walls and sprites
    layer3: document.querySelector("#layer3"), //ceiling
  }

  function generateBoard(){
    for(let value in domLayers) {
      const layer = domLayers[value];

      layer.replaceChildren();
      layer.style.gridTemplateColumns = `repeat(${scale.boardSize}, 1fr)`;
      layer.style.gridTemplateRows = `repeat(${scale.boardSize}, 1fr)`;
      
      for(let i = 0; i < scale.boardSize * scale.boardSize; i++){
        const tile = document.createElement("div");
        tile.classList.add("tile");

        layer.appendChild(tile);
      }
    }
  };

  function refreshBoard(playerPos){

    for(let layer = 0; layer < 3; layer++){
      const tilesInDom = document.querySelectorAll(`#layer${layer} .tile`);

      for(let y = 0; y < scale.boardSize; y++){
        for(let x = 0; x < scale.boardSize; x++){
          const coordToIdx = y * scale.boardSize + x;
          const offsetX = x + (playerPos.x - Math.floor(scale.boardSize/2));
          const offsetY = y + (playerPos.y - Math.floor(scale.boardSize/2));
          const tile = gameLogic.getTile(layer, offsetX, offsetY);

          if(tile !== undefined){
            tilesInDom[coordToIdx].style.backgroundImage = `url(${tile.url})`;
            tilesInDom[coordToIdx].style.backgroundPosition = `calc(100% - 100% * ${tile.colRow.c}) calc(100% - 100% * ${tile.colRow.r})`;
          } else {
            tilesInDom[coordToIdx].style.backgroundImage = "";
          };
        }
      }
    }
  };

  function refreshSprites(player, spriteList){
    const layer = document.querySelectorAll("#layer1 .tile");

    const x = Math.floor(scale.boardSize/2);
    const y = Math.floor(scale.boardSize/2) * scale.boardSize;
    layer[x + y].style.backgroundImage = `url(${player.url})`;

    spriteList.forEach(sprite => {
      const x = sprite.pos.x +  Math.floor(scale.boardSize/2) - player.pos.x;
      const y = (sprite.pos.y + Math.floor(scale.boardSize/2) - player.pos.y) * scale.boardSize;
      
      const onScreenX = x >= 0 && x < scale.boardSize;
      const onScreenY = y/scale.boardSize >= 0 && y/scale.boardSize < scale.boardSize;

      if(onScreenX && onScreenY) {
        layer[x + y].style.backgroundImage = `url(${sprite.url})`;
      }
    });
  };

  function domResizePixels(pixelResize){
    if(pixelResize === -1 && scale.pixelMultiplier === 1) return;
    const tiles = document.querySelectorAll(".tile");
    const board = document.querySelector("#board")

    scale.pixelMultiplier += parseInt(pixelResize);
    board.style.width = `${scale.getDomBoardSize()}px`;
    board.style.height = `${scale.getDomBoardSize()}px`;
    tiles.forEach(tile => {
      tile.style.width = `${scale.getDomTileSize()}px`; 
      tile.style.height = `${scale.getDomTileSize()}px`; 
    })
  };

  function domBoardTiles(resize){
    scale.boardSize += resize;
    generateBoard();
    domResizePixels(0);
  };

  return { generateBoard, refreshBoard, refreshSprites, domResizePixels,
    domBoardTiles };
})();