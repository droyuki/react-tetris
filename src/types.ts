export type Shape = Array<Array<string | number>>;
export type StageType = Array<Shape>;

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
