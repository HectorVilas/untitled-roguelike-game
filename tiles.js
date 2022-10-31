import { Tile, Wall } from "./classes.js";

export const tiles = {
  " ": new Tile("empty", null, false),
  floor: {
    "w": new Tile("wood", "./media/images/tiles/floor-wood.png"),
    "s": new Tile("stone", "./media/images/tiles/floor-stone.png"),
    "g": new Tile("gravel", "./media/images/tiles/floor-gravel.png"),
    "d": new Tile("dirt", "./media/images/tiles/floor-dirt.png")
    //url example: ./media/images/tiles/dirt.jpg
  },
  wall: {
    "w": new Wall("wood", "./media/images/tiles/wall-wood.png", true),
    "c": new Wall("concrete", "./media/images/tiles/wall-concrete.png", true),
    "+": new Wall("window", "./media/images/tiles/wall-window.png", true),
  },
  ceiling: {
    "w": new Tile("wood", "./media/images/tiles/ceiling-built.png"),
    "l": new Tile("leaves", "./media/images/tiles/ceiling-leaves.png"),
  },
};