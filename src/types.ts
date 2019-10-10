export type Cell = Array<string | number>;
export type Shape = Array<Cell>;
export type StageType = Array<Shape>;
export type Position = {
  x: number;
  y: number;
};

export interface TetrisInterface {
  shape: Shape;
  color: string;
}

export interface TetrisConfigInterface {
  [key: string]: TetrisInterface;
}

export interface PositionInterface {
  x: number;
  y: number;
}

export interface PlayerContext {
  position: PositionInterface;
  tetris: Shape;
  collided: boolean;
}
