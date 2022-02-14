function setup() {
    var canvas = createCanvas(1000, 700);
    canvas.parent("game")
    initializeFields();
    background(0);
    createStars();

    // Cargo la Imagen de la Tierra desde Arriba
    IMG = loadImage("polar.png");
    smooth();

    Rearth = 100;
}

function draw() {
    let angle = set_angle();
    background(20);
    twinklingStars();
    sun();

    if (tidesON){
      tides(500, angle);
    }

    if (shadowsON){
      if (scenario == 0) {
          earth(t);
          stickman(t, angle);
          earth_shadow();
          moon(angle);
          moon_shadow();
      }
      
      else if (scenario == 1) {
          moon(angle);
          moon_shadow();
          earth(t);
          stickman(t, angle);
          earth_shadow();
      }

      else if (scenario == 2) {
          earth(t);
          moon(angle);
          stickman(t, angle);
          moon_shadow();
          earth_shadow();
      }
    }
    else{
      earth(t);
      moon(angle);
      stickman(t, angle);
    }

    if (phasesON){
      phases(angle);
    }

    change();

    control_buttons();
    sims_buttons();
    if (play) {
        t++;
    }
}