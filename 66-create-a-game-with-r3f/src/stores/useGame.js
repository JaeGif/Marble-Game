import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import adjustLivesArray from '../functions/calculateLives';

export default create(
  subscribeWithSelector((set) => {
    return {
      obstacleCount: 8,
      jumps: 2,
      level: 1,
      mode: 'hardcore' | 'casual',
      lives: [true],
      score: 0,
      maxLives: 3,
      globalPlayerHandle: null,
      // ready | playing | complete | gameOver
      phase: 'ready',
      startTime: 0,
      endTime: 0,
      setGlobalPlayerHandle: (handle) => {
        set((state) => {
          return { globalPlayerHandle: handle };
        });
      },
      adjustLives: (count) => {
        set((state) => {
          return {
            lives: adjustLivesArray(state.lives, count, state.maxLives),
          };
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
            state.adjustLives(-1);
            // game over when the last hp is lost
            if (!state.lives[1] && state.lives[0]) state.gameOver();
            else return { phase: 'ready', obstacleSeed: Math.random() };
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
              score: Math.round(
                state.score +
                  (1 / (state.startTime - state.endTime)) * state.level * 0.2
              ),
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
          console.log(state);
          if (state.phase === 'playing') {
            console.log('gameover triggered');
            return { phase: 'gameOver' };
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
