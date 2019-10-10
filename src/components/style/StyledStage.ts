import styled from 'styled-components';

interface Props {
  width: number;
  height: number;
}

export const StyledStage = styled.div<Props>`
  display: grid;
  grid-template-rows: repeat(
    ${(props: Props): number => props.height},
    calc(25vw / ${(props: Props): number => props.width})
  );
  grid-template-columns: repeat(${(props: Props): number => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;
`;
