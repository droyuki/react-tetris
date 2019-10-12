import { createStage, EMPTY_ROW } from './stageUtil';
import { Stage, PlayerContext, Cell, Shape } from '../types';
import { useState, useEffect } from 'react';

export const useStage: Function = (
  pc: PlayerContext,
  reset: Function,
): [Stage, Function, number] => {
  const [stage, setStage] = useState<Stage>(createStage());
  const [clearedRows, setClearedRows] = useState<number>(0);

  useEffect((): void => {
    setClearedRows(0);

    const swipeRows = (stage: Stage): Stage =>
      stage.reduce((counter: Stage, row: Shape): Stage => {
        const isFullRow = row.every((cell: Cell) => cell[0] !== 0);

        if (isFullRow) {
          setClearedRows(prev => prev + 1);

          counter.unshift(EMPTY_ROW);
          return counter;
        }
        // return counter + d;
        counter.push(row);

        return counter;
      }, []);

    const updateStage = (prev: Stage): Stage => {
      const newStage = prev.map((row: Shape) =>
        row.map((cell: Cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
      );

      //render tetris cell
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

      // 碰到東西
      if (pc.collided) {
        reset();
        return swipeRows(newStage);
      }

      return newStage;
    };

    setStage((prev: Stage): Stage => updateStage(prev));
  }, [pc, reset]);

  return [stage, setStage, clearedRows];
};
