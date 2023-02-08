// Relative sizes of the simulation with respect to the window
const relativeWidth = 0.7;
const relativeHeight = 0.8;

let sun, earth, jupiter;
let magneticField;
let particles;

const sunXPosition = 0.2;
const earthXPosition = 0.5;
const JupiterXPosition = 0.8;


function setup() {
  // Create main canvas and shader canvas
  let canvas = createCanvas(windowWidth*relativeWidth, windowHeight*relativeHeight);
  cloudCanvas = createGraphics(width, height, WEBGL);
  canvas2 = createGraphics(width, height, WEBGL);
  canvas.parent("game")
  noStroke();
  sun = new Sun();
  magneticField = new MagneticField();
}

function windowResized(){
  resizeCanvas(windowWidth*relativeWidth, windowHeight*relativeHeight);
  canvas2.resizeCanvas(windowWidth*relativeWidth, windowHeight*relativeHeight);
  cloudCanvas.resizeCanvas(windowWidth*relativeWidth, windowHeight*relativeHeight);
}

function draw() {
  translate( width/2, height/2 );
  background(0);
  magneticField.draw();
  sun.draw();
}

class MagneticField{
  constructor(){
    this.positiveSide = createVector( 0, sun.radius );
    this.negativeSide = createVector( 0, -sun.radius );
  }

  draw(){
  }

  update(){
  }

  interact(particle){
  }
}

class Sun{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.radius = 50;
    this.color = color(255,255,0);
  }
  draw(){
    fill(this.color);
    ellipse(this.x,this.y,this.radius*2,this.radius*2);
  }
}

class Earth{
  constructor(){
    this.x = earthXPosition*width;
    this.y = 0;
    this.radius = 10;
    this.color = color(0,0,255);
  }
  draw(){
    fill(this.color);
    ellipse(this.x,this.y,this.radius*2,this.radius*2);
  }
}

class Jupiter{
  constructor(){
    this.x = JupiterXPosition*width;
    this.y = 0;
    this.radius = 30;
    this.color = color(255,210,200);
  }
  draw(){
    fill(this.color);
    ellipse(this.x,this.y,this.radius*2,this.radius*2);
  }
}