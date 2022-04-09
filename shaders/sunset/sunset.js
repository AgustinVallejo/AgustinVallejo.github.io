let sunsetShader;
let wavelengths = [700,530,440];
let scattering = [];

function preload(){
    sunsetShader = loadShader('sunset.vert', 'sunset.frag');
}

function setup(){
    createCanvas(0.7*windowWidth, 0.8*windowHeight, WEBGL);
    wavelengths.forEach(lambda => {
        scattering.push( pow(400/lambda, 4.0) )
    })
}

function draw(){
    shader(sunsetShader);

    let mx = map(mouseX, 0, width, 0, 1);
    let my = map(mouseY, 0, height, 1, 0);
  
    sunsetShader.setUniform("u_mouse", [mx, my]);
    sunsetShader.setUniform("u_resolution", [width, height]);
    sunsetShader.setUniform("u_pixelDensity",pixelDensity());
    sunsetShader.setUniform("u_time", millis() / 1000.0);
    sunsetShader.setUniform("u_scattering", scattering);


    rect(0, 0, width, height);
}

function windowResized(){
    resizeCanvas(0.7*windowWidth, 0.8*windowHeight);
    sunsetShader.setUniform("u_resolution", [width, height]);
  }