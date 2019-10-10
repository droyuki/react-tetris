import { Cell } from '../types';
type TwoDArray = Array<Cell>;

const transpose = (matrix: TwoDArray, direction: number): TwoDArray => {
  const rotated = matrix.map((_, i: number): Cell => matrix.map(col => col[i]));

  if (direction > 0) {
    //clockwise
    return rotated.map((row: Cell): Cell => row.reverse());
  }
  return rotated.reverse();
};

export default transpose;
