import { maps } from "./maps.js";
import { Player } from "./classes.js";

export const gameLogic = (() => {
  const boardWidth = 15;
  const boardHeight = 15;

  const getBoardWidth = () => boardWidth;
  const getBoardHeight = () => boardHeight;
  const getTile = (layer, x, y) => maps.tiles[maps.getMap()[layer][y][x]].url;
  const getPlayer = () => player;
  const move = (dir) => {
    const to = {x: player.x, y: player.y};

    dir === "n" ? to.y--
    : dir === "s" ? to.y++
    : dir === "w" ? to.x--
    : dir === "e" ? to.x++
    : console.log("invalid direction");

    if(!maps.isBlocked(to.x,to.y)) {
      player.x = to.x;
      player.y = to.y;
    };
  };

  return { getBoardWidth, getBoardHeight, getTile, getPlayer, move };
})();

const player = new Player("Jason", 4, 4);
