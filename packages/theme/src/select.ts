import {Theme} from './types';

export function select(path: string, defaultValue: any = undefined): any {
  return ({theme}: {theme?: Partial<Theme>}) => {
    if (!theme) {
      return defaultValue;
    }
    if (theme[path]) {
      return theme[path];
    }
    const keys = path.split('.');
    let obj: any = theme;
    for (let key of keys) {
      if (obj.hasOwnProperty(key)) {
        obj = obj[key];
      } else {
        return defaultValue;
      }
    }
    return obj;
  };
}
