const setColors = document.querySelector("#set-colors");
const setTones = document.querySelector("#set-tones");
const setLightInfluence = document.querySelector("#set-light-influence")
const setSatfluence = document.querySelector("#set-sat-influence")

const palette = document.querySelector("#palette");
const gamma = document.querySelector("#gamma");
const colorsContainer = document.querySelector("#colors-container");


const samples = document.querySelector(".samples");
const samplesAll = document.querySelectorAll(".sample")
const rngHue = document.querySelector("#hue");
const rngSaturation = document.querySelector("#saturation");
const rngLightness = document.querySelector("#lightness");
const hslOutput = document.querySelector(".hsl-output");
const paletteGamma = document.querySelector("#gamma")
const paletteColors = document.querySelector("#palette")

function setDefaults(){
  rngHue.value = 0;
  rngSaturation.value = 80;
  rngLightness.value = 50;
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

function createPalette(){
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
      // tile.innerText = color.slice(4,-1);
      palette.appendChild(tile);
    }
  };
  
  for(let i = 1; i < setTones.value-1; i++){
    const tile = document.createElement("div");
    tile.classList.add("tile");
    const color = `hsl(0, 0%, ${parseInt( 100/setTones.value*(i-1))}%)`;
    tile.style.backgroundColor = color;
    // tile.innerText = color.slice(4,-1);
    gamma.appendChild(tile)
  }
  
  const tile = document.createElement("div");
  tile.classList.add("tile");
  const color = `hsl(0, 0%, 100%)`;
  tile.style.backgroundColor = color;
  // tile.innerText = color.slice(4,-1);
  gamma.appendChild(tile);
};

function setValue(){
	const color = `hsl(${rngHue.value}, ${rngSaturation.value}%, ${rngLightness.value}%)`;
	hslOutput.innerText = color;
	/*samples.style.backgroundColor = color;*/
	
	samplesAll.forEach((samp, i) => {
		const tone = [
			`hsl(${rngHue.value}, ${parseInt(rngSaturation.value)-20}%, ${parseInt(rngLightness.value)+20}%)`,
			`hsl(${rngHue.value}, ${parseInt(rngSaturation.value)-10}%, ${parseInt(rngLightness.value)+10}%)`,
			`hsl(${rngHue.value}, ${parseInt(rngSaturation.value)}%, ${parseInt(rngLightness.value)}%)`,
			`hsl(${rngHue.value}, ${parseInt(rngSaturation.value)+10}%, ${parseInt(rngLightness.value)-10}%)`,
			`hsl(${rngHue.value}, ${parseInt(rngSaturation.value)+20}%, ${parseInt(rngLightness.value)-20}%)`,
		];
		samp.style.backgroundColor = tone[i];
	})
};


//listeners
[rngHue, rngSaturation, rngLightness].forEach(val => {
	val.addEventListener("input", setValue);
});
[setColors, setTones, setSatfluence, setLightInfluence].forEach(set => {
  set.addEventListener("input", createPalette)
});

//run on start

setDefaults()
createPalette()
setValue()