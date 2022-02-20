function setup() {
    let canvas = createCanvas(1200,700);
    canvas.parent("game");
    initializeFields();
    createStars();
}

function draw() {
    background(20);
    twinklingStars();
    guide();
    mountains();
    foreground();
    pointing();
    all_telescopes();
    stickman();
    // atmosphere();
    // buttons();
    control_buttons();
    latitude_buttons();
    coordinates();
    if (play){
        H -= Wsky
        if (H<-PI){
            H+=2*PI
        }
    }

    t0++;
    clicked = false;
}