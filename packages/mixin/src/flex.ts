import {map} from '@substance/style';
import {createFactoryForCSSPropertyMixin} from './createFactoryForCSSPropertyMixin';

export const createFlexBasis = createFactoryForCSSPropertyMixin('flexBasis');
export const createFlexDirection = createFactoryForCSSPropertyMixin(
  'flexDirection',
);
export const createFlexGrow = createFactoryForCSSPropertyMixin('flexGrow');
export const createFlexShrink = createFactoryForCSSPropertyMixin('flexShrink');
export const createAlignItems = createFactoryForCSSPropertyMixin('alignItems');
export const createJustifyContent = createFactoryForCSSPropertyMixin(
  'justifyContent',
);

export const flexBasis = createFlexBasis({map});
export const flexDirection = createFlexBasis({map});
export const flexGrow = createFlexBasis({map});
export const flexShrink = createFlexBasis({map});
export const alignItems = createAlignItems({map});
export const justifyContent = createJustifyContent({map});
