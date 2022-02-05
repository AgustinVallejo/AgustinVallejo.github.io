let bodies = [];
let pressed = false;
let Rsun = 80;
let plColor;
let plSize;
let d;
let mouse;
let middle;
let kV = 1;
let kR = 1;

function setup(){
	let canvas = createCanvas(1000, 500);
	canvas.parent("game")
	background(0);
	translate(width/2, height/2);
	
	plColor = color(random(100,255),random(100,255),random(100,255));
	plSize = random(5,30);
	middle = createVector(width/2, height/2);
}

function draw() {
	background(0);
	drawPlanets(true)
}

function mousePressed(){
	if (!pressed){
		pos0 = createVector(mouseX,mouseY);
		pressed = true
	}
}

function mouseDragged(){
	background(0);
	cursor(HAND);
	
	// Dragging Line
	mouse = createVector(mouseX,mouseY);
	d = pos0.dist(mouse);
	stroke(255);
	strokeWeight(d/50 + 1);
	line(mouse.x,mouse.y,pos0.x,pos0.y);
	
	newPlanet();
	drawPlanets(false);
	noLoop();
}

function newPlanet(){
	fill(plColor);
	noStroke();
	circle(pos0.x,pos0.y,plSize);
}

function mouseReleased(){
	background(0);
	cursor(ARROW);
	pressed = false;
	mouse = createVector(mouseX,mouseY);
	let planet = new Planet()
	bodies.push(planet);
	plColor = color(random(255),random(255),random(255));
	plSize = random(5,30);
	loop();
}


function drawPlanets(moving){
		for (let p = 0; p < bodies.length ; p++){
			bodies[p].display();
			if (moving){
				bodies[p].move();
				if (middle.dist(bodies[p].pos) < 0.5*Rsun){
					bodies[p].alive = false;
				}
			}
	}
}