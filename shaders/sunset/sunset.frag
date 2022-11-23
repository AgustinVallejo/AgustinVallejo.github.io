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

float line(
    in vec2 st,
    in vec2 p1,
    in vec2 p2,
    in float dY
    ){
    float m = (p1.y - p2.y)/(p1.x - p2.x);
    float b = p1.y - m*p1.x;
    float y = m*st.x + b;
    float x = (st.y - b)/m;
    float width = 0.004;
    float lineBoundaries = 1.
        * step( p1.x - width, st.x )
        * ( 1. - step( p2.x + width, st.x ))
        * step( min( p1.y, p2.y ) - width + dY, st.y )
        * ( 1. - step( max( p1.y, p2.y ) + width + dY, st.y ));
    float result = 0.;
    result += ( 1. - step(y + width + dY,st.y)) * step(y - width + dY,st.y) * lineBoundaries;
    result += ( 1. - step(x + width,st.x)) * step(x - width,st.x) * lineBoundaries;
    return result;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution/u_pixelDensity;
    float X = u_resolution.x/u_resolution.y;
    st.x *= X;
    vec3 col = vec3(0.0);

    // CONSTANTS
    vec2 earthCenter = vec2(0.9*X,0.1);
    float earthRadius = 0.4;
    float atmosphereRadius = 1.5*earthRadius;
    float MAX_ANGLE = 3.14/2.;
    vec3 groundColor = vec3(0.1,0.15,0.2);
    float sunOrbitRadius = 2.0 * earthRadius;
    float viewsBorder = 0.4;


    float mouseY = 1.;
    float angle = MAX_ANGLE;

    // MOUSE CONTROL
    if (u_mouse.x * X < viewsBorder){
        mouseY = clamp(u_mouse.y, 0.,1.);
        angle = map(mouseY, 0.,1., 0.,MAX_ANGLE);
    }
    else {
        vec2 dir = vec2( u_mouse.x*X - earthCenter.x, u_mouse.y - earthCenter.y );
        angle = atan(dir.y,-dir.x);
        angle = clamp(angle, 0.,MAX_ANGLE);
        mouseY = map(angle, 0.,MAX_ANGLE, 0.,1.);
    }

    // EXTERNAL VIEW
    // Atmosphere
    // col += pow(smoothstep(atmosphereRadius,earthRadius,length(st - earthCenter)),1.)
    //        *vec3(0.5,0.5,1.0)*0.7;
    // Earth
    col += (1.-step(earthRadius,length(st - earthCenter)))*groundColor;


    // The Sun
    vec2 sun = earthCenter + sunOrbitRadius * vec2(-cos(angle), sin(angle));
    col += smoothstep(0.05,0.009,length( st - sun));

    // Observer
    vec2 observer = earthCenter + vec2(0.,earthRadius + 0.055);
    col += smoothstep(0.01,0.009,length(st - observer));

    // Atmosphere border
    col += dashedCircle(st, earthCenter, atmosphereRadius, 0.001, 50.);

    // Line of Sight
    // Make a line between sun and observer
    float len = length( st - sun );
    col += line(st, sun, observer, 0.) * vec3( 0.2 );


    
    // INTERNAL VIEW
    // Center around the left side of the screen
    col *= step(viewsBorder,st.x);

    float layer = 1. - step(viewsBorder,st.x);

    vec2 point = st - vec2(viewsBorder / 2.,0.9*mouseY+0.1);
    float d = length(point);
    col += layer*exp(-d*40.); // Sun's disk
    col += layer*( 3.*(u_scattering)*exp(-d*.5)*pow(mouseY,0.6) +
        (1.-u_scattering)*exp(-d*60.*(mouseY+0.03)) ); // Sunset shader

    // Horizon
    col += layer*(1.-step(0.1,st.y))*groundColor;
    

    gl_FragColor = vec4(col, 1.0);
}
