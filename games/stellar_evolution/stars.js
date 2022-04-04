
class Star {
  constructor(x, y, mass){
    this.id = random(100);
    this.t = 0;
    this.alive = true;
    this.pos = new createVector(x, y);
    this.vel = new createVector(random(-1,1), random(-1,1));
    this.vel.mult(random(10));
    this.mass = 10*mass*random(0.8,1.2); // Masses between 0.5 and 10 Msol * noise
    this.r = this.mass*10;
    this.airDrag = random(0.92, 0.98);
    this.col = color(
      map(this.mass, minMass,1, 0.7,1.0, true) *map(this.mass, 1,10, 1.,0.3, true),
      map(this.mass, minMass,2, 0.0,1.0, true) *map(this.mass, 1,10, 1.,0.3, true),
      map(this.mass, minMass,3, 0.0,1.0, false)*map(this.mass, 4,10, 1.,3.0, true),
    )
  }
  
  move() {
    this.vel.mult(this.airDrag);
    this.pos.add(this.vel);

    let brownian = createVector(
      1-2*noise(this.id + t),1-2*noise(2*this.id + t));
    brownian.mult(0.5);
    this.pos.add(brownian);
  }

  draw() {
    fill(this.col)
    circle(this.pos.x, this.pos.y, this.r);
  }

  evolve(){
    if (this.t < 1000/this.mass){
      this.t++;
      this.r *= 1.001;
    }
    else {
      this.alive = false;
    }
  }
}

class Stars {
  constructor(){
    this.stars = []
  }

  push(element){
    this.stars.push(element)
  }

  move(){
    this.stars.forEach((star) => {
      if (star.alive){
        star.move();
      }
    })
  }

  draw(){
    this.stars.forEach((star) => {
      if (star.alive){
        star.draw();
      }
    })
  }

  evolve(){
    for (let i = 0 ; i < this.stars.length ; i++){
      let star = this.stars[i];
      if (star.alive){
        star.evolve();
      }
      else {
        this.stars.splice(i,1)
      }
    }
  }
}
