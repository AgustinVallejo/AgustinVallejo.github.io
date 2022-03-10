let theShader;
let canvas2;

let clicked = false;
let whiteLight = false;
let colorLight = true;
let gas1Enabled = false;
let gas2Enabled = false;
let gas1Lines = [0.1,0.5,0.7];
let gas2Lines = [0.3,0.85,0.95];
let gas1, gas2;

let whiteButton, colorButton, gas1Button, gas2Button;

function preload(){
    theShader = loadShader("shader.vert","shader.frag");
}

function setup(){
    let canvas = createCanvas(windowWidth*0.8, windowHeight*0.8);
    canvas.parent("game")
    canvas2 = createGraphics(width, height, WEBGL);
    textFont("Roboto Slab");

    // Setting up buttons
    whiteButton = new Button("Luz Blanca",0.1*width,0.8*height,enableWhiteLights, whiteLight)
    colorButton = new Button("Color Manual",0.117*width,0.92*height,enableColors, colorLight)
    gas1Button = new Button("Gas Y",0.5*width,0.92*height,toggleGas1, false)
    gas2Button = new Button("Gas X",0.35*width,0.92*height,toggleGas2, false)

    // Creating GasTube elements
    gas1 = new GasTube(gas1Lines,0.5*width, height/2,0.1*width, 0.8*height, color(255,255,0));
    gas2 = new GasTube(gas2Lines,0.35*width, height/2,0.1*width, 0.8*height, color(255));
}

function draw(){
    cursor(ARROW);

    // Set general sim uniforms
    theShader.setUniform("u_resolution",[width,height])
    theShader.setUniform("u_time",millis()*1e-3)
    theShader.setUniform("u_mouse",[mouseX/width, map(mouseY,0,height,1,0)])
    theShader.setUniform("u_whiteLight",whiteLight)
    theShader.setUniform("u_colorLight",colorLight)

    // Uniforms for gas1
    theShader.setUniform("u_lines1",invertLines(gas1Lines))
    theShader.setUniform("u_gas1ON",gas1Enabled)
    theShader.setUniform("u_lineStrength1",gas1.lineStrength)

    // Uniforms for gas2
    theShader.setUniform("u_lines2",invertLines(gas2Lines))
    theShader.setUniform("u_gas2ON",gas2Enabled)
    theShader.setUniform("u_lineStrength2",gas2.lineStrength)


    canvas2.shader(theShader);
    canvas2.rect(0,0,width,height);
    image(canvas2,0,0)

    fill(255*0.1)
    stroke(30)
    strokeWeight(5)
    rectMode(CENTER)
    rect(0.75*width,height/2,0.1*width,0.15*width)

    if (gas1Enabled){
        gas1.draw();
    }
    if (gas2Enabled){
        gas2.draw();
    }

    whiteButton.draw();
    colorButton.draw();
    gas1Button.draw();
    gas2Button.draw();
    clicked = false;
}

function invertLines(lines){
    newlines = []
    lines.forEach(line => {newlines.push(1-line)})
    return newlines
}

function enableWhiteLights(){
    whiteLight = !whiteLight;
    whiteButton.toggled = !whiteButton.toggled;

    colorLight = false;
    colorButton.toggled = false;
}

function enableColors(){
    whiteLight = false;
    whiteButton.toggled = false;

    colorLight = !colorLight;
    colorButton.toggled = !colorButton.toggled;
}

function toggleGas1(){
    gas1Enabled = !gas1Enabled;
    gas1Button.toggled = gas1Enabled;
}

function toggleGas2(){
    gas2Enabled = !gas2Enabled;
    gas2Button.toggled = gas2Enabled;
}

function windowResized(){
    resizeCanvas(windowWidth*0.8, windowHeight*0.8);
    canvas2.resizeCanvas(windowWidth*0.8, windowHeight*0.8);
    gas1Button.x0 = width*0.5;
    gas1.x0 = width*0.5;
    gas2.x0 = width*0.35;
  }