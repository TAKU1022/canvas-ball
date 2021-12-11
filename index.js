const canvas = document.getElementById('canvas');
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');

let requestId = null;
const calculateRadian = (degrees) => (Math.PI / 180) * degrees;

const ball = {
  x: 0,
  y: ctx.canvas.height,
  r: 30,
  speed: 2,
  isAnimated: false,
  drawBall() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(this.x, this.y, this.r, calculateRadian(0), calculateRadian(360));
    ctx.fill();
    ctx.closePath();
  },
};

const draw = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (ball.x >= ctx.canvas.width + ball.r / 2) {
    ball.x = 0;
    ball.y = ctx.canvas.height;
  }

  ball.drawBall();

  ball.x += ball.speed;
  ball.y -= ball.speed;
};

const animateCanvas = () => {
  draw();
  requestId = window.requestAnimationFrame(animateCanvas);
};

window.onload = () => {
  ball.isAnimated = true;
  animateCanvas();
};

canvas.addEventListener('click', () => {
  if (ball.isAnimated) {
    window.cancelAnimationFrame(requestId);
    ball.isAnimated = false;
  } else {
    requestId = window.requestAnimationFrame(animateCanvas);
    ball.isAnimated = true;
  }
});
