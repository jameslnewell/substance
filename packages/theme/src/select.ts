import {Theme} from './types';

export function select(path: string, value: any = undefined): any {
  return ({theme}: {theme?: Partial<Theme>}) => {
    if (!theme) {
      return value;
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
        console.log(keys, 'default value');
        return value;
      }
    }
    return obj;
  };
}
