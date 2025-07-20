const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Texto en canvas
function drawText() {
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';
  ctx.shadowColor = 'white';
  ctx.shadowBlur = 20;
  ctx.fillText('Happy Birthday Manguitos', w / 2, 100);
  ctx.shadowBlur = 0;
}

// Globos
class Balloon {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * w;
    this.y = h + Math.random() * 200;
    this.size = 30 + Math.random() * 20;
    this.speed = 1 + Math.random() * 1.5;
    this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
    this.stringLength = this.size * 2;
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.size - this.stringLength) {
      this.reset();
    }
  }

  draw() {
    // Globo
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cuerda
    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.size);
    ctx.lineTo(this.x, this.y + this.size + this.stringLength);
    ctx.stroke();
  }
}

const balloons = [];
for (let i = 0; i < 40; i++) {
  balloons.push(new Balloon());
}

// Destellos
class Sparkle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.radius = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random();
    this.delta = 0.02 + Math.random() * 0.02;
  }

  update() {
    this.alpha += this.delta;
    if (this.alpha <= 0 || this.alpha >= 1) {
      this.delta = -this.delta;
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const sparkles = [];
for (let i = 0; i < 80; i++) {
  sparkles.push(new Sparkle());
}

// Animación
function animate() {
  ctx.clearRect(0, 0, w, h);

  drawText();

  balloons.forEach(b => {
    b.update();
    b.draw();
  });

  sparkles.forEach(s => {
    s.update();
    s.draw();
  });

  requestAnimationFrame(animate);
}

animate();
