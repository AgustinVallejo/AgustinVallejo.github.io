precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform bool u_whiteLight;

float wave (
    in vec2 st,
    in float w,
    in float dt,
    in float dy,
    in float f,
    in float A,
    in float phase){
    return (smoothstep(A*sin(f*(st.x + dt/100.+phase))+dy-w,A*sin(f*(st.x + dt/100.+phase))+dy,st.y)*
     smoothstep(A*sin(f*(st.x + dt/100.+phase))+dy+w,A*sin(f*(st.x + dt/100.+phase))+dy,st.y));
}

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 col = vec3(0.0);

    float lfrac = clamp(u_mouse.x,0.,0.8);
    vec3 waveColor = hsb2rgb(vec3(lfrac,1.0,1.0));

    float A = 0.05;
    float w = 0.01;
    float dt = -20.*u_time;
    float dy = 0.5;
    float lambda = map(lfrac, 0.,1., 30.,70.);

    if (u_whiteLight){
        float lightWidth = 0.1;
        col += smoothstep(0.5-lightWidth,0.5+lightWidth,st.y)*
                (1.-smoothstep(0.5-lightWidth,0.5+lightWidth,st.y));

        float ii = 0.;
        for(int i=0; i < 5;i++){
            ii++;
            lambda = 30.; //map(ii, 0., 4., 30.,33.);
            waveColor = hsb2rgb(vec3(ii/5.,1.0,1.0));
            col += wave(st,w*3.,dt,dy,lambda,A,0.01*ii)*waveColor;
        }
    }
    else {
        col += wave(st,w,dt,dy,lambda,A,0.)*waveColor;
    }

    col *= (1.0 - step(0.8,st.x));
    col += step(0.8,st.x)*0.1;

    col *= (1.-step(0.83,st.x)*(1.-step(0.95,st.x)));
    float ycolor = map(st.y,0.,1., 0.,0.8);
    float colorWidth = 0.1;

    if (u_whiteLight){
        col += 100.*step(0.83,st.x)*(1.-step(0.95,st.x))*hsb2rgb(vec3(ycolor,1.0,0.01));
    }
    else {
        col += 1000.*step(0.83,st.x)*(1.-step(0.95,st.x))*hsb2rgb(vec3(ycolor,1.0,0.01))*
            smoothstep(u_mouse.x, u_mouse.x+colorWidth, st.y)*
            (1.-smoothstep(u_mouse.x, u_mouse.x+colorWidth, st.y));
    }


    gl_FragColor = vec4(col,0.0);
}