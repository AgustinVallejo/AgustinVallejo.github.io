
var radioT, radioL, t, frame;

// El conjunto de las estrellas de fondo
let stars = [];
let NStars = 100;
let twinkling = true;

var IMG;

function initializeFields() {
    radioT = 200;
    radioL = 50;
    t = 0;
    frame = 0;
    IMG = null;
    loc = null;
    size = 0;
    col = 0;
}

function setup() {
    var canvas = createCanvas(1000, 700);
    canvas.parent("game")
    initializeFields();
    background(0);
	for (i = 0; i < NStars; i++) {
		stars.push([random(width),random(height)]);
	}

    // Cargo la Imagen de la Tierra desde Arriba
    IMG = loadImage("polar.png");
    // La pongo del tamaño radioT
    smooth();
}

function draw() {
    background(0);
    twinklingStars();
    // Dibuja las flechas que señalan el Sol
    alSol();
    // Dibujo el muñequito. El parámetro t es para que gire.
    stickman(t);
    // Ejecuto la función para que la Luna siga el mouse y saco el ángulo
    var objAngle = followMouse();
    // Creo las mareas
    mareas(500, objAngle);
    tierra(t);
    t++;
}

function tierra(t) {
    // Dibujo la Tierra
    IMG.resize(radioT,radioT);

    push();
    translate(width / 2, height / 2);
    // La tierra también rota según t
    rotate(-t * PI / 500 + 1.2 * PI / 2);
    imageMode(CENTER);
    tint(200);
    image(IMG, 0, 0);
    pop();
}

function mareas(N, objAngle) {
    // Función que crea las mareas
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(89, 183, 255, 128);
    beginShape();
    for (var i = 0; i < N; i++) {
        var th = map(i, 0, N, 0, 2 * PI);
        // Efecto del Sol en las mareas
        var drSOL = tidalForceObj(th, 'S', 0);
        // Efecto de la Luna en las mareas
        var drLUNA = tidalForceObj(th, 'L', objAngle);
        // La altura R de la marea en un ángulo th
        var R = 1.1 * 0.5 * radioT + drSOL + drLUNA;
        var x = R * cos(th);
        var y = R * sin(th);
        // Crea el vector de la figura
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();
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

function tidalForceObj(angle, obj, objAngle) {
    // Ejerce la fuerza según el objeto que se esté usando. S para SOL y L para LUNA
    var MOONTIDE = 1;
    var SUNTIDE = 0.7;
    switch(obj) {
        case 'S':
            return tidalForce(angle, 10 * SUNTIDE, 0);
        case 'L':
            return tidalForce(angle, 10 * MOONTIDE, objAngle);
        default:
            return 0;
    }
}

function tidalForce(angle, G, objAngle) {
    // El desplazamiento vertical según la posición del lugar y el objeto que perturba
    var dr = G * (1 + cos(2 * (angle - objAngle)));
    return dr;
}

function followMouse() {
    // Pone la Luna en la dirección del Mouse
    // Tamaño de la órbita
    var moonOrbit = 300;
    var loc = new createVector(width / 2, height / 2);
    var mouse = new createVector(mouseX, mouseY);
    var moonLoc = p5.Vector.sub(mouse, loc);
    moonLoc.normalize();
    moonLoc.mult(moonOrbit);
    push();
    translate(width / 2, height / 2);
    // El resto de la función es dibujando cositas
    // Órbita
    noFill();
    stroke(100);
    strokeWeight(1);
    ellipse(0, 0, 2 * moonOrbit, 2 * moonOrbit);
    // Luna y Lado Iluminado
    noStroke();
    var moonCol = 120;
    fill(moonCol);
    ellipse(moonLoc.x, moonLoc.y, radioL, radioL);
    fill(moonCol * 2);
    arc(moonLoc.x, moonLoc.y, radioL, radioL, -PI / 2, PI / 2, CHORD);
    pop();
    var moonAngle = atan(moonLoc.y / moonLoc.x);
    return moonAngle;
}

function alSol() {
    // Pone las flechas y pone el texto
    textSize(32);
    fill(255, 255, 0);
    text("Al Sol", 0.9 * width, 0.15 * height);
    // Cantidad de flechas
    var n = 8;
    for (var i = 0; i < n; i++) {
        var ypos = map(i, 0, n, 0.2 * height, 0.8 * height);
        stroke(255, 255, 0);
        strokeWeight(10);
        arrow(0.9 * width, ypos, 0.99 * width, ypos);
    }
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



function stickman(t) {
    // El muñequito y su rotación
    var s = 0.3;
    var y = -0.65 * radioT / s;
    push();
    translate(width / 2, height / 2);
    scale(s);
    rotate(-t * PI / 500);
    ellipseMode(CENTER);
    stroke(128);
    strokeWeight(10);
    fill(255);
    ellipse(0, -90 + y, 50, 50);
    point(-10, -90 + y);
    point(10, -90 + y);
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

function preload() {
// TODO: put method calls that load from files into this method
// I found the following calls that you should move here:
// - on line 15: IMG = loadImage("polar.png")
// (note that line numbers are from your Processing code)
}

