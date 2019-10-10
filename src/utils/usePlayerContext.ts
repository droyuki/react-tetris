import { PlayerContext } from '../types';
import { STAGE_WIDTH } from './createStage';
import { TetrisConfig } from './constants';
import { randomTetris } from './stageUtil';
import { useState, useCallback } from 'react';

type Param = {
  x: number;
  y: number;
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

  return [playerContext, updatePosition, reset];
};
