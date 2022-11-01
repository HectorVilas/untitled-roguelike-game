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
    //this action must be context sensitive. attack if there's an enemy,
    //walk if there's no entities, use if there's something interactable...
    //for now it will only walk
    if(dir === "n") walk(dir)
    else if(dir === "s") walk(dir)
    else if(dir === "e") walk(dir)
    else if(dir === "w") walk(dir)
  };

  function walk(dir){
    const to = {...player.pos};
    if(dir === "n") to.y--
    else if(dir === "s") to.y++
    else if(dir === "e") to.x++
    else if(dir === "w") to.x--;
    
    const isBlocked = getTile(1,to.x,to.y)?.isBlocking;
    const hasGround = getTile(0,to.x,to.y) !== undefined;
    
    if(!isBlocked && hasGround) player.pos = to;
  };

  return { player, testDummy, getTile, playerAction, walk };
})();