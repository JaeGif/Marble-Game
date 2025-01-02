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


  gl_FragColor = vec4(1.0, 0.0, 0.61, deadSpace);
}

