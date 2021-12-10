const canvas = document.getElementById('canvas');
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');

const calculateRadian = (degrees) => (Math.PI / 180) * degrees;

let x = 0;
let y = ctx.canvas.height;
const speed = 2;

const draw = () => {
  if (x === ctx.canvas.width) return;

  window.requestAnimationFrame(draw);

  ctx.beginPath();
  ctx.arc(x, y, 30, calculateRadian(0), calculateRadian(360));
  ctx.fill();
  ctx.closePath();

  x += speed;
  y -= speed;
};

draw();
