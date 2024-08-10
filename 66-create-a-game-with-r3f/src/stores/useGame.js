import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
  subscribeWithSelector((set) => {
    return {
      obstacleCount: 3,
      // ready | playing | complete
      phase: 'ready',

      start: () => {
        set((state) => {
          if (state.phase === 'ready') {
            return { phase: 'playing' };
          }
          return {};
        });
      },
      restart: () => {
        set((state) => {
          if (state.phase === 'playing' || state.phase === 'complete') {
            return { phase: 'ready' };
          }
          return {};
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === 'playing') {
            return { phase: 'complete' };
          }
          return {};
        });
      },
    };
  })
);
