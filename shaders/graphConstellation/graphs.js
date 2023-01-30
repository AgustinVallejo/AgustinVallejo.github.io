let starsLeft, starsRight, t, id, yShift;

let canvas;

function setup() {
	canvas = createCanvas(windowWidth, 1.5*windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');

  // Set parent to #constellation
  canvas.parent('constellations');

	id = 0;
  yShift = 0;
	starsLeft  = new StarSystem( 350, 0.0, 0.2 );
	starsRight = new StarSystem( 350, 0.8, 1.0 );
	t = 0;
	strokeWeight( 2 );
}

function draw() {
	background( 255 );

  canvas.position(0, lerp( canvas.position().y, -min(window.scrollY, 100), 0.1));

  yShift = lerp( yShift, window.scrollY, 0.2 );
	
	t++;
	starsLeft.draw();
  starsRight.draw();
	starsLeft.update( yShift );
  starsRight.update( yShift );
}

class StarSystem {
	constructor( N, x0, x1 ){
		this.N = N;
		this.drawLines = true;
		this.stars = [];
		for( let i = 0; i < N; i++ ){
			this.stars.push( new Star( x0, x1 ) );
		}
	}
	
	update( yShift ){
		this.stars.forEach( star => {
      star.update( yShift );
    });
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
	constructor( x0, x1 ){
    // Returns a random horizontal number in one of the side margins
    this.randomX0 = () => { return random( x0 * width, x1 * width ) };
    this.randomR = () => { return 15 * Math.pow( random( 1 ), 5 ) + 2 };

    this.id = id;
    id++;
		this.x0 = this.randomX0();
		this.y0 = random( height );
		this.x = 0;
		this.y = 0;
		
		this.r = this.randomR();
		this.starSpeed = random(10) / 1000;
		this.amplitude = random(60,100);
		if ( random() > 0.5 ){
			this.amplitude *= -1;
		}
		
		this.update();
	}
	
	update( yShift ){
		this.x = this.x0 + this.amplitude*noise( this.starSpeed * t + 2*this.id );
		this.y = this.y0 + this.amplitude*noise( this.starSpeed * t + this.id ) - yShift;
  
    const yMin = height * 0.0;
    const yMax = height * 0.9;

      if ( this.y < yMin - 0.1 * height ){
        this.x0 = this.randomX0();
        this.y0 += height;
        this.r = this.randomR();
      }
      else if ( this.y > yMax +  0.1 * height ) {
        this.x0 = this.randomX0();
        this.y0 -= height;
        this.r = this.randomR();
      }
  }	

	draw(){
		noStroke();
		circle( this.x, this.y, this.r );
	}
}