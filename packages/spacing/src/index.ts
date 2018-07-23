import {css} from 'styled-components'
import {map, BreakpointValue, BreakpointValueMap} from '@substance/breakpoint';
import {select} from '@substance/theme';

export type Size = BreakpointValue<string | number> | BreakpointValueMap<string | number>;

export function p(size: Size) {
  return map(size, (s => {
    if (s === undefined) {
      return '';
    }
    return css`
      padding: ${select(`spacing.${s}`)};
    `;
  }));
}

export function px(size: Size) {
  return map(size, (s => {
    if (s === undefined) {
      return '';
    }
    return css`
      padding-left: ${select(`spacing.${s}`)};
      padding-right: ${select(`spacing.${s}`)};
    `;
  }));
}

export function py(size: Size) {
  return map(size, (s => {
    if (s === undefined) {
      return '';
    }
    return css`
      padding-top: ${select(`spacing.${s}`)};
      padding-bottom: ${select(`spacing.${s}`)};
    `;
  }));
}
