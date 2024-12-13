import React from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from '../Experience.jsx';
import { KeyboardControls } from '@react-three/drei';
import Interface from '../Interface.jsx';

function Game({ renderHome }) {
  return (
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
        { name: 'enter', keys: ['Enter'] },
      ]}
    >
      <Canvas shadows>
        <Experience />
      </Canvas>
      <Interface renderHome={renderHome} />
    </KeyboardControls>
  );
}

export default Game;
