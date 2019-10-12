import { tetrisConfig } from './constants';
import { Cell, PlayerContext, Position, Stage, Tetris } from '../types';

export const STAGE_HEIGHT = 20;
export const STAGE_WIDTH = 12;

export const EMPTY_ROW = new Array(STAGE_WIDTH).fill([0, 'clear']);

const checkExist = (key: string | number): boolean => key in tetrisConfig;

export const getTetris = (key: string | number): Tetris => {
  if (!checkExist(key)) {
    const err = 'Invalid Key';
    throw err;
  }
  return tetrisConfig[key];
};

export const randomTetris = (): Tetris => {
  const tetrisPool: Array<string> = ['I', 'T', 'S', 'Z', 'O', 'J', 'L'];
  const random: number = Math.floor(Math.random() * tetrisPool.length);
  return getTetris(tetrisPool[random]);
};

export const createStage = (): Stage =>
  Array.from(Array(STAGE_HEIGHT), () => EMPTY_ROW);

export const checkCollision = (
  pc: PlayerContext,
  stage: Stage,
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
