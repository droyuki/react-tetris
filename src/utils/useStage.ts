import createStage from './createStage';
import { StageType, PlayerContext } from '../types';
import { useState, useEffect } from 'react';

export const useStage: Function = (
  pc: PlayerContext,
  // reset: Function,
): Array<Function | StageType> => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    const updateStage = (prev: StageType): StageType => {
      const newStage = prev.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
      );

      //render  tetris cell
      pc.tetris.forEach((row: Array<number | string>, y: number) => {
        row.forEach((cell: number | string, x: number) => {
          if (cell !== 0) {
            //occupied
            newStage[y + pc.position.y][x + pc.position.x] = [
              cell,
              `${pc.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [pc]);

  return [stage, setStage];
};
