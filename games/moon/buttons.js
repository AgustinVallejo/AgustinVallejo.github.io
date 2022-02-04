function buttons() {
    fill(50);
    stroke(200);
    strokeWeight(2);
    strokeJoin(ROUND);

    let x0 = 0.01*width;
    let y0 = 0.01*height;

    let dx = x0;
    let w = 40; //px, width of the button

    play_button(x0,y0,w);
    mouse_button(x0 + w + dx, y0, w);

}

function play_button(x0,y0,w){
    // Draw Button
    push();
    translate(x0,y0);
    rect(0,0,w,w,5)
    scale(w);
    strokeWeight(2/w)
    if (play) {
        fill(255);
    }
    triangle(0.2,0.2,0.8,0.5,0.2,0.8)
    pop();

    if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
        cursor(HAND);
        if (mouseIsPressed) {
            play = true;
        }
    }
    else{
        cursor(ARROW);
    }
}

function mouse_button(x0,y0,w){
    // Draw Button
    push();
    translate(x0,y0);
    rect(0,0,w,w,5)
    scale(w);
    strokeWeight(2/w)
    if (!play) {
        fill(255)
    }
    beginShape();
    vertex(0.3, 0.2);
    vertex(0.3, 0.7);
    vertex(0.4, 0.6);
    vertex(0.55, 0.8);
    vertex(0.6, 0.78);
    vertex(0.5, 0.55);
    vertex(0.7, 0.55);
    vertex(0.3, 0.2);
    endShape(CLOSE);
    pop();

    if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
        cursor(HAND);
        if (mouseIsPressed) {
            play = false;
            t = 0;
        }
    }
}