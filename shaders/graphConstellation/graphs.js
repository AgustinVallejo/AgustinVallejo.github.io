let stars, t;

let canvas;

function setup() {
	canvas = createCanvas(windowWidth, 1.5*windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
	stars = new StarSystem( 700 );
	t = 0;
	
	strokeWeight( 2 );
}

function draw() {
	background( 255 );
	
	t++;
	stars.draw();
	stars.update();
}

class StarSystem {
	constructor( N ){
		this.N = N;
		this.drawLines = true;
		this.stars = [];
		for( let i = 0; i < N; i++ ){
			this.stars.push( new Star() );
		}
	}
	
	update(){
		this.stars.forEach( star => star.update() );
	}
	
	draw(){
		for( let i = 0; i < this.N; i++ ){
			if ( this.stars[ i ].r > 5 ) {
				this.connect( this.stars[i], createVector( mouseX, mouseY ) );
				for( let j = 0; j < this.N; j++ ){
					if ( i < j && this.stars[ j ].r > 5 ) {
						this.connect( this.stars[i], this.stars[j] );
					}
				}
			}
			noStroke();
			fill( 200 );
			this.stars[ i ].draw();
		}
	}
	
	connect( obj1, obj2 ){
		let x1 = obj1.x;
		let y1 = obj1.y;
		let x2 = obj2.x;
		let y2 = obj2.y;
		const r =  dist( x1, y1, x2, y2 );
		if ( r < 100 ) {
			const a = map( r, 100, 0, 0, 255);
			stroke( 200,a );
			line( x1, y1, x2, y2 );
		}
	}
}

class Star {
	constructor(){
		this.x0 = random( width );
		this.y0 = random( height );
		this.x = 0;
		this.y = 0;
		
		this.r = 15 * Math.pow( random( 1 ), 10 ) + 1;
		this.starSpeed = random(10) / 1000;
		this.amplitude = 2 * random(60,100);
		if ( random() > 0.5 ){
			this.amplitude *= -1;
		}
		
		this.update();
	}
	
	update(){
		this.x = this.x0 + this.amplitude*noise( this.starSpeed * t + this.x0 );
		this.y = this.y0 + this.amplitude*noise( this.starSpeed * t + this.y0 );
	}
	
	draw(){
		noStroke();
		circle( this.x, this.y, this.r );
	}
}