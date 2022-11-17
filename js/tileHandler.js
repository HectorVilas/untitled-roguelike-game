import { maps } from "./maps.js";
import { tiles } from "./tiles.js";

export function getTile(layer, x, y, map){
  const layers = ["floor-tiles", "walls", "sprites", "overlay", "ceiling"];
  const thisMap = map || maps.testMap;
  const char = thisMap?.[layer]?.[y]?.[x];
  let values = tiles?.[layers[layer]]?.[char];
  
  if(char !== undefined && char !== " " && (tiles[layers[layer]][char].connectsToWalls || tiles[layers[layer]][char].connectsToSelf)){
    //create a copy
    values = JSON.parse(JSON.stringify(tiles[layers[layer]][char]));
    let connected = "";
    if(thisMap?.[layer]?.[y-1]?.[x] !== " ") connected += "n";
    if(thisMap?.[layer]?.[y]?.[x+1] !== " ") connected += "e";
    if(thisMap?.[layer]?.[y+1]?.[x] !== " ") connected += "s";
    if(thisMap?.[layer]?.[y]?.[x-1] !== " ") connected += "w";
    
    if(connected === "n") adjustTile(values, {r: 3, c: 0});
    else if(connected === "e") adjustTile(values, {r: 3, c: 1});
    else if(connected === "s") adjustTile(values, {r: 1, c: 0});
    else if(connected === "w") adjustTile(values, {r: 3, c: 3});
    else if(connected === "ns") adjustTile(values, {r: 2, c: 0});
    else if(connected === "ne" ) adjustTile(values, {r: 2, c: 1});
    else if(connected === "es" ) adjustTile(values, {r: 0, c: 1});
    else if(connected === "ew" ) adjustTile(values, {r: 3, c: 2});
    else if(connected === "sw" ) adjustTile(values, {r: 0, c: 3});
    else if(connected === "nw" ) adjustTile(values, {r: 2, c: 3});
    else if(connected === "new" ) adjustTile(values, {r: 2, c: 2});
    else if(connected === "nes" ) adjustTile(values, {r: 1, c: 1});
    else if(connected === "esw" ) adjustTile(values, {r: 0, c: 2});
    else if(connected === "nsw" ) adjustTile(values, {r: 1, c: 3});
    else if(connected === "nesw" ) adjustTile(values, {r: 1, c: 2});
  };
  
  return values;
};

function adjustTile(tile, colRow){
  tile.colRow.r += colRow.r;
  tile.colRow.c += colRow.c;
}