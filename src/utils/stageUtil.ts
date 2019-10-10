import { TetrisConfig } from './constants';
import { TetrisInterface } from '../types';

const checkExist = (key: string | number): boolean => key in TetrisConfig;

export const getTetris = (key: string | number): TetrisInterface => {
  if (!checkExist(key)) {
    const err = 'Invalid Key';
    throw err;
  }
  return TetrisConfig[key];
};

export const randomTetris = () => {
  const tetris: Array<string> = ['I', 'T', 'S', 'Z', 'O', 'J', 'L'];
  const random: number = Math.floor(Math.random() * tetris.length);
  return getTetris(tetris[random]);
};
