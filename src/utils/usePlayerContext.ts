import { PlayerContext, Position, Stage } from '../types';
import { STAGE_WIDTH } from './createStage';
import { tetrisConfig } from './constants';
import { randomTetris } from './stageUtil';
import { useState, useCallback } from 'react';
import transpose from './transpose';

type Param = Position & { collided?: boolean };
type ReturnType = [
  PlayerContext,
  (p: Param) => void,
  () => void,
  (stage: Stage, dir: number) => void,
];

export const usePlayerContext = (): ReturnType => {
  const [playerContext, setPlayerContext] = useState<PlayerContext>({
    position: { x: 0, y: 0 },
    tetris: tetrisConfig[0].shape,
    collided: false,
  });

  const updatePosition = (p: Param): void => {
    const { x, y, collided } = p;
    setPlayerContext(
      (prev: PlayerContext): PlayerContext => ({
        ...prev,
        ...(collided !== undefined && { collided }),
        position: {
          x: prev.position.x + x,
          y: prev.position.y + y,
        },
      }),
    );
  };

  const reset = useCallback(() => {
    setPlayerContext({
      position: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetris: randomTetris().shape,
      collided: false,
    });
  }, []);

  const rotateTetris = (stage: Stage, direction: number): void => {
    //deep clone
    const clonedContext: PlayerContext = JSON.parse(
      JSON.stringify(playerContext),
    );
    clonedContext.tetris = transpose(clonedContext.tetris, direction);

    setPlayerContext(clonedContext);
  };

  return [playerContext, updatePosition, reset, rotateTetris];
};
