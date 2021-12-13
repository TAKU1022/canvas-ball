const canvas = document.getElementById('canvas');
/**
 * @type {CanvasRenderingContext2D}
 */
const context = canvas.getContext('2d');
const width = context.canvas.width;
const height = context.canvas.height;

let requestId = null;
const calculateRadian = (degrees) => (Math.PI / 180) * degrees;

const ball = {
  x: width / 2,
  y: height / 2,
  r: 30,
  speed: 1,
  isAnimated: false,
  drawBall() {
    context.beginPath();
    context.fillStyle = 'red';
    context.arc(
      this.x,
      this.y,
      this.r,
      calculateRadian(0),
      calculateRadian(360)
    );
    context.fill();
    context.closePath();
  },
};

const draw = () => {
  context.clearRect(0, 0, width, height);

  if (ball.x >= width) {
    ball.x = 0;
  }

  ball.drawBall();

  ball.x += ball.speed;
};

window.onload = () => {
  draw();
};

const animate = () => {
  draw();
  requestId = window.requestAnimationFrame(animate);
};

canvas.addEventListener('click', () => {
  if (ball.isAnimated) {
    window.cancelAnimationFrame(requestId);
    ball.isAnimated = false;
  } else {
    animate();
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
  context.translate(0, translateArray[randomTranslateNumber]);
});

rotateButton.addEventListener('click', () => {
  context.translate(width / 2, height / 2);
  context.rotate(calculateRadian(90));
  context.translate(-width / 2, -height / 2);
});

scaleButton.addEventListener('click', () => {
  context.translate(width / 2, height / 2);
  context.scale(1.1, 1.1);
  context.translate(-width / 2, -height / 2);
});
