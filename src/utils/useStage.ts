import { createStage } from './stageUtil';
import { Stage, PlayerContext, Cell, Shape } from '../types';
import { useState, useEffect } from 'react';

export const useStage: Function = (
  pc: PlayerContext,
  reset: Function,
): [Stage, Function] => {
  const [stage, setStage] = useState<Stage>(createStage());

  useEffect((): void => {
    const updateStage = (prev: Stage): Stage => {
      const newStage = prev.map((row: Shape) =>
        row.map((cell: Cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
      );

      //render  tetris cell
      pc.tetris.forEach((row: Array<number | string>, y: number): void => {
        row.forEach((cell: number | string, x: number): void => {
          if (cell !== 0) {
            //occupied
            newStage[y + pc.position.y][x + pc.position.x] = [
              cell,
              `${pc.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      //check collision
      if (pc.collided) {
        reset();
      }

      return newStage;
    };

    setStage((prev: Stage): Stage => updateStage(prev));
  }, [pc, reset]);

  return [stage, setStage];
};
