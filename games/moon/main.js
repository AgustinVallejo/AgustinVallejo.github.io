let t, play
let radioT, radioL, Wearth, Wmoon;

// El conjunto de las estrellas de fondo
let stars = [];
let NStars = 100;
let twinkling = true;

var IMG;

function initializeFields() {
    radioT = 200;
    radioL = 50;
    Wearth = PI / 50;
    Wmoon = Wearth / 28;
    t = 0;
    IMG = null;
    loc = null;
    size = 0;
    col = 0;
    play = false;
}

function set_angle(){
    if (play) {
        angle = -t*Wmoon - 3.2*PI/4
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
	}
}

function earth(t) {
    push();
    translate(width / 2, height / 2);
    // La tierra también rota según t
    rotate(-t * Wearth + 1.2 * PI / 2);
    imageMode(CENTER);

    noStroke();
    fill(50,20,0);
    circle(0,0,radioT)

    // Dibujo la Tierra
    IMG.resize(radioT,radioT);
    tint(200);
    image(IMG, 0, 0);
    pop();
}

function moon(angle) {
    // Pone la Luna en la dirección del Mouse
    // Tamaño de la órbita
    var moonOrbit = 300;
    var moonLoc = createVector(1,0);
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
    let bg_color = color(20,50,50,255);
    let light_color = color(255,255,255,255);
    fill(bg_color)
    circle(moonLoc.x, moonLoc.y, radioL);
    fill(light_color);
    arc(moonLoc.x, moonLoc.y, radioL, radioL, -PI / 2, PI / 2, CHORD);
    pop();
    var moonAngle = moonLoc.heading();
    return moonAngle;
}

function sun() {
    // Pone las flechas y pone el texto
    textSize(32);
    fill(255, 255, 0);
    // text("Al Sol", 0.9 * width, 0.15 * height);
    // Cantidad de flechas
    fill(255,255,0);
    circle(1.7*width, height/2, 1.5*width)
    fill(255);
    circle(1.7*width, height/2, 1.45*width)
    var n = 8;
    for (var i = 0; i < n; i++) {
        var ypos = map(i, 0, n, 0.2 * height, 0.8 * height);
        stroke(255, 255, 0, 100);
        strokeWeight(10);
        arrow(0.99 * width, ypos, 0.9 * width, ypos);
    }
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
		star(x,y,10+noise(0.01*t+10*i)*10,2+noise(0.01*t+10*i)*5,4);
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
    var s = 0.3;
    var y = -0.65 * radioT / s;
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