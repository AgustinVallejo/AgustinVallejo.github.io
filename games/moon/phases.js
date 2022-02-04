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
    let angle = set_angle();
    background(0);
    twinklingStars();
    sun();
    earth(t);
    stickman(t, angle);
    moon(angle);
    phases(angle);
    buttons()
    if (play) {
      t++;
    }
}

function phases(a) {
    // Based on the code of https://github.com/Pole11/moon-phases
    let bg_color = color(0,25,25,255);
    let light_color = color(255,255,255,255);

    noStroke();
    let phasex = width/2;
    let phasey = height/2 + radioT;
    let d2 = radioT;
    
    push();
    translate(phasex,phasey);
    rectMode(CENTER);
    stroke(150);
    strokeWeight(3);
    fill(0);
    rect(0,0.25*d2,1.5*d2,2*d2,10);
    noStroke();

    phaseText(a, d2);

    if (a < -PI) {
      a += 2*PI
    }

    if (a > 0) {
        a = map(a,0,PI,-PI,0);
    }
    else {
        a = map(a,0,-PI,-PI,0);
        rotate(PI)        
    }
  
    //stroke(255,0,255);
    line(phasex, 0, phasex, height);
  
    let color1 = color(0,25,25,0); //red
    let color2 = color(0,25,25,0); //gray
    let color3 = color(0,25,25,0); //blue
    let color4 = color(0,25,25,0); //green
  
    if (-PI/2 < a && a < 0) {
      color3 = light_color;
      color4 = light_color;
      color1 = light_color;
      color2 = bg_color;
    } else if (-PI < a && a < -PI/2) {
      color1 = light_color;
      color3 = bg_color;
      color4 = bg_color;
      color2 = bg_color;
    } else if (-3*PI/2 < a && a < -PI) {
      color4 = bg_color;
      color2 = light_color;
      color1 = bg_color;
      color3 = bg_color;
    } else if (-2*PI < a && a < -3*PI/2) {
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

    pop();
}

function phaseText(a, d2) {
  let phase = ""
  let threshold = 0.75
  if (cos(a) > threshold) {
    phase = "Nueva"  
  }
  else if (cos(a) < -threshold) {
    phase = "Llena"  
  }
  if (sin(a) > threshold) {
    phase = "Menguante"  
  }
  else if (sin(a) < -threshold) {
    phase = "Creciente"  
  }
  a = 4*a - 3.2*PI/4

  textFont('Roboto Slab');
  stroke(255*pow(1-cos(a),3));
  textAlign(CENTER);
  textSize(25)
  text("Luna\n"+phase,0,0.8*d2);
  noStroke();
}