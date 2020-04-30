import {
  Style,
  DefaultProps,
  PropsConstraint,
  ThemeConstraint,
  ThemeProps,
  FlatStyle,
  StyleObject,
  DefaultTheme,
} from './types';

function mergeInto(
  srcStyle: StyleObject | undefined,
  destStyle: StyleObject,
): void {
  debugger;
  if (srcStyle === undefined) {
    return;
  }
  for (const key in Object.keys(srcStyle)) {
    if (!Object.prototype.hasOwnProperty.call(srcStyle, key)) {
      destStyle[key] = srcStyle[key];
    }
    // TODO: handle key collision
  }
}

function flatten<Props, Theme>(
  styles: Style<Props, Theme>,
  props: ThemeProps<Props, Theme>,
): StyleObject | undefined {
  if (Array.isArray(styles)) {
    let count = 0;
    const combinedStyle: StyleObject = {};
    for (const style of styles) {
      if (style !== undefined) ++count;
      mergeInto(flatten(style, props), combinedStyle);
    }
    if (count > 0) {
      return combinedStyle;
    } else {
      return undefined;
    }
  }

  if (typeof styles === 'function') {
    return flatten(styles(props), props);
  }

  return styles;
}

export function combine<
  Props extends PropsConstraint = DefaultProps,
  Theme extends ThemeConstraint = DefaultTheme
>(...styles: Style<Props, Theme>[]): FlatStyle<Props, Theme> {
  if (styles.length === 0) {
    return undefined;
  }

  if (styles.length === 1) {
    const style = styles[0];
    if (!Array.isArray(style)) {
      if (typeof style === 'function') {
        return (props) => flatten(style(props), props);
      } else {
        return style;
      }
    }
  }

  return (props) => flatten<Props, Theme>(styles, props);
}
