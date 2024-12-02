import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import adjustLivesArray from '../functions/calculateLives';
import calculateScore from '../functions/calculateScore';

export default create(
  subscribeWithSelector((set) => {
    return {
      obstacleCount: 8,
      movementMode: 'normal', // normal | original
      jumps: 1,
      level: 27,
      mode: 'casual',
      lives: [true, true, true],
      score: 0,
      maxLives: 3,
      globalPlayerHandle: null,
      speedBlockMultiplier: 1.25,
      gravityDirection: 1,
      enablePlayerControls: true,
      // ready | playing | complete | gameOver
      phase: 'ready',
      startTime: 0,
      endTime: 0,
      setEnablePlayerControls: (bool) => {
        set((state) => {
          return { enablePlayerControls: bool };
        });
      },
      setGravityDirection: (direction) => {
        set((state) => {
          return { gravityDirection: direction };
        });
      },
      setMovementMode: (mode) => {
        set((state) => {
          return { movementMode: mode };
        });
      },
      setGlobalPlayerHandle: (handle) => {
        set((state) => {
          return { globalPlayerHandle: handle };
        });
      },
      adjustScore: (value) => {
        set((state) => {
          const newScore = state.score + value;

          return {
            score: newScore >= 0 ? newScore : 0,
          };
        });
      },
      adjustLives: (count) => {
        set((state) => {
          if (state.mode === 'casual') return {};
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
            state.adjustScore(-1500);

            // game over when the last hp is lost
            if (!state.lives[1] && state.lives[0]) state.gameOver();
            else return { phase: 'ready', gravityDirection: 1 };
          }
          return {};
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === 'playing') {
            const endTime = Date.now();
            return {
              phase: 'complete',
              endTime: endTime,
              score:
                state.score +
                calculateScore(state.startTime, endTime, state.level),
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
              level: state.level + 1,
            };
          }
          return {};
        });
      },
      gameOver: () => {
        set((state) => {
          if (state.phase === 'playing') {
            return { phase: 'gameOver' };
          }
          return {};
        });
      },
      startOver: () => {
        set((state) => {
          if (state.phase === 'gameOver') {
            return {
              phase: 'ready',
              level: 1,
              lives: state.mode === 'hardcore' ? [true] : [true, true, true],
            };
          }
          return {};
        });
      },
    };
  })
);
