import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
  subscribeWithSelector((set) => {
    return {
      obstacleCount: 8,
      jumps: 2,
      level: 1,
      mode: 'hardcore' | 'casual',
      lives: 3,
      score: 0,
      // ready | playing | complete
      phase: 'ready',
      startTime: 0,
      endTime: 0,
      start: () => {
        set((state) => {
          if (state.phase === 'ready') {
            return { phase: 'playing', startTime: Date.now() };
          }
          return {};
        });
      },
      restart: () => {
        set((state) => {
          if (state.phase === 'playing' || state.phase === 'complete') {
            return { phase: 'ready', obstacleSeed: Math.random() };
          }
          return {};
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === 'playing') {
            return {
              phase: 'complete',
              endTime: Date.now(),
              score:
                state.score +
                (1 / (state.startTime - state.endTime)) * state.level * 0.2,
            };
          }
          return {};
        });
      },
      next: () => {
        set((state) => {
          if (state.phase === 'complete') {
            return {
              phase: 'ready',
              obstacleSeed: Math.random(),
              level: state.level + 1,
            };
          }
          return {};
        });
      },
      gameOver: () => {
        set((state) => {
          if (state.phase === 'playing') {
            return { phase: 'gameOver', endTime: Date.now() };
          }
          return {};
        });
      },
      startOver: () => {
        set((state) => {
          if (state.phase === 'gameOver') {
            return { phase: 'ready', obstacleSeed: Math.random(), level: 1 };
          }
          return {};
        });
      },
    };
  })
);
