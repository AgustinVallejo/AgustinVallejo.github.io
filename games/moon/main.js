let t, play
let Rearth, Rmoon, Wearth, Wmoon;
let moonLoc, angle;
let moonOrbit, earthOrbit;
let Rsun,Xsun;

// El conjunto de las estrellas de fondo
let stars = [];
let stars2 = [];
let NStars = 100;
let twinkling = true;

// All simulations variables
let phasesON = false;
let shadowsON = false;
let tidesON = false;
let changing = false;

let eclipse = false;

var IMG;

function initializeFields() {
    Rearth = 200;
    Rmoon = 50;
    Rsun = 1.5*width;
    Xsun = 1.2;
    moonOrbit = 300;
    earthOrbit = Xsun*width;
    Wearth = PI / 50;
    Wmoon = Wearth / 28;
    moonLoc = createVector(1,0);
    angle = 0;
    t = 0;
    IMG = null;
    loc = null;
    size = 0;
    col = 0;
    play = false;
}

function set_angle(){
    if (play) {
        angle -= t*Wmoon;
        if (t > 2*PI/Wmoon) {
            t -= 2*PI/Wmoon
        }
      }
    else {
        angle = createVector(mouseX - width/2,mouseY - height/2).heading()
    }
    return angle
}

function createStars() {
	for (i = 0; i < NStars; i++) {
		stars.push([random(width),random(height)]);
		stars2.push([random(width),random(height)]);
	}
}

function earth(t) {
    push();
    translate(width / 2, height / 2);
    // La tierra también rota según t
    rotate(-t * Wearth + 1.2 * PI / 2);
    imageMode(CENTER);

    noStroke();
    fill(0,200,200);
    circle(0,0,Rearth)

    // Dibujo la Tierra
    IMG.resize(width,width);
    scale(Rearth/width);
    tint(200);
    image(IMG, 0, 0);
    pop();
}

function moon(angle) {
    // Pone la Luna en la dirección del Mouse
    // Tamaño de la órbita
    moonLoc = createVector(1,0);
    moonLoc.setHeading(angle)
    moonLoc.mult(moonOrbit);
    push();
    translate(width / 2, height / 2);
    // El resto de la función es dibujando cositas
    // Órbita
    noFill();
    stroke(100);
    strokeWeight(1);
    circle(0, 0, 2 * moonOrbit);
    // Luna y Lado Iluminado
    noStroke();
    fill(255);
    if (shadowsON && eclipse && moonLoc.x<0 && abs(moonLoc.y) < Rearth/2){
        let r = map(abs(moonLoc.y),0,Rearth/2,100,255)
        fill(255,r,r)
      }
    circle(moonLoc.x, moonLoc.y, Rmoon);

    // Lado oscuro
    fill(0,50,50)
    arc(moonLoc.x, moonLoc.y, Rmoon, Rmoon, PI / 2, -PI / 2, CHORD);
    pop();

    // Manchitas

    var moonAngle = moonLoc.heading();
    return moonAngle;
}

function sun() {
    // Pone las flechas y pone el texto
    textSize(32);
    fill(255, 255, 0);
    // text("Al Sol", 0.9 * width, 0.15 * height);
    // Cantidad de flechas
    var n = 8;
    for (var i = 0; i < n; i++) {
        var ypos = map(i, 0, n, 0.2 * height, 0.8 * height);
        stroke(100, 100, 0);
        strokeWeight(10);
        arrow(0.99 * width, ypos, 0.9 * width, ypos);
    }
    noStroke();
    fill(255,255,0);
    circle((0.5+Xsun)*width, height/2, Rsun)
    fill(255,255,200);
    circle((0.5+Xsun)*width, height/2, 0.97*Rsun)
}

function arrow(x1, y1, x2, y2) {
    // Dibuja una Flecha
    line(x1, y1, x2, y2);
    push();
    translate(x2, y2);
    var a = atan2(x1 - x2, y2 - y1);
    rotate(a);
    line(0, 0, -10, -10);
    line(0, 0, 10, -10);
    pop();
}


function twinklingStars(){
	fill(70);
	noStroke();
	for (i = 0; i < NStars; i++) {
		x = stars[i][0];
		y = stars[i][1];
		star(x,y,10+noise(0.1*t+10*i)*10,2+noise(0.01*t+10*i)*5,4);

        x = stars2[i][0];
		y = stars2[i][1];
		star(x,y,4+noise(1*t+10*i)*5,1+noise(0.01*t+10*i)*2,4);
	}
}

function star(x, y, radius1, radius2, npoints) {
  angle = TWO_PI / npoints;
  halfAngle = angle/2.0;
	da = PI/4 //0.001*mouseX
  beginShape();
  for (a = 0; a < TWO_PI; a += angle) {
    sx = x + cos(a + da) * radius2;
    sy = y + sin(a + da) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle + da) * radius1;
    sy = y + sin(a+halfAngle + da) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function stickman(t, eyes = 0) {
    eyes += t*Wmoon;
    // El muñequito y su rotación
    var s = 0.3 * Rearth/100;
    var y = -0.65 * Rearth / s;
    var dEyes = 5;
    push();
    translate(width / 2, height / 2);
    scale(s);
    rotate(-t * Wearth);
    ellipseMode(CENTER);
    stroke(128);
    strokeWeight(10);
    fill(255);
    ellipse(0, -90 + y, 50, 50);
    push();
    translate(dEyes*cos(eyes),dEyes*sin(eyes))
    point(-10, -90 + y);
    point(10, -90 + y);
    pop();
    rectMode(CENTER);
    rect(0, -15 + y, 50, 100);
    line(-25, -65 + y, -50, 10 + y);
    line(25, -65 + y, 50, 10 + y);
    line(-20, 35 + y, -20, 100 + y);
    line(-20, 100 + y, -25, 100 + y);
    line(20, 35 + y, 20, 100 + y);
    line(20, 100 + y, 25, 100 + y);
    fill(200, 200, 255, 100);
    ellipse(0, -95 + y, 80, 80);
    pop();
}