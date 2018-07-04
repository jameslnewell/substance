import {css} from 'styled-components';
import {map, Value, BreakpointValueMap} from '@substance/breakpoint';
import {select} from '@substance/theme';

export type Alignment = 'left' | 'center' | 'right' | 'justify';

export function align(values: Value<Alignment> | BreakpointValueMap<Alignment>) {
  return map(values, value => {
    if (!value) {
      return '';
    }
    return `text-align: ${value};`;
  })
}

export function font(name: string = 'primary') {
  return css`font-family: ${select(({fonts = {}}) => fonts[name])};`;
}

export function fontSize(val: 1 | 2 | 3 | 4) {

}

export function fontWeight(val: 1 | 2 | 3 | 4) {

}

// what about copy and headings?