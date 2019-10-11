import Display from './Display';
import React, { useState, ReactElement } from 'react';
import StageContainer from './StageContainer';
import StartButton from './StartButton';
import createStage from '../utils/createStage';
import { Position, Stage } from '../types';
import { StyledTetris } from './style/StyledTetris';
import { StyledWrapper } from './style/StyledWrapper';
import { checkCollision } from '../utils/stageUtil';
import { usePlayerContext } from '../utils/usePlayerContext';
import { useStage } from '../utils/useStage';
import { useSwipeable } from 'react-swipeable';

const Tetris: React.FC = (): ReactElement => {
  const [, setDropTime] = useState(null);
  const [gg, setGG] = useState(false);

  const [
    playerContext,
    updatePosition,
    reset,
    rotateTetris,
  ] = usePlayerContext();
  const [stage, setStage]: [Stage, Function] = useStage(playerContext, reset);

  console.log('!!!!Render');

  const start = (): void => {
    setStage(createStage());
    reset();
    setGG(false);
  };

  const moveTetris = (direction: number): void => {
    const positionDiff: Position = { x: direction, y: 0 };
    if (!checkCollision(playerContext, stage, positionDiff)) {
      updatePosition(positionDiff);
    }
  };

  const drop = (): void => {
    const positionDiff: Position = { x: 0, y: 1 };
    if (!checkCollision(playerContext, stage, positionDiff)) {
      updatePosition({ ...positionDiff, collided: false });
    } else {
      //到頂了
      if (playerContext.position.y < 1) {
        setGG(true);
        setDropTime(null);
      }

      //到底了
      updatePosition({ x: 0, y: 0, collided: true });
    }
  };
  const dropTetris = (): void => {
    drop();
  };

  const keyDown = (e: React.KeyboardEvent<object>): void => {
    const { keyCode } = e;

    if (!gg) {
      if (keyCode === 37) {
        moveTetris(-1);
      } else if (keyCode === 39) {
        moveTetris(1);
      } else if (keyCode === 40) {
        dropTetris();
      } else if (keyCode === 38) {
        // up
        rotateTetris(stage, 1);
      } else if (keyCode === 90) {
        //z
        rotateTetris(stage, -1);
      }
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      moveTetris(-1);
    },
    onSwipedRight: () => {
      moveTetris(1);
    },
    onSwipedDown: () => {
      dropTetris();
    },
    onSwipedUp: () => {
      rotateTetris(stage, 1);
    },
  });

  return (
    <StyledWrapper
      className="app"
      role="button"
      tabIndex={0}
      onKeyDown={(e): void => keyDown(e)}
      {...swipeHandlers}
    >
      <StyledTetris className="game-panel">
        <StageContainer stage={stage} />
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
