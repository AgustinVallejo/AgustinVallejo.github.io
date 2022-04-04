/**
 * STELLAR EVOLUTION MODEL
 * Agustin Vallejo
 * 2022
 * 
 */


let stars = new Stars(); // Class that manages the list of stars
let shaded = false;
let t = 0; // Time

const CREATED_STARS = 20; // Max number of stars that may appear when clicked
const MAX_STAR_COUNT = 500; // Max number of stars
const minMass = 10/CREATED_STARS; // Minimum star mass

let HR;


function preload(){
  theShader = new p5.Shader(this.renderer, vertShader, fragShader);
}


function setup() {
  let canvas = createCanvas(windowWidth*0.7, windowHeight*0.7);
  canvas2 = createGraphics(width, height, WEBGL);
  canvas.parent("game")
  noStroke();
  
  HR = new Graph(0.1,0.15)
}

function windowResized(){
  resizeCanvas(windowWidth*0.7, windowWidth*0.7);
  canvas2.resizeCanvas(windowWidth*0.7, windowWidth*0.7);
}

function draw() {
  stars.move();
  stars.evolve();
  t += 0.001;
  
  colorMode(RGB,1.0);
  background(0);
  if (shaded){
    // Set general sim uniforms
    theShader.setUniform("u_resolution",[width,height]);
    theShader.setUniform("u_pixelDensity",pixelDensity());
    theShader.setUniform("u_mouse",[mouseX/width, map(mouseY,0,height,1,0)]);
    
    let data = serializeSketch()
    theShader.setUniform("u_N",stars.stars.length);
    theShader.setUniform("u_stars",data.stars);
    theShader.setUniform("u_colors",data.colors);

    canvas2.shader(theShader);
    canvas2.rect(0,0,width,height);
    image(canvas2,0,0);
  }
  else {
    stars.draw();
  }
}

function mousePressed(){
  // Create new Stars
  if (stars.stars.length < MAX_STAR_COUNT){
    let N = int(random(1,CREATED_STARS))
    for (let i = 0; i < N; i++){
      stars.push(new Star(mouseX, mouseY, 1/N));
    }
  }
}

function keyPressed(){
  if (key == "a"){
    shaded = !shaded;
  }
}


function serializeSketch() {
  // Transform data into uniform type information
  data = {"stars": [], "colors": []};
  let STARS = stars.stars;
  
  for (let i = 0; i < STARS.length; i++) {
      data.stars.push(
          map(STARS[i].pos.x, 0, width, 0.0, 1.0), 
          map(STARS[i].pos.y, 0, height, 1.0, 0.0),
          map(STARS[i].r, 0, height*0.5, 0.0, 1.0))

      data.colors.push(
        red(STARS[i].col),
        green(STARS[i].col),
        blue(STARS[i].col),
      )
  }
  
  return data;
}