import { maps } from "./maps.js";
import { Player } from "./classes.js";

export const gameLogic = (() => {
  const boardSize = { x: 15, y:15 };

  const getBoardSize = () => boardSize;
  const getTile = (layer, x, y) => maps.tiles[maps.getMap()[layer][y][x]].url;
  const haveCeiling = (layer, x, y) => maps.getMap()[layer][y][x] === "c";
  const getPlayer = () => player;
  const move = (dir) => {
    const to = {x: player.x, y: player.y};

    if(dir === "n") to.y--
    else if(dir === "s") to.y++
    else if(dir === "w") to.x--
    else if(dir === "e") to.x++

    if(!maps.isBlocked(to.x,to.y)) {
      player.x = to.x;
      player.y = to.y;
    };
  };

  return { getBoardSize, getTile, getPlayer, haveCeiling, move };
})();

const player = new Player("Jason", 4, 4);
