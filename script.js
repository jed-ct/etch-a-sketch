
const maxCanvasHeight = 960;
const maxCanvasWidth = 960;
const gridSize = 16;

const canvasPixelContainer = document.querySelector("#canvas-container");
canvasPixelContainer.style.maxHeight = maxCanvasHeight + "px";
canvasPixelContainer.style.maxWidth = maxCanvasWidth + "px";

//Create canvas for specified amount of pixels
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        let canvasPixel = document.createElement("div");
        canvasPixel.classList.add("canvas-pixel");
        canvasPixel.style.backgroundColor = "white";
        canvasPixel.style.height = parseInt(maxCanvasHeight/gridSize) + "px";
        console.log(parseInt(maxCanvasHeight/gridSize) - 2);
        canvasPixel.style.width = parseInt(maxCanvasWidth/gridSize) + "px";
        canvasPixel.style.border = "1px solid gray";
        canvasPixel.style.boxSizing = "border-box";
        canvasPixel.style.margin = 0;
        canvasPixelContainer.appendChild(canvasPixel);
    }
}
//Adjusts size of canvas to perfectly fit number of pixels specified
canvasPixelContainer.style.height = parseInt(document.querySelector(".canvas-pixel").style.height) * gridSize + "px";
canvasPixelContainer.style.width = parseInt(document.querySelector(".canvas-pixel").style.width) * gridSize + "px";
const canvasPixels = document.querySelectorAll(".canvas-pixel");
canvasPixels.forEach((canvasPixel) => {
    canvasPixel.addEventListener("mouseover", () => {
        canvasPixel.style.backgroundColor = "red";
    });
});