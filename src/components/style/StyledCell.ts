import styled from 'styled-components';

interface Props {
  color: string;
  type: string | number;
}

export const StyledCell = styled.div<Props>`
  width: auto;
  background: rgba(${(props: Props): string => props.color}, 0.8);
  border: ${(props: Props): string =>
    props.type === 0 ? '0px solid' : '4px solid'};
  border-bottom-color: rgba(${(props: Props): string => props.color}, 0.1);
  border-right-color: rgba(${(props: Props): string => props.color}, 1);
  border-top-color: rgba(${(props: Props): string => props.color}, 1);
  border-left-color: rgba(${(props: Props): string => props.color}, 0.3);
`;
