let N = 200; //Cantidad de puntos en la linea
let xpos;
let col;

let p1 = 0.2; //Fracción del width donde empieza el visible
let p2 = p1*7.5/3.8; //Fracción del width donde termina el visible
let lfin = 0.38/p1; //Longitud de onda donde termina el gráfico en micrómetros
let dp = p2 - p1; //Ancho del espectro visible
let Temp; //Temperatura inicial
let L;

let frame = 0;

function setup() {
  Temp = 5700;
  L = 1000*2898/Temp;
  let canvas = createCanvas(1000, 500);
  canvas.parent("game")
  background(0);
  colorMode(HSB, 1.5*N, N, N); //Esto es para hacer el arcoíris
  noStroke();
  rainbow();
  star();
  go();

  draw_text()

  //delay(3000);
}

function draw_text(){
    fill(255);
    textSize(20);
    stroke(1);
    text("T=" + int(Temp) + " K", width - 150, 0.3*height-15); //Pone la Temperatura en Pantalla
    text("  =" + int(Temp-273) + "°C", width - 150, 0.3*height+10); //Pone la Temperatura en Pantalla
    text("λ=" + int(L) + " nm", width - 150, 0.3*height+50); //Pone la Longitud de onda Mäxima en Pantalla
}

function draw() {
  Temp = map(mouseX,0,width,20000,300)
  background(0);
  rainbow();
  star();
  go();
  draw_text()
  //Temp += 10;
  L = 1000*2898/Temp;

  if ((Temp > 2e4)||(Temp<0)) {
    setup(); //Reinicia cuando llega a 20 000K
  }
}

function rainbow() { //Dibuja el espectro visible
  colorMode(HSB, 1.5*N, N, N);
  for (let i = 0; i < N; i++) {
    col = color(N-i, N, 0.3*N);
    xpos = map(i, 0, N, p1*width, p2*width);
    noStroke();
    fill(col);
    rect(xpos, 0, dp*width/N, height);
  }
}

function star() {
  let thold = 80;
  colorMode(RGB, thold, thold, thold, 2e4);
  let c1 = I(Temp, (p1*width)); //AZUL
  let c2 = I(Temp, ((p1+dp/2)*width)); //VERDE
  let c3 = I(Temp, (p2*width)); //ROJO
  let mx = max(c1, c2, c3);
  c1 = 100*c1/mx;
  c2 = 100*c2/mx;
  c3 = 100*c3/mx;
  col = color(c3, c2, c1, Temp);
  fill(col);
  noStroke();

  let radius = 0.5*height;

  ellipse(0.7*width, 0.3*height, radius, radius);
  ellipse(0.7*width, 0.3*height, 0.9*radius, 0.9*radius);
  ellipse(0.7*width, 0.3*height, 0.8*radius, 0.8*radius);
  
  let size = 40;
  let T = pow(Temp+3840,1);
  
  fill(c3,0,0,T);
  ellipse(0.7*width-(1)*size,0.7*height, size, size);
  fill(0,c2,0,T);
  ellipse(0.7*width-(0)*size,0.7*height, size, size);
  fill(0,0,c1,T);
  ellipse(0.7*width+(1)*size,0.7*height, size, size);
}

function go() { //Dibuja la función de Planck  
  colorMode(HSB, 1.5*N, N, N);
  let xini = 0;
  let yini = height;

  for (let i = 1; i < N; i++) {

    xpos = map(i, 0, N, 0, width);
    let y = I(Temp, xpos);
    let ypos = map(y, 0, 1, height, 0);

    //fill(N);
    //ellipse(xpos,ypos,5,5);

    fill(255);
    stroke(N);
    strokeWeight(3);
    line(xini, yini, xpos, ypos);

    xini = xpos;
    yini = ypos;
  }
}

function planck(T_, lm_) {
  let c = 3e14;
  let h = 6.626e-22;
  let k = 1.38e-11;
  let uno = 2*h*c;
  let dos = pow(lm_, 3);
  let tres = exp((h*c)/(k*T_*lm_))-1;

  return 1e6*uno/(dos*tres);
}

function I(T_, pix_) {
  let T = T_ + 3840;
  let lambda = map(pix_, 0, width, 0, lfin);
  let inn = planck(T, lambda);

  return inn;
}