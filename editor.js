import { tiles } from "./tiles.js";

let mapUndo;
let map = new Array(
  new Array(24).fill("GGGGGGGGGGGGGGGGGGGGGGGG"),
  new Array(24).fill("                        "),
  new Array(24).fill("                        "),
);

const display = (() => {
  const dom = {
    board: {
      layers: document.querySelectorAll(".board-layer"),
    },
    tiles: {
      btnFloor: document.querySelectorAll(".floor-list .tile-btn"),
      btnWall: document.querySelectorAll(".wall-list .tile-btn"),
      btnCeiling: document.querySelectorAll(".ceiling-list .tile-btn"),
    },
    modal: {
      modalSave: document.querySelector(".save-modal"),
      modalLoad: document.querySelector(".load-modal"),
      modalClose: document.querySelectorAll(".close-modal"),
      modalSaveOutput: document.querySelector(".save-modal textarea"),
      modalLoadInput: document.querySelector(".load-modal textarea"),
      modalLoadBtnLoad: document.querySelector(".btn-load"),
    },
    editor: {
      btnUndo: document.querySelector("button.undo"),
      btnLoad: document.querySelector("button.load"),
      btnSave: document.querySelector("button.save"),
    },
  };

  function createBoard(){
    const lastLayer = dom.board.layers.length-1
    
    for(let layer = 0; layer < dom.board.layers.length; layer++){
      for(let y = 0; y < 24; y++){
        for(let x = 0; x < 24; x++){
          const tile = document.createElement("div");
          tile.classList.add("tile");
          
          if(layer === lastLayer){
            tile.dataset.x = x;
            tile.dataset.y = y;
            tile.addEventListener("mousedown", editor.editMapTile);
            tile.addEventListener("mouseenter", () => {
              if(editor.mousedown) editor.editMapTile(x,y)
            });
          };
    
          dom.board.layers[layer].appendChild(tile);
        }
      }
    }
  };

  function addListeners(){
    [dom.tiles.btnFloor, dom.tiles.btnWall, dom.tiles.btnCeiling].forEach(btnSet => {
      btnSet.forEach(btn => {
        btn.addEventListener("click", () => {
          const btns = document.querySelectorAll(".tile-btn");
          btns.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
    
          editor.active.activeTool = "draw";
          editor.active.layer = btn.className.includes("floor") ? 0
          : btn.className.includes("wall") ? 1 : 2;
          editor.active.tile = btn.dataset.char;
        });
      });
    });
    
    dom.modal.modalClose.forEach(btn => btn.addEventListener("click", () => {
      [dom.modal.modalSave, dom.modal.modalLoad].forEach(modal => modal.close())
    }));
    
    dom.modal.modalLoadBtnLoad.addEventListener("click", () => {
      const mapToLoad = JSON.parse(dom.modal.modalLoadInput.value);
      if(mapToLoad.length === map.length) {
        map = mapToLoad;
        refreshMap();
        dom.modal.modalLoad.close();
      } else {
        dom.modal.modalLoadInput.value = "";
        const err = "THE MAP MUST CONTAIN 3 ARRAYS WITH STRINGS AS CONTENT";
        dom.modal.modalLoadInput.placeholder = err;
      };
    })
    
    dom.editor.btnLoad.addEventListener("click", () => {
      dom.modal.modalLoad.showModal();
      dom.modal.modalLoadInput.value = "";
    });
    
    dom.editor.btnSave.addEventListener("click", () => {
      dom.modal.modalSave.showModal();
      dom.modal.modalSaveOutput.value = JSON.stringify(map, null, 1);
    });
    
    dom.editor.btnUndo.addEventListener("click", editor.undo);
    
    window.addEventListener("mousedown", () => editor.mousedown = true);
    window.addEventListener("mouseup", () => editor.mousedown = false);
  };

  function refreshMap(){
    const layers = ["floor-tiles", "walls", "ceiling"];
  
    for(let layer = 0; layer < layers.length; layer++){
      const tilesInDom = document.querySelectorAll(`#layer${layer} .tile`);
  
      for(let y = 0; y < 24; y++){
        for(let x = 0; x < 24; x++){
          const coordToIdx = y * 24 + x;
          const char = map[layer][y][x];
          const url = tiles[layers[layer]]?.[char]?.url || "";
  
          tilesInDom[coordToIdx].style.backgroundImage = `url(${url})`;
        }
      }
    }
  }
  return { dom, createBoard, addListeners, refreshMap }
})();



const editor = (() => {
  
  let mousedown = false;
  const active = {
    activeTool: "draw",
    layer: 0,
    tile: "w",
  };


  function editMapTile(argX, argY){
    if(typeof argX !== "number") {
      mapUndo = JSON.parse(JSON.stringify(map));
      display.dom.editor.btnUndo.classList.add("active");
    }
    if(active.activeTool === "draw"){
      const layer = active.layer;
      const x = typeof argX === "number" ? argX : this.dataset.x;
      const y = typeof argY === "number" ? argY : this.dataset.y;
      const char = active.tile;
  
      placeTile(layer, x, y, char);
    }
    display.refreshMap();
  };

  function placeTile(layer, x, y, char){
    const stringToArray = map[layer][y].split("");
    stringToArray[x] = char;
    map[layer][y] = stringToArray.join("");
  };
  
  function undo(){
    if(mapUndo === undefined) return;
    map = JSON.parse(JSON.stringify(mapUndo));
    display.dom.editor.btnUndo.classList.remove("active");
    display.refreshMap();
  };

  return { active, mousedown, editMapTile, undo }
})();


//run on start
display.createBoard();
display.addListeners();
display.refreshMap();