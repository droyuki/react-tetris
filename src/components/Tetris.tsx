import Display from './Display';
import React, { useState, ReactElement, memo } from 'react';
import StageContainer from './StageContainer';
import StartButton from './StartButton';
import { Position, Stage } from '../types';
import { StyledTetris } from './style/StyledTetris';
import { StyledWrapper } from './style/StyledWrapper';
import { createStage, checkCollision } from '../utils/stageUtil';
import { useGameState } from '../utils/useGameState';
import { useInterval } from '../utils/useInterval';
import { usePlayerContext } from '../utils/usePlayerContext';
import { useStage } from '../utils/useStage';
import { useSwipeable } from 'react-swipeable';

const Tetris: React.FC = (): ReactElement => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gg, setGG] = useState(false);

  const [
    playerContext,
    updatePosition,
    reset,
    rotateTetris,
  ] = usePlayerContext();
  const [stage, setStage, clearedLines]: [Stage, Function, number] = useStage(
    playerContext,
    reset,
  );

  const [score, setScore, level, setLevel, lines, setLines] = useGameState(
    clearedLines,
  );

  const start = (): void => {
    setStage(createStage());
    setDropTime(1000);
    reset();
    setScore(0);
    setLines(0);
    setLevel(0);
    setGG(false);
  };

  const moveTetris = (direction: number): void => {
    const positionDiff: Position = { x: direction, y: 0 };
    if (!checkCollision(playerContext, stage, positionDiff)) {
      updatePosition(positionDiff);
    }
  };

  const getSpeed = (): number => 1000 / (level + 1) + 200;

  const drop = (): void => {
    if (lines > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(getSpeed());
    }

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
    setDropTime(null);
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

  const keyUp = (e: React.KeyboardEvent<object>): void => {
    const { keyCode } = e;
    if (keyCode === 40 && !gg) {
      setDropTime(getSpeed());
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

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledWrapper
      className="app"
      role="button"
      tabIndex={0}
      onKeyDown={(e): void => keyDown(e)}
      onKeyUp={(e): void => keyUp(e)}
      {...swipeHandlers}
    >
      <StyledTetris className="game-panel">
        <StageContainer stage={stage} />
        <aside>
          {gg ? (
            <Display gg />
          ) : (
            <>
              <Display text={`Score:  ${score}`} />
              <Display text={`Lines:  ${lines}`} />
              <Display text={`Level:  ${level}`} />
            </>
          )}
          <StartButton onClick={start} />
        </aside>
      </StyledTetris>
    </StyledWrapper>
  );
};

export default memo(Tetris);
