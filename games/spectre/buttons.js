class Button {
    constructor(text, x0, y0, func, toggled) {
        this.text = text;
        this.x0 = x0;
        this.y0 = y0;
        this.func = func;
        this.toggled = toggled;
    }

    draw(){
        // Draw Button
        push();
        translate(this.x0,this.y0);
        rectMode(CENTER)
        
        textSize(30);
        let w = textWidth(this.text)*0.7;
        let h = 35;
        fill(50);
        stroke(30);
        strokeWeight(5);
        rect(0, 0, 2*w, 2*h)
        textAlign(CENTER, CENTER);

        let toggledState = (this.toggled) ? 255 : 100;
        fill(toggledState);
        text(this.text,0,0);

        pop();
        

        if (((this.x0 - w < mouseX) && (mouseX < this.x0 + w)) && ((this.y0 - h < mouseY) && (mouseY < this.y0 + h))) {
            cursor(HAND);
            if (clicked) {
                this.func()
            }
        }
    }
}

function mouseClicked(){
    clicked = true
}