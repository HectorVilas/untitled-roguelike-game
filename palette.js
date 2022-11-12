const colorPalette = (() => {
  const setColors = document.querySelector("#set-colors");
  const setTones = document.querySelector("#set-tones");
  const setLightInfluence = document.querySelector("#set-light-influence")
  const setSatfluence = document.querySelector("#set-sat-influence")
  const palette = document.querySelector("#palette");
  const gamma = document.querySelector("#gamma");
  const colorsContainer = document.querySelector("#colors-container");
  const paletteGamma = document.querySelector("#gamma");
  const paletteColors = document.querySelector("#palette");
  
  function addListeners(){
    [setColors, setTones, setSatfluence, setLightInfluence].forEach(set => {
      set.addEventListener("input", refreshPalette)
    });
  };

  function setDefaults(){

    setColors.value = 6;
    setTones.value = 6;
    setLightInfluence.value = 1.75;
    setSatfluence.value = 2;
  }

  function keepInRange(){
    const inputs = [setColors, setTones, setLightInfluence, setSatfluence];
  
    inputs.forEach(input => {
      if(parseInt(input.value) > parseInt(input.max)){
        input.value = input.max;
      } else if(parseInt(input.value) < parseInt(input.min) || input.value == ""){
        input.value = input.min;
      }
    });
  };

  function refreshPalette(){
    keepInRange();
  
    paletteGamma.replaceChildren();
    paletteColors.replaceChildren();
  
    palette.style.gridTemplateColumns = `repeat(${setColors.value}, 1fr)`
    palette.style.gridTemplateRows = `repeat(${setTones.value-1}, 1fr)`
    gamma.style.gridTemplateRows = `repeat(${setTones.value-1}, 1fr)`
    colorsContainer.style.gridTemplateColumns = `1fr ${setColors.value}fr`
  
    for(let h = 1; h < setTones.value; h++){
      for(let w = 0; w < setColors.value; w++){
        const hue = parseInt(360/setColors.value*w);
        const saturation = parseInt(100/setTones.value*(h+1)*setSatfluence.value);
        const lightness = parseInt(100/setTones.value*h/setLightInfluence.value);
        
        const color = h == 0 ? `hsl(0, 0%, ${parseInt(100/(setColors.value-w))}%)`
        : `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.style.backgroundColor = color;
        palette.appendChild(tile);
      }
    };
    
    for(let i = 1; i < setTones.value-1; i++){
      const tile = document.createElement("div");
      tile.classList.add("tile");
      const color = `hsl(0, 0%, ${parseInt( 100/setTones.value*(i-1))}%)`;
      tile.style.backgroundColor = color;
      gamma.appendChild(tile)
    }
    
    const tile = document.createElement("div");
    tile.classList.add("tile");
    const color = `hsl(0, 0%, 100%)`;
    tile.style.backgroundColor = color;
    gamma.appendChild(tile);
  };
  
  return { addListeners, refreshPalette, setDefaults };
})();

const colorPicker = (() => {
  const samples = document.querySelectorAll(".sample");
  const hue = document.querySelector("#hue");
  const saturation = document.querySelector("#saturation");
  const lightness = document.querySelector("#lightness");
  const multiplier = document.querySelector("#multiplier");
  const hslOutput = document.querySelector(".hsl-output");

  function setDefaults(){
    hue.value = 0;
    saturation.value = 80;
    lightness.value = 50;
    multiplier.value = 10;
  };

  function addListeners(){
    [hue, saturation, lightness, multiplier].forEach(val => {
      val.addEventListener("input", setValue);
    });
  };

  function setValue(){
    const color = `hsl(${hue.value}, ${saturation.value}%, ${lightness.value}%)`;
    samples.forEach((samp, i) => {
      const h = hue.value;
      const s = parseInt(saturation.value);
      const l = parseInt(lightness.value);
      const mult = parseFloat(multiplier.value);
      
      hslOutput.innerText = `${color} - multiplier x${mult}`;

      const tones = [
        `hsl(${h}, ${s-mult*3}%, ${l+mult*3}%)`,
        `hsl(${h}, ${s-mult*2}%, ${l+mult*2}%)`,
        `hsl(${h}, ${s-mult}%, ${l+mult}%)`,
        `hsl(${h}, ${s}%, ${l}%)`,
        `hsl(${h}, ${s+mult}%, ${l-mult}%)`,
        `hsl(${h}, ${s+mult*2}%, ${l-mult*2}%)`,
        `hsl(${h}, ${s+mult*2}%, ${l-mult*3}%)`,
      ];

      samp.style.backgroundColor = tones[i];
    })
  };

  return { setDefaults, setValue, addListeners };
})();



//run on start
colorPalette.addListeners();
colorPalette.setDefaults();
colorPalette.refreshPalette();

colorPicker.addListeners();
colorPicker.setDefaults();
colorPicker.setValue();