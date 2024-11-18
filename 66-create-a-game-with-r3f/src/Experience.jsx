import Level from './Level.jsx';
import { Physics } from '@react-three/rapier';
import useGame from './stores/useGame.js';

export default function Experience() {
  const level = useGame((state) => state.level);

  return (
    <>
      <Physics>
        <Level level={level} />
      </Physics>
    </>
  );
}

/*  */
