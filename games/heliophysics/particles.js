class Particles{
  constructor(N){
    this.particles = [];

    for (let i = 0; i < N; i++) {
      const x = random(width);
      const y = random(height);
      const vx = random(-1, 1);
      const vy = random(-1, 1);
      this.particles.push(new Particle(x, y, vx, vy));
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
