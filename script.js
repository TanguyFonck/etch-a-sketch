let container = document.querySelector('.container')
let gridNumber = document.getElementById('gridNumber')
let resetBtn = document.getElementById('resetbtn')
let colorPicker = document.getElementById('colorInput')
let colorBtn = document.getElementById('colorbtn')
let rainbowBtn = document.getElementById('rainbowbtn')
let submitBtn = document.getElementById('submitbtn')
const DEFAULT_COLOR = '#614e71';
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

function setCurrentColor(newColor) {
    currentColor = newColor;
}


function setCurrentMode (newMode) {
    activateButton(newMode);
    currentMode = newMode;
}
colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
resetBtn.onclick = () => reloadGrid()
submitBtn.onclick = () => setupGrid(gridNumber.value)




function reloadGrid() {
    clearGrid()
    setupGrid(DEFAULT_SIZE)
}

function clearGrid() {
    container.innerHTML = ''
}


function eraser(e) {
    e.target.style.backgroundColor = 'rgb(128,128,128)'
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function setupGrid(size) {
    clearGrid()
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`

 for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div')
    gridElement.classList.add('grid-element')
    gridElement.addEventListener('mouseover', changeColor)
    gridElement.addEventListener('mousedown', changeColor)
    gridElement.addEventListener('dblclick', eraser)
    container.appendChild(gridElement)
 }
}


function changeColor(e) {
    if  (mouseDown === false) return
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random()*256)
        const randomG = Math.floor(Math.random()*256)
        const randomB = Math.floor(Math.random()*256)
        e.target.style.backgroundColor = `rgb(${randomR},${randomG}, ${randomB})`
    }
    else if (currentMode === 'color') { 
        e.target.style.backgroundColor = currentColor
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
        colorBtn.classList.remove('active')
    }


if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active')
} else if (newMode === 'color') {
    colorBtn.classList.add('active')
}
}
window.onload = () => {
    setupGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);

}