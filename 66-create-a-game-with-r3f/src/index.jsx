import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import { KeyboardControls } from '@react-three/drei';
import Interface from './Interface.jsx';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <KeyboardControls
    map={[
      { name: 'forward', keys: ['KeyW'] },
      { name: 'backward', keys: ['KeyS'] },
      { name: 'leftward', keys: ['KeyA'] },
      { name: 'rightward', keys: ['KeyD'] },
      { name: 'cameraLeft', keys: ['ArrowLeft'] },
      { name: 'cameraRight', keys: ['ArrowRight'] },
      { name: 'cameraUp', keys: ['ArrowUp'] },
      { name: 'cameraDown', keys: ['ArrowDown'] },
      { name: 'cameraCenter', keys: ['Shift'] },
      { name: 'jump', keys: ['Space'] },
    ]}
  >
    <Canvas shadows>
      <Experience />
    </Canvas>
    <Interface />
  </KeyboardControls>
);
