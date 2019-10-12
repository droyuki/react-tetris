import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { StyledStartButton } from './style/StyledStartButton';

interface Props {
  onClick: (e: React.MouseEvent) => void;
}

const StartButton: React.FC<Props> = ({ onClick }) => {
  return <StyledStartButton onClick={onClick}>Start!</StyledStartButton>;
};

StartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default memo(StartButton);
