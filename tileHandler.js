import { maps } from "./maps.js";
import { tiles } from "./tiles.js";

export function getTile(layer, x, y){
  const layers = ["floor-tiles", "walls", "ceiling"];
  const char = maps.testMap?.[layer]?.[y]?.[x];
  let values = tiles[layers[layer]][char];
  
  if(char !== undefined && char !== " " && layers[layer] == "walls"){
    values = JSON.parse(JSON.stringify(tiles[layers[layer]][char]));
    let connected = "";
    if(maps.testMap?.[layer]?.[y-1]?.[x] !== " ") connected += "n";
    if(maps.testMap?.[layer]?.[y]?.[x+1] !== " ") connected += "e";
    if(maps.testMap?.[layer]?.[y+1]?.[x] !== " ") connected += "s";
    if(maps.testMap?.[layer]?.[y]?.[x-1] !== " ") connected += "w";
    if(maps.testMap?.[layer]?.[y-1]?.[x+1] !== " " &&
      maps.testMap?.[layer]?.[y+1]?.[x+1] !== " " &&
      maps.testMap?.[layer]?.[y+1]?.[x-1] !== " " &&
      maps.testMap?.[layer]?.[y-1]?.[x-1] !== " " ) connected += "+";
    
    switch(connected){
      case "n":
      case "s":
      case "ns":
        values.colRow.c += 1;
        break;
      case "ne":
        values.colRow.r += 3;
        break;
      case "es":
        values.colRow.r += 2;
        break;
      case "sw":
        values.colRow.r += 2;
        values.colRow.c += 1;
        break;
      case "nw":
        values.colRow.r += 3;
        values.colRow.c += 1;
        break;
      case "new":
          values.colRow.r += 5;
          break;
      case "nes":
        values.colRow.r += 4;
        break;
      case "esw":
        values.colRow.c += 1;
        values.colRow.r += 4;
        break;
      case "nsw":
        values.colRow.c += 1;
        values.colRow.r += 5;
        break;
      case "nesw":
        values.colRow.r += 6;
        break;
      case "nesw+":
        values.colRow.r += 6;
        values.colRow.c += 1;
        break;
    }
  };
  
  return values
};