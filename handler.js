import {ui} from "./ui.js";
import { gameLogic } from "./gameLogic.js";
import { maps } from "./maps.js";
import { Player } from "./classes.js";

const player = new Player("Json", {x:5, y:5})

ui.generateBoard();
