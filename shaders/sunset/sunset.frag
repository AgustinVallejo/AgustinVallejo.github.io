#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec3 u_scattering;

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

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 col = vec3(0.0);

    vec2 point = st - vec2(0.5,u_mouse.y);
    float d = length(point);
    float mouseY = clamp(u_mouse.y - 0.1, 0.,1.);

    col += exp(-d*40.);

    col += 3.*(u_scattering)*exp(-d*.5)*pow(mouseY,0.6) + (1.-u_scattering)*exp(-d*60.*(mouseY+0.03));

    col *= step(0.1,st.y);

    gl_FragColor = vec4(col, 1.0);
}
