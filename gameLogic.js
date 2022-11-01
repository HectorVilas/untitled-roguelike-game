import { Player } from "./classes.js";

export const gameLogic = (() => {
  const player = new Player("Json", {x:0, y:0}, "./media/images/sprites/arroba.png");
  const testDummy = new Player("test", {x:1, y:1}, "./media/images/sprites/arroba.png");
  
  return { player, testDummy };
})();