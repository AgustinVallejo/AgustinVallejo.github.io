let theShader;
let whiteLight = true;

function preload(){
    theShader = loadShader("shader.vert","shader.frag");
}

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw(){
    theShader.setUniform("u_resolution",[width,height])
    theShader.setUniform("u_time",millis()*1e-3)
    theShader.setUniform("u_mouse",[mouseX/width, map(mouseY,0,height,1,0)])
    theShader.setUniform("u_whiteLight",whiteLight)
    shader(theShader);
    rect(0,0,width,height);
}

function mouseClicked(){
    whiteLight = !whiteLight;
}