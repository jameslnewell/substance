import {css} from 'styled-components'
import {map} from '@substance/breakpoint';
import {select} from '@substance/theme';

export function p(val: string | number | {[breakpoint: string]: string | number}) {
  return map(val, (value => {
    if (value === undefined) {
      return '';
    }
    return css`
      padding: ${select(`spacing.${value}`)};
    `;
  }));
}

export function px(val: string | number) {
  return map(val, (value => {
    if (value === undefined) {
      return '';
    }
    return css`
      padding-left: ${select(`spacing.${value}`)};
      padding-right: ${select(`spacing.${value}`)};
    `;
  }));
}

export function py(val: string | number) {
  return map(val, (value => {
    if (value === undefined) {
      return '';
    }
    return css`
      padding-top: ${select(`spacing.${value}`)};
      padding-bottom: ${select(`spacing.${value}`)};
    `;
  }));
}
