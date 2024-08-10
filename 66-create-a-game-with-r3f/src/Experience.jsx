import { OrbitControls, useTexture } from '@react-three/drei';
import Lights from './Lights.jsx';
import Level from './Level.jsx';
import { Physics } from '@react-three/rapier';
import Player from './Player.jsx';
import useGame from './stores/useGame.js';

export default function Experience() {
  const props = useTexture({
    map: './textures/Poliigon_WoodVeneerOak_7760/1K/Poliigon_WoodVeneerOak_7760_BaseColor.jpg',
    roughnessMap:
      './textures/Poliigon_WoodVeneerOak_7760/1K/Poliigon_WoodVeneerOak_7760_ORM.jpg',
    metalnessMap:
      './textures/Poliigon_WoodVeneerOak_7760/1K/Poliigon_WoodVeneerOak_7760_ORM.jpg',
    aoMap:
      './textures/Poliigon_WoodVeneerOak_7760/1K/Poliigon_WoodVeneerOak_7760_ORM.jpg',
  });

  const obstacleCount = useGame((state) => state.obstacleCount);
  return (
    <>
      <Physics>
        <Lights />
        <Level obstacleCount={obstacleCount} />
        <Player {...props} />
      </Physics>
    </>
  );
}
