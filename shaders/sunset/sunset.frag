#ifdef GL_ES
precision mediump float;
#endif

# define e 2.7183

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float wave (
    in vec2 st,
    in float w, // Width
    in float dt, // Timestep
    in float dy, // Vertical position
    in float f, // Wavelength
    in float A, // Amplitude
    in float phase){
    /**
    * Creates the wave form by multiplying smoothsteps
    */
    float singleWave = A; //*sin(f*(st.y + dt/100.+phase));
    return (smoothstep(singleWave+dy-w,singleWave+dy,st.x)*
     smoothstep(singleWave+dy+w,singleWave+dy,st.x));
}

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float colorDrop(vec2 st){
    return exp(-(st.y - 0.1)*5.);
}

float red(vec2 st){
    return colorDrop(0.1*st);
}

float green(vec2 st){
    return colorDrop(0.3*st);
}

float blue(vec2 st){
    return colorDrop(st);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.y = 1. - st.y;

    vec3 col = vec3(0.0);

    col.r += 1. - red(st);
    col.g += 1. - green(st);
    col.b += 1. - blue(st);

    vec2 bl = step(vec2(0.3, 0.),st);       // bottom-left
    vec2 tr = step(vec2(0.3, 0.),1.0-st);   // top-right
    col *= vec3(bl.x * bl.y * tr.x * tr.y);

    // Wave properties
    float A = 0.05; // Amplitude
    float w = 0.01; // Width
    float dt = -20.*u_time; // Timestep
    float dy = 0.2; // Vertical position

    float k = 0.008; // Phase difference
    float lambda = 30.; // Constant wavelength. If not, they get out of phase very quickly
    col.r += wave(st,w*3.,dt,dy,lambda,A,0.)*red(st);
    col.g += wave(st,w*3.,dt,dy,lambda,A,0.)*green(st);
    col.b += wave(st,w*3.,dt,dy,lambda,A,0.)*blue(st);

    gl_FragColor = vec4(col, 1.0);
}
