precision mediump float;

// declare a uniform vec2 variable. We use a vec2 because the mouse has both x and y
// p5 will send data to this variable
uniform vec2 mouse;
uniform vec2 u_resolution;
uniform float u_scale;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    float pct = pow(distance(st,mouse),1.0);

    gl_FragColor = vec4(vec3(pct), 1.0 );
}