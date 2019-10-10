type TwoDArray = Array<Array<string | number>>;

const transpose = (matrix: TwoDArray, direction: number): TwoDArray => {
  const rotated = matrix.map((_, i: number) => matrix.map(col => col[i]));

  if (direction > 0) {
    //clockwise
    return rotated.map(row => row.reverse());
  }
  return rotated.reverse();
};

export default transpose;
