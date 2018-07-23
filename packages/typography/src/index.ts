import {css} from 'styled-components';
import {map, BreakpointValue, BreakpointValueMap} from '@substance/breakpoint';
import {select} from '@substance/theme';

export type Alignment = 'left' | 'center' | 'right' | 'justify';

function align(alignment: BreakpointValue<Alignment> | BreakpointValueMap<Alignment>) {
  return map(alignment, val => {
    if (!val) {
      return '';
    }
    return `text-align: ${val};`;
  })
}

export function heading(options: {} = {}) {
  return `
  `;
}

export function copy(options: {align?: BreakpointValue<Alignment> | BreakpointValueMap<Alignment>} = {}) {
  return css`
    font-family: ${select('typography.copy.font')};
    ${align(options.align)}
  `;
}