import { tiles } from "./tiles.js";
import { maps } from "./maps.js";

export const ui = (() => {
  let boardSize = 15;
  const dom = {
    layer0: document.querySelector("#layer0"), //floor-tiles
    layer1: document.querySelector("#layer1"), //floor-sprites
    layer2: document.querySelector("#layer2"), //walls and sprites
    layer3: document.querySelector("#layer3"), //ceiling
  }

  function generateBoard(){
    for(let value in dom) {
      const layer = dom[value];

      layer.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
      layer.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
      
      for(let i = 0; i < boardSize * boardSize; i++){
        const tile = document.createElement("div");
        tile.classList.add("tile");

        layer.appendChild(tile);
      }
    }
  };

  function refreshBoard(playerPos){
    const layers = ["floor-tiles", "walls", "ceiling"];

    for(let layer = 0; layer < layers.length; layer++){
      const tilesInDom = document.querySelectorAll(`.${layers[layer]} .tile`);

      for(let y = 0; y < boardSize; y++){
        for(let x = 0; x < boardSize; x++){
          const coordToIdx = y * boardSize + x;
          const offsetX = x + (playerPos.x - Math.floor(boardSize/2));
          const offsetY = y + (playerPos.y - Math.floor(boardSize/2));
          const mapChar = maps.testMap?.[layer]?.[offsetY]?.[offsetX];
          const tileInfo = tiles?.[layers[layer]]?.[mapChar];
          
          const image = tileInfo === undefined ? "" : `url(${tileInfo.url})`;
          tilesInDom[coordToIdx].style.backgroundImage = image;
        }
      }
    }
  };

  function refreshSprites(player, spriteList){
    const layer = document.querySelectorAll("#layer2 .tile");

    const x = Math.floor(boardSize/2);
    const y = Math.floor(boardSize/2) * boardSize;
    layer[x + y].style.backgroundImage = `url(${player.url})`;

    spriteList.forEach(sprite => {
      const x = sprite.pos.x +  Math.floor(boardSize/2) - player.pos.x;
      const y = (sprite.pos.y + Math.floor(boardSize/2) - player.pos.y) * boardSize;
      layer[x + y].style.backgroundImage = `url(${sprite.url})`;
    });
  };

  return { generateBoard, refreshBoard, refreshSprites };
})();