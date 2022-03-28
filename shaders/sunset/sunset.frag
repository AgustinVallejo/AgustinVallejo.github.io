#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 u_scattering;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_pixelDensity;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

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

float dashedCircle(
    in vec2 st,
    in vec2 center,
    in float radius,
    in float width,
    in float segments){
    // Returns 1 or 0 for a dashed line circle
    float dth = 3.1415926/segments;

    vec2 r = st - center;

    if (abs(length(r) - radius) < width){
        if (mod(atan(r.y,r.x),2.*dth)<dth){
            return 1.;
        }
        else {
            return 0.;
        }
    }
    else {
        return 0.;
    }

}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution/u_pixelDensity;
    float X = u_resolution.x/u_resolution.y;
    st.x *= X;
    vec3 col = vec3(0.0);

    // CONSTANTS
    vec2 earthCenter = vec2(0.9*X,0.2);
    float earthRadius = 0.3;
    float atmosphereRadius = 0.5*X;
    float MAX_ANGLE = 90.*3.14/180.;
    vec3 groundColor = vec3(0.1,0.15,0.2);
    float sunOrbitRadius = 0.55*X;


    float mouseY = 1.;
    float angle = MAX_ANGLE;

    // MOUSE CONTROL
    if (u_mouse.x < 0.3){
        mouseY = clamp(u_mouse.y, 0.,1.);
        angle = map(mouseY, 0.,1., 0.,MAX_ANGLE);
    }
    else {
        vec2 dir = u_mouse - earthCenter;
        angle = atan(dir.y,-dir.x);
        angle = clamp(angle, 0.,MAX_ANGLE);
        mouseY = map(angle, 0.,MAX_ANGLE, 0.,1.);
    }

    // INTERNAL VIEW
    // Center around the left side of the screen
    vec2 point = st - vec2(0.15,0.9*mouseY+0.1);
    float d = length(point);
    col += exp(-d*40.); // Sun's disk
    col += 3.*(u_scattering)*exp(-d*.5)*pow(mouseY,0.6) +
        (1.-u_scattering)*exp(-d*60.*(mouseY+0.03)); // Sunset shader

    // Horizon
    col *= step(0.1,st.y);
    col += (1.-step(0.1,st.y))*groundColor;


    // EXTERNAL VIEW
    col *= (1. - step(0.3,st.x));
    point = st - earthCenter;
    //col += step(0.3,st.x)*pow(smoothstep(atmosphereRadius,earthRadius,length(point)),2.)
    //        *vec3(0.2,0.3,1.0);
    col += step(0.3,st.x)*(1.-step(earthRadius,length(point)))*groundColor;


    // The Sun
    vec2 sun = st - earthCenter + vec2(sunOrbitRadius*cos(angle), -sunOrbitRadius*sin(angle));
    col += smoothstep(0.05,0.009,length(sun));

    vec2 observer = earthCenter + vec2(0.,earthRadius + 0.02);
    point = st - observer;
    col += smoothstep(0.01,0.009,length(point));
    col += dashedCircle(st, earthCenter, atmosphereRadius, 0.001, 50.);

    gl_FragColor = vec4(col, 1.0);
}
