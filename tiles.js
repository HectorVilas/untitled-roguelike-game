import { Tile, Wall } from "./classes.js";

export const tiles = {
  " ": new Tile("empty", null, false),
  floor: {
    "w": new Tile("wood", "pending url"),
    "s": new Tile("stone", "pending url"),
    "g": new Tile("gravel", "pending url"),
    "d": new Tile("dirt", "pending url")
    //url example: ./media/images/tiles/dirt.jpg
  },
  wall: {
    "w": new Wall("wood", "pending url", true),
    "c": new Wall("concrete", "pending url", true),
    "+": new Wall("window", "pending url", true),
  },
  ceiling: {
    "w": new Tile("wood", "pending url"),
    "l": new Tile("leaves", "pending url"),
  },
};