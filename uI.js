import { tiles } from "./tiles.js";
import { maps } from "./maps.js";

export const ui = (() => {
  const boardSize = 15;
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

  function refreshBoard(){
    const layers = ["floor-tiles", "walls", "ceiling"];
    for(let layer = 0; layer < layers.length; layer++){
      const tilesInDom = document.querySelectorAll(`.${layers[layer]} .tile`);
      for(let y = 0; y < boardSize; y++){
        for(let x = 0; x < boardSize; x++){
          const coordToIdx = y * boardSize + x;
          const mapChar = maps.testMap?.[layer]?.[y]?.[x];
          const tileInfo = tiles?.[layers[layer]]?.[mapChar];
          
          if(tileInfo === undefined){
            tilesInDom[coordToIdx].style.backgroundImage = "";
          } else {
            tilesInDom[coordToIdx].style.backgroundImage = `url(${tileInfo.url})`;
          }
          
        }
      }
    }
  };

  return { generateBoard, refreshBoard };
})();