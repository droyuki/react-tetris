import PropTypes from 'prop-types';
import React from 'react';
import { StyledCell } from './style/StyledCell';
import { getTetris } from '../utils/tetris';

interface Props {
  key: string;
  type: string | number;
}

const Cell: React.FC<Props> = ({ type }): any => {
  return <StyledCell type={'L'} color={getTetris('L').color} />;
};

Cell.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Cell;
