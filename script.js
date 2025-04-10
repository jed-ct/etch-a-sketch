
const maxCanvasHeight = 960;
const maxCanvasWidth = 960;
const gridSize = 50;

const canvasPixelContainer = document.querySelector("#canvas-container");
canvasPixelContainer.style.maxHeight = maxCanvasHeight + "px";
canvasPixelContainer.style.maxWidth = maxCanvasWidth + "px";


for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        let canvasPixel = document.createElement("div");
        canvasPixel.classList.add("canvas-pixel");
        canvasPixel.style.backgroundColor = "white";
        canvasPixel.style.height = parseInt(parseInt(canvasPixelContainer.style.maxHeight)/gridSize) + "px";
        canvasPixel.style.width = parseInt(parseInt(canvasPixelContainer.style.maxWidth)/gridSize) + "px";
        canvasPixel.style.margin = 0;
        canvasPixelContainer.appendChild(canvasPixel);
    }
}

const canvasPixels = document.querySelectorAll(".canvas-pixel");
canvasPixels.forEach((canvasPixel) => {
    canvasPixel.addEventListener("mouseover", () => {
        canvasPixel.style.backgroundColor = "black";
    });
});