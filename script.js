
const maxCanvasHeight = 560;
const maxCanvasWidth = 560;
let isGridSizeWindowOpen = false;
let gridSize = 16;
let isMouseDown = false;
let isBorderShowing = true;
let currentTool = "pen";


const canvasPixelContainer = document.querySelector("#canvas-container");
const inputGridSizeButton = document.querySelector("#gridsize-btn");
const gridSizeWindow = document.querySelector("#gridsize-window");
const gridSizeInput = document.querySelector("#grid-size");
const generateGridSizeButton = document.querySelector("#gridsize-window-button");
const toggleBordersButton = document.querySelector("#toggle-border-btn");
const clearCanvasButton = document.querySelector("#clear-canvas-btn");
const penButton = document.querySelector("#pen-btn");
const brushButton = document.querySelector("#gradient-brush-btn");
const eraserButton = document.querySelector("#eraser-btn");
const textureBrushButton = document.querySelector("#texture-brush-btn");

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

//For toggling borders
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

//For Art
penButton.addEventListener("click", () => {
    currentTool = "pen";
    changeTool(currentTool);
    penButton.classList.add("active");
    brushButton.classList.remove("active");
    textureBrushButton.classList.remove("active");
    eraserButton.classList.remove("active");
})

brushButton.addEventListener("click", ()=> {
    currentTool = "brush";
    changeTool(currentTool);
    penButton.classList.remove("active");
    brushButton.classList.add("active");
    textureBrushButton.classList.remove("active");
    eraserButton.classList.remove("active");
})

textureBrushButton.addEventListener("click", () => {
    currentTool = "texture-brush";
    changeTool(currentTool);
    penButton.classList.remove("active");
    brushButton.classList.remove("active");
    textureBrushButton.classList.add("active");
    eraserButton.classList.remove("active");
})

eraserButton.addEventListener("click", () => {
    currentTool = "eraser";
    changeTool(currentTool);
    penButton.classList.remove("active");
    brushButton.classList.remove("active");
    textureBrushButton.classList.remove("active");
    eraserButton.classList.add("active");
})



//For clearing canvas
clearCanvasButton.addEventListener("click", () => {
    let canvasPixel = document.querySelectorAll(".canvas-pixel");
    canvasPixel.forEach((pixel, index)=> {
        setTimeout(()=> {pixel.style.backgroundColor = "white";}, index * 0.5);
        pixel.dataset.opacity = "0"; 
    })
})

//To remove previous listeners
function removeCanvasEventListener() {
    let canvasPixel = document.querySelectorAll(".canvas-pixel");
    canvasPixel.forEach((canvasPixel, index) => {
        canvasPixel.replaceWith(canvasPixel.cloneNode(true));
    });
}

function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function changeTool(toolSelected) {
    removeCanvasEventListener();
    let canvasPixel = document.querySelectorAll(".canvas-pixel");
    if (toolSelected == "pen") {
        penButton.classList.add("active");
        canvasPixel.forEach((canvasPixel, index) => {
            canvasPixel.addEventListener("mousedown", () => {
                canvasPixel.style.backgroundColor = document.querySelector("#brush-color").value;
            });
            canvasPixel.addEventListener("mouseover", () => {
                if (isMouseDown == true) {
                    canvasPixel.style.backgroundColor = document.querySelector("#brush-color").value;
                }
            });     
        })
    }
else if (toolSelected == "brush") {
    console.log("brush selected");
    canvasPixel.forEach((canvasPixel) => {
        canvasPixel.addEventListener("mousedown", () => {
            applyBrush(canvasPixel);
            console.log("Gradient Brush: " + canvasPixel.dataset.opacity);
        });

        canvasPixel.addEventListener("mouseover", () => {
            if (isMouseDown === true) {
                applyBrush(canvasPixel);
                console.log("Gradient Brush: " + canvasPixel.dataset.opacity);
            }
        });
    });

    function applyBrush(pixel) {
        let currentOpacity = parseFloat(pixel.dataset.opacity);
        if (currentOpacity < 1) {
            currentOpacity = Math.min(currentOpacity + 0.15, 1); // Cap at 1 (100%)
            pixel.dataset.opacity = currentOpacity.toString();

            const color = document.querySelector("#brush-color").value;
            const rgbaColor = hexToRGBA(color, currentOpacity);
            pixel.style.backgroundColor = rgbaColor;
        }
    }
}

    else if (toolSelected == "eraser") {
        canvasPixel.forEach((canvasPixel, index) => {
            canvasPixel.addEventListener("mousedown", () => {
                canvasPixel.style.backgroundColor = "#ffffff";
                canvasPixel.dataset.opacity = "0";
            });
            canvasPixel.addEventListener("mouseover", () => {
                if (isMouseDown == true) {
                canvasPixel.style.backgroundColor = "#ffffff";
                console.log("Eraser: " + canvasPixel.dataset.opacity);
                canvasPixel.dataset.opacity = "0";
                }
            });            
        })        
    }
}

//Create canvas for specified amount of pixels
function generateCanvas(gridSize) {
    let border;
    if (isBorderShowing) {
        border = "1px solid #dbdbdb";
    }
    else {
        border = "none";
    }
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
            canvasPixel.style.border = border;
            canvasPixel.style.boxSizing = "border-box";
            canvasPixel.style.margin = 0;
            canvasPixel.style.userSelect = "none";  //To make canvas undraggable
            canvasPixel.dataset.opacity = "0"; 
            canvasPixelContainer.appendChild(canvasPixel);
        }
    }
    //Adjusts size of canvas to perfectly fit number of pixels specified
    canvasPixelContainer.style.height = parseInt(document.querySelector(".canvas-pixel").style.height) * gridSize + "px";
    canvasPixelContainer.style.width = parseInt(document.querySelector(".canvas-pixel").style.width) * gridSize + "px";
    changeTool(currentTool);
}


generateCanvas(16);
changeTool("pen");


