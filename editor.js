import { tiles } from "./tiles.js";
import { getTile } from "./tileHandler.js";

const mapSize = 20;
let map;
let mapUndo = [];
let emptyMap = new Array(
  new Array(mapSize).fill(new Array(mapSize).fill("g1")),
  new Array(mapSize).fill(new Array(mapSize).fill(" ")),
  new Array(mapSize).fill(new Array(mapSize).fill(" ")),
);

//TODO: change for custom testing map later
//start with an empty map
map = JSON.parse(JSON.stringify(emptyMap));

const display = (() => {
  const dom = {
    board: {
      layers: document.querySelectorAll(".board-layer"),
    },
    tiles: {
      floorList: document.querySelectorAll(".floor-list"),
      wallList: document.querySelectorAll(".wall-list"),
      ceilingList: document.querySelectorAll(".ceiling-list"),
      btnFloor: undefined,
      btnWall: undefined,
      btnCeiling: undefined,
    },
    modal: {
      save: document.querySelector(".save-modal"),
      load: document.querySelector(".load-modal"),
      close: document.querySelectorAll(".close-modal"),
      saveOutput: document.querySelector(".save-modal textarea"),
      loadInput: document.querySelector(".load-modal textarea"),
      loadBtnLoad: document.querySelector(".btn-load"),
    },
    editor: {
      btnUndo: document.querySelector("button.undo"),
      btnLoad: document.querySelector("button.load"),
      btnSave: document.querySelector("button.save"),
      btnView: document.querySelector("button.view"),
    },
  };

  function createBoard(){
    const lastLayer = dom.board.layers.length-1

    for(let layer = 0; layer < dom.board.layers.length; layer++){
      for(let y = 0; y < mapSize; y++){
        for(let x = 0; x < mapSize; x++){
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
    //reassign selectors for items generated from Js
    dom.tiles.btnFloor = document.querySelectorAll(".floor-list .tile-btn");
    dom.tiles.btnWall = document.querySelectorAll(".wall-list .tile-btn");
    dom.tiles.btnCeiling = document.querySelectorAll(".ceiling-list .tile-btn");

    [dom.tiles.btnFloor, dom.tiles.btnWall, dom.tiles.btnCeiling].forEach(btnSet => {
      btnSet.forEach(btn => {
        btn.addEventListener("click", toggleTool);
      });
    });
    
    dom.modal.close.forEach(btn => btn.addEventListener("click", () => {
      [dom.modal.save, dom.modal.load].forEach(modal => modal.close())
    }));
    
    dom.modal.loadBtnLoad.addEventListener("click", () => {
      const mapToLoad = JSON.parse(dom.modal.loadInput.value);
      if(mapToLoad.length === map.length) {
        map = mapToLoad;
        refreshMap();
        dom.modal.load.close();
      } else {
        dom.modal.loadInput.value = "";
        const err = "THE MAP MUST CONTAIN 3 ARRAYS WITH STRINGS AS CONTENT";
        dom.modal.loadInput.placeholder = err;
      };
    })
    
    dom.editor.btnLoad.addEventListener("click", () => {
      dom.modal.load.showModal();
      dom.modal.loadInput.value = "";
    });
    
    dom.editor.btnSave.addEventListener("click", () => {
      dom.modal.save.showModal();
      dom.modal.saveOutput.value = JSON.stringify(map/*, null, 1*/);
    });
    
    dom.editor.btnUndo.addEventListener("click", editor.undo);
    
    dom.editor.btnView.addEventListener("click", toggleView);

    window.addEventListener("mousedown", () => editor.mousedown = true);
    window.addEventListener("mouseup", () => editor.mousedown = false);
    
    window.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      if(k === "z" && e.ctrlKey){ editor.undo() }
      else if(k === "1") { toggleToolHotkey(1) }
      else if(k === "2") { toggleToolHotkey(2) }
      else if(k === "3") { toggleToolHotkey(3) }
    });

    window.addEventListener("wheel", (e) => {
      // if(e.shiftKey)toggleWheelTool(e)
      toggleWheelTool(e)
    } );
  };

  function toggleWheelTool(e){
    const layer = getActiveTile().layer + 1;
    // let idx = getActiveTile().idx;
    let idx = e.deltaY > 0 ? getActiveTile().idx+1 : getActiveTile().idx-1;
    
    //stay in valid indexes
    if(idx < 0) idx = 0;
    else if(idx > getActiveTile().maxIdx) idx = getActiveTile().maxIdx;
    
    toggleToolHotkey(layer, idx);

  };

  function getActiveTile(){
    const layers = [dom.tiles.btnFloor,dom.tiles.btnWall,dom.tiles.btnCeiling]
    const active = {
      layer: undefined,
      idx: undefined,
      maxIdx: undefined
    };
    
    layers.forEach((set, i) => set.forEach( (tile, j) => {
      if(tile.className.includes("active")) {
        active.layer = i;
        active.idx = j;
      };
    }));
    
    active.maxIdx = layers[active.layer].length-1;

    return active;
  };

  function toggleToolHotkey(layer, idx){
    let activeIdx = 1;
    const layerName = layer == 1 ? "floor" : layer == 2 ? "wall" : "ceiling";
    const set = document.querySelectorAll(`.${layerName}-list .tile-btn`);
    set.forEach((tile,i) => {
      if(tile.className.includes("active")) activeIdx = i;
    });

    //remove active status
    [dom.tiles.btnFloor,dom.tiles.btnWall,dom.tiles.btnCeiling]
    .forEach(set => {
      set.forEach(tile => tile.classList.remove("active"));
    });

    //add active status, set values for brush
    set[idx !== undefined ? idx : activeIdx].classList.add("active");
    editor.active.layer = layer-1;
    editor.active.tile = set[idx !== undefined ? idx : activeIdx].dataset.char;
  };

  function toggleTool(){
    const btns = document.querySelectorAll(".tile-btn");
    btns.forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    editor.active.activeTool = "draw";
    editor.active.layer = this.className.includes("floor") ? 0
    : this.className.includes("wall") ? 1 : 2;
    editor.active.tile = this.dataset.char;
  };

  function refreshMap(){
    const layers = ["floor-tiles", "walls", "ceiling"];
  
    for(let layer = 0; layer < layers.length; layer++){
      const tilesInDom = document.querySelectorAll(`#layer${layer} .tile`);
  
      for(let y = 0; y < mapSize; y++){
        for(let x = 0; x < mapSize; x++){
          const coordToIdx = y * mapSize + x;
          const char = map[layer][y][x];
          const tile = getTile(layer, x, y, map)
          const url = tile?.url || "";
          tilesInDom[coordToIdx].style.backgroundImage = `url(${url})`;
          if(url !== "") tilesInDom[coordToIdx].style.backgroundPosition = `calc(100% - 100% * ${tile.colRow.c}) calc(100% - 100% * ${tile.colRow.r})`;
        }
      }
    }
  }

  function placeTiles(){
    const floors = tiles["floor-tiles"];
    const walls = tiles["walls"];
    const ceilings = tiles["ceiling"];
    let isActiveSet = false;

    [floors, walls, ceilings].forEach(group => {
      for(const item in group){
        const groupClass = group === floors ? "floor"
        : group === walls ? "wall" : "ceiling";

        const listClass = group === floors ? "floor-list"
        : group === walls ? "wall-list" : "ceiling-list";
        
        let parent = document.querySelector(`.${listClass}`);
        
        const tile = document.createElement("div");
        tile.classList.add("tile-btn", groupClass, group[item].name.split(" ").join("-"));
        if(!isActiveSet && listClass == "wall-list") {
          tile.classList.add("active");
          isActiveSet = true;
        }
        tile.dataset.char = item;
        tile.style.backgroundImage = `url(${group[item].url})`;
        tile.style.backgroundPosition = `calc(100% - 100% * ${group[item].colRow.c}) calc(100% - 100% * ${group[item].colRow.r})`;
        tile.innerText = group[item].name;

        parent.appendChild(tile)
      }
    })
  };

  function toggleView(){
    const body = document.querySelector("body");
    const tilesList = document.querySelector(".tiles-list");
    const floorList = document.querySelector(".floor-list");
    const wallList = document.querySelector(".wall-list");
    const ceilingList = document.querySelector(".ceiling-list");
    const files = document.querySelector("fieldset.files");

    [body, tilesList, floorList, wallList, ceilingList,
      files].forEach(item => item.classList.toggle("rotate"));
  };

  return { dom, createBoard, addListeners, refreshMap, placeTiles }
})();



const editor = (() => {
  
  let mousedown = false;
  const active = {
    activeTool: "draw",
    layer: 1,
    tile: "r",
  };


  function editMapTile(argX, argY){
    if(typeof argX !== "number") {
      mapUndo.push(JSON.parse(JSON.stringify(map)));
      //prevents mapUndo to use too much memory, 30mb aprox with 100 levels
      if(mapUndo.length > 100) mapUndo.shift();
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
    map[layer][y][x] = char;
  };
  
  function undo(){
    if(mapUndo === undefined || mapUndo.length < 1) return;
    map = JSON.parse(JSON.stringify(mapUndo.at(-1)));
    mapUndo.pop()
    const btnClass = display.dom.editor.btnUndo.classList;
    
    if(mapUndo.length > 0) btnClass.add("active");
    else btnClass.remove("active")

    display.refreshMap();
  };

  return { active, mousedown, editMapTile, undo }
})();


//run on start
display.placeTiles();
display.createBoard();
display.addListeners();
display.refreshMap();