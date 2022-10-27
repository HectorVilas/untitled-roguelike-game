import { maps } from "./maps.js";
import { Player } from "./classes.js";

export const gameLogic = (() => {
  const boardSize = { x: 15, y:15 };

  const getBoardSize = () => boardSize;
  const getTile = (layer, x, y) => maps.tiles[maps.getMap()[layer][y][x]].url;
  const haveCeiling = (layer, x, y) => maps.getMap()[layer][y][x] === "c";
  const getPlayer = () => player;
  
  const isBlocked = (x, y) => {
    const destinationBlocks = maps.tiles[maps.getMap()[1][y]?.[x]]?.blocks;
    const isBlocked = destinationBlocks === undefined || destinationBlocks;

    return isBlocked ? true : false;
  }
  
  const move = (dir) => {
    const to = {...player.pos};

    if(dir === "n") to.y--
    else if(dir === "s") to.y++
    else if(dir === "w") to.x--
    else if(dir === "e") to.x++

    if(!isBlocked(to.x,to.y)) {
      player.pos = to;
    };
  };
  
  return { getBoardSize, getTile, getPlayer, haveCeiling, move };
})();

const player = new Player("Jason", {x:4, y:4});
