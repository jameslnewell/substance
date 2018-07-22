import {css} from 'styled-components';
import {map, Value, BreakpointValueMap} from '@substance/breakpoint';
import {select} from '@substance/theme';

export type Alignment = 'left' | 'center' | 'right' | 'justify';

function align(values: Value<Alignment> | BreakpointValueMap<Alignment>) {
  return map(values, value => {
    if (!value) {
      return '';
    }
    return `text-align: ${value};`;
  })
}

export function heading(options: {} = {}) {
  return `
  `;
}

export function copy(options: {align?: Alignment} = {}) {
  return css`
    font-family: ${select('typography.copy.font')};
    ${align(options.align)}
  `;
}