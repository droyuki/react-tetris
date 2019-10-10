import { PlayerContext, Position, StageType } from '../types';
import { STAGE_WIDTH } from './createStage';
import { TetrisConfig } from './constants';
import { randomTetris } from './stageUtil';
import { useState, useCallback } from 'react';
import transpose from './transpose';

type Param = Position & {
  collided: boolean;
};

export const usePlayerContext: Function = (): Array<
  PlayerContext | Function
> => {
  const [playerContext, setPlayerContext] = useState({
    position: { x: 0, y: 0 },
    tetris: TetrisConfig[0].shape,
    collided: false,
  });

  const updatePosition = (p: Param): void => {
    const { x, y, collided } = p;
    setPlayerContext(prev => ({
      ...prev,
      collided,
      position: {
        x: prev.position.x + x,
        y: prev.position.y + y,
      },
    }));
  };

  const reset = useCallback(() => {
    setPlayerContext({
      position: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetris: randomTetris().shape,
      collided: false,
    });
  }, []);

  const rotateTetris = (stage: StageType, direction: number): void => {
    //deep clone
    const clonedContext = JSON.parse(JSON.stringify(playerContext));
    clonedContext.tetris = transpose(clonedContext.tetris, direction);

    setPlayerContext(clonedContext);
  };

  return [playerContext, updatePosition, reset, rotateTetris];
};
