import Display from './Display';
import React, { useState } from 'react';
import Stage from './Stage';
import StartButton from './StartButton';
import createStage from '../utils/createStage';
import { Position } from '../types';
import { StyledTetris } from './style/StyledTetris';
import { StyledWrapper } from './style/StyledWrapper';
import { checkCollision } from '../utils/stageUtil';
import { usePlayerContext } from '../utils/usePlayerContext';
import { useStage } from '../utils/useStage';

const Tetris: React.FC = () => {
  const [, setDropTime] = useState(null);
  const [gg, setGG] = useState(false);

  //Q: 解構賦值要怎麼訂type?
  const [
    playerContext,
    updatePosition,
    reset,
    rotateTetris,
  ] = usePlayerContext();
  const [stage, setStage] = useStage(playerContext, reset);

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
      //上面沒訂type，這裡吃不到position type QQ
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

  // const rotateTetris = (stage: StageType, direction: number): void => {
  //   const rotated = rotate(stage, direction);
  //   updatePosition(rotated);
  // };

  const keyDown = (e: React.KeyboardEvent<object>): void => {
    const { keyCode } = e;

    console.log(keyCode);
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

  return (
    <StyledWrapper
      role="button"
      tabIndex={0}
      onKeyDown={(e): void => keyDown(e)}
    >
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
