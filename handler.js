import {ui} from "./ui.js";
import { gameLogic } from "./gameLogic.js";

ui.generateBoard();
ui.refreshBoard(gameLogic.player.pos);
ui.refreshSprites(gameLogic.player, [gameLogic.testDummy]);

//for testing
window.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
    if(k == "arrowup") gameLogic.player.pos.y--
    else if (k == "arrowdown") gameLogic.player.pos.y++
    else if(k == "arrowleft") gameLogic.player.pos.x--
    else if(k == "arrowright") gameLogic.player.pos.x++

    ui.refreshBoard(gameLogic.player.pos);
    ui.refreshSprites(gameLogic.player, [gameLogic.testDummy]);
});
