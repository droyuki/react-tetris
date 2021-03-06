import Cell from './Cell';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { StyledStage } from './style/StyledStage';

interface Props {
  stage: Array<Array<Array<string | number>>>;
}

const StageContainer: React.FC<Props> = ({ stage }) => {
  return (
    <StyledStage
      className="stage-container"
      width={stage[0].length}
      height={stage.length}
    >
      {stage.map((row, i) =>
        row.map((cell, j) => <Cell key={`${i}_${j}`} type={cell[0]} />),
      )}
    </StyledStage>
  );
};

StageContainer.propTypes = {
  stage: PropTypes.array.isRequired,
};

export default memo(StageContainer);
