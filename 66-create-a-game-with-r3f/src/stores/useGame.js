import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
  subscribeWithSelector((set) => {
    return {
      obstacleCount: 10,
      obstacleSeed: 0,
      level: 1,
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
            return { phase: 'complete', endTime: Date.now() };
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
    };
  })
);
