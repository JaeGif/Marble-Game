uniform float uTime;

varying vec2 vUv;
float random2D(vec2 value)
{
    return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  // just put the Uvs in the bag bro  
  vec4 worldPosition = vec4(position, 1.0);
  vec4 mvPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  gl_Position = mvPosition;

  vUv = uv;


}
