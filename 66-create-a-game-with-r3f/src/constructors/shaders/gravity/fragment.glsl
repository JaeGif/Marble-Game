precision highp float;

uniform sampler2D uSceneTexture; // The rendered scene as a texture
uniform vec2 uResolution;       // Screen resolution
uniform float uRefractiveIndex; // Refraction strength (e.g., 1.1 for glass-like)
uniform float uTime;

varying vec3 vWorldPosition;
varying vec3 vNormal;

void main() {
  // View direction
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);

  // Refraction based on view direction and normal
  vec3 refractedDir = refract(viewDir, normalize(vNormal), uRefractiveIndex);

  // Project refracted direction into screen space
  vec2 screenUV = (refractedDir.xy * 0.5 + 0.5);
  // screenUV = clamp(screenUV, 0.0, 1.0); // Clamp to valid UVs
  // Sample the scene texture
  float strength = 0.25 * uRefractiveIndex;

  vec3 color = texture2D(uSceneTexture, screenUV).rgb * strength;

  gl_FragColor = vec4(color, 0.75);
}
