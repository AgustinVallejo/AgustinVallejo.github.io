let sunsetShader;
let wavelengths = [700,530,440];
let scattering = [];
let sunX = sunY = sunA = 0;

function preload(){
    sunsetShader = loadShader('sunset.vert', 'sunset.frag');
}

function setup(){
    let canvas = createCanvas(800, 500, WEBGL);
	canvas.parent("game");
    pixelDensity(1);

    wavelengths.forEach(lambda => {
        scattering.push( pow(400/lambda, 4.0) )
    })
}

function draw(){
    shader(sunsetShader);


    let mx = map(mouseX, 0, width, 0, 1);
    let my = map(mouseY, 0, height*0.9, 1, 0);
  
    sunsetShader.setUniform("u_mouse", [mx, my]);
    sunsetShader.setUniform("u_resolution", [width, height]);
    sunsetShader.setUniform("u_pixelDensity",pixelDensity());
    sunsetShader.setUniform("u_time", millis() / 1000.0);
    sunsetShader.setUniform("u_scattering", scattering);


    rect(0, 0, width, height);

}

function mousePressed(){
    sunX = mouseX;
    sunY = mouseY;
    sunA = 0;
}