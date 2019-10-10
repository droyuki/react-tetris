import React from 'react';
import PropTypes from 'prop-types';
import { StyledStartButton } from './style/StyledStartButton';

interface Props {
  cb: Function;
}

const StartButton: React.FC<Props> = ({ cb }) => {
  return (
    <StyledStartButton
      onClick={() => {
        cb();
      }}
    >
      Start!
    </StyledStartButton>
  );
};

StartButton.propTypes = {
  cb: PropTypes.func.isRequired,
};

export default StartButton;
