import { OrbitControls, useTexture } from '@react-three/drei';
import Lights from './Lights.jsx';
import Level from './Level.jsx';
import { Physics } from '@react-three/rapier';
import useGame from './stores/useGame.js';

export default function Experience() {
  const level = useGame((state) => state.level);

  return (
    <>
      <color args={['#bdedfc']} attach='background' />
      <Physics>
        <Lights />
        <Level level={level} />
      </Physics>
    </>
  );
}
