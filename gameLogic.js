import { Player } from "./classes.js";
import { maps } from "./maps.js";
import { tiles } from "./tiles.js";

export const gameLogic = (() => {
  const player = new Player("Json", {x:0, y:0}, "./media/images/sprites/arroba.png");
  const testDummy = new Player("test", {x:1, y:1}, "./media/images/sprites/arroba.png");
  
  function getTile(layer, x, y){
    const layers = ["floor-tiles", "walls", "ceiling"];
    const char = maps.testMap?.[layer]?.[y]?.[x];
    const values = tiles[layers[layer]][char];
    
    return values
  };

  function playerAction(dir){
    if(dir === "n") player.pos.y--
    else if(dir === "s") player.pos.y++
    else if(dir === "e") player.pos.x++
    else if(dir === "w") player.pos.x--
  }

  return { player, testDummy, getTile, playerAction };
})();