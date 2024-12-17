precision highp float;

uniform float uTime;
varying vec3 vWorldPosition;
varying vec3 vNormal;

void main() {
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
