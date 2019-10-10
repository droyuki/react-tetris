export type Cell = Array<string | number>;
export type Shape = Array<Cell>;
export type Stage = Array<Shape>;
export interface Position {
  x: number;
  y: number;
}

export interface Tetris {
  shape: Shape;
  color: string;
}

export interface TetrisConfig {
  [key: string]: Tetris;
}

export interface PlayerContext {
  position: Position;
  tetris: Shape;
  collided: boolean;
}
