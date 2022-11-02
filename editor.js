const layers = document.querySelectorAll(".board-layer");

for(let layer = 0; layer < layers.length; layer++){
  for(let y = 0; y < 24; y++){
    for(let x = 0; x < 24; x++){
      const tile = document.createElement("div");
      tile.classList.add("tile");
      
      if(layer === layers.length-1){
        tile.dataset.x = x;
        tile.dataset.y = y;
        tile.addEventListener("click", placeTiles);
      }

      layers[layer].appendChild(tile);
    }
  }
};

function placeTiles(){
  console.log(this.dataset.x, this.dataset.y);
};

const map = new Array(
  new Array(24).fill("                        "),
  new Array(24).fill("                        "),
  new Array(24).fill("                        ")
  );