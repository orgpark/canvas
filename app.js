const saveBtn = document.getElementById('save');
const textInput = document.getElementById('text');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidth = document.getElementById('line-width');
const modeBtn = document.getElementById('mode-btn');
const destroyBtn = document.getElementById('destroy-btn');
const eraseBtn = document.getElementById('erase-btn');
const color = document.getElementById('color');
const fileInput = document.getElementById('file');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.strokeStyle = color.value;
ctx.lineCap = 'round';

const colors = ['red', 'orange', 'blue', 'pink', 'black', 'green'];

const origin = {
  x: 0,
  y: 0,
};
let isPainting = false;
let isFilling = false;

const onMove = (event) => {
  if (!isPainting) {
    ctx.moveTo(event.offsetX, event.offsetY);

    return;
  }
  // const color = colors[Math.floor(Math.random() * colors.length)];
  // ctx.strokeStyle = color;
  // ctx.beginPath();
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
};
const onClick = (event) => {
  isPainting = true;
};
const onMouseUp = (event) => {
  isPainting = false;
  ctx.beginPath();
};
const onLineWidthChange = (event) => {
  ctx.lineWidth = event.target.value;
};
const onColorChange = (event) => {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
};

const onColorClick = (event) => {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
};

const onModeBtnClick = (event) => {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = 'Fill';
  } else {
    isFilling = true;
    modeBtn.innerText = 'Draw';
  }
};

const onDestroyBtnClick = (event) => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};
const onEraseBtnClick = (event) => {
  ctx.strokeStyle = 'white';
  isFilling = false;
  modeBtn.innerText = 'Fill';
};
const onCanvasClick = (event) => {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = () => {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
};
const onDoubleClick = (event) => {
  console.log('event: ', event.offsetX, event.offsetY);
  const text = textInput.value;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = '48px serif';
  ctx.strokeText(text, event.offsetX, event.offsetY);
  ctx.fillText(text, event.offsetX, event.offsetY);
  ctx.restore();
};

const onSaveBtnClick = (event) => {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myDrawing.png';
  a.click();
};

canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener('mousedown', onClick);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mouseleave', onMouseUp);
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('click', onCanvasClick);

lineWidth.addEventListener('change', onLineWidthChange);
modeBtn.addEventListener('click', onModeBtnClick);
destroyBtn.addEventListener('click', onDestroyBtnClick);
eraseBtn.addEventListener('click', onEraseBtnClick);
color.addEventListener('change', onColorChange);
fileInput.addEventListener('change', onFileChange);
colorOptions.forEach((color) => color.addEventListener('click', onColorClick));
saveBtn.addEventListener('click', onSaveBtnClick);
