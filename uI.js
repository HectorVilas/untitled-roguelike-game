import { tiles } from "./tiles.js";

export const ui = (() => {
  const boardSize = { width: 15, height: 15 }
  const dom = {
    layer0: document.querySelector("#layer0"), //floor-tiles
    layer1: document.querySelector("#layer1"), //floor-sprites
    layer2: document.querySelector("#layer2"), //walls and sprites
    layer3: document.querySelector("#layer3"), //ceiling
  }

  function generateBoard(){
    for(let value in dom) {
      const layer = dom[value];

      layer.style.gridTemplateColumns = `repeat(${boardSize.width}, 1fr)`;
      layer.style.gridTemplateRows = `repeat(${boardSize.height}, 1fr)`;
      
      for(let i = 0; i < boardSize.width * boardSize.height; i++){
        const tile = document.createElement("div");
        tile.classList.add("tile");

        layer.appendChild(tile);
      }
    }
  };

  return { generateBoard };
})();