import {map} from '@substance/style';
import {createFactoryForCSSPropertyMixin} from './createFactoryForCSSPropertyMixin';

const convertNumberToPx = (
  value: string | number | undefined,
): string | undefined => {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};

export const createDisplay = createFactoryForCSSPropertyMixin('display');
export const createWidth = createFactoryForCSSPropertyMixin(
  'width',
  convertNumberToPx,
);
export const createMaxWidth = createFactoryForCSSPropertyMixin(
  'max-width',
  convertNumberToPx,
);
export const createMinWidth = createFactoryForCSSPropertyMixin(
  'min-width',
  convertNumberToPx,
);
export const createHeight = createFactoryForCSSPropertyMixin(
  'height',
  convertNumberToPx,
);
export const createMaxHeight = createFactoryForCSSPropertyMixin(
  'max-height',
  convertNumberToPx,
);
export const createMinHeight = createFactoryForCSSPropertyMixin(
  'min-height',
  convertNumberToPx,
);

export const display = createDisplay({map});
export const width = createWidth({map});
export const maxWidth = createMaxWidth({map});
export const minWidth = createMinWidth({map});
export const height = createHeight({map});
export const maxHeight = createMaxHeight({map});
export const minHeight = createMinHeight({map});

export const createOpacity = createFactoryForCSSPropertyMixin('opacity');
export const opacity = createOpacity({map});

export const createBorderRadius = createFactoryForCSSPropertyMixin(
  'border-radius',
);
export const borderRadius = createBorderRadius({map});
