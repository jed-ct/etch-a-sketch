
const maxCanvasHeight = 520;
const maxCanvasWidth = 520;
let isGridSizeWindowOpen = false;
let gridSize = 16;

const canvasPixelContainer = document.querySelector("#canvas-container");
canvasPixelContainer.style.maxHeight = maxCanvasHeight + "px";
canvasPixelContainer.style.maxWidth = maxCanvasWidth + "px";

const inputGridSizeButton = document.querySelector("#gridsize-btn");
const gridSizeWindow = document.querySelector("#gridsize-window");
const gridSizeInput = document.querySelector("#grid-size");
const generateGridSizeButton = document.querySelector("#gridsize-window-button");


inputGridSizeButton.addEventListener("click", () => {
    gridSizeWindow.style.display = "block";
    isGridSizeWindowOpen = true;
})

//Event for enter key
gridSizeInput.addEventListener("keypress", function(event) {
    if (event.key == "Enter" && isGridSizeWindowOpen) {
        event.preventDefault();
        generateGridSizeButton.click();
    }
})

generateGridSizeButton.addEventListener("click", () => {
    generateCanvas(gridSizeInput.value);
    gridSizeWindow.style.display = "none";
});


generateCanvas(16);

//Create canvas for specified amount of pixels
function generateCanvas(gridSize) {
    while (canvasPixelContainer.hasChildNodes()) {
        canvasPixelContainer.removeChild(canvasPixelContainer.firstChild);
    }
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
            canvasPixel.style.backgroundColor = document.querySelector("#brush-color").value;
        });
    });
}



