import styled from 'styled-components';

interface Props {
  gg?: boolean;
}

export const StyledDisplay = styled.div<Props>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${(props: Props): string => (props.gg ? 'red' : '#999')};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`;
