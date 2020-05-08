import {
  Style,
  DefaultProps,
  PropsConstraint,
  FlatStyle,
  StyleObject,
} from './types';

function mergeObjectIntoObject(
  srcStyleObject: StyleObject | undefined,
  destStyleObject: StyleObject,
): void {
  if (srcStyleObject === undefined) {
    return;
  }
  for (const srcStyleProperty of Object.keys(srcStyleObject)) {
    if (
      !Object.prototype.hasOwnProperty.call(srcStyleObject, srcStyleProperty)
    ) {
      continue;
    }
    if (
      !Object.prototype.hasOwnProperty.call(destStyleObject, srcStyleProperty)
    ) {
      destStyleObject[srcStyleProperty] = srcStyleObject[srcStyleProperty];
      continue;
    }
    const srcStyleValue = srcStyleObject[srcStyleProperty];
    const destStyleValue = destStyleObject[srcStyleProperty];
    if (
      typeof srcStyleValue !== 'object' ||
      typeof destStyleValue !== 'object'
    ) {
      destStyleObject[srcStyleProperty] = srcStyleObject[srcStyleProperty];
      continue;
    }
    const newStyleValue: StyleObject = {};
    mergeObjectIntoObject(destStyleValue, newStyleValue);
    mergeObjectIntoObject(srcStyleValue, newStyleValue);
    destStyleObject[srcStyleProperty] = newStyleValue;
  }
}

export function combine<Props extends PropsConstraint = DefaultProps>(
  ...styles: Style<Props>[]
): FlatStyle<Props> {
  if (styles.length === 0) {
    return undefined;
  }

  if (styles.length === 1) {
    const firstStyle = styles[0];
    if (!Array.isArray(firstStyle)) {
      if (typeof firstStyle === 'function') {
        return (props) => {
          const result = combine(firstStyle(props));
          if (typeof result === 'function') {
            return result(props);
          }
          return result;
        };
      } else {
        return firstStyle;
      }
    }
  }

  return (props) => {
    const styleObject: StyleObject = {};
    styles.forEach((style) => {
      if (typeof style === 'function') {
        const result = combine(style(props));
        if (typeof result === 'function') {
          mergeObjectIntoObject(result(props), styleObject);
        } else {
          mergeObjectIntoObject(result, styleObject);
        }
        return;
      }

      if (Array.isArray(style)) {
        const result = combine(...style);
        if (typeof result === 'function') {
          mergeObjectIntoObject(result(props), styleObject);
        } else {
          mergeObjectIntoObject(result, styleObject);
        }
        return;
      }

      mergeObjectIntoObject(style, styleObject);
    });
    return styleObject;
  };
}
