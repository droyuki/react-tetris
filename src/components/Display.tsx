import PropTypes from 'prop-types';
import React from 'react';
import { StyledDisplay } from './style/StyledDisplay';

interface Props {
  text?: string;
  gg?: boolean;
}
const Display: React.FC<Props> = (props: Props) => {
  const { gg, text } = props;
  return <StyledDisplay gg={gg}>{gg ? 'Game Over' : text}</StyledDisplay>;
};

Display.propTypes = {
  text: PropTypes.string,
};

export default Display;
