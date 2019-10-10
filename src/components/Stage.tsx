import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import { StyledStage } from './style/StyledStage';

interface Props {
  stage: Array<Array<Array<string | number>>>;
}

const Stage: React.FC<Props> = ({ stage }) => {
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
      {stage.map((row, i) =>
        row.map((cell, j) => <Cell key={`${i}_${j}`} type={cell[0]} />),
      )}
    </StyledStage>
  );
};

Stage.propTypes = {
  stage: PropTypes.array.isRequired,
};

export default Stage;
