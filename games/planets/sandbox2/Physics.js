// https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology/Book%3A_Celestial_Mechanics_(Tatum)/09%3A_The_Two_Body_Problem_in_Two_Dimensions/9.08%3A_Orbital_Elements_and_Velocity_Vector

let mu = 10000;

function find_a(v,r){
	let r_mag = r.mag();
	let v_mag = v.mag();
	
	let a = r_mag * mu / (2*mu - r_mag*pow(v_mag,2));
	return a;
}

function find_e(v,r,a){
	let r_mag = v.mag();
	let v_mag = v.mag();
	let alpha = r.heading();
	let beta = v.heading();
	
	let e = pow(1 - pow(r_mag*v_mag*sin(beta-alpha),2)/(a), 0.5);
	return e;
}

function find_w(v,r,a,e){
	let r_mag = r.mag()
	let th = r.heading()
	let nu = acos((1/e)*((a/r_mag)*(1-e*e) - 1));
	return nu;
}

function find_ellipse(v,r){
	let a = find_a(v,r);
	let e = find_e(v,r,a);
	let nu = find_w(v,r,a,e);
	return {a,e,nu};
}

function ellipse_all(a,e,w){	
	fill(255);
	let N = 100;
	stroke(255);
	noFill();
	beginShape()
	for (let t=0; t<N; t++){
		let nu = t*2*PI/N - w
		let r = ellipse_polar(a,e,nu)
		vertex(r*cos(t),r*sin(t));
	}
	endShape(CLOSE);
	noStroke();
}

function ellipse_polar(a,e,nu){
	return a*(1-e*e)/(1+e*cos(nu));
}
