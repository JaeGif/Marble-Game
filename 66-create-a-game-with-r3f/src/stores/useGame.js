import { create } from 'zustand';

export default create((set) => {
  return {
    obstacleCount: 3,
    // ready | playing | complete
    phase: 'ready',

    start: () => {
      set(() => {
        return { phase: 'playing' };
      });
    },
    restart: () => {
      set(() => {
        return { phase: 'ready' };
      });
    },
    end: () => {
      set(() => {
        return { phase: 'complete' };
      });
    },
  };
});
