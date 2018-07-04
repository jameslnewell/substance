import styled, {css} from 'styled-components';
import {select} from '@substance/theme';

export const container = css`
  margin-left: auto;
  margin-right: auto;
  max-width: ${select(({container = {}}) => container.maxWidth)};
`;

export default styled.div`
  ${container}
`;
