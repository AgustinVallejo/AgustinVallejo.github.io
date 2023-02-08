class TestParticles{
  constructor(N){
    this.particles = [];

    for (let i = 0; i < N; i++) {
      const x = random(width);
      const y = random(height);
      const vx = random(-1, 1);
      const vy = random(-1, 1);
      this.particles.push(new TestParticle(x, y, vx, vy));
    }
  }

  draw(){
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw();
    }
  }

  update(){
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (!this.particles[i].alive) {
        this.particles.splice(i, 1);
      }
    }
  }
}

class TestParticle {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.alive = true;
  }

  draw() {
    strokeWeight(1);
    stroke(255, 255, 0);
    point(this.x, this.y);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    magneticField.interact(this);

    // If the particle is out of the screen, kill it
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.alive = false;
    }
  }
}