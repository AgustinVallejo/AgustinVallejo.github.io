
class Star {
  constructor(x, y, mass){
    this.id = random(100);
    this.t = 0; // Absolute time
    this.tau = 0; // Relative time
    this.alive = true;

    this.pos = new createVector(x, y);
    this.vel = new createVector(random(-1,1), random(-1,1));
    this.vel.mult(random(10));
    this.airDrag = random(0.92, 0.98);

    this.mass = 10*mass*random(0.8,1.2); // Masses between 0.5 and 10 Msol * noise
    this.shownMass = round(pow(2,this.mass - 2),2);
    this.r = this.mass*10; // Radii between 5 and 100 px * noise
    this.T = T/this.mass; // Star's Halflife?

    this.col = color(
      map(this.mass, minMass,1, 0.7,1.0, true) *map(this.mass, 1,10, 1.,0.3, true),
      map(this.mass, minMass,2, 0.0,1.0, true) *map(this.mass, 1,10, 1.,0.3, true),
      map(this.mass, minMass,3, 0.0,1.0, false)*map(this.mass, 4,10, 1.,3.0, true),
    )
  }
  
  move() {
    this.vel.mult(this.airDrag);
    this.pos.add(this.vel);
    if (play){
      let brownian = createVector(
        1-2*noise(this.id + this.t*0.001),1-2*noise(2*this.id + this.t*0.001));
      brownian.mult(0.5*pow(dt,1/dt));
      this.pos.add(brownian);
    }
  }

  draw() {
    fill(this.col);
  }
  
  draw() {
    push();
    translate(this.pos.x, this.pos.y)
    fill(this.col);
    if (!shaded){
      circle(0, 0, this.r);
    }
    if (showFlags){
      textSize(12)
      text(this.evolutionaryState(),0,1.1*this.r)
      text(this.shownMass + " Msol",0,1.1*this.r + 10)
      text(int(30*this.t,2) + " mill. años",0,1.1*this.r+20)
    }
    pop();
  }

  evolutionaryState() {
    if (this.tau < 1.0){
      if (this.shownMass < 0.8) {
        return "Enana roja"
      }
      else if (this.shownMass < 1.6) {
        return "Enana amarilla"
      }
      else {
        return "Gigante azul"
      }
    }
    else if ((this.tau < 1.5) && (this.mass < 4)) {
      if (this.shownMass < 8) {
        return "Gigante Roja"
      }
    }
    else if (this.tau < 5){
      if (this.mass < 3){
        return "Enana Blanca"
      }
      else {
        return "Estrella de Neutrones"
      }
    }
  }

  evolve(){
    this.t += dt;
    this.tau = this.t/this.T;
    if (this.tau < 1.0){
      // Do nothing, just vibe
    }
    else if ((this.tau < 1.5) && (this.mass < 4)) {
      this.r = 10*this.mass*pow(10,this.tau-1);
      this.col = color(
        map(this.mass, minMass,1, 0.7,1.0, true) *map(this.mass, 1,10, 1.,0.3, true),
        map(this.mass, minMass,2, 0.0,1.0, true) *map(this.mass, 1,10, 1.,0.3, true) * pow(4,1-this.tau),
        map(this.mass, minMass,3, 0.0,1.0, false)*map(this.mass, 4,10, 1.,3.0, true) * pow(4,1-this.tau),
      )
    }
    else if (this.mass < 5){
      this.r = 4;
      this.col = color(0.5 * pow(1.5,1.5-this.tau));
    }
    else {
      this.alive = false;
    }

    if (this.tau > 5){
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
    noStroke();
    colorMode(RGB,1);
    if ((!shaded)||(showFlags)){
      this.stars.forEach((star) => {
        if (star.alive){
          star.draw();
        }
      })
    }
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

    if ((autoEvolve)&(random()>0.98)&(play)) {
      if (this.stars.length < MAX_STAR_COUNT){
        let N = int(random(1,CREATED_STARS))
        let posx = width*(0.8*random()+0.1)
        let posy = height*(0.8*random()+0.1)
        for (let i = 0; i < N; i++){
          this.push(new Star(posx,posy, 1/N));
        }
      }
    }
  }
}
