import { maps } from "./maps.js";
import { tiles } from "./tiles.js";

export function getTile(layer, x, y, map){
  const layers = ["floor-tiles", "walls", "ceiling"];
  const thisMap = map || maps.testMap;
  const char = thisMap?.[layer]?.[y]?.[x];
  let values = tiles[layers[layer]][char];
  
  if(char !== undefined && char !== " " && layers[layer] == "walls"){
    values = JSON.parse(JSON.stringify(tiles[layers[layer]][char]));
    let connected = "";
    if(thisMap?.[layer]?.[y-1]?.[x] !== " ") connected += "n";
    if(thisMap?.[layer]?.[y]?.[x+1] !== " ") connected += "e";
    if(thisMap?.[layer]?.[y+1]?.[x] !== " ") connected += "s";
    if(thisMap?.[layer]?.[y]?.[x-1] !== " ") connected += "w";
    if(thisMap?.[layer]?.[y-1]?.[x+1] !== " " &&
      thisMap?.[layer]?.[y+1]?.[x+1] !== " " &&
      thisMap?.[layer]?.[y+1]?.[x-1] !== " " &&
      thisMap?.[layer]?.[y-1]?.[x-1] !== " " &&
      connected === "nesw") connected += "+";
    
    if(connected === "n"
    || connected === "s"
    || connected === "ns") { values.colRow.c += 1;
    } else if(connected === "ne" ) { values.colRow.r += 3;
    } else if(connected === "es" ) { values.colRow.r += 2;
    } else if(connected === "sw" ) { values.colRow.r += 2; values.colRow.c += 1;
    } else if(connected === "nw" ) { values.colRow.r += 3; values.colRow.c += 1;
    } else if(connected === "new" ) { values.colRow.r += 5;
    } else if(connected === "nes" ) { values.colRow.r += 4;
    } else if(connected === "esw" ) { values.colRow.c += 1; values.colRow.r += 4;
    } else if(connected === "nsw" ) { values.colRow.c += 1; values.colRow.r += 5;
    } else if(connected === "nesw" ) { values.colRow.r += 6;
    } else if(connected === "nesw+" ) { values.colRow.r += 6; values.colRow.c += 1; } 
  };
  
  return values
};