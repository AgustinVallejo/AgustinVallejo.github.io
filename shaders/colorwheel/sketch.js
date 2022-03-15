// in this example we will send a value from our p5 sketch to the shader
// these values are called "uniform" variables
// we will use p5's setUniform function to make this happen
// https://p5js.org/reference/#/p5.Shader/setUniform

// a shader variable
let uniformsShader;

function preload(){
  // load the shader
  uniformsShader = loadShader('uniform.vert', 'uniform.frag');
}

function setup() {
    pixelDensity(1)
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {  
  // shader() sets the active shader with our shader
  shader(uniformsShader);

  // lets send the mouse values to the shader as a vec2
  // first we will map them so that they go from 0 - 1 
  let mx = map(mouseX, 0, width, 0, 1);
  let my = map(mouseY, 0, height, 1, 0);

  uniformsShader.setUniform('mouse', [mx, my]);
  uniformsShader.setUniform("u_resolution", [width, height]);
  uniformsShader.setUniform("u_aspectRatio",width/height)
  uniformsShader.setUniform("u_time", millis() / 1000.0);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}