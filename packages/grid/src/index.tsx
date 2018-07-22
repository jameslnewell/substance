import * as React from 'react';
import styled, {css} from 'styled-components';
import {map} from '@substance/breakpoint';
// import {p, px, py, pt, pr, pb, pl} from '@substance/spacing';

function width(values: number | {[breakpoint: string]: number}) {
  return map(values, (value = 1) => value && `width: ${value * 100}%;` || '');
}

export function grid(options: {}) {
  return css`
    display: flex;
    flex-wrap: wrap;
  `;
}

export function unit({size}: {size: number | {[breakpoint: string]: number}}) {
  return css`
    ${width(size)}
  `;
}


export interface BoxProps {
  size: string | {[breakpoint: string]: string};
}

export default styled.div`
  display: flex;
  box-sizing: border-box;
`;
