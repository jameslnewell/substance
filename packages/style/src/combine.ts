import {
  Style,
  DefaultProps,
  PropsConstraint,
  FlatStyle,
  StyleObject,
} from './types';

function mergeInto(
  srcStyle: StyleObject | undefined,
  destStyle: StyleObject,
): void {
  if (srcStyle === undefined) {
    return;
  }
  for (const key of Object.keys(srcStyle)) {
    if (!Object.prototype.hasOwnProperty.call(destStyle, key)) {
      destStyle[key] = srcStyle[key];
    }
    // TODO: handle key collision
  }
}

function flatten<Props>(
  styles: Style<Props>,
  props: Props,
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

export function combine<Props extends PropsConstraint = DefaultProps>(
  ...styles: Style<Props>[]
): FlatStyle<Props> {
  if (styles.length === 0) {
    return undefined;
  }

  if (styles.length === 1) {
    const style = styles[0];
    if (!Array.isArray(style)) {
      if (typeof style === 'function') {
        return (props) => flatten<Props>(style(props), props);
      } else {
        return style;
      }
    }
  }

  return (props) => flatten<Props>(styles, props);
}
