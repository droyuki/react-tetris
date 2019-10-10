import { StageType } from '../types';

export const STAGE_HEIGHT = 20;
export const STAGE_WIDTH = 12;

const createStage = (): StageType =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear']),
  );

export default createStage;
