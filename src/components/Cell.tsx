import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
import { StyledCell } from './style/StyledCell';
import { getTetris } from '../utils/stageUtil';

interface Props {
  key: string;
  type: string | number;
}

const Cell: React.FC<Props> = ({ type }): ReactElement => {
  return <StyledCell type={type} color={getTetris(type).color} />;
};

Cell.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Cell;
