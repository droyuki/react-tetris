import { Stage } from '../types';

export const STAGE_HEIGHT = 20;
export const STAGE_WIDTH = 12;

const createStage = (): Stage =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear']),
  );

export default createStage;
