void main() {
  vec4 worldPosition = vec4(position, 1.0);
  vec4 mvPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = mvPosition;
}