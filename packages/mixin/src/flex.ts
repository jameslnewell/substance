import {map} from '@substance/style';
import {createMixinForCSSProperty} from './createMixinForCSSProperty';

export const createFlexBasis = createMixinForCSSProperty('flexBasis');
export const createFlexDirection = createMixinForCSSProperty('flexDirection');
export const createFlexGrow = createMixinForCSSProperty('flexGrow');
export const createFlexShrink = createMixinForCSSProperty('flexShrink');
export const createAlignItems = createMixinForCSSProperty('alignItems');
export const createJustifyContent = createMixinForCSSProperty('justifyContent');

export const flexBasis = createFlexBasis({map});
export const flexDirection = createFlexBasis({map});
export const flexGrow = createFlexBasis({map});
export const flexShrink = createFlexBasis({map});
export const alignItems = createAlignItems({map});
export const justifyContent = createJustifyContent({map});
