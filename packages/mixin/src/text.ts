import {map} from '@substance/style';
import {createMixinForCSSProperty} from './createMixinForCSSProperty';

export const createTextAlign = createMixinForCSSProperty('textAlign');
export const createTextDecoration = createMixinForCSSProperty('textDecoration');

export const createFontSize = createMixinForCSSProperty('fontSize');
export const createFontStyle = createMixinForCSSProperty('fontStyle');
export const createFontWeight = createMixinForCSSProperty('fontWeight');

export const textAlign = createTextAlign({map});
export const textDecoration = createTextDecoration({map});

export const fontSize = createFontSize({map});
export const fontStyle = createFontStyle({map});
export const fontWeight = createFontWeight({map});
