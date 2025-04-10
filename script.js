const canvasPixelContainer = document.querySelector("#canvas-container");
const gridSize = 16;


for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        let canvasPixel = document.createElement("div");
        canvasPixel.classList.add("canvas-pixel");
        canvasPixel.style.backgroundColor = "red";
        canvasPixel.style.height = "60px";
        canvasPixel.style.width = "60px";
        canvasPixel.style.margin = 0;
        canvasPixelContainer.appendChild(canvasPixel);
    }
}