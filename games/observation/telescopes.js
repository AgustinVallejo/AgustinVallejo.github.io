let az = 0;
let h = 45;
let dec = 45;
let ra = 0;

let px = 0;
let py = 0;

let R = 40;

function all_telescopes(){
    strokeWeight(2)
    horizontalMount(0.3*width,0.85*height)
    equatorialMount(0.7*width,0.85*height)
}

function telescope(x=0,y=0){
    fill(200);
    rect(x+40,y+0,100,20)
}

function horizontalMount(x,y){
    stroke(255)
    push()
    translate(x, y)

    push()
    legs()
    if (!equatorialON){
        noStroke();
        fill(255,255,0,100)
        ellipse(0,1,3,1)
    }
    pop()

    rectMode(CENTER)

    fill(80);
    rect(0,0,30,5)
    rect(15,-10,5,30)
    rect(-15,-10,5,30)
    translate(0,-15)

    let angle = radians(-90)
    if (!equatorialON){
        angle = atan2(py-y,px-x)
    }
    rotate(angle);
    telescope()
    pop()
}

function equatorialMount(x,y){
    stroke(255)
    push()
    translate(x, y)

    push()
    legs()
    if (equatorialON){
        noStroke();
        fill(255,255,0,100)
        ellipse(0,1,3,1)
    }
    pop()

    rectMode(CENTER)

    fill(80);
    rect(0,0,30,5)
    
    push()
    rotate(radians(phi))
    rect(0,-20,20,50)
    pop()
    translate(30,-35)
    
    let angle = radians(-90)
    if (equatorialON){
        angle = atan2(py-y,px-x)
    }
    rotate(angle)
    translate(0, -10)
    rect(0,0,5,60)
    rect(0,-40,20,20)
    telescope(-20,30)
    pop()
}

function legs(){
    let s = 50
    scale(s);
    strokeWeight(5/s)
    line(0,0,-0.8,1)
    line(0,0,0,1.3)
    line(0,0,0.8,1)
}

function pointing(){
    if (key === "ArrowLeft") {
        if (!equatorialON){
            if (az>-90){
                az--
            }
        }
        else{
            ra++
        }
    } else if (key === "ArrowRight") {
        if (!equatorialON){
            if (az<90){
                az++
            }
        }
        else{
            ra--
        }
    }
    else if (key === "ArrowUp") {
        if (!equatorialON){
            if (h<90){
                h++
            }
        }
        else{
            if (dec<90){
                dec++
            }
        }
    } 
    else if (key === "ArrowDown") {
        if (!equatorialON){
            if (h>0){
                h--
            }
        }
        else{
            if (dec>0){
                dec--
            }
        }
    }
    noFill();
    strokeWeight(5)
    stroke(170,0,0);
    if (!equatorialON){
        px = map(az,-90,90,0+R,width-R,true)
        py = map(h,0,90,0.8*height-R,0+R,true)
    }
    else{
        let r = map(dec,0,90,height/2,0,true)
        px = r*cos(ra*0.01) + width/2
        py = r*sin(ra*0.01) + map(phi,0,90,0.8*height,0)
    }
    circle(px,py,2*R)
}

function keyReleased() {
    key = ""
  }
