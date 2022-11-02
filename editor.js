import { tiles } from "./tiles.js";

let mousedown = false;
const layers = document.querySelectorAll(".board-layer");

const tools = {
  activeTool: "draw",
  layer: 0,
  tile: "s",
};

let map = new Array(
  new Array(24).fill("GGGGGGGGGGGGGGGGGGGGGGGG"),
  new Array(24).fill("                        "),
  new Array(24).fill("                        "),
  );
  
for(let layer = 0; layer < layers.length; layer++){
  for(let y = 0; y < 24; y++){
    for(let x = 0; x < 24; x++){
      const tile = document.createElement("div");
      tile.classList.add("tile");
      
      if(layer === layers.length-1){
        tile.dataset.x = x;
        tile.dataset.y = y;
        tile.addEventListener("mousedown", editMapTile);
        tile.addEventListener("mouseenter", () => {if(mousedown) editMapTile(x,y)});
      }

      layers[layer].appendChild(tile);
    }
  }
};

const btnFloor = document.querySelectorAll(".floor-list .tile-btn");
const btnWall = document.querySelectorAll(".wall-list .tile-btn");
const btnCeiling = document.querySelectorAll(".ceiling-list .tile-btn");

[btnFloor, btnWall,btnCeiling].forEach(btnSet => {
  btnSet.forEach(btn => {
    btn.addEventListener("click", () => {
      const btns = document.querySelectorAll(".tile-btn");
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      tools.activeTool = "draw";
      tools.layer = btn.className.includes("floor") ? 0
      : btn.className.includes("wall") ? 1 : 2;
      tools.tile = btn.dataset.char;

      console.log(tools.activeTool, tools.layer, tools.tile);
    });
  });
});

function refreshMap(){
  const layers = ["floor-tiles", "walls", "ceiling"];

  for(let layer = 0; layer < 3; layer++){
    const tilesInDom = document.querySelectorAll(`#layer${layer} .tile`);

    for(let y = 0; y < 24; y++){
      for(let x = 0; x < 24; x++){
        const coordToIdx = y * 24 + x;
        const char = map[layer][y][x];
        const url = tiles[layers[layer]]?.[char]?.url || "";

        tilesInDom[coordToIdx].style.backgroundImage = `url(${url})`;
      }
    }
  }
}

function editMapTile(argX, argY){
  if(tools.activeTool === "draw"){
    const layer = tools.layer;
    const x = typeof argX === "number" ? argX : this.dataset.x;
    const y = typeof argY === "number" ? argY : this.dataset.y;
    const char = tools.tile;

    placeTile(layer, x, y, char);
  }

  refreshMap();
};

function placeTile(layer, x, y, char){
  const stringToArray = map[layer][y].split("");
  stringToArray[x] = char;
  map[layer][y] = stringToArray.join("");
}

window.addEventListener("mousedown", () => mousedown = true);
window.addEventListener("mouseup", () => mousedown = false);


//run on start
refreshMap();