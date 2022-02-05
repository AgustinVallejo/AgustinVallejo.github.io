// Planet class
class Planet {
	constructor() {
		this.pos = pos0;
		this.r = pos0.sub(middle)
		this.speed = mouse.sub(pos0);
		this.speed.mult(0.01);
		this.color = plColor;
		this.size = plSize;
		this.alive = true;

		let {a,e,nu} = find_ellipse(this.speed.mult(kV),this.r.mult(kR));
		this.a = a
		this.e = e
		this.t = this.r.heading()
		this.w = this.t - nu

		console.log(a,e,nu)
	}

  move() {
		if (this.alive){
			let nu = this.t - this.w
			let r = ellipse_polar(this.a,this.e,nu)
			this.pos = createVector(r*cos(this.t),r*sin(this.t))
			this.t += 0.05
			}
		}

  display() {
		if (this.alive){
			push();
			translate(width/2,height/2);
			ellipse_all(this.a,this.e,this.w);
			fill(this.color);
			circle(this.pos.x, this.pos.y, this.size);
			pop();
		}
		
  }
}