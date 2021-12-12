const canvas = document.getElementById('canvas');
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');
const width = ctx.canvas.width;
const height = ctx.canvas.height;

let requestId = null;
const calculateRadian = (degrees) => (Math.PI / 180) * degrees;

const ball = {
  x: 0,
  y: height / 2,
  r: 30,
  speed: 1,
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
  ctx.clearRect(0, 0, width, height);

  if (ball.x >= width) {
    ball.x = 0;
  }

  ball.drawBall();

  ball.x += ball.speed;
};

const animate = () => {
  draw();
  requestId = window.requestAnimationFrame(animate);
};

window.onload = () => {
  ball.isAnimated = true;
  animate();
};

canvas.addEventListener('click', () => {
  if (ball.isAnimated) {
    window.cancelAnimationFrame(requestId);
    ball.isAnimated = false;
  } else {
    requestId = window.requestAnimationFrame(animate);
    ball.isAnimated = true;
  }
});

const translateButton = document.getElementById('translate-button');
const rotateButton = document.getElementById('rotate-button');
const scaleButton = document.getElementById('scale-button');

translateButton.addEventListener('click', () => {
  const translateArray = [10, 20, 30, 40, 50, -10, -20, -30, -40, -50];
  const randomTranslateNumber = Math.floor(
    Math.random() * translateArray.length
  );
  ctx.translate(0, translateArray[randomTranslateNumber]);
});

rotateButton.addEventListener('click', () => {
  ctx.translate(width / 2, height / 2);
  ctx.rotate(calculateRadian(45));
  ctx.translate(-width / 2, -height / 2);
});

scaleButton.addEventListener('click', () => {
  ctx.translate(width / 2, height / 2);
  ctx.scale(1.1, 1.1);
  ctx.translate(-width / 2, -height / 2);
});
