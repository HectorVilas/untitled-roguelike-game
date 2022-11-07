import { Wall, Ceiling, Floor } from "./classes.js";

export const tiles = {
  "floor-tiles": { //name, url, colRow
    //nature
    "g1": new Floor("scarce grass", "./gfx/tileset.png", { c:13, r:1 }),
    "g2": new Floor("short grass", "./gfx/tileset.png", { c:13, r:1 }),
    "g3": new Floor("tall grass", "./gfx/tileset.png", { c:13, r:1 }),
    "g4": new Floor("overgrown grass", "./gfx/tileset.png", { c:13, r:1 }),
    "d": new Floor("dirt", "./gfx/tileset.png", { c:13, r:5 }),
    "p": new Floor("pebbles", "./gfx/tileset.png", { c:13, r:6 }),
    //built
    "w1": new Floor("wood", "./gfx/tileset.png", { c:13, r:7 }),
    "w2": new Floor("wood", "./gfx/tileset.png", { c:13, r:8 }),
    "w3": new Floor("wood", "./gfx/tileset.png", { c:13, r:9 }),
    "w4": new Floor("wood", "./gfx/tileset.png", { c:13, r:10 }),
    //street
    "s": new Floor("street", "./gfx/tileset.png", { c:15, r:1 }),
    "sp": new Floor("street pothole", "./gfx/tileset.png", { c:15, r:2 }),
    "sl": new Floor("street line", "./gfx/tileset.png", { c:15, r:3 }),
    "sc": new Floor("street crosswalk", "./gfx/tileset.png", { c:15, r:5 }),
  },
  "walls": { //name, url, colRow, isBlocking
    //tall
    "r": new Wall("revoked","./gfx/tileset.png", { c:1, r:1 }, true),
    "b": new Wall("brick","./gfx/tileset.png", { c:3, r:1 }, true),
    "w": new Wall("wood","./gfx/tileset.png", { c:5, r:1 }, true),
    //fence
    "fm": new Wall("palisade fence","./gfx/tileset.png", { c:1, r:8 }, true),
    "fb": new Wall("brick fence","./gfx/tileset.png", { c:3, r:8 }, true),
    "fw": new Wall("wood fence","./gfx/tileset.png", { c:5, r:8 }, true),
  },
  "ceiling": { //name, url, colRow, coverage
    "b": new Ceiling("built","./gfx/tileset.png", { c:15, r:7 }, 100),
    "l": new Ceiling("leaves","./gfx/tileset.png", { c:15, r:8 }, 50),
  },
};