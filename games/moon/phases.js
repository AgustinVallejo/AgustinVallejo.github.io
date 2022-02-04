function setup() {
    var canvas = createCanvas(1000, 700);
    canvas.parent("game")
    initializeFields();
    background(0);
    createStars();

    // Cargo la Imagen de la Tierra desde Arriba
    IMG = loadImage("polar.png");
    smooth();

    radioT = 100;
}

function draw() {
    background(0);
    twinklingStars();
    alSol();
    let angle = followMouse();
    tierra(t);
    stickman(t, angle);
    phases(angle);
    // t++;
}

function phases(a) {
    // Based on the code of https://github.com/Pole11/moon-phases
    let bg_color = color(0,25,25,255);
    let light_color = color(255,255,255,255);

    noStroke();
    let phasex = width/2;
    let phasey = height/2 + radioT;
    let d2 = radioT;

    translate(phasex,phasey);
    rectMode(CENTER);
    stroke(150);
    strokeWeight(3);
    fill(0);
    rect(0,0,1.5*d2,1.5*d2,10);
    noStroke();

    if (a > 0) {
        a = map(a,0,Math.PI,-Math.PI,0);
    }
    else {
        a = map(a,0,-Math.PI,-Math.PI,0);
        rotate(Math.PI)        
    }
  
    //stroke(255,0,255);
    line(phasex, 0, phasex, height);
  
    let color1 = color(0,25,25,0); //red
    let color2 = color(0,25,25,0); //gray
    let color3 = color(0,25,25,0); //blue
    let color4 = color(0,25,25,0); //green
  
    if (-Math.PI/2 < a && a < 0) {
      color3 = light_color;
      color4 = light_color;
      color1 = light_color;
      color2 = bg_color;
    } else if (-Math.PI < a && a < -Math.PI/2) {
      color1 = light_color;
      color3 = bg_color;
      color4 = bg_color;
      color2 = bg_color;
    } else if (-3*Math.PI/2 < a && a < -Math.PI) {
      color4 = bg_color;
      color2 = light_color;
      color1 = bg_color;
      color3 = bg_color;
    } else if (-2*Math.PI < a && a < -3*Math.PI/2) {
      color4 = color(0,255,0,0);
      color3 = light_color;
      color1 = bg_color;
      color2 = light_color;
    }
    
    ellipseMode(CENTER);
    fill(color1);
    //let widthMoonPhase = map(Math.sin(a), -1, 1, -d2, d2);
    arc(0, 0, d2, d2, PI/2, 3 * PI/2);
    fill(color2);
    arc(0, 0, d2, d2, 3 * PI/2, PI/2);
  
    let heightPhase = d2;
    let widthPhase = map(Math.cos(a), 0, 1, 0, d2);
  
    fill(color3);
    arc(0, 0, widthPhase - 2, heightPhase + 1, PI/2, 3 * PI/2);
    fill(color4);
    arc(0, 0, widthPhase - 2, heightPhase + 1, 3 * PI/2, PI/2);
}