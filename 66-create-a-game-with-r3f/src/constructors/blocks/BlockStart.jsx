import { useTexture, Float, Text } from '@react-three/drei';
import Player from '../../interactables/Player';

function BlockStart({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  textRotation = [0, -0.25, 0],
}) {
  const textures = useTexture({
    map: './textures/Poliigon_WoodVeneerOak_7760/1K/Poliigon_WoodVeneerOak_7760_BaseColor.jpg',
    roughnessMap:
      './textures/Poliigon_WoodVeneerOak_7760/1K/Poliigon_WoodVeneerOak_7760_ORM.jpg',
    metalnessMap:
      './textures/Poliigon_WoodVeneerOak_7760/1K/Poliigon_WoodVeneerOak_7760_ORM.jpg',
    aoMap:
      './textures/Poliigon_WoodVeneerOak_7760/1K/Poliigon_WoodVeneerOak_7760_ORM.jpg',
  });
  return (
    <group position={position} rotation={rotation}>
      <Player
        textures={textures}
        parentPosition={position}
        position={[0, 1.5, 0]}
      />

      {/*       <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font='./bebas-neue-v9-latin-regular.woff'
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign='right'
          position={[0.75, 0.65, 0]}
          rotation={textRotation}
        >
          Marble Run
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float> */}
    </group>
  );
}
export default BlockStart;
