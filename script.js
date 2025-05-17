
const maxCanvasHeight = 560;
const maxCanvasWidth = 560;
let isGridSizeWindowOpen = false;
let gridSize = 16;
let isMouseDown = false;
let isBorderShowing = true;

const canvasPixelContainer = document.querySelector("#canvas-container");
const inputGridSizeButton = document.querySelector("#gridsize-btn");
const gridSizeWindow = document.querySelector("#gridsize-window");
const gridSizeInput = document.querySelector("#grid-size");
const generateGridSizeButton = document.querySelector("#gridsize-window-button");
const toggleBordersButton = document.querySelector("#toggle-border-btn");

//Set maximum height of the canvas
canvasPixelContainer.style.maxHeight = maxCanvasHeight + "px";
canvasPixelContainer.style.maxWidth = maxCanvasWidth + "px";

//Events for hold-to-paint
document.addEventListener("mousedown", () => {
    isMouseDown = true;
});
document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

//Open and close the grid size selector window
inputGridSizeButton.addEventListener("click", () => {
    gridSizeWindow.style.display = "block";
    isGridSizeWindowOpen = true;
});
generateGridSizeButton.addEventListener("click", () => {
    gridSize = gridSizeInput.value;
    if (gridSize > 100) {
        alert("Grid size must be less than 100. Please try again.");
    }
    else if (gridSize < 1) {
        alert("Grid size must be greater than 1. Please try again.");
    }
    else if (isNaN(gridSize)) {
        alert("Grid size must be a number. Please try again.");
    }
    else {
        generateCanvas(gridSize);
        gridSizeWindow.style.display = "none";
    }
});

//Event for enter key in the grid size selector window
gridSizeInput.addEventListener("keypress", function(event) {
    if (event.key == "Enter" && isGridSizeWindowOpen) {
        event.preventDefault();
        generateGridSizeButton.click();
    }
});


toggleBordersButton.addEventListener("click", () => {
    if (isBorderShowing) {
        toggleBordersButton.textContent = "Borders: Off";
        for (let canvasPixel of document.querySelectorAll(".canvas-pixel")) {
            canvasPixel.style.border = "none";
        }
        isBorderShowing = false;
    }
    else {
        toggleBordersButton.textContent = "Borders: On";
        for (let canvasPixel of document.querySelectorAll(".canvas-pixel")) {
            canvasPixel.style.border = "1px solid #dbdbdb";
        }
        isBorderShowing = true;
    }
})

//Create canvas for specified amount of pixels
function generateCanvas(gridSize) {
    //Remove existing grids to create new ones
    while (canvasPixelContainer.hasChildNodes()) {
        canvasPixelContainer.removeChild(canvasPixelContainer.firstChild);
    }
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let canvasPixel = document.createElement("div");
            canvasPixel.classList.add("canvas-pixel");
            canvasPixel.style.backgroundColor = "white";
            canvasPixel.style.height = parseInt(maxCanvasHeight/gridSize) + "px";
            canvasPixel.style.width = parseInt(maxCanvasWidth/gridSize) + "px";
            canvasPixel.style.border = "1px solid #dbdbdb";
            canvasPixel.style.boxSizing = "border-box";
            canvasPixel.style.margin = 0;
            canvasPixel.style.userSelect = "none";  //To make canvas undraggable
            canvasPixel.addEventListener("mousedown", () => {
                canvasPixel.style.backgroundColor = document.querySelector("#brush-color").value;
            });
            canvasPixel.addEventListener("mouseover", () => {
                if (isMouseDown == true) {
                    canvasPixel.style.backgroundColor = document.querySelector("#brush-color").value;
                }
            canvasPixel.addEventListener("contextmenu", () => {
                canvasPixel.style.backgroundColor = "white";
            })
            });
            canvasPixelContainer.appendChild(canvasPixel);
        }
    }
    //Adjusts size of canvas to perfectly fit number of pixels specified
    canvasPixelContainer.style.height = parseInt(document.querySelector(".canvas-pixel").style.height) * gridSize + "px";
    canvasPixelContainer.style.width = parseInt(document.querySelector(".canvas-pixel").style.width) * gridSize + "px";
}



generateCanvas(16);


