import Display from './Display';
import React, { useState } from 'react';
import Stage from './Stage';
import StartButton from './StartButton';
import createStage from '../utils/createStage';
import { StyledTetris } from './style/StyledTetris';
import { StyledWrapper } from './style/StyledWrapper';
import { usePlayerContext } from '../utils/usePlayerContext';
import { useStage } from '../utils/useStage';

const Tetris: React.FC = () => {
  // const [dropTime, setDropTime] = useState(null);
  const [gg] = useState(false);
  const [playerContext, updatePosition, reset] = usePlayerContext();
  const [stage, setStage] = useStage(playerContext, reset);

  console.log('!!!!Render');

  const start = (): void => {
    setStage(createStage());
    reset();
  };

  const moveTetris = (direction: number): void => {
    updatePosition({ x: direction, y: 0 });
  };
  const drop = (): void => {
    updatePosition({ x: 0, y: 1, collide: false });
  };
  const dropTetris = (): void => {
    drop();
  };

  const move = (e: React.KeyboardEvent<object>): void => {
    const { keyCode } = e;

    if (!gg) {
      if (keyCode === 37) {
        moveTetris(-1);
      } else if (keyCode === 39) {
        moveTetris(1);
      } else if (keyCode === 40) {
        dropTetris();
      }
    }
  };

  return (
    <StyledWrapper role="button" tabIndex={0} onKeyDown={(e): void => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gg ? (
            <Display gg />
          ) : (
            <>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </>
          )}
          <StartButton onClick={start} />
        </aside>
      </StyledTetris>
    </StyledWrapper>
  );
};

export default Tetris;
