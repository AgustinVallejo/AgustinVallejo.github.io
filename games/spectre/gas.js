class GasTube{
    constructor(gasLines, x0, y0, w, h, color){
        this.color = color;
        this.gasLines = gasLines;
        this.x0 = x0;
        this.y0 = y0;
        this.w = w;
        this.h = h;
        this.lineStrength = 0;

        this.N = 100;        
        this.molecules = [];
        for (let i = 0; i < this.N; i++){
            this.molecules.push( new GasMolecule(w, h) )
        }

        this.t = 0;
    }

    draw(){
        push();
        translate(this.x0, this.y0);
        noFill();
        stroke(200);
        strokeWeight(8);
        rectMode(CENTER)
        rect(0, 0, this.w, this.h, 5);

        strokeWeight(2)
        colorMode(HSB)
        this.lineStrength = 0;
        this.molecules.forEach(molecule => {
            if ((abs(molecule.y) < 0.15*height) && (random() > 0.995)){
                if (whiteLight){
                    molecule.excited = true;
                    molecule.t0 = this.t;
                    molecule.color = color((1-random(this.gasLines))*255, 100, 255);
                }
                else if (colorLight){
                    this.gasLines.forEach(line => {
                        if (abs(mouseY/height - line) < 0.05){
                            molecule.excited = true;
                            molecule.t0 = this.t;
                            molecule.color = color((1-line)*255, 100, 255);
                        }
                    })
                }
            }
            molecule.draw(this.t);
            if (molecule.excited){
                this.lineStrength++
            }
        })
        pop();

        push()
        translate(0,-18)
        this.gasLines.forEach(line => {
            fill(this.color);
            noStroke();
            triangle(0.95*width,line*height,0.98*width,line*height-10,0.98*width,line*height+10)
        })
        pop()
        this.t++;
    }
}

class GasMolecule{
    constructor(w, h){
        this.excited = false;
        this.t0 = 0;
        this.color = color(255);

        this.w = w;
        this.h = h;
        this.x = (-1 + 2*noise(this.i))*this.w/2;
        this.y = (-1 + 2*noise(this.i))*this.h;
        this.i = random(10);
    }

    draw(t) {
        fill(0);
        noStroke();
        stroke(50);
        if (this.excited) {
            if (t - this.t0 < 300){
                fill(this.color);
            }
            else {
                this.excited = false;
                this.t0 = 0;
            }
        }
        circle(this.x, this.y, 10);

        this.x = (-1 + 2*noise(this.i + t*0.001))*this.w/2;
        this.y = (-1 + 2*noise(this.i + t*0.001 + 20))*this.h/2;
    }


}