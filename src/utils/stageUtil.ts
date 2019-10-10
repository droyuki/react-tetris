import { TetrisConfig } from './constants';
import {
  Cell,
  PlayerContext,
  Position,
  StageType,
  TetrisInterface,
} from '../types';

const checkExist = (key: string | number): boolean => key in TetrisConfig;

export const getTetris = (key: string | number): TetrisInterface => {
  if (!checkExist(key)) {
    const err = 'Invalid Key';
    throw err;
  }
  return TetrisConfig[key];
};

export const randomTetris = (): TetrisInterface => {
  const tetris: Array<string> = ['I', 'T', 'S', 'Z', 'O', 'J', 'L'];
  const random: number = Math.floor(Math.random() * tetris.length);
  return getTetris(tetris[random]);
};

export const checkCollision = (
  pc: PlayerContext,
  stage: StageType,
  positionDiff: Position,
): boolean => {
  const { x: diffX, y: diffY } = positionDiff;

  // pc.tetris 表示目前在移動的這顆方塊
  return pc.tetris.some((row: Cell, y: number): boolean => {
    return row.some((cell: string | number, x: number): boolean => {
      // cell表示此方塊中的某格
      if (cell !== 0) {
        // y + pc.position.y + nextY = 此cell在移動後的位置
        const futureY = y + pc.position.y + diffY;
        const futureX = x + pc.position.x + diffX;
        const collided =
          !stage[futureY] ||
          !stage[futureY][futureX] ||
          stage[futureY][futureX][1] !== 'clear';

        return collided;
      } else {
        return false;
      }
    });
  });
};
