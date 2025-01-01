uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;


void main() {


  // moving the ribbons up
  vec2 ribbonUv = vUv;
  ribbonUv.x *= 1.0;
  ribbonUv.y *= 0.5;
  ribbonUv.x -= uTime * 0.6;
  // ribbonUv.y += uTime * 0.1;
  float deadSpace = texture(uTexture, ribbonUv).r;
  deadSpace = (1.0 - deadSpace);

 // deadSpace *= smoothstep(0.0, 0.1, ribbonUv.x);
 // deadSpace *= smoothstep(0.0, 0.1, 1.0 - ribbonUv.x);

//  deadSpace *= smoothstep(0.0, 0.3, ribbonUv.y);
//  deadSpace *= smoothstep(0.0, 0.7, 1.0 - ribbonUv.y);

  gl_FragColor = vec4(1.0, 1.0, 1.0, deadSpace);
}

