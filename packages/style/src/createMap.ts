import {
  DefaultTheme,
  MediaNameConstraint,
  MapFunction,
  MediaFunction,
} from './types';

export const createMap = <
  MediaName extends MediaNameConstraint,
  Props,
  Theme = DefaultTheme
>({
  match,
}: {
  match: MediaFunction<MediaName, Theme>;
}): MapFunction<MediaName, Props, Theme> => {
  return (values, style) => {
    return (props) => {
      if (typeof values !== 'object') {
        return style(values, props);
      }
      // TODO: how to consider ordering
      return (Object.keys(values) as MediaName[]).reduce((styles, name) => {
        if (!Object.prototype.hasOwnProperty.call(values, name)) {
          return styles;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stylesForValue = style(values[name] as any, props); // FIXME:
        const stylesForMedia = match(name)(stylesForValue);
        return {
          ...styles,
          ...(typeof stylesForMedia === 'function'
            ? stylesForMedia(props)
            : stylesForMedia),
        };
      }, {});
    };
  };
};
