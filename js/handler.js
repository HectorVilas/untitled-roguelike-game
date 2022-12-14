import {ui} from "./uI.js";
import { gameLogic } from "./gameLogic.js";
import { binds } from "./keyBinds.js"

ui.generateBoard();
ui.refreshBoard(gameLogic.player.pos);
ui.refreshSprites(gameLogic.player, [gameLogic.testDummy]);

window.addEventListener("keydown", (e) => {
  if(e.key === "/") e.preventDefault();
  const k = e.key.toLowerCase();
    if(binds.north.includes(k)) gameLogic.playerAction("n");
    else if (binds.south.includes(k)) gameLogic.playerAction("s");
    else if(binds.west.includes(k)) gameLogic.playerAction("w");
    else if(binds.east.includes(k)) gameLogic.playerAction("e");
    //temporal
    else if(k === "+") ui.setDomResizePixels(+1);
    else if(k === "-") ui.setDomResizePixels(-1);
    else if(k === "/") ui.setDomBoardTiles(+2);
    else if(k === "*") ui.setDomBoardTiles(-2);

    ui.refreshBoard(gameLogic.player.pos);
    ui.refreshSprites(gameLogic.player, [gameLogic.testDummy]);
});