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
    this.rotate = 0;
    this.isRotate = false;

    this.drawRect();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawRect() {
    this.clear();
    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.context.rotate(calculateRadian(this.rotate));
    this.context.translate(-this.canvas.width / 2, -this.canvas.height / 2);
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.restore();
  }

  move() {
    this.drawRect();
    this.toggleRotate();
    this.x += this.speed;
  }

  pause() {
    this.drawRect();
  }

  reset() {
    if (this.x >= this.canvas.width) {
      this.x = 0;
    }
  }

  toggleRotate() {
    if (this.isRotate) {
      this.rotate += 2;
    }
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
  const translateArray = [10, 20, 30, 40, 50, -10, -20, -30, -40, -50];
  const randomTranslateNumber = Math.floor(
    Math.random() * translateArray.length
  );
  ball.y += translateArray[randomTranslateNumber];
});

rotateButton.addEventListener('click', () => {
  ball.isRotate = !ball.isRotate;
});

scaleButton.addEventListener('click', () => {
  ball.width += 8;
  ball.height += 8;
});

animate();
