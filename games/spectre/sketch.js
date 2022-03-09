let theShader;
let canvas2;

let clicked = false;
let whiteLight = true;
let gas1Enabled = false;
let gas1 = [0.1,0.5,0.7]
let gas2 = [0.3,0.4,0.9]

let whiteButton, colorButton, gas1Button;

function preload(){
    theShader = loadShader("shader.vert","shader.frag");
}

function setup(){
    let canvas = createCanvas(windowWidth*0.8, windowHeight*0.8);
    canvas.parent("game")
    canvas2 = createGraphics(width, height, WEBGL);
    whiteButton = new Button("Luz Blanca",0.1*width,0.8*height,enableWhiteLights, true)
    colorButton = new Button("Color Manual",0.117*width,0.92*height,enableColors, false)
    gas1Button = new Button("Gas 1",0.5*width,0.92*height,toggleGas, false)
    textFont("Roboto Slab");

}

function draw(){
    cursor(ARROW);

    theShader.setUniform("u_resolution",[width,height])
    theShader.setUniform("u_time",millis()*1e-3)
    theShader.setUniform("u_mouse",[mouseX/width, map(mouseY,0,height,1,0)])
    theShader.setUniform("u_whiteLight",whiteLight)
    theShader.setUniform("u_lines",[1-0.1,1-0.5,1-0.7])
    theShader.setUniform("u_gasON",gas1Enabled)
    canvas2.shader(theShader);
    canvas2.rect(0,0,width,height);
    image(canvas2,0,0)

    fill(255*0.1)
    stroke(30)
    strokeWeight(5)
    rectMode(CENTER)
    rect(0.75*width,height/2,0.1*width,0.15*width)

    if (gas1Enabled){
        drawGas();
    }

    whiteButton.draw();
    colorButton.draw();
    gas1Button.draw();
    clicked = false;
}

function enableWhiteLights(){
    whiteLight = true;
    whiteButton.toggled = true;
    colorButton.toggled = false;
}

function enableColors(){
    whiteLight = false;
    whiteButton.toggled = false;
    colorButton.toggled = true;
}

function toggleGas(){
    gas1Enabled = !gas1Enabled;
    gas1Button.toggled = gas1Enabled;
}

function drawGas(){
    push()
    translate(0,-18)
    gas1.forEach(line => {
        fill(255);
        noStroke();
        triangle(0.95*width,line*height,0.98*width,line*height-10,0.98*width,line*height+10)
    })
    pop()
}

function windowResized(){
    resizeCanvas(windowWidth*0.8, windowHeight*0.8);
    canvas2.resizeCanvas(windowWidth*0.8, windowHeight*0.8);
    gas1Button.x0 = width*0.5;
  }