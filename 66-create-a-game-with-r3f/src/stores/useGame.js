import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
  subscribeWithSelector((set) => {
    return {
      obstacleCount: 8,
      jumps: 2,
      level: 1,
      mode: 'hardcore' | 'casual',
      lives: [true, true, true],
      score: 0,
      // ready | playing | complete
      phase: 'ready',
      startTime: 0,
      endTime: 0,
      adjustLives: (count) => {
        // count can be an integer + or -
        //   count simply references the value to add or remove from lives
        if (count === 0) return;
        if (count < 0) {
          // lose lives from current arr
          let x = count;
          while (x !== 0) {
            // when x is 0, we've terminated loop
            //            if ()
          }
        }
        if (count > 0) {
          // gain count num of lives added to current arr
        }
        set((state) => {
          return { lives: newLives };
        });
      },
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
