class Graph{
  constructor(y0,h){
    self.y0 = y0; // Relative vertical position
    self.h; // Relative height (and width)
  }

  display(){
    rectMode(CORNER);
    colorMode(RGB,255);
    stroke(150);
    fill(50);
    rect(0.8*width,self.y0*height,self.h*width,self.h*width);
    
    noFill();
    stroke(255);
    rect(0.8*width,self.y0*height,self.h*width,self.h*width);

  }
}