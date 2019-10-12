import { PlayerContext, Position, Stage } from '../types';
import { tetrisConfig } from './constants';
import { randomTetris, checkCollision, STAGE_WIDTH } from './stageUtil';
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

    let offset = 1;

    // 有碰撞就往左右移動，直到無法移動
    while (checkCollision(clonedContext, stage, { x: 0, y: 0 })) {
      // +1, -1 ,+2, -2, ...
      // offset 超過方塊的 N x N area表示無法旋轉，回傳原本的context
      clonedContext.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > clonedContext.tetris[0].length) {
        transpose(clonedContext.tetris, -direction);
        clonedContext.position.x = playerContext.position.x;
        return;
      }
    }

    setPlayerContext(clonedContext);
  };

  return [playerContext, updatePosition, reset, rotateTetris];
};
