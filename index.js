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
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.width = 40;
    this.height = 40;
    this.speed = 2;
    this.isAnimated = false;

    this.drawRect();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawRect() {
    this.clear();
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.drawRect();
    this.x += this.speed;
  }

  pause() {
    this.drawRect();
  }

  reset() {
    if (this.x >= this.canvas.width) {
      this.x = 0;
    } else {
      return;
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

animate();
