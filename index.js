const canvas = document.getElementById('canvas');
/**
 * @type {CanvasRenderingContext2D}
 */
const context = canvas.getContext('2d');

const calculateRadian = (degrees) => (Math.PI / 180) * degrees;

class Ball {
  constructor({ canvas, context }) {
    this.canvas = canvas;
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.context = context;
    this.width = 40;
    this.height = 40;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height / 2 - this.height / 2;
    this.speed = 2;
    this.isAnimated = false;
    this.dx = 0;
    this.dy = 0;
    this.degrees = 0;
    this.mx = 1.0;
    this.my = 1.0;

    this.drawRect();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawRect() {
    this.context.save();
    this.clear();
    this.context.translate(this.dx, this.dy);
    this.context.translate(
      this.canvas.width / 2 + this.dx,
      this.canvas.height / 2 + this.dy
    );
    this.context.rotate(calculateRadian(this.degrees));
    this.context.scale(this.mx, this.my);
    this.context.translate(-this.canvas.width / 2, -this.canvas.height / 2);
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.restore();
  }

  move() {
    this.x += this.speed;
    this.drawRect();
  }

  pause() {
    this.drawRect();
  }

  reset() {
    if (this.x >= this.canvas.width) {
      this.x = 0;
    }
  }

  translate() {
    const translateArray = [10, 20, 30, 40, 50, -10, -20, -30, -40, -50];
    const randomTranslateNumber = Math.floor(
      Math.random() * translateArray.length
    );
    this.dx = translateArray[randomTranslateNumber];
    this.dy = translateArray[randomTranslateNumber];
    this.drawRect();
  }

  rotate() {
    this.degrees += 15;
    this.drawRect();
  }

  scale() {
    this.mx += 0.2;
    this.my += 0.2;
    this.drawRect();
  }
}

const ball = new Ball({ canvas, context });

const animate = () => {
  if (ball.isAnimated) {
    ball.move();
    ball.reset();
  } else {
    ball.pause();
  }

  window.requestAnimationFrame(animate);
};

canvas.addEventListener('click', () => {
  ball.isAnimated = !ball.isAnimated;
});

const translateButton = document.getElementById('translate-button');
const rotateButton = document.getElementById('rotate-button');
const scaleButton = document.getElementById('scale-button');

translateButton.addEventListener('click', () => {
  ball.translate();
});

rotateButton.addEventListener('click', () => {
  ball.rotate();
});

scaleButton.addEventListener('click', () => {
  ball.scale();
});

animate();
