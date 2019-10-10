import Display from './Display';
import React from 'react';
import Stage from './Stage';
import StartButton from './StartButton';
import createStage from '../utils/createStage';
import { StyledTetris } from './style/StyledTetris';
import { StyledWrapper } from './style/StyledWrapper';

const Tetris: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledTetris>
        <Stage stage={createStage()} />
        <aside>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Level" />
          <StartButton cb={() => {}} />
        </aside>
      </StyledTetris>
    </StyledWrapper>
  );
};

export default Tetris;
