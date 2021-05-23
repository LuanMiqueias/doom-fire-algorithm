const fireColorsPalette = [
  { r: 7, g: 7, b: 7 },
  { r: 31, g: 7, b: 7 },
  { r: 47, g: 15, b: 7 },
  { r: 71, g: 15, b: 7 },
  { r: 87, g: 23, b: 7 },
  { r: 103, g: 31, b: 7 },
  { r: 119, g: 31, b: 7 },
  { r: 143, g: 39, b: 7 },
  { r: 159, g: 47, b: 7 },
  { r: 175, g: 63, b: 7 },
  { r: 191, g: 71, b: 7 },
  { r: 199, g: 71, b: 7 },
  { r: 223, g: 79, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 103, b: 15 },
  { r: 207, g: 111, b: 15 },
  { r: 207, g: 119, b: 15 },
  { r: 207, g: 127, b: 15 },
  { r: 207, g: 135, b: 23 },
  { r: 199, g: 135, b: 23 },
  { r: 199, g: 143, b: 23 },
  { r: 199, g: 151, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 175, b: 47 },
  { r: 183, g: 175, b: 47 },
  { r: 183, g: 183, b: 47 },
  { r: 183, g: 183, b: 55 },
  { r: 207, g: 207, b: 111 },
  { r: 223, g: 223, b: 159 },
  { r: 239, g: 239, b: 199 },
  { r: 255, g: 255, b: 255 },
];

const firePixelArray = [];
let fireWidth = 200;
let fireHeight = 30;
let debug = false;

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const pixelSize = 2;
canvas.height = 100;
canvas.width = 400;

function start() {
  createFirePixelArray();
  createFireSource();
  setInterval(calculateFirePropagation, 50);
}

start();

function createFirePixelArray() {
  const numberPixels = fireWidth * fireHeight;

  for (let i = 0; i < numberPixels; i++) {
    firePixelArray[i] = 0;
  }
}

function calculateFirePropagation() {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column + fireWidth * row;
      updateFireIntensityPerPixel(pixelIndex);
    }
  }
  renderFire();
}

function updateFireIntensityPerPixel(currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + fireWidth;

  if (belowPixelIndex >= fireWidth * fireHeight) {
    return;
  }
  const decay = Math.floor(Math.random() * 5);
  const decay2 = Math.floor(Math.random() * 3);
  const belowPixelIntensity = firePixelArray[belowPixelIndex];
  const newFireIntensity =
    belowPixelIntensity - decay >= 0 ? belowPixelIntensity - decay : 0;

  firePixelArray[currentPixelIndex - decay2] = newFireIntensity;
}

function createFireSource() {
  for (let column = 0; column <= fireWidth; column++) {
    const overflowPixelIndex = fireHeight * fireWidth;
    const pixelIndex = overflowPixelIndex - fireWidth;

    firePixelArray[pixelIndex + column] = 36;
  }
}
function renderFire() {
  for (let row = 0; row < fireHeight; row++) {
    for (let column = 0; column < fireWidth; column++) {
      const pixelIndex = column + fireWidth * row;
      const fireIntensity = firePixelArray[pixelIndex];
      const color = fireColorsPalette[fireIntensity];
      const colorString = `${color.r},${color.g},${color.b}`;

      ctx.fillStyle = ` rgb(${colorString})`;
      ctx.fillRect(column * pixelSize, row * pixelSize, pixelSize, pixelSize);
    }
  }
}
