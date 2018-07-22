import {css} from 'styled-components';
import {select} from '@substance/theme';

export const color = (name: string) => select(`colors.${name}`);
export const fg = (name: string) => css`color: ${color(name)};`;
export const bg = (name: string) => css`background-color: ${color(name)};`;
