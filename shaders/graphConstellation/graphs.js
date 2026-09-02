let pointsLeft, pointsRight, t, id, yShift;
let mousePoint;

let canvas;

// Fewer points on phones: the link drawing is O(N^2) per frame.
function pointCount() {
	return viewportWidth() < 768 ? 120 : 350;
}

// clientWidth excludes the scrollbar (windowWidth does not, which used to
// push a horizontal scrollbar onto the page).
function viewportWidth() {
  return document.documentElement.clientWidth || windowWidth;
}
function viewportHeight() {
  return window.innerHeight || windowHeight;
}

// Pin the canvas to the viewport and let CSS stretch it, so a resize or a
// collapsing mobile URL bar can never leave a white band showing.
function fitCanvas() {
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('width', '100%');
  canvas.style('height', '100%');
  canvas.style('z-index', '-1');

  // cv.html / art.html / nodes.html give #constellations `position: fixed`,
  // which makes it its own stacking context: the canvas's z-index of -1 is
  // then trapped inside it and the backdrop paints over the navbar. Pushing
  // the wrapper itself behind fixes those pages (ignored on index.html,
  // where the wrapper is static).
  const wrapper = document.getElementById('constellations');
  if ( wrapper && getComputedStyle( wrapper ).position !== 'static' ) {
    wrapper.style.zIndex = '-1';
  }
}

function setup() {
	canvas = createCanvas( viewportWidth(), viewportHeight() );

  pixelDensity( min( 2, displayDensity() ) );

  // Set parent to #constellation
  canvas.parent('constellations');
  fitCanvas();

	id = 0;
  yShift = 0;
	pointsLeft  = new PointSystem( pointCount(), 0.0, 0.3 );
	pointsRight = new PointSystem( pointCount(), 0.8, 1.0 );
	mousePoint = new MousePoint();
	t = 0;
	strokeWeight( 2 );
}

function windowResized() {
  resizeCanvas( viewportWidth(), viewportHeight() );
  fitCanvas(); // resizeCanvas rewrites the inline width/height in px
	pointsLeft  = new PointSystem( pointCount(), 0.0, 0.3 );
	pointsRight = new PointSystem( pointCount(), 0.8, 1.0 );
  strokeWeight( 2 );
}

function draw() {
  yShift = lerp( yShift, window.scrollY, 0.2 );

  // Darken over a third of a screen as before, but never over more than the
  // page can actually scroll -- otherwise short pages (phones) never reach
  // black and the white text on top stays unreadable.
  const maxScroll = max( 1, document.documentElement.scrollHeight - window.innerHeight );
  const fadeSpan = min( viewportHeight() / 3, maxScroll * 0.6 );
	background( 255 * ( 1 - constrain( yShift / fadeSpan, 0, 1 ) ) );

	t++;
	pointsLeft.draw();
  pointsRight.draw();
	pointsLeft.update( yShift );
  pointsRight.update( yShift );
	mousePoint.update();
}

class PointSystem {
	constructor( N, x0, x1 ){
		this.N = N;
		this.drawLines = true;
		this.points = [];
		for( let i = 0; i < N; i++ ){
			this.points.push( new Point( x0, x1 ) );
		}
	}
	
	update( yShift ){
		this.points.forEach( star => {
      star.update( yShift );
    });
	}
	
	draw(){
		for( let i = 0; i < this.N; i++ ){
			if ( this.points[ i ].r > 5 ) {
				this.connect( mousePoint, this.points[i] );
				for( let j = 0; j < this.N; j++ ){
					if ( i < j && this.points[ j ].r > 5 ) {
						this.connect( this.points[i], this.points[j] );
					}
				}
			}
			noStroke();
			fill( 200 );
			if ( this.points[i].death > t ){
				fill( 150, 150, 200 );
			}
			this.points[ i ].draw();
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
			if ( obj1.death > t ){
				stroke( 150, 150, 200, a );
				obj2.death = t + obj2.lifetime;
			}
			line( x1, y1, x2, y2 );
		}
	}
}

class Point {
	constructor( x0, x1 ){
    // Returns a random horizontal number in one of the side margins
    this.randomX0 = () => { return random( x0 * width, x1 * width ) };
    this.randomR = () => { return 15 * Math.pow( random( 1 ), 5 ) + 2 };

    this.id = id;
    id++;
		this.x0 = this.randomX0();
		this.y0 = random( -0.1 * height, 1.1 * height ); // seed the whole live band
		this.x = 0;
		this.y = 0;
		
		this.r = this.randomR();
		this.starSpeed = random(10) / 1000;
		this.amplitude = random(60,100);
		if ( random() > 0.5 ){
			this.amplitude *= -1;
		}
		
		this.lifetime = 10;
		this.death = 0; // Will sometimes change to t+lifetime to activate the point

		this.update();
	}
	
	update( yShift ){
		this.x = this.x0 + this.amplitude*noise( this.starSpeed * t + 2*this.id );
		this.y = this.y0 + this.amplitude*noise( this.starSpeed * t + this.id ) - yShift;
  
    // Wrap by exactly the size of the live band, so a point leaving the top
    // re-enters just below the bottom. Wrapping by `height` while the band is
    // 1.2 * height used to drop points back in at 90% and leave the bottom
    // of the screen empty once the initial ones had drifted away.
    const yMin = -0.1 * height;
    const yMax =  1.1 * height;
    const ySpan = yMax - yMin;

      if ( this.y < yMin ){
        this.x0 = this.randomX0();
        this.y0 += ySpan;
        this.r = this.randomR();
      }
      else if ( this.y > yMax ) {
        this.x0 = this.randomX0();
        this.y0 -= ySpan;
        this.r = this.randomR();
      }

		// if ( random() < 0.0001 ) {
		// 	this.death = t + this.lifetime;
		// }
  }	

	draw(){
		noStroke();
		circle( this.x, this.y, this.r );
	}
}

class MousePoint {
	constructor(){
		this.x = -10000;
		this.y = -10000;
		this.r = 1;
		this.death = 0;
	}

	update(){
		// Touch devices report (0,0) until something is touched: park the
		// point off-screen instead of leaving a blob in the top-left corner.
		if ( mouseX === 0 && mouseY === 0 ) {
			this.x = -10000;
			this.y = -10000;
			return;
		}
		this.x = mouseX;
		this.y = mouseY;
		this.death = t + 10;
	}
}