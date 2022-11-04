import { Tile, Wall, Ceiling } from "./classes.js";

export const tiles = {
  "floor-tiles": {
    "w": new Tile("wood", "./media/images/tiles/floor-wood.png"),
    "s": new Tile("stone", "./media/images/tiles/floor-stone.png"),
    "g": new Tile("gravel", "./media/images/tiles/floor-gravel.png"),
    "G": new Tile("grass", "./media/images/tiles/floor-grass.png"),
    "d": new Tile("dirt", "./media/images/tiles/floor-dirt.png")
  },
  "walls": {
    "w": new Wall("wood", "./media/images/tiles/wall-wood.png", true),
    "c": new Wall("concrete", "./media/images/tiles/wall-concrete.png", true),
    "+": new Wall("window", "./media/images/tiles/wall-window.png", true),
  },
  "ceiling": {
    "w": new Ceiling("wood", "./media/images/tiles/ceiling-built.png", 100),
    "l": new Ceiling("leaves", "./media/images/tiles/ceiling-leaves.png", 50),
  },
};