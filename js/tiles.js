import { Wall, Ceiling, Floor, Entity } from "./classes.js";

export const tiles = {
  "floor-tiles": { //name, url, colRow
    //nature
    "g1": new Floor("scarce grass", "./gfx/floors16.png", { c:1, r:1 }),
    "g2": new Floor("very short grass", "./gfx/floors16.png", { c:1, r:2 }),
    "g3": new Floor("short grass", "./gfx/floors16.png", { c:1, r:3 }),
    "g4": new Floor("grass", "./gfx/floors16.png", { c:1, r:4 }),
    "g5": new Floor("long grass", "./gfx/floors16.png", { c:1, r:5 }),
    "g6": new Floor("overgrown grass", "./gfx/floors16.png", { c:1, r:6 }),
    "d1": new Floor("very little dirt and grass", "./gfx/floors16.png", { c:3, r:1 }),
    "d2": new Floor("dirt and some grass", "./gfx/floors16.png", { c:3, r:2 }),
    "d3": new Floor("dirt and little grass", "./gfx/floors16.png", { c:3, r:3 }),
    "d4": new Floor("dirt and scarce grass", "./gfx/floors16.png", { c:3, r:4 }),
    "d5": new Floor("dirt", "./gfx/floors16.png", { c:3, r:5 }),
    "d6": new Floor("dry dirt", "./gfx/floors16.png", { c:3, r:6 }),
    //built
    "w1": new Floor("wood", "./gfx/floors16.png", { c:5, r:1 }),
    "w2": new Floor("wood", "./gfx/floors16.png", { c:5, r:2 }),
    "w3": new Floor("wood", "./gfx/floors16.png", { c:5, r:3 }),
    "w4": new Floor("wood", "./gfx/floors16.png", { c:5, r:4 }),
    "w5": new Floor("wood", "./gfx/floors16.png", { c:5, r:5 }),
    "t1": new Floor("tiles", "./gfx/floors16.png", { c:9, r:1 }),
    "t2": new Floor("tiles", "./gfx/floors16.png", { c:9, r:2 }),
    "t3": new Floor("tiles", "./gfx/floors16.png", { c:9, r:3 }),
    "t4": new Floor("tiles", "./gfx/floors16.png", { c:9, r:4 }),
    "t5": new Floor("tiles", "./gfx/floors16.png", { c:9, r:5 }),
    //street
    "st": new Floor("street", "./gfx/floors16.png", { c:7, r:1 }),
    "stp": new Floor("street pothole", "./gfx/floors16.png", { c:7, r:2 }),
    "stl": new Floor("street line", "./gfx/floors16.png", { c:7, r:3 }),
    "stc": new Floor("street crosswalk", "./gfx/floors16.png", { c:7, r:5 }),
  },

  "walls": { //name, url, colRow, isBlocking, connectsToWalls
    //tall
    "r": new Wall("revoked","./gfx/walls16.png", { c:1, r:1 }, true, true),
    "b": new Wall("brick","./gfx/walls16.png", { c:5, r:1 }, true, true),
    "w1": new Wall("wood","./gfx/walls16.png", { c:1, r:5 }, true, true),
    "w2": new Wall("wood","./gfx/walls16.png", { c:5, r:5 }, true, true),
    "g": new Wall("glass","./gfx/walls16.png", { c:9, r:13 }, true, true),
    //fence
    "f1": new Wall("brick","./gfx/walls16.png", { c:9, r:1 }, true, true),
    "f2": new Wall("brick with palisade","./gfx/walls16.png", { c:9, r:5 }, true, true),
    "f3": new Wall("aluminium palisade","./gfx/walls16.png", { c:1, r:9 }, true, true),
    "f4": new Wall("wood palisade","./gfx/walls16.png", { c:5, r:9 }, true, true),
    "f5": new Wall("revoked","./gfx/walls16.png", { c:9, r:9 }, true, true),
    "f6": new Wall("wire fence","./gfx/walls16.png", { c:1, r:13 }, true, true),
    "f7": new Wall("wood palisade","./gfx/walls16.png", { c:5, r:13 }, true, true),
  },
  
  "ceiling": { //name, url, colRow, coverage
    "b": new Ceiling("built","./gfx/tileset.png", { c:15, r:7 }, 100),
  },
  
  "sprites": { //name, url, colRow, isBlocking, connectsToSelf, hasOverlay
    "wtb": new Entity("wooden table","./gfx/props16.png", { c:1, r:1 }, true, true, false),
    "wb": new Entity("wooden bed","./gfx/props16.png", { c:1, r:5 }, true, true, false),
    "kc": new Entity("kitchen counter","./gfx/props16.png", { c:2, r:16 }, true, true, false),
    "ptr": new Entity("pantry","./gfx/props16.png", { c:6, r:2 }, true, false, true),
    "ovn": new Entity("oven","./gfx/props16.png", { c:7, r:2 }, true, false, true),
    "wbc": new Entity("wooden bookcase","./gfx/props16.png", { c:5, r:2 }, true, false, true),
    "wch1": new Entity("wooden chair","./gfx/props16.png", { c:8, r:2 }, true, false, true),
    "wch2": new Entity("wooden chair","./gfx/props16.png", { c:9, r:2 }, true, false, true),
    "wch3": new Entity("wooden chair","./gfx/props16.png", { c:8, r:4 }, true, false, true),
    "wch4": new Entity("wooden chair","./gfx/props16.png", { c:9, r:4 }, true, false, true),
    "wch5": new Entity("wooden chair","./gfx/props16.png", { c:10, r:2 }, true, false, true),
    "wch6": new Entity("wooden chair","./gfx/props16.png", { c:11, r:2 }, true, false, true),
    "wch7": new Entity("wooden chair","./gfx/props16.png", { c:10, r:4 }, true, false, true),
    "wch8": new Entity("wooden chair","./gfx/props16.png", { c:11, r:4 }, true, false, true),
    "sch": new Entity("small wooden chair","./gfx/props16.png", { c:7, r:3 }, true, false, false),

  },
};