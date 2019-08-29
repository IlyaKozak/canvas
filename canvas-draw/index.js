const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
ctx.globalCompositeOperation = 'exclusion';

// Initial text message at the start 
ctx.font = 'italic bold 70px Verdana';
const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop('0', 'yellow');
gradient.addColorStop('0.5', 'red');
gradient.addColorStop('1.0', 'blue');
ctx.fillStyle = gradient;
ctx.textAlign = 'center';
ctx.fillText('Doubleclick for reset', canvas.width / 2, canvas.height / 2 - 50);
ctx.fillText('Mousedown to draw', canvas.width / 2, canvas.height / 2 + 50); 

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let isLineWidthGrow = true;

function draw(e) {
  if (!isDrawing) return; // stop the fn from running when mouse button is not down
  // console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
  
  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 5) {
    isLineWidthGrow = !isLineWidthGrow;
  }

  (isLineWidthGrow) ? ctx.lineWidth++ : ctx.lineWidth--;
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousedown', () => ctx.clearRect(0, 0, canvas.width, canvas.height), { once : true });

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('dblclick', (e) => ctx.clearRect(0, 0, canvas.width, canvas.height));
