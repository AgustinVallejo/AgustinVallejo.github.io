class Graph{
  constructor(y0,h,TITLE="",XLABEL="",YLABEL=""){
    this.y0 = y0*height; // Relative vertical position
    this.h = h*height; // Relative height (and width)
    this.title = TITLE;
    this.xlabel = XLABEL;
    this.ylabel = YLABEL;
  }

  display(){
    rectMode(CENTER);
    push()
    translate(width - 0.6*this.h,this.y0);
    // colorMode(RGB,255);
    strokeWeight(3);
    stroke(0.15);
    fill(0.1);
    rect(0,0,this.h,this.h,50);
    
    noFill();
    stroke(1.0);
    let k = 0.7;
    rect(0,0,this.h*k,this.h*k);

    textAlign(CENTER, CENTER)
    fill(1.0)
    noStroke();
    textSize(25)
    text(this.title,0,-0.6*this.h*k)
    textSize(17)
    text(this.xlabel,0,0.6*this.h*k)

    push()
    rotate(-PI/2)
    text(this.ylabel,0,-0.6*this.h*k)
    pop()
    
    k *= 0.4;
    stars.stars.forEach(star => {
      fill(star.col);
      let HR_COLOR = map(blue(star.col)-red(star.col), -1,1, this.h*k,-this.h*k, true) + 100*noise(star.id)/star.r;
      let HR_R = map(log(star.r), log(100),log(3), -this.h*k,this.h*k, true) +  100*noise(star.id*2)/star.r;
      circle(HR_COLOR, HR_R, star.r);      
    });
    pop()
  }
}