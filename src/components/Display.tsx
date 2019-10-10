import React from 'react';
import PropTypes from 'prop-types';
import { StyledDisplay } from './style/StyledDisplay';

interface Props {
  text?: string;
  gameOver?: boolean;
}
const Display: React.FC<Props> = ({ gameOver, text }) => {
  return <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>;
};

Display.propTypes = {
  text: PropTypes.string,
};

export default Display;
