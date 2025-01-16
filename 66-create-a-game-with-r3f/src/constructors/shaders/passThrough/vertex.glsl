precision highp float;

uniform float uTime;

varying vec3 vNormal;




void main() {

  vec3 pos = position;
  pos.z += sin(uTime + pos.y * 2.0) * 0.15; // Uniform movement
  // pos.x += sin(uTime + pos.y * 2.0) * 0.5; // Uniform movement
  pos.y += sin(uTime + pos.x * 3.0) * 0.1; // Uniform movement

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    // Pass normal and position for further use
  vNormal = normal;  

} 

