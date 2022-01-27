let bodies = [];
let pressed = false;
let Rsun = 80;
let plColor;
let plSize;
let d;
let G = 100;
let mouse;
let middle;

function setup() {
	var canvas = createCanvas(windowWidth*0.8, windowHeight*0.8);
	canvas.parent("game")
	frameRate(60);
	background(0);
	plColor = color(random(100,255),random(100,255),random(100,255));
	plSize = random(5,30);
	middle = createVector(width/2, height/2);
	
	for (i = 0; i < NStars; i++) {
		stars.push([random(width),random(height)]);
	}
}

function draw() {
	background(0);
	twinklingStars();
	sun();
	drawPlanets(true);
}

function sun(){
	push();
	translate(width/2, height/2);
	fill(255,255,0);
	noStroke();
	circle(0, 0, Rsun);
	
	// Orbits
	noFill();
	stroke(150);
	strokeWeight(1);
	N = 10
	for (let i = 0; i < N; i++){
		circle(0,0,i*width/N);
	}
	pop();
}

function mousePressed(){
	if (!pressed){
		pos0 = createVector(mouseX,mouseY);
		pressed = true
	}
}

function mouseDragged(){
	background(0);
	twinklingStars();
	cursor(HAND);
	
	// Dragging Line
	mouse = createVector(mouseX,mouseY);
	d = pos0.dist(mouse);
	stroke(255);
	strokeWeight(d/50 + 1);
	line(mouse.x,mouse.y,pos0.x,pos0.y);
	
	newPlanet();
	drawPlanets(false);
	sun();
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
	bodies.push(new Planet());
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

// Planet class
class Planet {
  constructor() {
    this.pos = pos0;
    this.speed = mouse.sub(pos0);
		this.speed.mult(0.01);
		this.acc = createVector(0,0);
		this.color = plColor;
		this.size = plSize;
		this.alive = true;
  }

  move() {
		if (this.alive){
			let Dvec = createVector(width/2,height/2);
			Dvec.sub(this.pos);
			let D = Dvec.mag();

			this.acc = Dvec.mult(G*D**-3);
			this.pos.add(this.speed);
			this.speed.add(this.acc);

			if (this.pos.dist(middle) > width){
				this.alive = false;
			}
		}
  }

  display() {
		if (this.alive){
			fill(this.color);
			circle(this.pos.x, this.pos.y, this.size);
		}
  }
}